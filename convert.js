const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'assets', 'images', 'classes');

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.webp')) {
    const inputPath = path.join(dir, file);
    const outputPath = path.join(dir, file.replace('.webp', '-min.webp'));
    
    sharp(inputPath)
      .resize({ width: 600, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(outputPath)
      .then(() => {
        fs.renameSync(outputPath, inputPath);
        console.log('Converted and resized', file);
      })
      .catch(err => console.error('Error converting', file, err));
  }
});
