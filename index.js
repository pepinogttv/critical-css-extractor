const { extractCriticalCssFromApp } = require('./ExtractCriticalCssFromApp.js');

const URL = process.env.URL || 'https://basualdo.prod.devdrubbit.com';

const config = {
    hostname: URL
}

const routes = ['/', '/shop']

extractCriticalCssFromApp({ config, routes })



