import fs from 'fs';
import * as THREE from '../frontend/node_modules/three/build/three.module.js';

// Minimal GLTF parser using gltf json and buffer
const buf = fs.readFileSync('frontend/public/models/anatomy/organs_complete.glb');
const jsonLen = buf.readUInt32LE(12);
const gltf = JSON.parse(buf.slice(20, 20 + jsonLen).toString('utf8'));

// Build simple local matrix
function getNodeMatrix(n) {
  const m = new THREE.Matrix4();
  if (n.matrix) {
    m.fromArray(n.matrix);
  } else {
    const pos = n.translation ? new THREE.Vector3(...n.translation) : new THREE.Vector3();
    const rot = n.rotation ? new THREE.Quaternion(...n.rotation) : new THREE.Quaternion();
    const scl = n.scale ? new THREE.Vector3(...n.scale) : new THREE.Vector3(1, 1, 1);
    m.compose(pos, rot, scl);
  }
  return m;
}

// Compute world matrices
const worldMatrices = new Array(gltf.nodes.length);
function computeWorld(idx, parentMatrix) {
  const node = gltf.nodes[idx];
  const localM = getNodeMatrix(node);
  const worldM = parentMatrix ? parentMatrix.clone().multiply(localM) : localM;
  worldMatrices[idx] = worldM;
  if (node.children) {
    node.children.forEach(c => computeWorld(c, worldM));
  }
}

// Start from roots
const isChild = new Set();
gltf.nodes.forEach(n => {
  if (n.children) n.children.forEach(c => isChild.add(c));
});
gltf.nodes.forEach((n, idx) => {
  if (!isChild.has(idx)) {
    computeWorld(idx, null);
  }
});

function getMeshRawBox(meshIdx) {
  const mesh = gltf.meshes[meshIdx];
  const box = new THREE.Box3();
  mesh.primitives.forEach(p => {
    if (p.attributes && p.attributes.POSITION !== undefined) {
      const acc = gltf.accessors[p.attributes.POSITION];
      if (acc && acc.min && acc.max) {
        box.expandByPoint(new THREE.Vector3(...acc.min));
        box.expandByPoint(new THREE.Vector3(...acc.max));
      }
    }
  });
  return box;
}

console.log('=== REAL WORLD SPACE ANATOMICAL BOUNDS FOR DIGESTIVE ORGANS ===');
const interesting = [
  'Oesophagus', 'Stomach', 'Duodenum', 'Jejunum',
  'Ascending colon', 'Transverse colon', 'Descending colon', 'Sigmoid colon',
  'Vermiform appendix', 'Liver', 'Gallbladder', 'Pancreas', 'Pancreatic duct',
  'Tongue', 'Parotid gland.l', 'Parotid gland.r', 'Submandibular gland.l', 'Submandibular gland.r',
  'Sublingual gland.l', 'Sublingual gland.r', 'Bile duct',
  'Mesocolon', 'Meso-appendix', 'Pharynx.j', 'Oropharynx', 'Laryngopharynx'
];

gltf.nodes.forEach((n, idx) => {
  if (n.mesh !== undefined) {
    const rawBox = getMeshRawBox(n.mesh);
    const worldM = worldMatrices[idx];
    if (worldM) {
      const worldBox = rawBox.clone().applyMatrix4(worldM);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      worldBox.getSize(size);
      worldBox.getCenter(center);
      if (interesting.some(pattern => (n.name || '').includes(pattern))) {
        console.log(`[${idx}] "${n.name}":`);
        console.log(`    Center: [${center.x.toFixed(4)}, ${center.y.toFixed(4)}, ${center.z.toFixed(4)}] m`);
        console.log(`    Size:   [${(size.x*100).toFixed(1)} x ${(size.y*100).toFixed(1)} x ${(size.z*100).toFixed(1)}] cm`);
      }
    }
  }
});
