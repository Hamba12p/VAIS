const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('../../.tmp/audit-tools/node_modules/playwright');
const { AxeBuilder } = require('../../.tmp/audit-tools/node_modules/@axe-core/playwright');
const phase = process.argv[2] || 'baseline';
const source = fs.readFileSync('data/projects.ts', 'utf8');
const routes = process.argv[3] ? process.argv[3].split(',') : ['/', '/about', '/work', '/contact', '/sandbox/apex-nexus', ...[...source.matchAll(/slug: '([^']+)'/g)].map(m => '/work/' + m[1]), '/audit-missing-page'];
const output = path.resolve('audit', phase);
fs.mkdirSync(output, { recursive: true });
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.AUDIT_CHROME || 'C:/Users/PROBOOK/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe', headless: true });
  const results = [];
  for (const route of routes) {
    for (const width of [375, 768, 1024, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      const errors = [], failed = [];
      page.on('pageerror', e => errors.push(e.message));
      page.on('console', m => { if (['error', 'warning'].includes(m.type())) errors.push(m.type() + ': ' + m.text()); });
      page.on('response', r => { if (r.status() >= 400) failed.push({url:r.url(),status:r.status()}); });
      const response = await page.goto('http://127.0.0.1:3210' + route, {waitUntil:'networkidle',timeout:60000});
      await page.evaluate(() => document.fonts.ready);
      // Trigger existing viewport reveals before capturing full-page evidence.
      await page.evaluate(async () => { for(let y=0;y<document.body.scrollHeight;y+=700){ window.scrollTo(0,y); await new Promise(r=>setTimeout(r,70)); } window.scrollTo(0,0); });
      await page.waitForTimeout(700);
      const name = route === '/' ? 'home' : route.slice(1).replaceAll('/', '--');
      await page.screenshot({path:path.join(output,`${name}-${width}.png`),fullPage:true});
      const state = await page.evaluate(() => ({ title:document.title, description:document.querySelector('meta[name="description"]')?.content, h1:[...document.querySelectorAll('h1')].map(n=>({text:n.textContent,color:getComputedStyle(n).color,font:getComputedStyle(n).fontFamily})),bodyFont:getComputedStyle(document.body).fontFamily, fonts:[...document.fonts].map(f=>({family:f.family,status:f.status})), overflow:document.documentElement.scrollWidth>innerWidth, links:[...document.querySelectorAll('a')].map(a=>({text:a.textContent,href:a.getAttribute('href')})), images:[...document.images].map(i=>({src:i.getAttribute('src'),alt:i.alt,loaded:i.complete&&i.naturalWidth>0})),resources:performance.getEntriesByType('resource').map(r=>({name:r.name,size:r.transferSize,duration:r.duration})), mainCount:document.querySelectorAll('main').length }));
      let axe;
      if(width===375||width===1440){const scan=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();axe=scan.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}));}
      results.push({route,width,status:response.status(),errors,failed,...state,axe});
      fs.writeFileSync(path.join(output,'results.json'),JSON.stringify(results,null,2));
      console.log(`${phase} ${route} ${width}: HTTP ${response.status()}, ${errors.length} console messages, ${axe?.length??'-'} axe rules, overflow=${state.overflow}`);
      await context.close();
    }
  }
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
