import { create } from 'zustand';
import {
  VascularStructureData,
  VascularRegion,
  VesselType,
  VASCULAR_STRUCTURES,
  getVascularStructureById
} from '../data/vascularSystemData';

export type VascularTab = 'overview' | 'branches' | 'territory' | 'histology' | 'clinical';

interface VascularState {
  selectedVesselId: string | null;
  hoveredVesselId: string | null;
  activeRegion: VascularRegion | 'all';
  typeFilter: 'all' | VesselType;
  isolatedView: boolean;
  xrayMode: boolean;
  showLabels: boolean;
  activeTab: VascularTab;
  searchQuery: string;
  cameraTrigger: number; // incremented to command camera move

  // Layout splitters
  sidebarWidth: number;
  panelWidth: number;
  isMobileDrawerOpen: boolean;

  // Actions
  selectVessel: (id: string | null) => void;
  hoverVessel: (id: string | null) => void;
  setActiveRegion: (region: VascularRegion | 'all') => void;
  setTypeFilter: (filter: 'all' | VesselType) => void;
  toggleIsolatedView: () => void;
  toggleXrayMode: () => void;
  toggleLabels: () => void;
  setActiveTab: (tab: VascularTab) => void;
  setSearchQuery: (query: string) => void;
  setSidebarWidth: (w: number) => void;
  setPanelWidth: (w: number) => void;
  setMobileDrawerOpen: (open: boolean) => void;
  resetView: () => void;
  triggerCameraFocus: () => void;

  // Helpers
  getSelectedVesselData: () => VascularStructureData | null;
}

export const useVascularStore = create<VascularState>((set, get) => ({
  selectedVesselId: 'ascending_aorta', // Default to Ascending Aorta for immediate cardiovascular immersion
  hoveredVesselId: null,
  activeRegion: 'all',
  typeFilter: 'all',
  isolatedView: false,
  xrayMode: false,
  showLabels: true,
  activeTab: 'overview',
  searchQuery: '',
  cameraTrigger: 0,
  sidebarWidth: 290,
  panelWidth: 360,
  isMobileDrawerOpen: false,

  selectVessel: (id) => {
    set({ selectedVesselId: id });

    // Sync with browser URL search params without reload
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (id) {
        url.searchParams.set('vessel', id);
      } else {
        url.searchParams.delete('vessel');
      }
      window.history.replaceState({}, '', url.toString());
    }

    if (id) {
      const data = getVascularStructureById(id);
      if (data) {
        // Trigger camera fly-to
        set((s) => ({ cameraTrigger: s.cameraTrigger + 1 }));
      }
    }
  },

  hoverVessel: (id) => set({ hoveredVesselId: id }),

  setActiveRegion: (region) => {
    set({ activeRegion: region });
    // If current selected vessel is not in this region, select the first in region
    if (region !== 'all') {
      const current = get().getSelectedVesselData();
      if (!current || current.region !== region) {
        const firstInRegion = VASCULAR_STRUCTURES.find((v) => v.region === region);
        if (firstInRegion) {
          get().selectVessel(firstInRegion.id);
        }
      }
    }
  },

  setTypeFilter: (filter) => set({ typeFilter: filter }),

  toggleIsolatedView: () => set((s) => ({ isolatedView: !s.isolatedView })),

  toggleXrayMode: () => set((s) => ({ xrayMode: !s.xrayMode })),

  toggleLabels: () => set((s) => ({ showLabels: !s.showLabels })),

  setActiveTab: (tab) => set({ activeTab: tab }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setSidebarWidth: (w) => set({ sidebarWidth: Math.max(240, Math.min(420, w)) }),

  setPanelWidth: (w) => set({ panelWidth: Math.max(300, Math.min(520, w)) }),

  setMobileDrawerOpen: (open) => set({ isMobileDrawerOpen: open }),

  resetView: () => {
    set({
      selectedVesselId: 'ascending_aorta',
      hoveredVesselId: null,
      activeRegion: 'all',
      typeFilter: 'all',
      isolatedView: false,
      xrayMode: false,
      showLabels: true,
      searchQuery: '',
      cameraTrigger: get().cameraTrigger + 1
    });
  },

  triggerCameraFocus: () => set((s) => ({ cameraTrigger: s.cameraTrigger + 1 })),

  getSelectedVesselData: () => {
    const id = get().selectedVesselId;
    if (!id) return null;
    return getVascularStructureById(id) || null;
  }
}));
