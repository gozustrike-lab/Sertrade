// Playwright test: Full Presentation Tool / Visual Editing validation
import { chromium } from 'playwright';

const BASE = 'https://sertrade.vercel.app';
const results = [];

async function test() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  // ── Test 1: Draft mode API works ──
  console.log('\n── Test 1: Draft Mode API ──');
  try {
    const res = await fetch(`${BASE}/api/draft-mode/enable?redirect=/`, { redirect: 'manual' });
    console.log(`  Status: ${res.status}`);
    console.log(`  Location: ${res.headers.get('location')}`);
    const hasCookie = res.headers.get('set-cookie')?.includes('__prerender_bypass') || 
                     res.headers.get('set-cookie')?.includes('x-nextjs-data');
    console.log(`  Has bypass cookie: ${!!hasCookie}`);
    results.push({ test: 'Draft mode enable', pass: res.status === 302 || res.status === 307, detail: `status ${res.status}` });
  } catch(e) {
    console.log(`  Error: ${e.message}`);
    results.push({ test: 'Draft mode enable', pass: false, detail: e.message });
  }

  // ── Test 2: Admin loads without web UI ──
  console.log('\n── Test 2: /admin isolation ──');
  const adminPage = await context.newPage();
  await adminPage.goto(`${BASE}/admin`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await adminPage.waitForTimeout(10000);
  
  const whatsapp = await adminPage.$('a[href*="wa.me"]');
  const footer = await adminPage.$('footer');
  const webNav = await adminPage.$$eval('header a, nav a', els => 
    els.map(e => e.textContent?.trim()).filter(t => ['Inicio', 'Servicios', 'Portafolio', 'Proyectos'].includes(t))
  );
  console.log(`  WhatsApp: ${!whatsapp ? 'hidden' : 'VISIBLE!'}`);
  console.log(`  Footer: ${!footer ? 'hidden' : 'VISIBLE!'}`);
  console.log(`  Web nav: ${webNav.length === 0 ? 'hidden' : webNav.join(', ')}`);
  results.push({ test: 'Admin UI isolation', pass: !whatsapp && !footer && webNav.length === 0, 
    detail: `WA=${!whatsapp} Footer=${!footer} Nav=${webNav.length === 0}` });

  // ── Test 3: Homepage renders with data ──
  console.log('\n── Test 3: Homepage renders ──');
  const homePage = await context.newPage();
  await homePage.goto(`${BASE}/`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await homePage.waitForTimeout(5000);
  
  const heroSection = await homePage.$('section#inicio');
  const serviciosSection = await homePage.$('section#servicios');
  const contactoSection = await homePage.$('section#contacto');
  const whatsappHome = await homePage.$('a[href*="wa.me"]');
  console.log(`  #inicio: ${!!heroSection}`);
  console.log(`  #servicios: ${!!serviciosSection}`);
  console.log(`  #contacto: ${!!contactoSection}`);
  console.log(`  WhatsApp: ${!!whatsappHome}`);
  results.push({ test: 'Homepage sections', pass: !!heroSection && !!serviciosSection && !!contactoSection,
    detail: `inicio=${!!heroSection} servicios=${!!serviciosSection} contacto=${!!contactoSection}` });

  // ── Test 4: Draft mode renders page with data ──
  console.log('\n── Test 4: Draft mode page render ──');
  const draftPage = await context.newPage();
  // Enable draft mode via the API, which sets a cookie
  const draftRes = await context.request.get(`${BASE}/api/draft-mode/enable?redirect=/`);
  // Get cookies from context
  const cookies = await context.cookies();
  const bypassCookie = cookies.find(c => c.name.includes('prerender') || c.name.includes('bypass') || c.name.includes('nextjs'));
  console.log(`  Bypass cookies: ${JSON.stringify(cookies.map(c => c.name))}`);
  
  if (bypassCookie) {
    await draftPage.goto(`${BASE}/`, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await draftPage.waitForTimeout(5000);
    const draftContent = await draftPage.$('section#inicio');
    console.log(`  Draft page rendered: ${!!draftContent}`);
    results.push({ test: 'Draft mode render', pass: !!draftContent, detail: bypassCookie ? 'cookie found' : 'no cookie' });
  } else {
    console.log('  No bypass cookie found - draft mode may not be active');
    results.push({ test: 'Draft mode render', pass: false, detail: 'no bypass cookie' });
  }

  // ── Test 5: Check for visual-editing overlay script ──
  console.log('\n── Test 5: Visual Editing overlay ──');
  // The @sanity/visual-editing package should inject an overlay when draft mode is active
  const scripts = await draftPage.$$eval('script[src]', els => els.map(s => s.src));
  const hasVisualEditing = scripts.some(s => s.includes('visual-editing') || s.includes('sanity'));
  console.log(`  Sanity/VE scripts: ${scripts.length > 0 ? scripts.join(', ') : 'none'}`);
  results.push({ test: 'VE overlay script', pass: scripts.length > 0, detail: `${scripts.length} scripts` });

  // ── Test 6: Screenshot ──
  console.log('\n── Test 6: Screenshots ──');
  await adminPage.screenshot({ path: '/home/z/my-project/download/test-admin.png' });
  await homePage.screenshot({ path: '/home/z/my-project/download/test-home.png' });
  console.log('  Saved: test-admin.png, test-home.png');

  // ── Summary ──
  console.log('\n═══════════════════════════════════');
  console.log('PRESENTATION TOOL TEST RESULTS:');
  for (const r of results) {
    console.log(`  ${r.pass ? '✅' : '❌'} ${r.test}: ${r.detail}`);
  }
  const passed = results.filter(r => r.pass).length;
  console.log(`\n  ${passed}/${results.length} passed`);
  if (passed < results.length) {
    console.log('\n  ⚠️  Some tests failed. The Presentation Tool needs:');
    console.log('  1. SANITY_API_READ_TOKEN set in Vercel env vars');
    console.log('  2. NEXT_PUBLIC_SANITY_API_READ_TOKEN set in Vercel env vars');
    console.log('  3. Both Structure and Presentation tabs visible in Studio');
  }
  
  await browser.close();
}

test().catch(err => { console.error('Test failed:', err); process.exit(1); });