import fs from 'fs';

const buf = fs.readFileSync('frontend/public/models/anatomy/organs_complete.glb');
const jsonLen = buf.readUInt32LE(12);
const gltf = JSON.parse(buf.slice(20, 20 + jsonLen).toString('utf8'));

// Find parent chains of Ascending colon, Stomach, Liver, etc.
function findParent(nodeIdx) {
  for (let i = 0; i < gltf.nodes.length; i++) {
    if (gltf.nodes[i].children && gltf.nodes[i].children.includes(nodeIdx)) {
      return i;
    }
  }
  return null;
}

function printChain(nodeIdx) {
  let curr = nodeIdx;
  const chain = [];
  while (curr !== null) {
    const node = gltf.nodes[curr];
    chain.push({
      idx: curr,
      name: node.name,
      scale: node.scale,
      translation: node.translation,
      rotation: node.rotation,
      matrix: node.matrix
    });
    curr = findParent(curr);
  }
  console.log(`--- Parent chain for Node [${nodeIdx}] "${gltf.nodes[nodeIdx].name}" ---`);
  chain.reverse().forEach(c => {
    console.log(` -> [${c.idx}] "${c.name}" scale=${JSON.stringify(c.scale)} trans=${JSON.stringify(c.translation)}`);
  });
}

printChain(244); // Ascending colon
printChain(289); // Stomach
printChain(403); // Liver
printChain(259); // Oesophagus
printChain(458); // Pancreas
