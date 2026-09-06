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

  test('Pronunciation database contains at least 200 authoritative entries', () => {
    const total = Object.keys(ANATOMY_PRONUNCIATION_DATABASE).length;
    assert(total >= 200, `Expected >= 200 entries, found ${total}`);
  });

  test('Spleen specimen and all 8 deep substructures resolve authoritative IPA and English names', () => {
    const spleenTerms = [
      { id: 'spleen', en: 'Spleen', expectedIpa: '/spliːn/' },
      { id: 'spleen_hilum', en: 'Splenic Hilum', expectedIpa: '/ˈsplen.ɪk ˈhaɪ.ləm/' },
      { id: 'spleen.hilum', en: 'Splenic Hilum', expectedIpa: '/ˈsplen.ɪk ˈhaɪ.ləm/' },
      { id: 'splenic_artery', en: 'Splenic Artery', expectedIpa: '/ˈsplen.ɪk ˈɑːr.tər.i/' },
      { id: 'splenic_vein', en: 'Splenic Vein', expectedIpa: '/ˈsplen.ɪk veɪn/' },
      { id: 'splenorenal_ligament', en: 'Splenorenal Ligament', expectedIpa: '/ˌsplen.oʊˈriː.nəl ˈlɪɡ.ə.mənt/' },
      { id: 'gastrosplenic_ligament', en: 'Gastrosplenic Ligament', expectedIpa: '/ˌɡæs.troʊˈsplen.ɪk ˈlɪɡ.ə.mənt/' },
      { id: 'splenic_capsule', en: 'Splenic Capsule', expectedIpa: '/ˈsplen.ɪk ˈkæp.sjuːl/' },
      { id: 'spleen_red_pulp', en: 'Red Pulp', expectedIpa: '/red pʌlp/' },
      { id: 'spleen_white_pulp', en: 'White Pulp', expectedIpa: '/waɪt pʌlp/' }
    ];
    for (const st of spleenTerms) {
      const p = getAnatomicalPronunciation(st.id, st.en);
      assert(p !== null, `Missing pronunciation for ${st.id}`);
      assert.strictEqual(p.ipa, st.expectedIpa, `IPA mismatch for ${st.id}`);
    }
  });

  test('Heart detailed internal structures & conduction nodes resolve verified IPA', () => {
    const heartSubstructures = [
      { id: 'left_ventricle', en: 'Left Ventricle', expectedIpa: '/left ˈven.trɪ.kəl/' },
      { id: 'right_ventricle', en: 'Right Ventricle', expectedIpa: '/raɪt ˈven.trɪ.kəl/' },
      { id: 'left_atrium', en: 'Left Atrium', expectedIpa: '/left ˈeɪ.tri.əm/' },
      { id: 'right_atrium', en: 'Right Atrium', expectedIpa: '/raɪt ˈeɪ.tri.əm/' },
      { id: 'mitral_valve', en: 'Mitral Valve', expectedIpa: '/ˈmaɪ.trəl vælv/' },
      { id: 'tricuspid_valve', en: 'Tricuspid Valve', expectedIpa: '/traɪˈkʌs.pɪd vælv/' },
      { id: 'aortic_valve', en: 'Aortic Valve', expectedIpa: '/eɪˈɔːr.tɪk vælv/' },
      { id: 'pulmonary_valve', en: 'Pulmonary Valve', expectedIpa: '/ˈpʊl.mə.ner.i vælv/' },
      { id: 'sinoatrial_node', en: 'Sinoatrial Node', expectedIpa: '/ˌsaɪ.noʊˈeɪ.tri.əl noʊd/' },
      { id: 'atrioventricular_node', en: 'Atrioventricular Node', expectedIpa: '/ˌeɪ.tri.oʊ.venˈtrɪk.jə.lər noʊd/' },
      { id: 'interventricular_septum', en: 'Interventricular Septum', expectedIpa: '/ˌɪn.tər.venˈtrɪk.jə.lər ˈsep.təm/' },
      { id: 'myocardium', en: 'Myocardium', expectedIpa: '/ˌmaɪ.oʊˈkɑːr.di.əm/' }
    ];
    for (const h of heartSubstructures) {
      const p = getAnatomicalPronunciation(h.id, h.en);
      assert(p !== null, `Missing pronunciation for ${h.id}`);
      assert.strictEqual(p.ipa, h.expectedIpa, `IPA mismatch for ${h.id}`);
    }
  });

  test('All 12 Cranial Nerves (CN I to CN XII) resolve authoritative academic IPA', () => {
    const cranialNerves = [
      { id: 'cn_1', en: 'Olfactory Nerve', expectedIpa: '/ɑːlˈfæk.tər.i nɜːrv/' },
      { id: 'cn_2', en: 'Optic Nerve', expectedIpa: '/ˈɑːp.tɪk nɜːrv/' },
      { id: 'cn_3', en: 'Oculomotor Nerve', expectedIpa: '/ˌɑːk.jə.loʊˈmoʊ.tər nɜːrv/' },
      { id: 'cn_4', en: 'Trochlear Nerve', expectedIpa: '/ˈtrɑːk.li.ər nɜːrv/' },
      { id: 'cn_5', en: 'Trigeminal Nerve (CN V)', expectedIpa: '/traɪˈdʒem.ɪ.nəl nɜːrv/' },
      { id: 'cn_6', en: 'Abducens Nerve', expectedIpa: '/æbˈduː.sənz nɜːrv/' },
      { id: 'cn_7', en: 'Facial Nerve (CN VII)', expectedIpa: '/ˈfeɪ.ʃəl nɜːrv/' },
      { id: 'cn_8', en: 'Vestibulocochlear Nerve', expectedIpa: '/vɛˌstɪb.jə.loʊˈkɑːk.li.ər nɜːrv/' },
      { id: 'cn_9', en: 'Glossopharyngeal Nerve', expectedIpa: '/ˌɡlɑː.soʊ.fəˈrɪn.dʒi.əl nɜːrv/' },
      { id: 'cn_10', en: 'Vagus Nerve (CN X)', expectedIpa: '/ˈveɪ.ɡəs nɜːrv/' },
      { id: 'cn_11', en: 'Accessory Nerve', expectedIpa: '/əkˈses.ər.i nɜːrv/' },
      { id: 'cn_12', en: 'Hypoglossal Nerve', expectedIpa: '/ˌhaɪ.pəˈɡlɑː.səl nɜːrv/' }
    ];
    for (const cn of cranialNerves) {
      const p = getAnatomicalPronunciation(cn.id, cn.en);
      assert(p !== null, `Missing pronunciation for ${cn.id}`);
      assert.strictEqual(p.ipa, cn.expectedIpa, `IPA mismatch for ${cn.id}`);
    }
  });

  test('TMJ biomechanical and anatomical elements resolve accurate IPA', () => {
    const tmjTerms = [
      { id: 'temporomandibular_joint', en: 'Temporomandibular Joint', expectedIpa: '/ˌtem.pə.roʊ.mænˈdɪb.jə.lər dʒɔɪnt/' },
      { id: 'articular_disc', en: 'Articular Disc', expectedIpa: '/ɑːrˈtɪk.jə.lər dɪsk/' },
      { id: 'mandibular_condyle', en: 'Mandibular Condyle', expectedIpa: '/mænˈdɪb.jə.lər ˈkɑːn.daɪl/' },
      { id: 'mandibular_fossa', en: 'Mandibular Fossa', expectedIpa: '/mænˈdɪb.jə.lər ˈfɑː.sə/' },
      { id: 'articular_eminence', en: 'Articular Eminence', expectedIpa: '/ɑːrˈtɪk.jə.lər ˈem.ə.nəns/' },
      { id: 'sphenomandibular_ligament', en: 'Sphenomandibular Ligament', expectedIpa: '/ˌsfiː.noʊ.mænˈdɪb.jə.lər ˈlɪɡ.ə.mənt/' },
      { id: 'lateral_pterygoid', en: 'Lateral Pterygoid Muscle', expectedIpa: '/ˈlæt.ər.əl ˈter.ɪ.ɡɔɪd ˈmʌs.əl/' }
    ];
    for (const tm of tmjTerms) {
      const p = getAnatomicalPronunciation(tm.id, tm.en);
      assert(p !== null, `Missing pronunciation for ${tm.id}`);
      assert.strictEqual(p.ipa, tm.expectedIpa, `IPA mismatch for ${tm.id}`);
    }
  });

  test('Dental histology and Wheeler dental morphology terms pass phonetic verification', () => {
    const dentalTerms = [
      { id: 'tooth', en: 'Tooth', expectedIpa: '/tuːθ/' },
      { id: 'enamel', en: 'Enamel', expectedIpa: '/ɪˈnæm.əl/' },
      { id: 'dentin', en: 'Dentin', expectedIpa: '/ˈden.tɪn/' },
      { id: 'cementum', en: 'Cementum', expectedIpa: '/sɪˈmen.təm/' },
      { id: 'pulp', en: 'Dental Pulp', expectedIpa: '/pʌlp/' },
      { id: 'periodontal_ligament', en: 'Periodontal Ligament (PDL)', expectedIpa: '/ˌper.i.oʊˈdɑːn.təl ˈlɪɡ.ə.mənt/' },
      { id: 'alveolar_bone', en: 'Alveolar Bone', expectedIpa: '/ælˈviː.ə.lər boʊn/' },
      { id: 'cementoenamel_junction', en: 'Cementoenamel Junction', expectedIpa: '/sɪˌmen.toʊ.ɪˈnæm.əl ˈdʒʌŋk.ʃən/' },
      { id: 'root_canal', en: 'Root Canal', expectedIpa: '/ruːt kəˈnæl/' }
    ];
    for (const t of dentalTerms) {
      const p = getAnatomicalPronunciation(t.id, t.en);
      assert(p !== null, `Missing pronunciation for ${t.id}`);
      assert.strictEqual(p.ipa, t.expectedIpa, `IPA mismatch for ${t.id}`);
    }
  });

  test('Reverse Latin name and synonym resolution accurately identifies English term & IPA', () => {
    const latinQueries = [
      { query: 'Hilum splenicum', expectedEnglish: 'Splenic Hilum' },
      { query: 'Arteria splenica', expectedEnglish: 'Splenic Artery' },
      { query: 'Vena splenica', expectedEnglish: 'Splenic Vein' },
      { query: 'Splen', expectedEnglish: 'Spleen' },
      { query: 'Nervus trigeminus', expectedEnglish: 'Trigeminal Nerve' },
      { query: 'Nervus facialis', expectedEnglish: 'Facial Nerve (CN VII)' },
      { query: 'Myocardium', expectedEnglish: 'Myocardium' }
    ];
    for (const lq of latinQueries) {
      const p = getAnatomicalPronunciation(null, null, lq.query);
      assert(p !== null, `Failed to resolve Latin query: ${lq.query}`);
      assert.strictEqual(p.englishName, lq.expectedEnglish, `Latin match mismatch for ${lq.query}`);
    }
  });

  test('Acronym resolution works for common abbreviations (ian, tmj, pdl, cej, sa_node)', () => {
    const acronyms = [
      { id: 'ian', expectedEnglish: 'Inferior Alveolar Nerve' },
      { id: 'tmj', expectedEnglish: 'Temporomandibular Joint' },
      { id: 'pdl', expectedEnglish: 'Periodontal Ligament (PDL)' },
      { id: 'cej', expectedEnglish: 'Cementoenamel Junction' },
      { id: 'sa_node', expectedEnglish: 'Sinoatrial Node' }
    ];
    for (const ac of acronyms) {
      const p = getAnatomicalPronunciation(ac.id, null);
      assert(p !== null, `Failed to resolve acronym: ${ac.id}`);
      assert.strictEqual(p.englishName, ac.expectedEnglish, `Acronym mismatch for ${ac.id}`);
    }
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

if (process.argv[1] && process.argv[1].endsWith('pronunciationAudit.test.mjs')) {
  runPronunciationAuditTests().then((res) => {
    console.log(`\n📦 SUITE: ${res.suite} (${res.passed}/${res.passed + res.failed} passed)`);
    for (const t of res.tests) {
      const icon = t.status === 'PASS' ? '✅' : '❌';
      console.log(`  ${icon} [${t.status}] ${t.name}`);
      if (t.status === 'FAIL') {
        console.log(`      Error: ${t.details}`);
      }
    }
  });
}
