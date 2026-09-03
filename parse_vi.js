const fs = require('fs');
const html = fs.readFileSync('vi_html.txt', 'utf8');

// Match <li>Name<!-- -->: <!-- -->Description</li>
const re = /<li>([^<]+)<!-- -->: <!-- -->([^<]+)<\/li>/g;
let m;
const viDict = {};
while ((m = re.exec(html)) !== null) {
  const name = m[1].trim();
  const desc = m[2].trim();
  viDict[name] = desc;
}

console.log('Extracted Vietnamese terms count:', Object.keys(viDict).length);
console.log('Sample 20:');
Object.entries(viDict).slice(0, 20).forEach(([k, v]) => console.log(k, '->', v));
fs.writeFileSync('vi_terms_extracted.json', JSON.stringify(viDict, null, 2));
