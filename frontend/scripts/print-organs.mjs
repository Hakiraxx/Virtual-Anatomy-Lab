import fs from 'fs';

const txt = fs.readFileSync('src/data/fullOrgansData.ts', 'utf8');
const organBlocks = txt.split(/\{\s*"id":/g).slice(1);

console.log('--- 59 TIÊU BẢN CHUYÊN SÂU HIỆN CÓ ---');
organBlocks.forEach((b, i) => {
  const id = b.match(/"([^"]+)"/)?.[1];
  const nameVi = b.match(/"nameVi":\s*"([^"]+)"/)?.[1];
  const nameEn = b.match(/"nameEn":\s*"([^"]+)"/)?.[1];
  const sysVi = b.match(/"systemNameVi":\s*"([^"]+)"/)?.[1];
  const model = b.match(/"model":\s*"([^"]+)"/)?.[1];
  console.log(`${i + 1}. [${id}] ${nameVi} (${nameEn}) - Hệ: ${sysVi} - File: ${model}`);
});
