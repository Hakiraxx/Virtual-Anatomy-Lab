const https = require('https');
const fs = require('fs');

https.get('https://xuonggiaiphau.com/vi', (res) => {
  let html = '';
  res.on('data', (c) => (html += c));
  res.on('end', () => {
    fs.writeFileSync('vi_html.txt', html);
    console.log('Saved vi_html.txt, size:', html.length);
  });
});
