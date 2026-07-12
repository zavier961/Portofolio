const fs = require('fs');
const html = fs.readFileSync('evolution-its.com/index.html', 'utf8');

const styles = html.match(/<style[^>]*>[\s\S]*?<\/style>/gi);
const scripts = html.match(/<script[^>]*>[\s\S]*?<\/script>/gi);

console.log("--- STYLES ---");
console.log(styles ? styles.join('\n') : 'none');
console.log("--- SCRIPTS ---");
console.log(scripts ? scripts.join('\n') : 'none');
