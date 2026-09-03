import React, { useEffect } from 'react';
import { AtelierTopBar } from './components/atelier/AtelierTopBar';
import { AtelierOrganRail } from './components/atelier/AtelierOrganRail';
import { AtelierLibraryDrawer } from './components/atelier/AtelierLibraryDrawer';
import { AtelierViewer } from './components/atelier/AtelierViewer';
import { AtelierDossier } from './components/atelier/AtelierDossier';
import { AtelierCards } from './components/atelier/AtelierCards';

import { FullBodyViewer } from './components/3d/FullBodyViewer';
import { AnatomyTree } from './components/ui/AnatomyTree';
import { AnatomyInfoPanel } from './components/ui/AnatomyInfoPanel';

import { SearchModal } from './components/ui/SearchModal';
import { QuizModal } from './components/ui/QuizModal';
import { FlashcardModal } from './components/ui/FlashcardModal';
import { LessonsModal } from './components/ui/LessonsModal';
import { NotesDrawer } from './components/ui/NotesDrawer';
import { DashboardModal } from './components/ui/DashboardModal';
import { AuthModal } from './components/ui/AuthModal';

import { useAnatomyStore } from './stores/useAnatomyStore';
import { useAuthStore } from './stores/useAuthStore';
import { AnatomyRegistryValidator } from './utils/AnatomyRegistryValidator';
import { AnatomyOrientationValidator } from './utils/AnatomyOrientationValidator';
import { AnatomyValidationPipeline } from './utils/AnatomyValidationPipeline';

export function App() {
  const fetchInitialData = useAnatomyStore((s) => s.fetchInitialData);
  const setActiveModal = useAnatomyStore((s) => s.setActiveModal);
  const atelierTheme = useAnatomyStore((s) => s.atelierTheme);
  const viewMode = useAnatomyStore((s) => s.viewMode);
  const gender = useAnatomyStore((s) => s.gender);
  const { checkAuth } = useAuthStore();

  const isDark = atelierTheme === 'dark';

  useEffect(() => {
    AnatomyRegistryValidator.validate();
    AnatomyOrientationValidator.validate();
    AnatomyValidationPipeline.runValidation(gender);
    fetchInitialData();
    checkAuth();

    // Initialize and sync route with browser URL
    const pathname = window.location.pathname.toLowerCase();
    if (pathname === '/' || pathname === '') {
      window.history.replaceState({ viewMode: 'full-body' }, '', '/toanthan');
    }

    const handlePopState = () => {
      const currentPath = window.location.pathname.toLowerCase();
      if (currentPath.includes('tieubansau') || currentPath.includes('tieu-ban-sau') || currentPath.includes('specimen')) {
        useAnatomyStore.setState({ viewMode: 'specimen' });
        const match = currentPath.match(/\/(?:tieubansau|tieu-ban-sau|specimens?)\/([a-z0-9_-]+)/);
        if (match && match[1]) {
          useAnatomyStore.setState({ activeSpecimenId: match[1] });
        }
      } else {
        useAnatomyStore.setState({ viewMode: 'full-body' });
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Global keyboard listener for search (Ctrl+K) and Escape
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setActiveModal('search');
      } else if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [fetchInitialData, checkAuth, setActiveModal]);

  return (
    <div
      className={`relative w-full min-h-screen overflow-x-hidden font-sans select-none transition-colors duration-200 ${
        isDark ? 'bg-[#0a0e17] text-slate-100' : 'bg-[#f7f0e7] text-[#28231d]'
      }`}
    >
      {/* 1. Sticky Top Bar Navigation (Brand, ViewMode, Gender, Search, Profile) */}
      <div className="sticky top-0 z-30">
        <AtelierTopBar />
        {viewMode === 'specimen' && <AtelierOrganRail />}
      </div>

      {/* 2. Main Anatomical Stage */}
      {viewMode === 'full-body' ? (
        // MODE A: WHOLE-BODY 3D MEDICAL LAB (Tree + 3D Human + Medical Info Panel)
        <main className="relative w-full h-[calc(100dvh-64px)] min-h-[460px] md:min-h-[560px] flex overflow-hidden">
          {/* Left Structure Hierarchy Tree */}
          <AnatomyTree />

          {/* Center 3D Whole-Body Viewport with 8-Layer Dissection Engine */}
          <FullBodyViewer />

          {/* Right Detailed Medical Dossier & Relationships Panel */}
          <AnatomyInfoPanel />
        </main>
      ) : (
        // MODE B: DEEP SPECIMEN ATELIER (Isolated 59 Organs with Sub-structures & Slicing)
        <main className="relative w-full h-[calc(100dvh-120px)] min-h-[460px] md:min-h-[560px] flex overflow-hidden">
          <AtelierViewer />
          <AtelierDossier />
          <AtelierLibraryDrawer />
        </main>
      )}

      {/* 3. Bottom Learning Resources Section (In specimen mode) */}
      {viewMode === 'specimen' && <AtelierCards />}

      {/* 4. Global Interactive Modals */}
      <SearchModal />
      <QuizModal />
      <FlashcardModal />
      <LessonsModal />
      <NotesDrawer />
      <DashboardModal />
      <AuthModal />
    </div>
  );
}

export default App;
