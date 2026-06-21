const https = require('https');
const fs = require('fs');
const path = require('path');

const downloadIcon = (url, name, color) => {
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      // Inject color into SVG
      const coloredSvg = data.replace('<svg ', `<svg fill="${color}" `);
      fs.writeFileSync(path.join(__dirname, 'public', name), coloredSvg);
      console.log(`Saved ${name}`);
    });
  });
};

const icons = [
  { url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/canva.svg', name: 'canva.svg', color: '#00C4CC' },
  { url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/invision.svg', name: 'invision.svg', color: '#FF3366' },
  { url: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/zeplin.svg', name: 'zeplin.svg', color: '#FCCD34' }
];

if (!fs.existsSync(path.join(__dirname, 'public'))) {
  fs.mkdirSync(path.join(__dirname, 'public'));
}

icons.forEach(i => downloadIcon(i.url, i.name, i.color));
