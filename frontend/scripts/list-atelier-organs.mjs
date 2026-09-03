import fs from 'fs';

const txt = fs.readFileSync('src/data/fullOrgansData.ts', 'utf8');
const regex = /"id":\s*"([^"]+)",\s*"systemId"/g;
const organs = [];
let m;
while ((m = regex.exec(txt)) !== null) {
  organs.push(m[1]);
}
console.log('Total organs in ATELIER_ORGANS:', organs.length);

const diskModels = fs.readdirSync('public/models').filter(f => f.endsWith('.glb'));
console.log('Total GLB models on disk:', diskModels.length);

// Check if all models on disk are represented in ATELIER_ORGANS
const organModelsInCode = [];
const modelRegex = /"model":\s*"\/models\/([^"]+)"/g;
while ((m = modelRegex.exec(txt)) !== null) {
  organModelsInCode.push(m[1]);
}

console.log('Total model references in fullOrgansData.ts:', organModelsInCode.length);

const unrepresentedModels = diskModels.filter(m => !organModelsInCode.includes(m));
console.log('GLB models not yet in Tiêu bản sâu:', unrepresentedModels);
