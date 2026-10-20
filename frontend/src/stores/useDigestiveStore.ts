import { create } from 'zustand';
import { DIGESTIVE_SYSTEM_DATA, DigestiveCategory, DigestiveOrganData } from '../data/digestiveSystemData';

export interface DigestiveLayers {
  giTract: boolean;
  hepatobiliary: boolean;
  pancreas: boolean;
  salivary: boolean;
  peritoneum: boolean;
  vasculature: boolean;
}

export type DigestiveCameraPreset =
  | 'overview'
  | 'oral'
  | 'gastroduodenal'
  | 'small_bowel'
  | 'colorectal'
  | 'hepatobiliary'
  | 'pancreas'
  | 'posterior';

interface DigestiveState {
  selectedOrganId: string | null;
  hoveredOrganId: string | null;
  activeSubdivisionId: string | null;
  activeCategory: DigestiveCategory | 'all';
  visibleLayers: DigestiveLayers;
  isolatedView: boolean;
  xrayMode: boolean;
  cameraPreset: DigestiveCameraPreset;
  searchQuery: string;

  // Actions
  selectOrgan: (id: string | null) => void;
  hoverOrgan: (id: string | null) => void;
  selectSubdivision: (id: string | null) => void;
  setActiveCategory: (cat: DigestiveCategory | 'all') => void;
  toggleLayer: (layer: keyof DigestiveLayers) => void;
  setAllLayers: (visible: boolean) => void;
  toggleIsolatedView: () => void;
  toggleXrayMode: () => void;
  setCameraPreset: (preset: DigestiveCameraPreset) => void;
  setSearchQuery: (q: string) => void;
  resetView: () => void;

  // Helpers
  getSelectedOrganData: () => DigestiveOrganData | null;
}

const DEFAULT_LAYERS: DigestiveLayers = {
  giTract: true,
  hepatobiliary: true,
  pancreas: true,
  salivary: true,
  peritoneum: true,
  vasculature: true
};

export const useDigestiveStore = create<DigestiveState>((set, get) => ({
  selectedOrganId: 'stomach', // Default to stomach for immediate anatomical immersion
  hoveredOrganId: null,
  activeSubdivisionId: null,
  activeCategory: 'all',
  visibleLayers: { ...DEFAULT_LAYERS },
  isolatedView: false,
  xrayMode: false,
  cameraPreset: 'overview',
  searchQuery: '',

  selectOrgan: (id) => {
    set({ selectedOrganId: id, activeSubdivisionId: null });

    // Sync with browser URL search params without page reload
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (id) {
        url.searchParams.set('organ', id);
      } else {
        url.searchParams.delete('organ');
      }
      window.history.replaceState({}, '', url.toString());
    }

    // Auto camera preset selection if matching organ
    if (id && DIGESTIVE_SYSTEM_DATA[id]) {
      const cat = DIGESTIVE_SYSTEM_DATA[id].category;
      if (cat === 'oral_pharynx') set({ cameraPreset: 'oral' });
      else if (id === 'stomach' || id === 'duodenum') set({ cameraPreset: 'gastroduodenal' });
      else if (id === 'small_intestine') set({ cameraPreset: 'small_bowel' });
      else if (id === 'large_intestine' || id === 'appendix') set({ cameraPreset: 'colorectal' });
      else if (cat === 'hepatobiliary') set({ cameraPreset: 'hepatobiliary' });
      else if (id === 'pancreas') set({ cameraPreset: 'pancreas' });
    }
  },

  hoverOrgan: (id) => set({ hoveredOrganId: id }),

  selectSubdivision: (id) => set({ activeSubdivisionId: id }),

  setActiveCategory: (activeCategory) => set({ activeCategory }),

  toggleLayer: (layer) =>
    set((state) => ({
      visibleLayers: {
        ...state.visibleLayers,
        [layer]: !state.visibleLayers[layer]
      }
    })),

  setAllLayers: (visible) =>
    set({
      visibleLayers: {
        giTract: visible,
        hepatobiliary: visible,
        pancreas: visible,
        salivary: visible,
        peritoneum: visible,
        vasculature: visible
      }
    }),

  toggleIsolatedView: () => set((state) => ({ isolatedView: !state.isolatedView })),

  toggleXrayMode: () => set((state) => ({ xrayMode: !state.xrayMode })),

  setCameraPreset: (cameraPreset) => set({ cameraPreset }),

  setSearchQuery: (searchQuery) => set({ searchQuery }),

  resetView: () =>
    set({
      selectedOrganId: null,
      hoveredOrganId: null,
      activeSubdivisionId: null,
      activeCategory: 'all',
      visibleLayers: { ...DEFAULT_LAYERS },
      isolatedView: false,
      xrayMode: false,
      cameraPreset: 'overview',
      searchQuery: ''
    }),

  getSelectedOrganData: () => {
    const { selectedOrganId } = get();
    if (!selectedOrganId) return null;
    return DIGESTIVE_SYSTEM_DATA[selectedOrganId] || null;
  }
}));
