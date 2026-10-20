import fs from "fs";

const buf = fs.readFileSync("frontend/public/models/anatomy/organs_complete.glb");
const jsonLen = buf.readUInt32LE(12);
const jsonStr = buf.toString("utf8", 20, 20 + jsonLen);
const gltf = JSON.parse(jsonStr);

console.log("Total nodes:", gltf.nodes.length);
const lowerNodes = [];
for (let i = 0; i < gltf.nodes.length; i++) {
  const node = gltf.nodes[i];
  if (node.translation && node.translation[1] < 0.1) {
    lowerNodes.push({ index: i, name: node.name, y: node.translation[1], translation: node.translation });
  }
}
lowerNodes.sort((a, b) => a.y - b.y);
console.log("Nodes with Y < 0.1m:");
lowerNodes.forEach(n => console.log(`  [${n.index}] "${n.name}" Y=${n.y}`));
