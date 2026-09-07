import { runDentalCoordinateAlignmentTests } from '../tests/anatomy/dentalCoordinateAlignment.test.mjs';

async function main() {
  console.log('========================================================================');
  console.log('🦷 MEDANATOMY 3D — DENTAL COORDINATE ALIGNMENT AUDIT RUNNER');
  console.log('========================================================================\n');

  const startTime = Date.now();
  const res = await runDentalCoordinateAlignmentTests();

  console.log(`📦 SUITE: ${res.suite} (${res.passed}/${res.passed + res.failed} passed)`);
  console.log('------------------------------------------------------------------------');
  for (const t of res.tests) {
    const icon = t.status === 'PASS' ? '✅' : '❌';
    console.log(`  ${icon} [${t.status}] ${t.name}`);
    if (t.details) {
      console.log(`     ↳ ${t.details}`);
    }
  }

  const durationMs = Date.now() - startTime;
  console.log('\n========================================================================');
  console.log(`🏁 RESULTS: ${res.passed} PASSED, ${res.failed} FAILED (${durationMs}ms)`);
  console.log('========================================================================');

  if (res.failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
