import { runLayerSeparationTests } from '../tests/anatomy/layerSeparation.test.mjs';

async function run() {
  console.log('Testing Anatomical Layer Separation & Exploded Assembly...');
  const res = await runLayerSeparationTests();
  console.log(`\n📦 SUITE: ${res.suite} (${res.passed}/${res.passed + res.failed} passed)`);
  console.log('------------------------------------------------------------------------');
  for (const t of res.tests) {
    const icon = t.status === 'PASS' ? '✅' : '❌';
    console.log(`  ${icon} [${t.status}] ${t.name}`);
    if (t.details) {
      console.log(`     ↳ ${t.details}`);
    }
  }

  if (res.failed > 0) {
    console.error(`\n❌ ${res.failed} tests failed.`);
    process.exit(1);
  } else {
    console.log(`\n🌟 All ${res.passed} layer separation assertions PASSED.`);
  }
}

run();
