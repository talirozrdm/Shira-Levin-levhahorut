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
  assert.match(html, /<meta name="description"/);
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
  assert.match(html, /שלחו לי הודעה בוואטסאפ/);
  assert.match(html, /@shira_goldman_levin/);
  assert.doesNotMatch(html, /<form\b/);
  assert.doesNotMatch(html, /שליחת פרטים/);
  assert.doesNotMatch(html, /הטופס עדיין|טופס יצירת קשר/);
  assert.doesNotMatch(html, /שירה תחזור|שירה מלווה|שירה מתמחה/);
  assert.doesNotMatch(html, /הגישה המקצועית|השירות המרכזי|הדרך בפועל|מה נרצה לחזק|קצת עליי/);
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
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(privacy, /נכון למועד פרסום האתר לא נעשה שימוש בכלי מדידה או מעקב של צד שלישי/);
  assert.match(accessibility, /נעשה מאמץ להנגיש את האתר בהתאם להנחיות הנגישות המקובלות/);

  await assert.rejects(
    access(new URL("../app/_sites-preview/" + "Skeleton" + "Preview.tsx", import.meta.url)),
  );
});
