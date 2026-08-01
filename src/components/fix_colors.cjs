const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\rutuj\\OneDrive\\Desktop\\landing page\\Family\\src\\components';

function getFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, files);
    } else if (fullPath.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  return files;
}

const files = getFiles(dir);

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // We know everything got flattened to amber-100 and orange-100.
  // We'll restore them to amber-500 and orange-200 respectively, which is extremely close to the original theme.
  let newContent = content
    .replace(/amber-100/g, 'amber-500')
    .replace(/orange-100/g, 'orange-200');

  // Fix specific known cases that should be darker or lighter
  // Text gradients
  newContent = newContent.replace(/from-amber-500 to-amber-500/g, 'from-amber-400 to-amber-600');
  
  // Hero section badge text color
  newContent = newContent.replace(/text-amber-500 text-sm font-semibold/g, 'text-amber-600 text-sm font-semibold');
  
  // Testimonials background gradient 
  // currently it's from-[#fffdf0] via-orange-50/30 to-[#fffdf0]
  // we didn't touch orange-50, so it's fine.

  fs.writeFileSync(file, newContent);
  console.log(`Fixed ${file}`);
}
