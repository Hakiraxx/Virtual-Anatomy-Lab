import fs from "fs";

const buf = fs.readFileSync("frontend/public/models/anatomy/organs_complete.glb");
const jsonLen = buf.readUInt32LE(12);
const jsonStr = buf.toString("utf8", 20, 20 + jsonLen);
const gltf = JSON.parse(jsonStr);

const nodeNameToMesh = new Map();
gltf.nodes.forEach((n, idx) => {
  if (n.name && n.mesh !== undefined) {
    nodeNameToMesh.set(n.name, { nodeIdx: idx, meshIdx: n.mesh });
  }
});

// Read digestiveSystemData.ts source
const dataSrc = fs.readFileSync("frontend/src/data/digestiveSystemData.ts", "utf8");
const meshMatches = [...dataSrc.matchAll(/meshNodeNames:\s*\[([\s\S]*?)\]/g)];

let totalMeshes = 0;
let matchedMeshes = 0;

for (const match of meshMatches) {
  const rawList = match[1];
  const names = [...rawList.matchAll(/'([^']+)'/g)].map(m => m[1]);
  for (const name of names) {
    totalMeshes++;
    if (nodeNameToMesh.has(name)) {
      matchedMeshes++;
      const info = nodeNameToMesh.get(name);
      console.log(`  ✓ Found "${name}" -> node #${info.nodeIdx}, mesh #${info.meshIdx}`);
    } else {
      console.log(`  ✗ NOT found: "${name}"`);
    }
  }
}

console.log(`\nSummary: Matched ${matchedMeshes} / ${totalMeshes} mesh nodes in organs_complete.glb.`);
