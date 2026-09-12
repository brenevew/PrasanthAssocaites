/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      if (!file.includes('node_modules') && !file.includes('.next') && !file.includes('.git')) {
        results = results.concat(walk(file));
      }
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  
  // Replace text-[var(--color-X)] with text-X
  content = content.replace(/text-\[var\(--color-([a-zA-Z0-9-]+)\)\]/g, 'text-$1');
  
  // Replace bg-[var(--color-X)] with bg-X
  content = content.replace(/bg-\[var\(--color-([a-zA-Z0-9-]+)\)\]/g, 'bg-$1');
  
  // Replace border-[var(--color-X)] with border-X
  content = content.replace(/border-\[var\(--color-([a-zA-Z0-9-]+)\)\]/g, 'border-$1');
  
  // Replace ring-[var(--color-X)] with ring-X
  content = content.replace(/ring-\[var\(--color-([a-zA-Z0-9-]+)\)\]/g, 'ring-$1');
  
  // Replace from-[var(--color-X)] with from-X
  content = content.replace(/from-\[var\(--color-([a-zA-Z0-9-]+)\)\]/g, 'from-$1');
  
  // Replace via-[var(--color-X)] with via-X
  content = content.replace(/via-\[var\(--color-([a-zA-Z0-9-]+)\)\]/g, 'via-$1');
  
  // Replace to-[var(--color-X)] with to-X
  content = content.replace(/to-\[var\(--color-([a-zA-Z0-9-]+)\)\]/g, 'to-$1');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
