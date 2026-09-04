import fs from 'fs';

function inspectGlb(path) {
  const buf = fs.readFileSync(path);
  const magic = buf.readUInt32LE(0);
  if (magic !== 0x46546c67) {
    console.log(path, 'Not a GLTF binary');
    return;
  }
  const jsonLen = buf.readUInt32LE(12);
  const jsonBuf = buf.subarray(20, 20 + jsonLen);
  const gltf = JSON.parse(jsonBuf.toString('utf8'));
  console.log(`=== ${path} ===`);
  console.log('Meshes count:', gltf.meshes?.length || 0);
  if (gltf.meshes) {
    console.log('Mesh names:', gltf.meshes.map(m => m.name));
  }
  console.log('Nodes count:', gltf.nodes?.length || 0);
  if (gltf.nodes) {
    console.log('Node names (first 40):', gltf.nodes.slice(0, 40).map(n => n.name));
  }
}

inspectGlb('public/models/cranial-nerves.glb');
inspectGlb('public/models/dentomaxillofacial.glb');
inspectGlb('public/models/skull.glb');
inspectGlb('public/models/salivary-glands.glb');
