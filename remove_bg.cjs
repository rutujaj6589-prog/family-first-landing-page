const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');

async function processImage() {
  const imagePath = 'public/founder.jpg';
  try {
    console.log('Starting background removal...');
    const blob = await removeBackground(imagePath);
    console.log('Background removed, converting to buffer...');
    const buffer = Buffer.from(await blob.arrayBuffer());
    fs.writeFileSync('public/founder.png', buffer);
    console.log('Successfully saved to public/founder.png');
  } catch (err) {
    console.error('Error removing background:', err);
  }
}

processImage();
