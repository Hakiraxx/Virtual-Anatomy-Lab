import { create } from 'zustand';
import { System, Organ, Bookmark } from '../types/anatomy';
import { api } from '../services/api';

export interface FocusNode {
  id: string;
  type: 'body' | 'system' | 'organ' | 'structure';
  nameVi: string;
  nameEn: string;
  cameraPosition?: [number, number, number];
  cameraTarget?: [number, number, number];
  organId?: string;
  structureId?: string;
}

export interface CameraFocusTarget {
  targetPosition: [number, number, number];
  targetLookAt: [number, number, number];
  duration: number; // 600 - 1000ms
  timestamp: number;
}

interface CrossSectionState {
  enabled: boolean;
  x: number; // Sagittal plane offset (-2 to 2)
  y: number; // Axial plane offset (-2 to 2)
  z: number; // Coronal plane offset (-2 to 2)
}

interface AnatomyState {
  systems: System[];
  organs: Organ[];
  selectedOrganId: string | null;
  hoveredOrganId: string | null;
  isolatedOrganId: string | null;
  systemVisibility: Record<string, boolean>;
  layerDepth: number; // 0.0 (Skin/Superficial) to 1.0 (Deep Visceral & Vascular)
  transparency: number; // 0% (solid) to 80% (transparent)
  showLabels: boolean;
  activeTool: 'inspect' | 'measure' | 'slice';
  crossSection: CrossSectionState;
  measurementPoints: [number, number, number][];
  measuredDistance: number | null;
  cameraPreset: string | null;
  activeModal: 'quiz' | 'flashcards' | 'lessons' | 'dashboard' | 'auth' | 'notes' | 'search' | null;
  bookmarkedOrganIds: Set<string>;
  isLoading: boolean;
  
  // Quiz specific 3D interaction
  isQuizActive: boolean;
  quizTargetOrganId: string | null;
  onQuizOrganClicked?: (organId: string) => void;

  // Actions
  fetchInitialData: () => Promise<void>;

  // Atelier specific state
  activeSpecimenId: string;
  autoRotate: boolean;
  language: 'vi' | 'en';
  atelierTheme: 'light' | 'dark';
  activeHotspotId: string | null;
  isLibraryOpen: boolean;
  showHotspots: boolean;
  
  // Smart Focus & Deep Inspection state
  focusStack: FocusNode[];
  focusHistory: FocusNode[];
  focusMode: 'dim' | 'hide';
  isIsolated: boolean;
  explodeFactor: number; // 0.0 to 1.0
  autoRotateSpeed: 'slow' | 'normal' | 'fast';
  cameraAnglePreset: 'anterior' | 'posterior' | 'superior' | 'inferior' | 'left' | 'right' | null;
  activeStructureId: string | null;
  cameraFocusTarget: CameraFocusTarget | null;
  currentCameraPosition: [number, number, number];
  currentCameraTarget: [number, number, number];
  isLayersActive: boolean; // Dissection / muscle fiber wireframe layer (as in xuonggiaiphau)

  // Multi-gender & Whole-body Lab vs Specimen Atelier mode
  gender: 'male' | 'female';
  setGender: (g: 'male' | 'female') => void;
  viewMode: 'full-body' | 'specimen' | 'dental-neuro';
  setViewMode: (m: 'full-body' | 'specimen' | 'dental-neuro') => void;

  // 8-Layer Dissection Engine
  layerVisibility: Record<number, boolean>;
  layerOpacity: Record<number, number>;
  setLayerVisibility: (layerIndex: number, visible: boolean) => void;
  setLayerOpacity: (layerIndex: number, opacity: number) => void;
  // Visualization Modes (Section 32)
  visualizationMode: 'default' | 'skeleton' | 'muscles' | 'organs' | 'vascular' | 'nervous';
  setVisualizationMode: (mode: 'default' | 'skeleton' | 'muscles' | 'organs' | 'vascular' | 'nervous') => void;

  // Structure Hierarchy & Left Tree
  selectedStructureId: string | null;
  selectStructure: (id: string | null) => void;
  isTreeOpen: boolean;
  toggleTreeOpen: () => void;
  setIsTreeOpen: (open: boolean) => void;
  isInfoOpen: boolean;
  toggleInfoOpen: () => void;
  setIsInfoOpen: (open: boolean) => void;

  // Smart Focus actions
  triggerCameraFocus: (target: CameraFocusTarget) => void;
  focusOnOrgan: (organId: string, nameVi: string, nameEn: string, cameraPos?: [number, number, number], targetLookAt?: [number, number, number]) => void;
  focusOnStructure: (structureId: string, nameVi: string, nameEn: string, offset?: [number, number, number]) => void;
  backToPreviousFocus: () => void;
  backToBody: () => void;
  setFocusMode: (mode: 'dim' | 'hide') => void;
  setIsIsolated: (isolated: boolean) => void;
  setExplodeFactor: (factor: number) => void;
  setAutoRotateSpeed: (speed: 'slow' | 'normal' | 'fast') => void;
  setCameraAnglePreset: (angle: 'anterior' | 'posterior' | 'superior' | 'inferior' | 'left' | 'right' | null) => void;
  updateCurrentCamera: (pos: [number, number, number], target: [number, number, number]) => void;
  toggleLayers: () => void;
  resetAllToDefault: () => void;

  setActiveSpecimen: (id: string) => void;
  toggleAutoRotate: () => void;
  setLanguage: (lang: 'vi' | 'en') => void;
  setAtelierTheme: (theme: 'light' | 'dark') => void;
  setActiveHotspot: (id: string | null) => void;
  toggleLibraryOpen: () => void;
  toggleShowHotspots: () => void;
  selectOrgan: (id: string | null) => void;
  setHoveredOrgan: (id: string | null) => void;
  isolateOrgan: (id: string | null) => void;
  toggleSystemVisibility: (systemId: string) => void;
  setAllSystemsVisibility: (visible: boolean) => void;
  setLayerDepth: (depth: number) => void;
  setTransparency: (transparency: number) => void;
  toggleLabels: () => void;
  setActiveTool: (tool: 'inspect' | 'measure' | 'slice') => void;
  setCrossSection: (update: Partial<CrossSectionState>) => void;
  addMeasurementPoint: (point: [number, number, number]) => void;
  clearMeasurement: () => void;
  setCameraPreset: (preset: string | null) => void;
  setActiveModal: (modal: AnatomyState['activeModal']) => void;
  toggleBookmark: (organId: string) => Promise<void>;
  setQuizListener: (targetOrganId: string | null, onSelect?: (organId: string) => void) => void;
}

const getInitialViewMode = (): 'full-body' | 'specimen' | 'dental-neuro' => {
  if (typeof window === 'undefined') return 'full-body';
  const path = window.location.pathname.toLowerCase();
  if (path.includes('dental-neuro') || path.includes('craniofacial') || path.includes('rhm')) {
    return 'dental-neuro';
  }
  if (path.includes('tieubansau') || path.includes('tieu-ban-sau') || path.includes('specimen')) {
    return 'specimen';
  }
  return 'full-body';
};

const getInitialSpecimenId = (): string => {
  if (typeof window === 'undefined') return 'heart';
  const path = window.location.pathname.toLowerCase();
  const match = path.match(/\/(?:tieubansau|tieu-ban-sau|specimens?)\/([a-z0-9_-]+)/);
  if (match && match[1]) {
    return match[1];
  }
  return 'heart';
};

let transitionRafId: number | null = null;

function crossfadeLayers(
  targetVisibilities: Record<number, boolean>,
  targetOpacities: Record<number, number>,
  set: any,
  get: any,
  duration = 380
) {
  if (typeof window === 'undefined') {
    set({ layerVisibility: targetVisibilities, layerOpacity: targetOpacities });
    return;
  }

  if (transitionRafId !== null) {
    cancelAnimationFrame(transitionRafId);
    transitionRafId = null;
  }

  const currentOpacities = { ...get().layerOpacity };
  const currentVisibilities = { ...get().layerVisibility };

  // Make all incoming or existing layers visible immediately so they can crossfade smoothly
  const mergedVisibility: Record<number, boolean> = {};
  for (let i = 1; i <= 8; i++) {
    mergedVisibility[i] = Boolean(currentVisibilities[i] || targetVisibilities[i]);
  }
  set({ layerVisibility: mergedVisibility });

  const startTime = performance.now();

  const animate = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(1.0, elapsed / duration);
    // Smooth sinusoidal easing
    const ease = 0.5 - 0.5 * Math.cos(progress * Math.PI);

    const nextOpacities: Record<number, number> = {};
    for (let i = 1; i <= 8; i++) {
      const from = currentOpacities[i] ?? 0;
      const to = targetOpacities[i] ?? 0;
      nextOpacities[i] = Number((from + (to - from) * ease).toFixed(3));
    }

    set({ layerOpacity: nextOpacities });

    if (progress < 1.0) {
      transitionRafId = requestAnimationFrame(animate);
    } else {
      transitionRafId = null;
      set({
        layerVisibility: targetVisibilities,
        layerOpacity: targetOpacities
      });
    }
  };

  transitionRafId = requestAnimationFrame(animate);
}

export const useAnatomyStore = create<AnatomyState>((set, get) => ({
  systems: [],
  organs: [],
  selectedOrganId: 'heart', // Default select Heart on start
  hoveredOrganId: null,
  isolatedOrganId: null,
  systemVisibility: {},
  layerDepth: 0.8, // Show internal organs by default
  transparency: 0,
  showLabels: false, // Clean viewport by default, toggleable via bottom bar
  activeTool: 'inspect',
  crossSection: {
    enabled: false,
    x: 0,
    y: 0,
    z: 0
  },
  measurementPoints: [],
  measuredDistance: null,
  cameraPreset: null,
  activeModal: null,
  bookmarkedOrganIds: new Set(['heart', 'brain']),
  isLoading: false,

  isQuizActive: false,
  quizTargetOrganId: null,

  // Atelier defaults
  activeSpecimenId: getInitialSpecimenId(),
  autoRotate: false,
  language: 'vi',
  atelierTheme: 'light', // Matches xuonggiaiphau.com default ivory aesthetic
  activeHotspotId: null,
  isLibraryOpen: false,
  showHotspots: true,

  // Smart Focus & Deep Inspection state
  focusStack: [
    {
      id: 'body',
      type: 'body',
      nameVi: 'Cơ thể người',
      nameEn: 'Human Body',
      cameraPosition: [0, 0.4, 2.5],
      cameraTarget: [0, 0, 0]
    },
    {
      id: 'heart',
      type: 'organ',
      organId: 'heart',
      nameVi: 'Tim',
      nameEn: 'Heart',
      cameraPosition: [0, 0.2, 1.8],
      cameraTarget: [0, 0, 0]
    }
  ],
  focusHistory: [],
  focusMode: 'dim',
  isIsolated: false,
  explodeFactor: 0.0,
  autoRotateSpeed: 'normal',
  cameraAnglePreset: null,
  activeStructureId: null,
  cameraFocusTarget: null,
  currentCameraPosition: [0, 0.4, 2.5],
  currentCameraTarget: [0, 0, 0],
  isLayersActive: false,

  gender: 'male',
  setGender: (gender) => set({ gender }),

  viewMode: getInitialViewMode(),
  setViewMode: (viewMode) => {
    set({ viewMode });
    if (typeof window !== 'undefined') {
      const targetPath =
        viewMode === 'dental-neuro'
          ? '/lab/dental-neuroanatomy'
          : viewMode === 'specimen'
          ? '/tieubansau'
          : '/toanthan';
      if (!window.location.pathname.includes(targetPath)) {
        window.history.pushState({ viewMode }, '', targetPath);
      }
    }
  },

  // 8-Layer Dissection Engine — Default to clean independent whole body
  layerVisibility: {
    1: true,  // Skin (Human body)
    2: false, // Fascia
    3: false, // Muscle
    4: false, // Bone
    5: false, // Organ
    6: false, // Vessel
    7: false, // Nerve
    8: false  // Deep
  },
  layerOpacity: {
    1: 0.98,
    2: 0.0,
    3: 0.0,
    4: 0.0,
    5: 0.0,
    6: 0.0,
    7: 0.0,
    8: 0.0
  },
  setLayerVisibility: (layerIndex, visible) =>
    set((s) => ({
      layerVisibility: { ...s.layerVisibility, [layerIndex]: visible }
    })),
  setLayerOpacity: (layerIndex, opacity) =>
    set((s) => ({
      layerOpacity: { ...s.layerOpacity, [layerIndex]: opacity }
    })),

  visualizationMode: 'default',
  setVisualizationMode: (mode) => {
    let targetVis: Record<number, boolean>;
    let targetOp: Record<number, number>;

    if (mode === 'skeleton') {
      targetVis = { 1: false, 2: false, 3: false, 4: true, 5: false, 6: false, 7: false, 8: false };
      targetOp = { 1: 0, 2: 0, 3: 0, 4: 1.0, 5: 0, 6: 0, 7: 0, 8: 0 };
    } else if (mode === 'muscles') {
      targetVis = { 1: false, 2: false, 3: true, 4: false, 5: false, 6: false, 7: false, 8: false };
      targetOp = { 1: 0, 2: 0, 3: 1.0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
    } else if (mode === 'organs') {
      targetVis = { 1: true, 2: false, 3: false, 4: false, 5: true, 6: false, 7: false, 8: true };
      targetOp = { 1: 0.08, 2: 0, 3: 0, 4: 0, 5: 1.0, 6: 0, 7: 0, 8: 1.0 };
    } else if (mode === 'vascular') {
      targetVis = { 1: true, 2: false, 3: false, 4: true, 5: false, 6: true, 7: false, 8: false };
      targetOp = { 1: 0.10, 2: 0, 3: 0, 4: 0.15, 5: 0, 6: 1.0, 7: 0, 8: 0 };
    } else if (mode === 'nervous') {
      targetVis = { 1: true, 2: false, 3: false, 4: true, 5: false, 6: false, 7: true, 8: false };
      targetOp = { 1: 0.10, 2: 0, 3: 0, 4: 0.15, 5: 0, 6: 0, 7: 1.0, 8: 0 };
    } else {
      targetVis = { 1: true, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false };
      targetOp = { 1: 0.98, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };
    }

    set({ visualizationMode: mode, selectedStructureId: null });
    crossfadeLayers(targetVis, targetOp, set, get);
  },

  selectedStructureId: null,
  selectStructure: (id) =>
    set((s) => ({
      selectedStructureId: id,
      isInfoOpen: Boolean(id),
      isTreeOpen: Boolean(id) && typeof window !== 'undefined' && window.innerWidth < 1024 ? false : s.isTreeOpen
    })),

  isTreeOpen: typeof window !== 'undefined' ? window.innerWidth >= 1280 : true,
  toggleTreeOpen: () =>
    set((s) => {
      const next = !s.isTreeOpen;
      return {
        isTreeOpen: next,
        isInfoOpen: next && typeof window !== 'undefined' && window.innerWidth < 1024 ? false : s.isInfoOpen
      };
    }),
  setIsTreeOpen: (open) =>
    set((s) => ({
      isTreeOpen: open,
      isInfoOpen: open && typeof window !== 'undefined' && window.innerWidth < 1024 ? false : s.isInfoOpen
    })),

  isInfoOpen: typeof window !== 'undefined' ? window.innerWidth >= 1440 : false,
  toggleInfoOpen: () =>
    set((s) => {
      const next = !s.isInfoOpen;
      return {
        isInfoOpen: next,
        isTreeOpen: next && typeof window !== 'undefined' && window.innerWidth < 1024 ? false : s.isTreeOpen
      };
    }),
  setIsInfoOpen: (open) =>
    set((s) => ({
      isInfoOpen: open,
      isTreeOpen: open && typeof window !== 'undefined' && window.innerWidth < 1024 ? false : s.isTreeOpen
    })),

  toggleLayers: () => set((s) => ({ isLayersActive: !s.isLayersActive })),

  resetAllToDefault: () =>
    set({
      selectedStructureId: null,
      selectedOrganId: null,
      isolatedOrganId: null,
      isIsolated: false,
      focusMode: 'dim',
      explodeFactor: 0,
      crossSection: { enabled: false, x: 0, y: 0, z: 0 },
      isLayersActive: false,
      visualizationMode: 'default',
      layerVisibility: {
        1: true,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false
      },
      layerOpacity: {
        1: 0.98,
        2: 0.0,
        3: 0.0,
        4: 0.0,
        5: 0.0,
        6: 0.0,
        7: 0.0,
        8: 0.0
      },
      cameraFocusTarget: {
        targetPosition: [0, 0.95, 3.1],
        targetLookAt: [0, 0.875, 0],
        duration: 900,
        timestamp: Date.now()
      }
    }),

  triggerCameraFocus: (target) => set({ cameraFocusTarget: target }),

  focusOnOrgan: (organId, nameVi, nameEn, cameraPos, targetLookAt) => {
    const current = get();
    const newTargetPos = cameraPos || [0, 0.1, 1.6];
    const newLookAt = targetLookAt || [0, 0, 0];

    const newNode: FocusNode = {
      id: organId,
      type: 'organ',
      organId,
      nameVi,
      nameEn,
      cameraPosition: newTargetPos,
      cameraTarget: newLookAt
    };

    set((s) => ({
      activeSpecimenId: organId,
      selectedOrganId: organId,
      activeStructureId: null,
      cameraAnglePreset: null,
      focusStack: [
        { id: 'body', type: 'body', nameVi: 'Cơ thể người', nameEn: 'Human Body' },
        newNode
      ],
      focusHistory: [...s.focusHistory, newNode],
      cameraFocusTarget: {
        targetPosition: newTargetPos,
        targetLookAt: newLookAt,
        duration: 800,
        timestamp: Date.now()
      }
    }));
  },

  focusOnStructure: (structureId, nameVi, nameEn, offset) => {
    const current = get();
    const off = offset || [0, 0, 0];
    const lookAt: [number, number, number] = [off[0], off[1], off[2]];
    const camPos: [number, number, number] = [off[0], off[1] + 0.15, off[2] + 0.8];

    const newNode: FocusNode = {
      id: structureId,
      type: 'structure',
      organId: current.activeSpecimenId,
      structureId,
      nameVi,
      nameEn,
      cameraPosition: camPos,
      cameraTarget: lookAt
    };

    // Keep up to current organ node and append structure
    const organNode = current.focusStack.find((n) => n.type === 'organ') || {
      id: current.activeSpecimenId,
      type: 'organ' as const,
      nameVi: 'Cơ quan',
      nameEn: 'Organ'
    };

    set((s) => ({
      activeStructureId: structureId,
      focusStack: [
        { id: 'body', type: 'body', nameVi: 'Cơ thể người', nameEn: 'Human Body' },
        organNode,
        newNode
      ],
      focusHistory: [...s.focusHistory, newNode],
      cameraFocusTarget: {
        targetPosition: camPos,
        targetLookAt: lookAt,
        duration: 800,
        timestamp: Date.now()
      }
    }));
  },

  backToPreviousFocus: () => {
    const { focusStack } = get();
    if (focusStack.length <= 1) return;
    const newStack = [...focusStack];
    newStack.pop();
    const prevNode = newStack[newStack.length - 1];

    if (prevNode.type === 'body') {
      get().backToBody();
      return;
    }

    if (prevNode.type === 'organ' && prevNode.organId) {
      set({
        focusStack: newStack,
        activeStructureId: null,
        activeSpecimenId: prevNode.organId,
        cameraFocusTarget: {
          targetPosition: prevNode.cameraPosition || [0, 0.4, 2.5],
          targetLookAt: prevNode.cameraTarget || [0, 0, 0],
          duration: 800,
          timestamp: Date.now()
        }
      });
    }
  },

  backToBody: () => {
    set({
      activeStructureId: null,
      isIsolated: false,
      explodeFactor: 0,
      cameraAnglePreset: null,
      focusStack: [
        {
          id: 'body',
          type: 'body',
          nameVi: 'Cơ thể người',
          nameEn: 'Human Body',
          cameraPosition: [0, 0.4, 2.5],
          cameraTarget: [0, 0, 0]
        }
      ],
      cameraFocusTarget: {
        targetPosition: [0, 0.4, 2.5],
        targetLookAt: [0, 0, 0],
        duration: 900,
        timestamp: Date.now()
      }
    });
  },

  setFocusMode: (mode) => set({ focusMode: mode }),
  setIsIsolated: (isolated) => set({ isIsolated: isolated }),
  setExplodeFactor: (factor) => set({ explodeFactor: Math.max(0, Math.min(1, factor)) }),
  setAutoRotateSpeed: (speed) => set({ autoRotateSpeed: speed }),
  setCameraAnglePreset: (angle) => set({ cameraAnglePreset: angle }),
  updateCurrentCamera: (pos, target) => set({ currentCameraPosition: pos, currentCameraTarget: target }),

  setActiveSpecimen: (id) => {
    set({ activeSpecimenId: id, selectedOrganId: id });
    if (typeof window !== 'undefined') {
      const targetPath = `/tieubansau/${id}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ viewMode: 'specimen', specimenId: id }, '', targetPath);
      }
    }
  },
  toggleAutoRotate: () => set((s) => ({ autoRotate: !s.autoRotate })),
  setLanguage: (lang) => set({ language: lang }),
  setAtelierTheme: (theme) => set({ atelierTheme: theme }),
  setActiveHotspot: (id) => set({ activeHotspotId: id }),
  toggleLibraryOpen: () => set((s) => ({ isLibraryOpen: !s.isLibraryOpen })),
  toggleShowHotspots: () => set((s) => ({ showHotspots: !s.showHotspots })),

  fetchInitialData: async () => {
    set({ isLoading: true });
    try {
      const [systems, organs] = await Promise.all([
        api.getSystems(),
        api.getOrgans()
      ]);

      const initialVisibility: Record<string, boolean> = {};
      systems.forEach(s => {
        initialVisibility[s.id] = true;
      });

      set({
        systems,
        organs,
        systemVisibility: initialVisibility,
        isLoading: false
      });

      // Try fetching user bookmarks if logged in
      try {
        const bookmarks = await api.getBookmarks();
        if (bookmarks && bookmarks.length > 0) {
          set({ bookmarkedOrganIds: new Set(bookmarks.map(b => b.organId)) });
        }
      } catch {
        // Guest user bookmarks fallback is fine
      }
    } catch (err) {
      console.error('Failed to fetch initial anatomy data:', err);
      set({ isLoading: false });
    }
  },

  selectOrgan: (id) => {
    set({ selectedOrganId: id });
  },

  setHoveredOrgan: (id) => {
    set({ hoveredOrganId: id });
  },

  isolateOrgan: (id) => {
    const current = get().isolatedOrganId;
    if (current === id) {
      set({ isolatedOrganId: null });
    } else {
      set({ isolatedOrganId: id, selectedOrganId: id });
    }
  },

  toggleSystemVisibility: (systemId) => {
    set((state) => ({
      systemVisibility: {
        ...state.systemVisibility,
        [systemId]: !state.systemVisibility[systemId]
      }
    }));
  },

  setAllSystemsVisibility: (visible) => {
    set((state) => {
      const updated: Record<string, boolean> = {};
      state.systems.forEach(s => {
        updated[s.id] = visible;
      });
      return { systemVisibility: updated };
    });
  },

  setLayerDepth: (depth) => {
    set({ layerDepth: Math.max(0, Math.min(1, depth)) });
  },

  setTransparency: (transparency) => {
    set({ transparency: Math.max(0, Math.min(90, transparency)) });
  },

  toggleLabels: () => {
    set((state) => ({ showLabels: !state.showLabels }));
  },

  setActiveTool: (tool) => {
    set({
      activeTool: tool,
      crossSection: { ...get().crossSection, enabled: tool === 'slice' }
    });
  },

  setCrossSection: (update) => {
    set((state) => ({
      crossSection: { ...state.crossSection, ...update }
    }));
  },

  addMeasurementPoint: (point) => {
    const { measurementPoints } = get();
    if (measurementPoints.length >= 2) {
      // Reset with first point of new measurement
      set({ measurementPoints: [point], measuredDistance: null });
      return;
    }

    const updated = [...measurementPoints, point];
    if (updated.length === 2) {
      const [p1, p2] = updated;
      // Distance calculation in simulated anatomical units (scale 1 unit ~ 20 cm)
      const dx = p2[0] - p1[0];
      const dy = p2[1] - p1[1];
      const dz = p2[2] - p1[2];
      const distUnits = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const distCm = parseFloat((distUnits * 20).toFixed(1));
      set({ measurementPoints: updated, measuredDistance: distCm });
    } else {
      set({ measurementPoints: updated, measuredDistance: null });
    }
  },

  clearMeasurement: () => {
    set({ measurementPoints: [], measuredDistance: null });
  },

  setCameraPreset: (preset) => {
    set({ cameraPreset: preset });
  },

  setActiveModal: (modal) => {
    set({ activeModal: modal });
  },

  toggleBookmark: async (organId) => {
    const current = new Set(get().bookmarkedOrganIds);
    if (current.has(organId)) {
      current.delete(organId);
    } else {
      current.add(organId);
    }
    set({ bookmarkedOrganIds: current });

    try {
      await api.toggleBookmark(organId);
    } catch {
      // Guest local state preserved
    }
  },

  setQuizListener: (targetOrganId, onSelect) => {
    set({
      isQuizActive: Boolean(targetOrganId),
      quizTargetOrganId: targetOrganId,
      onQuizOrganClicked: onSelect
    });
  }
}));
