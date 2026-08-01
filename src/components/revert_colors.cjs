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

  // Replace colors in REVERSE order to shift them back UP
  let newContent = content
    .replace(/amber-800/g, 'amber-900')
    .replace(/amber-700/g, 'amber-800')
    .replace(/amber-600/g, 'amber-700')
    .replace(/amber-500/g, 'amber-600')
    .replace(/amber-400/g, 'amber-500')
    .replace(/amber-300/g, 'amber-400')
    .replace(/amber-200/g, 'amber-300')
    .replace(/amber-100/g, 'amber-200')
    
    .replace(/orange-800/g, 'orange-900')
    .replace(/orange-700/g, 'orange-800')
    .replace(/orange-600/g, 'orange-700')
    .replace(/orange-500/g, 'orange-600')
    .replace(/orange-400/g, 'orange-500')
    .replace(/orange-300/g, 'orange-400')
    .replace(/orange-200/g, 'orange-300')
    .replace(/orange-100/g, 'orange-200');

  // The lighter script merged orange-200 into orange-100, so now everything that was 100/200 is 200.
  // We can manually fix orange-200/50 back to orange-100/50 which was used in Hero and CTA
  newContent = newContent.replace(/orange-200\/50/g, 'orange-100/50');
  newContent = newContent.replace(/orange-200 text-amber-500/g, 'orange-50 text-amber-600');

  fs.writeFileSync(file, newContent);
  console.log(`Reverted ${file}`);
}
