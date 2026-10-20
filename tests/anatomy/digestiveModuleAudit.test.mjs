import assert from "node:assert/strict";
import fs from "node:fs";

export function runDigestiveModuleAuditTests() {
  const tests = [];
  let passed = 0;
  let failed = 0;

  function record(name, fn) {
    try {
      fn();
      passed++;
      tests.push({ name, status: 'PASS' });
    } catch (err) {
      failed++;
      tests.push({ name, status: 'FAIL', details: err.message });
    }
  }

  // 1. Asset existence
  record('Z-Anatomy organs_complete.glb and vessels_complete.glb existence', () => {
    assert.ok(fs.existsSync("frontend/public/models/anatomy/organs_complete.glb"));
    assert.ok(fs.existsSync("frontend/public/models/anatomy/vessels_complete.glb"));
  });

  const organsBuf = fs.readFileSync("frontend/public/models/anatomy/organs_complete.glb");
  const organsJsonLen = organsBuf.readUInt32LE(12);
  const organsGltf = JSON.parse(organsBuf.toString("utf8", 20, 20 + organsJsonLen));
  const organNodesMap = new Map();
  organsGltf.nodes.forEach((n, idx) => {
    if (n.name) organNodesMap.set(n.name, { idx, mesh: n.mesh });
  });

  const vesselsBuf = fs.readFileSync("frontend/public/models/anatomy/vessels_complete.glb");
  const vesselsJsonLen = vesselsBuf.readUInt32LE(12);
  const vesselsGltf = JSON.parse(vesselsBuf.toString("utf8", 20, 20 + vesselsJsonLen));
  const vesselNodesMap = new Map();
  vesselsGltf.nodes.forEach((n, idx) => {
    if (n.name) vesselNodesMap.set(n.name, { idx, mesh: n.mesh });
  });

  // 2. Data catalog registration
  const dataSrc = fs.readFileSync("frontend/src/data/digestiveSystemData.ts", "utf8");
  const requiredOrgans = [
    "tongue",
    "salivary_glands",
    "pharynx",
    "esophagus",
    "stomach",
    "duodenum",
    "small_intestine",
    "large_intestine",
    "appendix",
    "liver",
    "gallbladder",
    "pancreas",
    "peritoneum"
  ];

  for (const organKey of requiredOrgans) {
    record(`Digestive database contains core organ '${organKey}'`, () => {
      assert.ok(dataSrc.includes(`id: '${organKey}'`));
    });
  }

  // 3. Couinaud liver segments
  const couinaudSegments = [
    "Posterior segment of liver (I)",
    "Left posterior lateral segment of liver (II)",
    "Left anterior lateral segment of liver (III)",
    "Left medial segment of liver (IV)",
    "Anterior medial segment of liver (V)",
    "Anterior lateral segment of liver (VI)",
    "Posterior lateral segment of liver (VII)",
    "Posterior medial segment of liver (VIII)"
  ];

  record('All 8 Couinaud liver segments mapped to real 3D meshes', () => {
    for (const seg of couinaudSegments) {
      assert.ok(organNodesMap.has(seg), `Missing Couinaud segment ${seg}`);
      const node = organNodesMap.get(seg);
      assert.ok(node.mesh !== undefined, `Segment ${seg} has no mesh`);
    }
  });

  // 4. GI Tract segmented meshes
  const essentialNodes = [
    "Tongue",
    "Oesophagus",
    "Stomach",
    "Duodenum",
    "Jejunum",
    "Ascending colon",
    "Transverse colon",
    "Descending colon",
    "Sigmoid colon",
    "Vermiform appendix",
    "Gallbladder",
    "Bile duct",
    "Pancreas",
    "Pancreatic duct",
    "Greater omentum",
    "Lesser omentum"
  ];

  record('All essential GI tract organs have authentic segmented meshes', () => {
    for (const nodeName of essentialNodes) {
      assert.ok(organNodesMap.has(nodeName), `Missing node ${nodeName}`);
      assert.ok(organNodesMap.get(nodeName).mesh !== undefined, `Node ${nodeName} has no mesh`);
    }
  });

  // 5. Splanchnic vasculature
  const splanchnicVessels = [
    "Coeliac trunk",
    "Proper hepatic artery",
    "Left gastric artery",
    "Splenic artery",
    "Superior mesenteric artery",
    "Inferior mesenteric artery",
    "Hepatic portal vein",
    "Inferior mesenteric vein"
  ];

  record('Splanchnic arterial & venous supply mapped from vessels_complete.glb', () => {
    for (const v of splanchnicVessels) {
      assert.ok(vesselNodesMap.has(v), `Missing splanchnic vessel ${v}`);
      assert.ok(vesselNodesMap.get(v).mesh !== undefined, `Vessel ${v} has no mesh`);
    }
  });

  // 6. Provenance documentation
  record('Digestive ASSET_SOURCES.md verifies Z-Anatomy CC BY-SA 4.0 license', () => {
    const docPath = "frontend/public/models/digestive/ASSET_SOURCES.md";
    assert.ok(fs.existsSync(docPath));
    const txt = fs.readFileSync(docPath, "utf8");
    assert.ok(txt.includes("Z-Anatomy"));
    assert.ok(txt.includes("CC BY-SA 4.0"));
  });

  return {
    suite: '3D Digestive System & Clinical Audit',
    passed,
    failed,
    tests
  };
}

if (process.argv[1]?.endsWith("digestiveModuleAudit.test.mjs")) {
  const res = runDigestiveModuleAuditTests();
  console.log(`Passed: ${res.passed}, Failed: ${res.failed}`);
}
