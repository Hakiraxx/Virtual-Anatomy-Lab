import fs from 'fs';

const txt = fs.readFileSync('src/data/fullOrgansData.ts', 'utf8');
const organMatches = [...txt.matchAll(/"id":\s*"([^"]+)",\s*"systemId":\s*"([^"]+)",\s*"systemNameEn":\s*"([^"]+)",\s*"systemNameVi":\s*"([^"]+)",\s*"nameEn":\s*"([^"]+)",\s*"nameVi":\s*"([^"]+)",\s*"scientificName":\s*"([^"]+)",\s*"accent":\s*"([^"]+)",\s*"model":\s*"([^"]+)"/g)];

console.log(`--- DANH SÁCH ${organMatches.length} TIÊU BẢN CHUYÊN SÂU HOÀN CHỈNH ---`);
organMatches.forEach((m, i) => {
  console.log(`${(i + 1).toString().padStart(2, ' ')}. [${m[1]}] ${m[6]} (${m[5]}) - ${m[4]} - ${m[9]}`);
});
