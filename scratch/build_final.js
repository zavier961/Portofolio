const fs = require('fs');

const orig = fs.readFileSync('index.html', 'utf8');
const newHtml = fs.readFileSync('scratch/index_new_1.html', 'utf8');

// Find where modals start in original
const modalStartIdx = orig.indexOf('<div id="workshop-modal"');
if (modalStartIdx === -1) {
    console.log("Could not find modals in original index.html");
    process.exit(1);
}

// We also want to include the comment just before it, so let's backtrack a bit if we want, 
// or just take from the div onwards.
const modalsAndScripts = orig.substring(modalStartIdx);

// Append to new Html
const finalHtml = newHtml + '\n\n' + modalsAndScripts + '\n';

// Add the loading screen script logic just before </body>
const loadScript = `
<script>
  window.addEventListener("DOMContentLoaded", () => {
    window.scrollTo(0, 0);
    document.documentElement.classList.remove("intro-ready");

    const screen = document.getElementById("loading-screen");
    if (!screen) return;

    setTimeout(() => {
      document.getElementById("gate-far-left").classList.add("open");
      document.getElementById("gate-far-right").classList.add("open");
    }, 420);

    setTimeout(() => {
      document.getElementById("gate-top").classList.add("open");
      document.getElementById("gate-bottom").classList.add("open");
    }, 1100);

    setTimeout(() => {
      document.getElementById("gate-left").classList.add("open");
      document.getElementById("gate-right").classList.add("open");
      
      requestAnimationFrame(() => {
        document.querySelectorAll("#loading-screen .gate-panel").forEach((panel) => {
          panel.classList.add("full-open");
        });
      });
    }, 1750);

    setTimeout(() => {
      screen.classList.add("done");
      setTimeout(() => {
        screen.remove();
        document.documentElement.classList.add("intro-ready");
      }, 100);
    }, 2400);
  });
</script>
`;

const withLoadScript = finalHtml.replace('</body>', loadScript + '\n</body>');

// Backup original just in case
fs.writeFileSync('index.original.html', orig);

fs.writeFileSync('index.html', withLoadScript);
console.log("Updated index.html successfully!");
