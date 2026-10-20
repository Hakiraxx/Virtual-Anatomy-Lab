import fs from "fs";

function checkGlb(p) {
  if (!fs.existsSync(p)) {
    console.log("Not found:", p);
    return;
  }
  const stat = fs.statSync(p);
  console.log(`=== ${p} (${(stat.size / 1024 / 1024).toFixed(2)} MB) ===`);
  const buf = fs.readFileSync(p);
  const jsonLen = buf.readUInt32LE(12);
  const jsonStr = buf.toString("utf8", 20, 20 + jsonLen);
  const gltf = JSON.parse(jsonStr);
  console.log("  nodes count:", gltf.nodes ? gltf.nodes.length : 0);
  console.log("  meshes count:", gltf.meshes ? gltf.meshes.length : 0);
  if (gltf.nodes) {
    const nodeNames = gltf.nodes.map(n => n.name).filter(Boolean);
    console.log("  sample nodes (first 25):", nodeNames.slice(0, 25));
    const rectumMatches = nodeNames.filter(n => /rectum|anal|anus/i.test(n));
    console.log("  rectum/anal matches:", rectumMatches);
    const digestiveMatches = nodeNames.filter(n => /stomach|gastric|duoden|jejun|ileum|colon|caecum|cecum|appendix|liver|hepar|gall|pancrea|oesoph|esoph/i.test(n));
    console.log("  digestive organ matches count:", digestiveMatches.length);
    console.log("  digestive sample matches:", digestiveMatches.slice(0, 20));
  }
}

checkGlb("frontend/public/models/anatomy/male/digestive.glb");
checkGlb("frontend/public/models/anatomy/female/digestive.glb");
checkGlb("frontend/public/models/rectum.glb");
