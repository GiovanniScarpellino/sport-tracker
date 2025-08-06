const sharp = require('sharp');
const path = require('path');

const sizes = [192, 512];
const color = '#3f51b5';
const outputDir = path.join(__dirname, '../public');

sizes.forEach(size => {
  sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: Buffer.from(
          `<svg><rect x="0" y="0" width="${size}" height="${size}" rx="${size * 0.1}" ry="${size * 0.1}" fill="${color}" /></svg>`
        ),
        gravity: 'center',
      },
    ])
    .toFile(path.join(outputDir, `pwa-${size}x${size}.png`))
    .catch(err => console.log(err));
});