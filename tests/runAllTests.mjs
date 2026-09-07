import { runRegistryConsistencyTests } from './data/registryConsistency.test.mjs';
import { runRouteAuditTests } from './routes/routeAudit.test.mjs';
import { runAssetAuditTests } from './assets/assetAudit.test.mjs';
import { runAnatomicalAssertionTests } from './anatomy/anatomicalAssertions.test.mjs';
import { runToothAlignmentTests } from './anatomy/toothAlignment.test.mjs';
import { runToothMappingAuditTests } from './anatomy/toothMappingAudit.test.mjs';
import { runPronunciationAuditTests } from './anatomy/pronunciationAudit.test.mjs';
import { runAnnotationPositioningAuditTests } from './anatomy/annotationPositioningAudit.test.mjs';
import { runAnatomyPositionAuditTests } from './anatomyPositionAudit.mjs';
import { runGenderSpecimenAuditTests } from './anatomy/genderSpecimenAudit.test.mjs';
import { runLayerSeparationTests } from './anatomy/layerSeparation.test.mjs';
import { runDentalCoordinateAlignmentTests } from './anatomy/dentalCoordinateAlignment.test.mjs';
import { runDentalViewTransitionTests } from './anatomy/dentalViewTransition.test.mjs';
import { runDentalLayoutAuditTests } from './anatomy/dentalLayoutAudit.test.mjs';

async function main() {
  console.log('========================================================================');
  console.log('🏥 MEDANATOMY 3D — AUTOMATED COMPREHENSIVE QA & ANATOMICAL AUDIT SUITE');
  console.log('========================================================================\n');

  const startTime = Date.now();
  const suites = [
    runRegistryConsistencyTests,
    runRouteAuditTests,
    runAssetAuditTests,
    runAnatomicalAssertionTests,
    runToothAlignmentTests,
    runToothMappingAuditTests,
    runPronunciationAuditTests,
    runAnnotationPositioningAuditTests,
    runAnatomyPositionAuditTests,
    runGenderSpecimenAuditTests,
    runLayerSeparationTests,
    runDentalCoordinateAlignmentTests,
    runDentalViewTransitionTests,
    runDentalLayoutAuditTests
  ];

  let totalPassed = 0;
  let totalFailed = 0;
  const suiteResults = [];

  for (const suiteFn of suites) {
    try {
      const res = await suiteFn();
      suiteResults.push(res);
      totalPassed += res.passed;
      totalFailed += res.failed;

      console.log(`\n📦 SUITE: ${res.suite} (${res.passed}/${res.passed + res.failed} passed)`);
      console.log('------------------------------------------------------------------------');
      for (const t of res.tests) {
        const icon = t.status === 'PASS' ? '✅' : '❌';
        console.log(`  ${icon} [${t.status}] ${t.name}`);
        if (t.details) {
          console.log(`     ↳ ${t.details}`);
        }
      }
    } catch (err) {
      console.error(`Error executing suite:`, err);
      totalFailed++;
    }
  }

  const durationMs = Date.now() - startTime;
  console.log('\n========================================================================');
  console.log(`🏁 AUDIT RESULTS: ${totalPassed} PASSED, ${totalFailed} FAILED (${durationMs}ms)`);
  console.log('========================================================================');

  if (totalFailed > 0) {
    console.error(`\n❌ AUDIT FAILED with ${totalFailed} failing assertions.`);
    process.exit(1);
  } else {
    console.log(`\n🌟 ALL AUDIT SUITES PASSED WITH 100% SUCCESS RATE.`);
    process.exit(0);
  }
}

main();
