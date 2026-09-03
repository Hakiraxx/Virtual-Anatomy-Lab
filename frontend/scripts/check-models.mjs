import fs from 'fs';
import path from 'path';

const viewerCode = fs.readFileSync('src/components/3d/FullBodyViewer.tsx', 'utf8');
const modelMatches = [];
const regex = /modelPath=["']([^"']+)["']/g;
let match;
while ((match = regex.exec(viewerCode)) !== null) {
  modelMatches.push(match[1]);
}

const uniqueModels = [...new Set(modelMatches)];
console.log('Total unique modelPaths in FullBodyViewer:', uniqueModels.length);

const diskFiles = fs.readdirSync('public/models');
const diskFilesSet = new Set(diskFiles);

let missingCount = 0;
uniqueModels.forEach(m => {
  const filename = path.basename(m);
  if (!diskFilesSet.has(filename)) {
    console.error('❌ MISSING ON DISK OR CASE MISMATCH:', m, 'Filename:', filename);
    missingCount++;
  } else {
    const exactDiskName = diskFiles.find(f => f.toLowerCase() === filename.toLowerCase());
    if (exactDiskName !== filename) {
      console.warn('⚠️ CASE MISMATCH:', filename, 'vs exact disk:', exactDiskName);
      missingCount++;
    }
  }
});

console.log('Missing/mismatched count:', missingCount);
