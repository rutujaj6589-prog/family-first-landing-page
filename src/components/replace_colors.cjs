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

  // Skip Logo.tsx shield colors if we want the shield to remain blue, but we need to change the sub-text.
  if (file.endsWith('Logo.tsx')) {
    // Keep shield blue, just change the text "INSURANCE" to amber
    content = content.replace(/text-blue-200/g, 'text-amber-200');
    content = content.replace(/text-blue-600/g, 'text-amber-500');
    fs.writeFileSync(file, content);
    continue;
  }

  // Replace colors
  let newContent = content
    // background gradients
    .replace(/from-blue-600 to-indigo-600/g, 'from-amber-400 to-amber-500')
    .replace(/from-blue-500 to-indigo-600/g, 'from-amber-400 to-amber-500')
    .replace(/from-blue-600 via-indigo-600 to-purple-600/g, 'from-amber-400 via-amber-500 to-orange-500')
    .replace(/from-slate-900 via-indigo-950/g, 'from-slate-900 via-slate-950')
    // general blues and indigos
    .replace(/blue-50/g, 'orange-50')
    .replace(/blue-100/g, 'orange-100')
    .replace(/blue-200/g, 'orange-200')
    .replace(/blue-300/g, 'amber-300')
    .replace(/blue-400/g, 'amber-400')
    .replace(/blue-500/g, 'amber-500')
    .replace(/blue-600/g, 'amber-500')
    .replace(/blue-700/g, 'amber-600')
    .replace(/blue-800/g, 'amber-700')
    .replace(/blue-900/g, 'amber-900')
    
    .replace(/indigo-50/g, 'orange-50')
    .replace(/indigo-100/g, 'orange-100')
    .replace(/indigo-200/g, 'orange-200')
    .replace(/indigo-300/g, 'amber-300')
    .replace(/indigo-400/g, 'amber-400')
    .replace(/indigo-500/g, 'amber-500')
    .replace(/indigo-600/g, 'amber-500')
    .replace(/indigo-700/g, 'amber-600')
    .replace(/indigo-800/g, 'amber-700')
    .replace(/indigo-900/g, 'amber-900')

    // Apply the faint cream background to the main section tags that were white
    .replace(/<section id="hero" className="([^"]*)bg-white([^"]*)"/g, '<section id="hero" className="$1bg-[#fffdf0]$2"')
    .replace(/<section id="benefits" className="([^"]*)bg-white([^"]*)"/g, '<section id="benefits" className="$1bg-[#fffdf0]$2"')
    .replace(/<section id="calculator" className="([^"]*)bg-white([^"]*)"/g, '<section id="calculator" className="$1bg-[#fffdf0]$2"')
    .replace(/<section id="founder" className="([^"]*)bg-white([^"]*)"/g, '<section id="founder" className="$1bg-[#fffdf0]$2"')
    .replace(/<section id="faq" className="([^"]*)bg-white([^"]*)"/g, '<section id="faq" className="$1bg-[#fffdf0]$2"')
    // Testimonials is a gradient
    .replace(/from-white via-slate-50 to-white/g, 'from-[#fffdf0] via-orange-50/30 to-[#fffdf0]');

  fs.writeFileSync(file, newContent);
  console.log(`Updated ${file}`);
}
