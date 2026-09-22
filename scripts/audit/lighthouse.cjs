const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
(async()=>{
 const {default:lighthouse}=await import(pathToFileURL(path.resolve('.tmp/audit-tools/node_modules/lighthouse/core/index.js')).href);
 const chromeLauncher=await import(pathToFileURL(path.resolve('.tmp/audit-tools/node_modules/chrome-launcher/dist/index.js')).href);
 const phase=process.argv[2]||'baseline';const dir=path.resolve('audit',phase);fs.mkdirSync(dir,{recursive:true});
 const summary=fs.existsSync(path.join(dir,'lighthouse-summary.json'))?JSON.parse(fs.readFileSync(path.join(dir,'lighthouse-summary.json'),'utf8')):[];
 for(const route of ['/','/work/sentect'])for(const device of ['mobile','desktop']){
  if(summary.some(x=>x.route===route&&x.device===device))continue;
  const profile=path.resolve('.tmp','lighthouse-'+phase+'-'+device+'-'+(route==='/'?'home':'sentect'));fs.mkdirSync(profile,{recursive:true});
  const chrome=await chromeLauncher.launch({userDataDir:profile,chromePath:'C:/Users/PROBOOK/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe',chromeFlags:['--headless','--no-sandbox']});
  try{const {lhr,report}=await lighthouse('http://127.0.0.1:3210'+route,{port:chrome.port,output:'html',onlyCategories:['performance','accessibility','best-practices','seo'],...(device==='desktop'?{formFactor:'desktop',screenEmulation:{mobile:false,width:1440,height:900,deviceScaleFactor:1,disabled:false},throttling:{rttMs:40,throughputKbps:10240,cpuSlowdownMultiplier:1}}:{})});
   const name=(route==='/'?'home':'sentect')+'-'+device;fs.writeFileSync(path.join(dir,'lighthouse-'+name+'.html'),report);fs.writeFileSync(path.join(dir,'lighthouse-'+name+'.json'),JSON.stringify(lhr));
   const result={route,device,scores:Object.fromEntries(Object.entries(lhr.categories).map(([k,v])=>[k,Math.round(v.score*100)])),lcp:lhr.audits['largest-contentful-paint'].numericValue,cls:lhr.audits['cumulative-layout-shift'].numericValue,tbt:lhr.audits['total-blocking-time'].numericValue};summary.push(result);console.log(result);fs.writeFileSync(path.join(dir,'lighthouse-summary.json'),JSON.stringify(summary,null,2));
  }finally{try{await chrome.kill();}catch(e){console.warn('Browser cleanup:',e.message);}}
 }
})().catch(e=>{console.error(e);process.exit(1)});
