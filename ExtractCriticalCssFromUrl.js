
const { chromium } = require('playwright');
const { blockedResourcesTypes, skippedScriptResources } = require('./config');

async function closePageAndBrowser({ browser, page }) {
    await page.close();
    await browser.close();
}

async function extractCriticalCssFromUrl(url) {
    const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-gpu', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] });
    const page = await browser.newPage();

    await page.route('**/*', route => {
        const request = route.request();
        const resourceType = request.resourceType();
        const url = request.url();
        const isBlockedResource = blockedResourcesTypes.includes(resourceType) || skippedScriptResources.some(script => url.includes(script));
        isBlockedResource ? route.abort() : route.continue();
    })

    await page.coverage.startCSSCoverage()

    console.time('navigation')
    const response = await page.goto(url, { waitUntil: 'load' });
    console.timeEnd('navigation')

    if (!response || !response.ok) {
        await closePageAndBrowser({ browser, page });
        console.log('Something went wrong');
    }

    const cssCoverage = await page.coverage.stopCSSCoverage();

    let criticalCss = '';

    for (const entry of cssCoverage) {
        for (const range of entry.ranges) {
            criticalCss += entry.text.slice(range.start, range.end) + '\n';
        }
    }

    await closePageAndBrowser({ browser, page });
    return criticalCss
}


module.exports = { extractCriticalCssFromUrl }