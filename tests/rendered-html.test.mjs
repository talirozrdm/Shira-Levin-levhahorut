import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const starterPattern = new RegExp(
  ["codex" + "-preview", "Skeleton" + "Preview", "react-loading" + "-skeleton"].join("|"),
);
const longDashPattern = /[\u2014\u2013\u2212]/;
const forbiddenCopyPattern = new RegExp(
  [
    ["טי", "פים"],
    ["פתרונות", " קסם"],
    ["שיטות", " קסם"],
    ["שיטות", " מהירות"],
    ["פתרונות", " מהירים"],
    ["ילדים", " בעייתיים"],
  ]
    .map((parts) => parts.join(""))
    .join("|"),
);
const primaryCtaPattern = /לתיאום שיחת היכרות בוואטסאפ/g;

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the Hebrew RTL landing page with SEO essentials", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="he" dir="rtl">/);
  assert.match(html, /<title>שירה לוין \| לב ההורות - הדרכת הורים אונליין למתבגרים ולמשפחות<\/title>/);
  assert.match(html, /שירה לוין, מדריכת הורים בגישת אדלר, מלווה אונליין הורים לילדים בגיל בית הספר/);
  assert.match(html, /<link rel="canonical" href="https:\/\/example\.com\/lev-hahorut"/);
  assert.match(html, /property="og:image" content="https:\/\/example\.com\/assets\/lev-hahorut-og-placeholder\.jpg"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.match(html, /type="application\/ld\+json"/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /<h1 id="hero-title">לב ההורות<\/h1>/);
  assert.match(html, /הדרכת הורים שמתחילה ביחסים/);
  assert.match(html, /shira-levin-hero\.webp/);
  assert.match(html, /shira-levin-about\.webp/);
});

test("includes conversion, accessibility, and privacy affordances", async () => {
  const html = await (await render()).text();

  assert.match(html, /דילוג לתוכן הראשי/);
  assert.match(html, /aria-controls="site-nav"/);
  assert.match(html, /aria-controls="faq-panel-0"/);
  assert.doesNotMatch(html, /aria-expanded="true"/);
  assert.match(html, /aria-label="פתיחת תפריט נגישות"/);
  assert.match(html, /href="\/accessibility\.html"/);
  assert.match(html, /href="\/privacy\.html"/);
  assert.match(html, /050-753-2044/);
  assert.match(html, /wa\.me\/972507532044/);
  assert.match(html, /לתיאום שיחת היכרות בוואטסאפ/);
  assert.equal((html.match(primaryCtaPattern) ?? []).length, 2);
  assert.match(html, /class="cta-break">אני מזמינה אתכם להתחיל בשיחת היכרות קצרה\.<\/span>/);
  assert.doesNotMatch(html, /<br\s*\/?>/i);
  assert.match(html, /שלחו לי הודעה בוואטסאפ/);
  assert.match(html, /@shira_goldman_levin/);
  assert.match(html, /class="emotion-list"/);
  assert.match(html, /class="editorial-word hero-word" aria-hidden="true">RELATIONSHIPS<\/span>/);
  assert.match(html, /class="editorial-word need-word" aria-hidden="true">HOME<\/span>/);
  assert.match(html, /class="editorial-word approach-word" aria-hidden="true">יחסים<\/span>/);
  assert.match(html, /class="editorial-word service-word" aria-hidden="true">GUIDANCE<\/span>/);
  assert.match(html, /class="signature-block"/);
  assert.doesNotMatch(html, /signature-mark/);
  assert.match(html, /<figcaption><strong>שירה לוין<\/strong><span>מדריכת הורים ומנחת קבוצות בגישת אדלר<\/span><\/figcaption>/);
  assert.match(html, /שלושה דברים שמלווים אותי בדרך/);
  assert.match(html, /class="sticky-whatsapp"/);
  assert.doesNotMatch(html, /<form\b/);
  assert.doesNotMatch(html, /שליחת פרטים/);
  assert.doesNotMatch(html, /הטופס עדיין|טופס יצירת קשר/);
  assert.doesNotMatch(html, /שירה תחזור|שירה מלווה|שירה מתמחה/);
  assert.doesNotMatch(html, /הגישה המקצועית|השירות המרכזי|הדרך בפועל|מה נרצה לחזק|קצת עליי/);
  assert.doesNotMatch(html, />PARENTING</);
});

test("keeps starter code and disallowed copy out of the finished page", async () => {
  const [page, layout, css, packageJson, privacy, accessibility] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../public/privacy.html", import.meta.url), "utf8"),
    readFile(new URL("../public/accessibility.html", import.meta.url), "utf8"),
  ]);
  const combined = `${page}\n${layout}\n${css}\n${packageJson}\n${privacy}\n${accessibility}`;

  assert.doesNotMatch(combined, starterPattern);
  assert.doesNotMatch(combined, longDashPattern);
  assert.doesNotMatch(combined, forbiddenCopyPattern);
  assert.doesNotMatch(combined, /Google Analytics|Meta Pixel|לא בוצעה בדיקת|הערת מפתח|שירה תחזור|שירה מלווה|שירה מתמחה/);
  assert.match(page, /lev-hahorut-logo-512\.png/);
  assert.doesNotMatch(page, /submitContact|FormEvent|contact-form|aria-invalid|field-error/);
  assert.match(css, /--body-copy-size:\s*calc\(18px \* var\(--user-font-scale\)\)/);
  assert.match(css, /\.hero-image\s*\{[\s\S]*width:\s*min\(84vw, 308px\)/);
  assert.match(css, /0 0 30px rgb\(185 129 209 \/ 0\.2\)/);
  assert.match(css, /\.signature-block\s*\{/);
  assert.doesNotMatch(css, /\.signature-mark\s*\{/);
  assert.match(css, /\.sticky-whatsapp\.is-visible\s*\{/);
  assert.match(css, /@keyframes shape-drift/);
  assert.match(css, /--display-font:\s*"Frank Ruhl Libre"/);
  assert.match(css, /\.editorial-word\s*\{/);
  assert.match(css, /\.approach-section::before\s*\{[\s\S]*content:\s*none/);
  assert.doesNotMatch(css, /content:\s*"PARENTING"/);
  assert.match(css, /--aubergine:\s*#26102f/);
  assert.match(css, /--muted:\s*#73616b/);
  assert.match(css, /\.emotion-list\s*\{[\s\S]*counter-reset:\s*home-moments/);
  assert.match(css, /\.emotion-list p\s*\{[\s\S]*background:\s*transparent/);
  assert.match(css, /\.principles-list\s*\{[\s\S]*border-block:\s*0/);
  assert.match(css, /\.trust-grid\s*\{[\s\S]*display:\s*flex/);
  assert.match(css, /\.nowrap\s*\{[\s\S]*white-space:\s*nowrap/);
  assert.match(css, /\.cta-break\s*\{[\s\S]*display:\s*block/);
  assert.match(css, /text-wrap:\s*balance/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(privacy, /נכון למועד עדכון מדיניות זו, האתר אינו עושה שימוש בכלי מדידה או מעקב חיצוניים לצורכי פרסום/);
  assert.match(privacy, /<span class="nowrap">shumi25@gmail\.com<\/span>/);
  assert.match(privacy, /<span class="nowrap" dir="ltr">050-753-2044<\/span>/);
  assert.match(accessibility, /נעשה מאמץ להנגיש את האתר ולאפשר חוויית שימוש נוחה ככל האפשר/);
  assert.match(accessibility, /<span class="nowrap" dir="ltr">050-753-2044<\/span>/);

  await assert.rejects(
    access(new URL("../app/_sites-preview/" + "Skeleton" + "Preview.tsx", import.meta.url)),
  );
});
