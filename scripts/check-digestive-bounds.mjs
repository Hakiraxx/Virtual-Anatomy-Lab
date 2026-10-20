import fs from 'fs';

const buf = fs.readFileSync('frontend/public/models/anatomy/organs_complete.glb');
const jsonLen = buf.readUInt32LE(12);
const gltf = JSON.parse(buf.slice(20, 20 + jsonLen).toString('utf8'));

// Check accessors to get min/max for each mesh primitive
function getMeshBounds(meshIndex) {
  const mesh = gltf.meshes[meshIndex];
  if (!mesh || !mesh.primitives) return null;
  let min = [Infinity, Infinity, Infinity];
  let max = [-Infinity, -Infinity, -Infinity];
  for (const prim of mesh.primitives) {
    if (prim.attributes && prim.attributes.POSITION !== undefined) {
      const acc = gltf.accessors[prim.attributes.POSITION];
      if (acc && acc.min && acc.max) {
        for (let i = 0; i < 3; i++) {
          min[i] = Math.min(min[i], acc.min[i]);
          max[i] = Math.max(max[i], acc.max[i]);
        }
      }
    }
  }
  return { min, max, size: [max[0]-min[0], max[1]-min[1], max[2]-min[2]] };
}

console.log('--- ALL DIGESTIVE ORGANS MESH BOUNDS IN organs_complete.glb ---');
gltf.nodes.forEach((n, idx) => {
  if (n.mesh !== undefined) {
    const mesh = gltf.meshes[n.mesh];
    const name = n.name || mesh.name;
    if (/colon|stomach|liver|pancrea|gall|esophag|oesophag|duoden|jejun|appendix|tongue|salivar|pharyn|mouth|digest/i.test(name)) {
      const bounds = getMeshBounds(n.mesh);
      console.log(`Node [${idx}] "${name}": size=[${bounds.size.map(s => s.toFixed(3)).join(', ')}] center=[${bounds.min.map((m,i) => (m+bounds.size[i]/2).toFixed(3)).join(', ')}]`);
    }
  }
});
