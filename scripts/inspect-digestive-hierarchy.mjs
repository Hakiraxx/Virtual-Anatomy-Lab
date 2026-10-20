import fs from "fs";

const buf = fs.readFileSync("frontend/public/models/anatomy/organs_complete.glb");
const jsonLen = buf.readUInt32LE(12);
const jsonStr = buf.toString("utf8", 20, 20 + jsonLen);
const gltf = JSON.parse(jsonStr);

function printTree(nodeIdx, depth = 0) {
  const node = gltf.nodes[nodeIdx];
  const prefix = "  ".repeat(depth);
  const hasMesh = node.mesh !== undefined ? ` [MESH ${node.mesh}]` : "";
  console.log(`${prefix}- [${nodeIdx}] "${node.name}"${hasMesh}`);
  if (node.children) {
    for (const childIdx of node.children) {
      printTree(childIdx, depth + 1);
    }
  }
}

// Find digestive related roots
for (let i = 0; i < gltf.nodes.length; i++) {
  const n = gltf.nodes[i];
  if (n.name && (n.name.includes("Digestive") || n.name.includes("Alimentary") || n.name === "Abdominal part of digestive system.g" || n.name === "Alimentary system.g")) {
    console.log("Found root:", i, n.name);
    printTree(i, 0);
  }
}
