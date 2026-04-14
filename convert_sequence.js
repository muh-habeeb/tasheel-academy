const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function run() {
  const dir = path.join(__dirname, 'public', 'sequence');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.png') && f.startsWith('ezgif-frame-'));

  if (files.length === 0) {
    console.log('No PNG files found.');
    return;
  }

  console.log(`Found ${files.length} PNGs. Converting to WEBP in parallel...`);

  // Concurrency limit
  const limit = 10;
  let active = 0;
  let index = 0;
  
  await new Promise((resolve, reject) => {
    function processNext() {
      if (index >= files.length && active === 0) {
        resolve();
        return;
      }
      
      while (active < limit && index < files.length) {
        const file = files[index++];
        active++;
        
        // Extract original frame number: ezgif-frame-040.png -> 40
        const match = file.match(/\d+/);
        if (!match) {
          active--;
          processNext();
          continue;
        }
        
        const originalNum = parseInt(match[0], 10);
        // Original 001 maps to frame_00
        const targetIndex = originalNum - 1;
        const targetIndexStr = String(targetIndex).padStart(2, '0');
        const newName = `frame_${targetIndexStr}_delay-0.067s.webp`;
        
        const oldPath = path.join(dir, file);
        const newPath = path.join(dir, newName);
        
        sharp(oldPath)
          .webp({ quality: 80 })
          .toFile(newPath)
          .then(() => {
            console.log(`Converted ${file} to ${newName}`);
            fs.unlinkSync(oldPath);
            active--;
            processNext();
          })
          .catch(err => {
            console.error(`Failed ${file}:`, err);
            active--;
            processNext();
          });
      }
    }
    
    processNext();
  });

  console.log('Success! Converted all files and deleted original PNGs.');
}

run().catch(console.error);
