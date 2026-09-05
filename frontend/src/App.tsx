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
import { DentalNeuroLab } from './components/dental-neuroanatomy/DentalNeuroLab';
import { useDentalNeuroStore } from './stores/useDentalNeuroStore';

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
    const searchParams = new URLSearchParams(window.location.search);
    const structureParam = searchParams.get('structure');
    const labParam = searchParams.get('lab');
    const specimenParam = searchParams.get('specimen') || labParam;

    const isDentalStructure = structureParam && (
      structureParam.startsWith('tooth') ||
      structureParam.includes('nerve') ||
      structureParam.includes('ian') ||
      structureParam.includes('foramen') ||
      structureParam.includes('canal') ||
      structureParam.includes('cn_') ||
      structureParam.includes('cn-') ||
      structureParam.includes('trigeminal') ||
      structureParam.includes('tmj') ||
      structureParam.includes('mandib')
    );

    // Explicit client routes: /toanthan, /lab/craniofacial, /lab/dental-neuroanatomy, /lab/rhm
    if (pathname === '/' || pathname === '' || pathname === '/toanthan') {
      window.history.replaceState({ viewMode: 'full-body' }, '', '/toanthan');
    } else if (
      pathname.includes('/lab/dental-neuroanatomy') ||
      pathname.includes('/lab/craniofacial') ||
      pathname.includes('/lab/rhm') ||
      pathname.includes('dental-neuro') ||
      pathname.includes('craniofacial') ||
      pathname.includes('rhm') ||
      Boolean(specimenParam) ||
      Boolean(isDentalStructure)
    ) {
      useAnatomyStore.setState({ viewMode: 'dental-neuro' });
      if (specimenParam === 'general' || specimenParam === 'cranial_nerves' || specimenParam === 'tooth_specimen' || specimenParam === 'tmj_specimen' || specimenParam === 'wisdom_surgery') {
        useDentalNeuroStore.getState().setActiveSpecimenMode(specimenParam as any);
      }

      const modeParam = searchParams.get('mode');
      if (modeParam === 'compare') {
        useDentalNeuroStore.getState().toggleCompare();
      } else if (modeParam === 'trace') {
        useDentalNeuroStore.getState().toggleTrace();
      }

      if (structureParam) {
        const clean = structureParam.toLowerCase().trim();
        if (clean === 'nerve.inferior-alveolar' || clean === 'ian' || clean === 'nerve.inferior_alveolar') {
          useDentalNeuroStore.getState().selectAnatomy('nerve_ian');
        } else if (clean === 'foramen.mental' || clean === 'mental_foramen') {
          useDentalNeuroStore.getState().selectAnatomy('mental_foramen');
        } else if (clean === 'canal.mandibular' || clean === 'mandibular_canal') {
          useDentalNeuroStore.getState().selectAnatomy('mandibular_canal');
        } else if (clean.startsWith('tooth.') || clean.startsWith('tooth_')) {
          const num = clean.replace(/tooth[._]/, '');
          useDentalNeuroStore.getState().selectAnatomy(`tooth_${num}`);
        } else {
          useDentalNeuroStore.getState().selectAnatomy(clean.replace(/\./g, '_'));
        }
      } else if (pathname.includes('cn-v') || pathname.includes('trigeminal')) {
        useDentalNeuroStore.getState().selectAnatomy('cn_5');
      } else if (pathname.includes('v3') || pathname.includes('mandibular-nerve')) {
        useDentalNeuroStore.getState().selectAnatomy('cn_5_v3');
      } else if (pathname.includes('inferior-alveolar') || pathname.includes('ian')) {
        useDentalNeuroStore.getState().selectAnatomy('nerve_ian');
      } else if (pathname.includes('mandibular-canal')) {
        useDentalNeuroStore.getState().toggleMandibularCanalMode();
      } else if (pathname.includes('cn-vii') || pathname.includes('facial')) {
        useDentalNeuroStore.getState().selectAnatomy('cn_7');
      }
    } else if (pathname.includes('tieubansau') || pathname.includes('tieu-ban-sau') || pathname.includes('specimen')) {
      useAnatomyStore.setState({ viewMode: 'specimen' });
      const match = pathname.match(/\/(?:tieubansau|tieu-ban-sau|specimens?)\/([a-z0-9_-]+)/);
      if (match && match[1]) {
        useAnatomyStore.setState({ activeSpecimenId: match[1] });
      }
    } else {
      // Default to Whole-Body Lab
      useAnatomyStore.setState({ viewMode: 'full-body' });
      if (structureParam) {
        const clean = structureParam.toLowerCase().trim().replace(/\./g, '_');
        useAnatomyStore.getState().selectStructure(clean);
      }
    }

    const handlePopState = () => {
      const currentPath = window.location.pathname.toLowerCase();
      if (currentPath.includes('dental-neuro') || currentPath.includes('craniofacial') || currentPath.includes('rhm')) {
        useAnatomyStore.setState({ viewMode: 'dental-neuro' });
      } else if (currentPath.includes('tieubansau') || currentPath.includes('tieu-ban-sau') || currentPath.includes('specimen')) {
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
      ) : viewMode === 'dental-neuro' ? (
        // MODE C: CRANIOFACIAL & DENTAL NEUROANATOMY LAB
        <DentalNeuroLab />
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
