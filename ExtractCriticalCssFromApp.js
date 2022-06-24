const { extractCriticalCssFromUrl } = require('./ExtractCriticalCssFromUrl.js')
const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto')


async function extractCriticalCssFromApp({ config, routes }) {
    const { hostname } = config;
    const manifest = {}
    for await (const routePath of routes) {
        const url = `${hostname}${routePath}`
        const criticalCSS = await extractCriticalCssFromUrl(url);

        const hash = crypto.createHash('md5').update(routePath).digest('hex');
        const fileName = `${hash}.css`;


        const filePath = path.resolve(process.cwd(), 'critical-css', fileName);

        manifest[routePath] = fileName;

        await fs.writeFile(filePath, criticalCSS);
    }

    const manifestPath = path.resolve(process.cwd(), 'critical-css', 'manifest.json');
    await fs.writeFile(manifestPath, JSON.stringify(manifest))
}

module.exports = { extractCriticalCssFromApp } 