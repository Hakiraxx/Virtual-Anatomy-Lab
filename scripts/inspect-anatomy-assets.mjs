import fs from 'fs';
import path from 'path';

function inspectGlb(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }

  const stat = fs.statSync(filePath);
  const buffer = fs.readFileSync(filePath);

  // Parse GLB Header
  const magic = buffer.readUInt32LE(0);
  const version = buffer.readUInt32LE(4);
  const length = buffer.readUInt32LE(8);
  const jsonChunkLen = buffer.readUInt32LE(12);
  const jsonChunkType = buffer.readUInt32LE(16);

  if (magic !== 0x46546c67) {
    console.error(`Not a valid GLB binary: ${filePath}`);
    return;
  }

  const jsonStr = buffer.subarray(20, 20 + jsonChunkLen).toString('utf8');
  const gltf = JSON.parse(jsonStr);

  console.log('\n================================================================');
  console.log(`ASSET: ${path.basename(filePath)}`);
  console.log(`PATH:  ${filePath}`);
  console.log(`SIZE:  ${(stat.size / 1024 / 1024).toFixed(2)} MB (${stat.size} bytes)`);
  console.log(`GLTF VERSION: ${version}, GENERATOR: ${gltf.asset?.generator || 'Unknown'}`);
  console.log('================================================================');

  // Summary counts
  console.log('\n--- SUMMARY COUNTS ---');
  console.log(`Nodes:      ${gltf.nodes?.length || 0}`);
  console.log(`Meshes:     ${gltf.meshes?.length || 0}`);
  console.log(`Materials:  ${gltf.materials?.length || 0}`);
  console.log(`Accessors:  ${gltf.accessors?.length || 0}`);
  console.log(`Extensions: ${gltf.extensionsUsed ? gltf.extensionsUsed.join(', ') : 'None'}`);

  // Inspect Nodes & Hierarchy
  console.log('\n--- NODES & TRANSFORMS (Sample / Top Level) ---');
  const topNodes = gltf.scenes?.[0]?.nodes || [];
  console.log(`Scene 0 Root Nodes (${topNodes.length}):`, topNodes.map(idx => gltf.nodes[idx]?.name || `Node_${idx}`));

  // Inspect Craniofacial & Relevant Medical Nodes
  const relevantKeywords = [
    'mandib', 'maxill', 'tooth', 'teeth', 'molar', 'incisor', 'canine', 'premolar',
    'masseter', 'temporalis', 'pterygoid', 'buccinator', 'mentalis',
    'trigemin', 'alveol', 'lingua', 'mental', 'facial', 'v1', 'v2', 'v3',
    'disc', 'capsule', 'sphenomandibular', 'stylomandibular', 'temporomandibular',
    'carotid', 'jugular', 'artery', 'vein', 'canal', 'foramen'
  ];

  const matchedNodes = (gltf.nodes || []).filter(n => {
    if (!n.name) return false;
    const lower = n.name.toLowerCase();
    return relevantKeywords.some(k => lower.includes(k));
  });

  console.log(`\n--- RELEVANT CRANIOFACIAL STRUCTURES FOUND (${matchedNodes.length}) ---`);
  matchedNodes.slice(0, 50).forEach((n, idx) => {
    const transformInfo = [];
    if (n.translation) transformInfo.push(`T: [${n.translation.map(v => v.toFixed(3)).join(', ')}]`);
    if (n.rotation) transformInfo.push(`R: [${n.rotation.map(v => v.toFixed(3)).join(', ')}]`);
    if (n.scale) transformInfo.push(`S: [${n.scale.map(v => v.toFixed(3)).join(', ')}]`);
    const meshName = n.mesh !== undefined ? ` (Mesh: ${gltf.meshes[n.mesh]?.name || n.mesh})` : '';
    console.log(`  [${idx + 1}] ${n.name}${meshName} ${transformInfo.join(' ')}`);
  });
  if (matchedNodes.length > 50) {
    console.log(`  ... and ${matchedNodes.length - 50} more structures.`);
  }

  // Inspect Materials
  console.log('\n--- MATERIALS (Sample) ---');
  (gltf.materials || []).slice(0, 10).forEach((mat, idx) => {
    const pbr = mat.pbrMetallicRoughness || {};
    const color = pbr.baseColorFactor ? `RGB [${pbr.baseColorFactor.slice(0, 3).map(v => v.toFixed(2)).join(', ')}]` : 'Default';
    console.log(`  [${idx + 1}] ${mat.name || 'Unnamed'} - BaseColor: ${color}, Roughness: ${pbr.roughnessFactor ?? 'N/A'}, Metalness: ${pbr.metalnessFactor ?? 'N/A'}`);
  });

  // Accessors & Bounds
  console.log('\n--- BOUNDS & ACCESSORS ---');
  const posAccessors = (gltf.accessors || []).filter(a => a.type === 'VEC3' && a.min && a.max);
  if (posAccessors.length > 0) {
    let globalMin = [...posAccessors[0].min];
    let globalMax = [...posAccessors[0].max];
    for (const a of posAccessors) {
      for (let i = 0; i < 3; i++) {
        if (a.min[i] < globalMin[i]) globalMin[i] = a.min[i];
        if (a.max[i] > globalMax[i]) globalMax[i] = a.max[i];
      }
    }
    console.log(`Overall Geometry Bounds Min: [${globalMin.map(v => v.toFixed(4)).join(', ')}]`);
    console.log(`Overall Geometry Bounds Max: [${globalMax.map(v => v.toFixed(4)).join(', ')}]`);
    const span = globalMax.map((v, i) => v - globalMin[i]);
    console.log(`Overall Dimensions (Span):   [${span.map(v => v.toFixed(4)).join(', ')}]`);
  }
}

// CLI usage
const targetFiles = process.argv.slice(2);
if (targetFiles.length === 0) {
  const defaultDir = 'frontend/public/models/craniofacial';
  console.log(`No file specified, scanning directory: ${defaultDir}`);
  function scan(dir) {
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, item.name);
      if (item.isDirectory()) scan(full);
      else if (item.name.endsWith('.glb')) inspectGlb(full);
    }
  }
  scan(defaultDir);
} else {
  targetFiles.forEach(inspectGlb);
}
