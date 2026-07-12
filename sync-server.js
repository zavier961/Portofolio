const http = require('http');
const fs = require('fs');
const { exec } = require('child_process');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Enable CORS for the local browser
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.url === '/sync' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const { projects, certificates } = data;
                
                // Read script.js
                let scriptContent = fs.readFileSync('script.js', 'utf8');
                
                // Replace defaultProjects array safely
                const projRegex = /const defaultProjects = \[[\s\S]*?\];/;
                if (projRegex.test(scriptContent)) {
                    scriptContent = scriptContent.replace(projRegex, `const defaultProjects = ${JSON.stringify(projects, null, 4)};`);
                }

                // Replace defaultCertificates array safely
                const certRegex = /const defaultCertificates = \[[\s\S]*?\];/;
                if (certRegex.test(scriptContent)) {
                    scriptContent = scriptContent.replace(certRegex, `const defaultCertificates = ${JSON.stringify(certificates, null, 4)};`);
                }
                
                fs.writeFileSync('script.js', scriptContent);
                console.log('✅ Successfully updated script.js with new data!');

                // Automatically commit and push
                exec('git add script.js && git commit -m "Auto-sync database from Admin Dashboard" && git push', (error, stdout, stderr) => {
                    if (error) {
                        console.error('Git push failed:', error);
                        res.writeHead(500);
                        res.end(JSON.stringify({ success: false, error: error.message }));
                        return;
                    }
                    console.log('✅ Automatically pushed to GitHub!');
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true }));
                });

            } catch (err) {
                console.error(err);
                res.writeHead(500);
                res.end(JSON.stringify({ success: false, error: err.message }));
            }
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`🤖 Auto-Sync Magic Server running at http://localhost:${PORT}`);
    console.log(`Menunggu data dari halaman Admin...`);
});
