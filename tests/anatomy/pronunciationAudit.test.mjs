// ============================================================================
// TEST SUITE: ANATOMY PRONUNCIATION & IPA RESOLUTION AUDIT
// Validates English names, academic IPA transcriptions, and pronunciation resolution
// ============================================================================

import assert from 'node:assert';
import {
  ANATOMY_PRONUNCIATION_DATABASE,
  getAnatomicalPronunciation
} from '../../frontend/src/data/anatomyPronunciationData.ts';

export async function runPronunciationAuditTests() {
  const results = {
    suite: 'Anatomy English Pronunciation & Academic IPA Audit',
    tests: [],
    passed: 0,
    failed: 0
  };

  function test(name, fn) {
    try {
      fn();
      results.passed++;
      results.tests.push({ name, status: 'PASS' });
    } catch (err) {
      results.failed++;
      results.tests.push({ name, status: 'FAIL', details: err.message });
    }
  }

  test('Pronunciation database contains at least 40 authoritative entries', () => {
    const total = Object.keys(ANATOMY_PRONUNCIATION_DATABASE).length;
    assert(total >= 40, `Expected >= 40 entries, found ${total}`);
  });

  test('All core visceral organs resolve accurate academic IPA (Heart, Liver, Lung, Kidney, Brain, Stomach)', () => {
    const organs = [
      { id: 'heart', en: 'Heart', expectedIpa: '/hɑːrt/' },
      { id: 'liver', en: 'Liver', expectedIpa: '/ˈlɪv.ər/' },
      { id: 'lung', en: 'Lung', expectedIpa: '/lʌŋ/' },
      { id: 'kidney', en: 'Kidney', expectedIpa: '/ˈkɪd.ni/' },
      { id: 'brain', en: 'Brain', expectedIpa: '/breɪn/' },
      { id: 'stomach', en: 'Stomach', expectedIpa: '/ˈstʌm.ək/' }
    ];
    for (const org of organs) {
      const p = getAnatomicalPronunciation(org.id, org.en);
      assert(p !== null, `Missing pronunciation for ${org.id}`);
      assert.strictEqual(p.ipa, org.expectedIpa, `IPA mismatch for ${org.id}`);
    }
  });

  test('All major skeletal bones resolve accurate academic IPA (Skeleton, Skull, Mandible, Maxilla, Femur, Humerus)', () => {
    const bones = [
      { id: 'skeleton', en: 'Skeleton', expectedIpa: '/ˈskel.ɪ.tən/' },
      { id: 'skull', en: 'Skull', expectedIpa: '/skʌl/' },
      { id: 'mandible', en: 'Mandible', expectedIpa: '/ˈmæn.dɪ.bəl/' },
      { id: 'maxilla', en: 'Maxilla', expectedIpa: '/mækˈsɪl.ə/' },
      { id: 'femur', en: 'Femur', expectedIpa: '/ˈfiː.mər/' },
      { id: 'humerus', en: 'Humerus', expectedIpa: '/ˈhjuː.mər.əs/' }
    ];
    for (const b of bones) {
      const p = getAnatomicalPronunciation(b.id, b.en);
      assert(p !== null, `Missing pronunciation for ${b.id}`);
      assert.strictEqual(p.ipa, b.expectedIpa, `IPA mismatch for ${b.id}`);
    }
  });

  test('Craniofacial & dental nerves resolve authoritative IPA (CN V, V1, V2, V3, IAN, Lingual, Mental, Facial)', () => {
    const nerves = [
      { id: 'trigeminal_nerve', en: 'Trigeminal Nerve', expectedIpa: '/traɪˈdʒem.ɪ.nəl nɜːrv/' },
      { id: 'cn_v1', en: 'Ophthalmic Nerve (V1)', expectedIpa: '/ɒfˈθæl.mɪk nɜːrv/' },
      { id: 'cn_v2', en: 'Maxillary Nerve (V2)', expectedIpa: '/mækˈsɪl.ər.i nɜːrv/' },
      { id: 'cn_v3', en: 'Mandibular Nerve (V3)', expectedIpa: '/mænˈdɪb.jə.lər nɜːrv/' },
      { id: 'inferior_alveolar_nerve', en: 'Inferior Alveolar Nerve', expectedIpa: '/ɪnˈfɪr.i.ər ælˈviː.ə.lər nɜːrv/' },
      { id: 'lingual_nerve', en: 'Lingual Nerve', expectedIpa: '/ˈlɪŋ.ɡwəl nɜːrv/' },
      { id: 'mental_nerve', en: 'Mental Nerve', expectedIpa: '/ˈmen.təl nɜːrv/' },
      { id: 'facial_nerve', en: 'Facial Nerve (CN VII)', expectedIpa: '/ˈfeɪ.ʃəl nɜːrv/' }
    ];
    for (const n of nerves) {
      const p = getAnatomicalPronunciation(n.id, n.en);
      assert(p !== null, `Missing pronunciation for ${n.id}`);
      assert.strictEqual(p.ipa, n.expectedIpa, `IPA mismatch for ${n.id}`);
    }
  });

  test('TMJ, cranial foramina and mandibular canal pass phonetic verification', () => {
    const structures = [
      { id: 'tmj', en: 'Temporomandibular Joint', expectedIpa: '/ˌtem.pə.roʊ.mænˈdɪb.jə.lər dʒɔɪnt/' },
      { id: 'mandibular_canal', en: 'Mandibular Canal', expectedIpa: '/mænˈdɪb.jə.lər kəˈnæl/' },
      { id: 'mental_foramen', en: 'Mental Foramen', expectedIpa: '/ˈmen.təl fəˈreɪ.mən/' },
      { id: 'infraorbital_foramen', en: 'Infraorbital Foramen', expectedIpa: '/ˌɪn.frəˈɔːr.bɪ.təl fəˈreɪ.mən/' },
      { id: 'foramen_ovale', en: 'Foramen Ovale', expectedIpa: '/fəˈreɪ.mən oʊˈveɪ.li/' },
      { id: 'foramen_rotundum', en: 'Foramen Rotundum', expectedIpa: '/fəˈreɪ.mən roʊˈtʌn.dəm/' }
    ];
    for (const s of structures) {
      const p = getAnatomicalPronunciation(s.id, s.en);
      assert(p !== null, `Missing pronunciation for ${s.id}`);
      assert.strictEqual(p.ipa, s.expectedIpa, `IPA mismatch for ${s.id}`);
    }
  });

  test('Dental histology and tooth morphology classes pass phonetic verification', () => {
    const dentalTerms = [
      { id: 'tooth', en: 'Tooth', expectedIpa: '/tuːθ/' },
      { id: 'enamel', en: 'Enamel', expectedIpa: '/ɪˈnæm.əl/' },
      { id: 'dentin', en: 'Dentin', expectedIpa: '/ˈden.tɪn/' },
      { id: 'pulp', en: 'Dental Pulp', expectedIpa: '/pʌlp/' },
      { id: 'root_canal', en: 'Root Canal', expectedIpa: '/ruːt kəˈnæl/' },
      { id: 'central_incisor', en: 'Central Incisor', expectedIpa: '/ˈsen.trəl ɪnˈsaɪ.zər/' },
      { id: 'first_molar', en: 'First Molar', expectedIpa: '/fɜːrst ˈmoʊ.lər/' },
      { id: 'third_molar', en: 'Third Molar', expectedIpa: '/θɜːrd ˈmoʊ.lər/' }
    ];
    for (const t of dentalTerms) {
      const p = getAnatomicalPronunciation(t.id, t.en);
      assert(p !== null, `Missing pronunciation for ${t.id}`);
      assert.strictEqual(p.ipa, t.expectedIpa, `IPA mismatch for ${t.id}`);
    }
  });

  test('Dynamic FDI tooth phonetic derivation validated across all quadrants (11, 21, 16, 26, 36, 41, 46, 48)', () => {
    const testFdiTeeth = [11, 21, 16, 26, 36, 41, 46, 48];
    for (const fdi of testFdiTeeth) {
      const p = getAnatomicalPronunciation(`tooth.${fdi}`, null);
      assert(p !== null, `Failed to derive pronunciation for tooth.${fdi}`);
      assert(p.ipa.startsWith('/'), `IPA must start with slash: ${p.ipa}`);
      assert(p.ipa.endsWith('/'), `IPA must end with slash: ${p.ipa}`);
    }
  });

  test('Non-existent structures gracefully return null without throwing errors', () => {
    const nonExistent = getAnatomicalPronunciation('unknown_random_id_123', null);
    assert.strictEqual(nonExistent, null, 'Unknown ID must return null safely');
  });

  return results;
}

if (process.argv[1].endsWith('pronunciationAudit.test.mjs')) {
  runPronunciationAuditTests().then((res) => {
    console.log(`\n📦 SUITE: ${res.suite} (${res.passed}/${res.passed + res.failed} passed)`);
    for (const t of res.tests) {
      const icon = t.status === 'PASS' ? '✅' : '❌';
      console.log(`  ${icon} [${t.status}] ${t.name}`);
    }
  });
}
