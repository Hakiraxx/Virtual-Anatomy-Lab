import { runToothMappingValidation } from '../../scripts/validate-tooth-mapping.mjs';

export async function runToothMappingAuditTests() {
  const results = {
    suite: 'Tooth 32 Identity / FDI / 3D Asset / Morphology Audit',
    tests: [],
    passed: 0,
    failed: 0
  };

  const valRes = await runToothMappingValidation();

  if (valRes.allPassed) {
    results.passed++;
    results.tests.push({
      name: 'All 32 human permanent teeth pass 10/10 identity & asset checkpoints',
      status: 'PASS',
      details: `${valRes.passedTeeth}/32 teeth validated (320/320 checkpoints)`
    });
  } else {
    results.failed++;
    results.tests.push({
      name: 'All 32 human permanent teeth pass 10/10 identity & asset checkpoints',
      status: 'FAIL',
      details: `${valRes.passedTeeth}/${valRes.totalTeeth} teeth passed`
    });
  }

  return results;
}
