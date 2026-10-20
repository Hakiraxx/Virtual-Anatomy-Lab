import fs from 'fs';

const buf = fs.readFileSync('frontend/public/models/anatomy/organs_complete.glb');
const jsonLen = buf.readUInt32LE(12);
const gltf = JSON.parse(buf.slice(20, 20 + jsonLen).toString('utf8'));

console.log('Total gltf.nodes:', gltf.nodes.length);
console.log('Total gltf.meshes:', gltf.meshes.length);

const digestiveNodes = [];
gltf.nodes.forEach((n, idx) => {
  const mesh = n.mesh !== undefined ? gltf.meshes[n.mesh] : null;
  const name = n.name || (mesh ? mesh.name : '');
  if (/intest|colon|rect|digest|stomach|liver|pancrea|gall|esophag|oesophag|salivar|pharyn|tongue|duoden|jejun|caec|appendix|bile|mouth|oral/i.test(name)) {
    digestiveNodes.push({
      nodeIndex: idx,
      nodeName: n.name,
      meshIndex: n.mesh,
      meshName: mesh ? mesh.name : null,
      children: n.children || [],
      translation: n.translation || null,
      rotation: n.rotation || null,
      scale: n.scale || null
    });
  }
});

console.log(`Found ${digestiveNodes.length} digestive nodes.`);
digestiveNodes.forEach(d => {
  console.log(`Node [${d.nodeIndex}] "${d.nodeName}" -> Mesh [${d.meshIndex}] "${d.meshName}"`);
});
