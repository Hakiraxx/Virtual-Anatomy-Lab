import React from 'react';
import { useAnatomyStore } from '../../stores/useAnatomyStore';
import {
  ANATOMICAL_STRUCTURES,
  ANATOMICAL_SYSTEMS,
  AnatomicalStructure
} from '../../data/anatomyHierarchy';
import { AnatomyInfoCard } from './AnatomyInfoCard';

export const AnatomyInfoPanel: React.FC = () => {
  const selectedStructureId = useAnatomyStore((s) => s.selectedStructureId);
  const selectStructure = useAnatomyStore((s) => s.selectStructure);
  const setActiveSpecimen = useAnatomyStore((s) => s.setActiveSpecimen);
  const setViewMode = useAnatomyStore((s) => s.setViewMode);
  const triggerCameraFocus = useAnatomyStore((s) => s.triggerCameraFocus);
  const isInfoOpen = useAnatomyStore((s) => s.isInfoOpen);
  const setIsInfoOpen = useAnatomyStore((s) => s.setIsInfoOpen);
  const isInfoExpanded = useAnatomyStore((s) => s.isInfoExpanded);
  const setIsInfoExpanded = useAnatomyStore((s) => s.setIsInfoExpanded);

  if (!isInfoOpen) return null;

  // Selected structure or whole-body overview
  const structure: AnatomicalStructure | null =
    selectedStructureId && ANATOMICAL_STRUCTURES[selectedStructureId]
      ? ANATOMICAL_STRUCTURES[selectedStructureId]
      : null;

  const system = structure
    ? ANATOMICAL_SYSTEMS.find((sys) => sys.id === structure.systemId)
    : null;

  // Deep inspect 3D specimen redirection
  const handleDeepInspect = () => {
    if (!structure) {
      setActiveSpecimen('skeleton');
      setViewMode('specimen');
      return;
    }

    let specimenId = 'heart';
    if (structure.id.includes('brain') || structure.id.includes('lobe')) specimenId = 'brain';
    else if (structure.id.includes('skull')) specimenId = 'skull';
    else if (structure.id.includes('mandible') || structure.id.includes('maxilla') || structure.id.includes('tooth')) specimenId = 'skull';
    else if (structure.id.includes('spine') || structure.id.includes('vertebra')) specimenId = 'spine';
    else if (structure.id.includes('lung')) specimenId = 'lungs';
    else if (structure.id.includes('liver')) specimenId = 'liver';
    else if (structure.id.includes('kidney')) specimenId = 'kidneys';
    else if (structure.id.includes('stomach')) specimenId = 'stomach';
    else if (structure.id.includes('thyroid')) specimenId = 'thyroid';
    else if (structure.id.includes('testis')) specimenId = 'testis';
    else if (structure.id.includes('uterus')) specimenId = 'uterus';
    else if (structure.id.includes('muscle') || structure.id.includes('biceps')) specimenId = 'muscle';
    else if (structure.id.includes('vagus') || structure.id.includes('cranial')) specimenId = 'cranial-nerves';
    else if (structure.id.includes('femur') || structure.id.includes('tibia') || structure.id.includes('bone')) specimenId = 'skeleton';

    setActiveSpecimen(specimenId);
    setViewMode('specimen');
  };

  const handleRelationClick = (targetId: string) => {
    const target = ANATOMICAL_STRUCTURES[targetId];
    if (target) {
      selectStructure(target.id);
      triggerCameraFocus({
        targetPosition: [target.position[0], target.position[1] + 0.05, target.position[2] + 0.6],
        targetLookAt: [target.position[0], target.position[1], target.position[2]],
        duration: 750,
        timestamp: Date.now()
      });
    }
  };

  // Case 1: Whole Body Overview (when no specific organ is selected)
  if (!structure) {
    return (
      <>
        {/* Dark backdrop ONLY appears when user explicitly expands on mobile/tablet */}
        {isInfoExpanded && (
          <div
            onClick={() => setIsInfoExpanded(false)}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-40 transition-opacity animate-fade-in"
          />
        )}
        <AnatomyInfoCard
          anatomyId="human_skeleton"
          nameVi="Khung xương toàn thân (Bộ xương người)"
          nameEn="Human Skeleton"
          nameLatin="Skeleton humanum"
          ipa="/ˈskel.ɪ.tən/"
          category="bone"
          reviewStatus="verified"
          position={[0, 0.9, 0]}
          summary="Bộ khung nâng đỡ cơ thể gồm 206 xương ở người trưởng thành, chia thành xương trục và xương treo."
          details={{
            overviewVi:
              'Bộ khung nâng đỡ cơ thể gồm 206 xương ở người trưởng thành, bảo vệ tạng phủ, cung cấp điểm bám cho hệ cơ vân và là kho dự trữ 99% calci và phosphat toàn thân.',
            overviewEn:
              'The adult human skeleton comprises 206 bones providing structural framework, protecting vital organs, and storing essential minerals.',
            locationVi: 'Bộ khung toàn thân từ vòm sọ đến các đốt ngón chân.',
            locationEn: 'Throughout the human anatomical axis from cranium to phalanges.',
            structureVi:
              'Chia thành 2 phần chính: Xương trục (80 xương: sọ, cột sống, xương sườn, xương ức) và Xương treo (126 xương: đai vai, chi trên, đai hông, chi dưới).',
            structureEn:
              'Divided into Axial skeleton (80 bones) and Appendicular skeleton (126 bones).',
            functionVi:
              'Nâng đỡ cơ thể, bảo vệ các tạng trọng yếu (não, tim, phổi), tạo hệ đòn bẩy vận động, tạo máu tại tủy xương và dự trữ khoáng chất.',
            functionEn:
              'Support, protection of vital viscera, biomechanical levers for locomotion, hematopoiesis, and mineral storage.',
            clinicalVi:
              'Loãng xương (Osteoporosis), gãy xương bệnh lý, đa u tủy xương, còi xương/nhuyễn xương.',
            clinicalEn: 'Osteoporosis, pathological fractures, multiple myeloma, rickets/osteomalacia.',
            icd10: ['M81', 'M80'],
            references: "Terminologia Anatomica (TA2), Gray's Anatomy 42nd ed, Netter Atlas of Human Anatomy.",
            stats: [
              { label: 'Xương', value: '206', sub: 'Xương chính' },
              { label: 'Cơ vân', value: '~640', sub: 'Cơ vận động' },
              { label: 'Hệ cơ quan', value: '12', sub: 'Hệ giải phẫu' },
              { label: 'Mô hình 3D', value: '64', sub: 'PBR Assets' }
            ]
          }}
          onDeepInspect={handleDeepInspect}
          onClose={() => setIsInfoOpen(false)}
        />
      </>
    );
  }

  // Case 2: Specific Anatomical Structure Selected
  return (
    <>
      {/* Dark backdrop ONLY appears when user explicitly expands on mobile/tablet */}
      {isInfoExpanded && (
        <div
          onClick={() => setIsInfoExpanded(false)}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-40 transition-opacity animate-fade-in"
        />
      )}

      <AnatomyInfoCard
        anatomyId={structure.id}
        nameVi={structure.nameVi}
        nameEn={structure.nameEn}
        nameLatin={structure.nameLatin}
        category={structure.category}
        reviewStatus={structure.reviewStatus}
        position={structure.position}
        summary={structure.descriptionVi}
        details={{
          overviewVi: structure.descriptionVi,
          overviewEn: structure.descriptionEn,
          locationVi: structure.locationVi,
          locationEn: structure.locationEn,
          functionVi: structure.functionVi,
          functionEn: structure.functionEn,
          bloodSupplyVi: structure.bloodSupplyVi,
          bloodSupplyEn: structure.bloodSupplyEn,
          innervationVi: structure.innervationVi,
          innervationEn: structure.innervationEn,
          clinicalVi: structure.clinicalNotesVi,
          clinicalEn: structure.clinicalNotesEn,
          icd10: structure.icd10,
          references: structure.referenceSource
        }}
        onDeepInspect={handleDeepInspect}
        onClose={() => {
          setIsInfoOpen(false);
          selectStructure(null);
        }}
        onRelationClick={handleRelationClick}
      />
    </>
  );
};
