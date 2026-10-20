import fs from "fs";

const buf = fs.readFileSync("frontend/public/models/anatomy/vessels_complete.glb");
const jsonLen = buf.readUInt32LE(12);
const jsonStr = buf.toString("utf8", 20, 20 + jsonLen);
const gltf = JSON.parse(jsonStr);

console.log("Total nodes in vessels_complete.glb:", gltf.nodes.length);
const splanchnicNodes = [];
for (let i = 0; i < gltf.nodes.length; i++) {
  const n = gltf.nodes[i];
  if (!n.name) continue;
  if (/celiac|coeliac|mesenteric|gastric|splenic|hepatic|portal|pancrea|colic|rectal|ileal|jejunal/i.test(n.name)) {
    splanchnicNodes.push({ index: i, name: n.name, mesh: n.mesh });
  }
}
console.log("Splanchnic vessel nodes found:", splanchnicNodes.length);
console.log(splanchnicNodes.slice(0, 30));
