import fs from 'fs';

const txt = fs.readFileSync('src/data/fullOrgansData.ts', 'utf8');

function showHotspots(organId) {
  const marker = `"id": "${organId}",`;
  const idx = txt.indexOf(marker);
  if (idx === -1) {
    console.log('Not found:', organId);
    return;
  }
  const chunk = txt.slice(idx, idx + 4000);
  const hsMatch = chunk.match(/"hotspots":\s*(\[[^\]]*\])/s);
  if (hsMatch) {
    try {
      const hs = JSON.parse(hsMatch[1]);
      console.log(`=== Hotspots for ${organId} (${hs.length}) ===`);
      hs.forEach(h => console.log(h.id, h.ta, h.position));
    } catch (e) {
      console.log('Error parsing:', e.message);
    }
  }
}

showHotspots('cranial-nerves');
showHotspots('dentomaxillofacial');
showHotspots('skull');
showHotspots('brainstem');
