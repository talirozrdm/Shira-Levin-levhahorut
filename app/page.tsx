"use client";

/* eslint-disable @next/next/no-img-element */
import { FormEvent, useEffect, useMemo, useState } from "react";

const whatsappMessage =
  "https://wa.me/972507532044?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%A9%D7%99%D7%A8%D7%94%2C%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20%D7%94%D7%90%D7%AA%D7%A8%20%D7%A9%D7%9C%20%D7%9C%D7%91%20%D7%94%D7%94%D7%95%D7%A8%D7%95%D7%AA%20%D7%95%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%AA%D7%90%D7%9D%20%D7%A9%D7%99%D7%97%D7%AA%20%D7%94%D7%99%D7%9B%D7%A8%D7%95%D7%AA";
const instagramUrl = "https://www.instagram.com/shira_goldman_levin/";
const facebookUrl = "https://www.facebook.com/shira.goldmanlevin?locale=he_IL";

const trustItems = [
  "5 שנות ניסיון",
  "הכשרה במכון אדלר",
  "התמחות בהדרכת הורים למתבגרים",
  "התמחות בליווי הורים לילדים על הרצף האוטיסטי",
  "ליווי בזום בכל הארץ",
];

const principles = [
  {
    title: "הורות היא מערכת יחסים, לא פרויקט ניהולי.",
    text: "שינוי אינו מתחיל בשליטה בילד, אלא בהבנת הקשר והדינמיקה המשפחתית.",
  },
  {
    title: "לא צריך להיות הורה חזק, צריך להיות הורה יציב.",
    text: "ילדים זקוקים להורה עקבי, מוביל ונוכח, לא להורה קשוח יותר.",
  },
  {
    title: "הכול מתחיל ביחסים.",
    text: "כשיש קשר, שייכות וביטחון, אפשר להציב גבולות ולבנות שיתוף פעולה.",
  },
];

const supportAreas = [
  {
    title: "גבולות וסמכות הורית",
    text: "איך להציב גבולות ברורים בלי להפוך כל בקשה למאבק.",
  },
  {
    title: "תקשורת וקשר",
    text: "איך לחזק את הקשר ולנהל שיח גם ברגעים של כעס וריחוק.",
  },
  {
    title: "אתגרי גיל ההתבגרות",
    text: "תקשורת עם מתבגרים, מסכים, עצמאות, התנגדויות ומאבקי כוח.",
  },
  {
    title: "הורות לילדים על הרצף האוטיסטי",
    text: "ליווי שמותאם לצורכי הילד, ההורים והמערכת המשפחתית.",
  },
];

const fitCards = [
  {
    title: "הורים לילדים בגיל בית הספר",
    text: "גבולות, שיתוף פעולה, מסכים, מריבות בין אחים ותקשורת בבית.",
  },
  {
    title: "הורים למתבגרים",
    text: "ריחוק, עצמאות, מאבקי כוח ויצירת תקשורת שמאפשרת גם גבולות וגם קרבה.",
  },
  {
    title: "הורים לילדים על הרצף האוטיסטי",
    text: "ליווי מותאם לצרכים הייחודיים של הילד, ההורים והמערכת המשפחתית.",
  },
];

const processSteps = [
  "שולחים הודעה ומתאמים שיחת היכרות קצרה.",
  "במפגש הראשון ממפים את האתגרים ומגדירים מטרות.",
  "בכל מפגש מקבלים הבנה, כלים ותרגול מותאם לבית.",
  "מיישמים בין המפגשים ובוחנים יחד את השינוי.",
];

const faqItems = [
  {
    question: "כמה מפגשים בדרך כלל צריך?",
    answer:
      "מספר המפגשים משתנה בהתאם לצרכים של כל משפחה. תהליך אישי נמשך לרוב 8-12 מפגשים, אך ההמלצה נקבעת לאחר היכרות.",
  },
  {
    question: "האם אפשר להתחיל גם אם רק אחד ההורים משתתף?",
    answer:
      "כן. גם הורה אחד יכול להתחיל שינוי משמעותי בהתנהלות ובמערכת המשפחתית.",
  },
  {
    question: "האם כל התהליך מתקיים בזום?",
    answer: "כן. הליווי מתקיים אונליין בזום וזמין להורים בכל הארץ.",
  },
  {
    question: "האם מקבלים כלים ליישום בבית?",
    answer:
      "כן. כל מפגש כולל כלים ותרגול מעשי שאפשר ליישם בבית בין המפגשים.",
  },
  {
    question: "האם הילדים משתתפים במפגשים?",
    answer: "לא. המפגשים מתקיימים עם ההורים.",
  },
  {
    question: "האם הליווי מתאים להורים למתבגרים?",
    answer:
      "כן. שירה מתמחה בליווי הורים למתבגרים ובתקשורת בתקופה שבה הילדים מפתחים עצמאות וזהות.",
  },
  {
    question: "האם הליווי מתאים להורים לילדים על הרצף האוטיסטי?",
    answer:
      "כן. הליווי מותאם לצרכים הייחודיים של הילד, ההורים והמשפחה.",
  },
  {
    question: "איך קובעים שיחת היכרות?",
    answer: "שולחים הודעת וואטסאפ ומתאמים שיחת היכרות קצרה.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "שירה לוין",
      jobTitle: "מדריכת הורים ומנחת קבוצות",
      worksFor: {
        "@type": "Organization",
        name: "לב ההורות",
      },
      email: "shumi25@gmail.com",
      telephone: "+972507532044",
      sameAs: [instagramUrl, facebookUrl],
    },
    {
      "@type": "ProfessionalService",
      name: "לב ההורות",
      description:
        "הדרכת הורים אונליין בגישת אדלר להורים לילדים בגיל בית הספר, למתבגרים ולהורים לילדים על הרצף האוטיסטי.",
      areaServed: "Israel",
      serviceType: "הדרכת הורים אונליין",
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: "https://wa.me/972507532044",
        availableLanguage: "he",
      },
      sameAs: [instagramUrl, facebookUrl],
    },
  ],
};

type Preferences = {
  scale: number;
  highContrast: boolean;
  grayscale: boolean;
  highlightLinks: boolean;
  reduceMotion: boolean;
  readableFont: boolean;
};

const defaultPreferences: Preferences = {
  scale: 1,
  highContrast: false,
  grayscale: false,
  highlightLinks: false,
  reduceMotion: false,
  readableFont: false,
};

function ContactIcon() {
  return (
    <svg
      className="contact-icon"
      aria-hidden="true"
      viewBox="0 0 24 24"
      focusable="false"
    >
      <path d="M12 4.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15Zm0 12.2a4.7 4.7 0 1 1 0-9.4 4.7 4.7 0 0 1 0 9.4Z" />
    </svg>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");
  const [preferences, setPreferences] = useState(defaultPreferences);

  const bodyClass = useMemo(
    () =>
      [
        preferences.highContrast ? "pref-high-contrast" : "",
        preferences.grayscale ? "pref-grayscale" : "",
        preferences.highlightLinks ? "pref-highlight-links" : "",
        preferences.reduceMotion ? "pref-reduce-motion" : "",
        preferences.readableFont ? "pref-readable-font" : "",
      ]
        .filter(Boolean)
        .join(" "),
    [preferences],
  );

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--user-font-scale",
      String(preferences.scale),
    );
    document.body.className = bodyClass;

    return () => {
      document.body.className = "";
    };
  }, [bodyClass, preferences.scale]);

  const updatePreference = (key: keyof Preferences, value: boolean | number) => {
    setPreferences((current) => ({ ...current, [key]: value }));
  };

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const childAge = String(formData.get("childAge") || "").trim();
    const privacy = formData.get("privacy");

    if (!name || !phone || !childAge || !privacy) {
      setStatus("חסרים פרטים בטופס. אנא מלאו שם, טלפון, גיל ואישור מדיניות פרטיות.");
      setStatusType("error");
      return;
    }

    setStatus(
      "הטופס מוכן, אך עדיין לא מחובר לשירות שליחה. בשלב הפרסום יש לחבר אותו לספק טפסים או לשליחה מאובטחת.",
    );
    setStatusType("success");
  };

  return (
    <>
      {/* TODO: update canonical and og:url after final domain is assigned */}
      {/* TODO: create final 1200x630 social share image using approved logo and portrait */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <a className="skip-link" href="#main-content">
        דילוג לתוכן הראשי
      </a>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label="לב ההורות, מעבר לראש העמוד">
            <img
              src="/assets/lev-hahorut-logo-512.png"
              alt="לב ההורות - הדרכת הורים עם שירה לוין"
              width="512"
              height="512"
              className="brand-logo"
              decoding="async"
            />
            <span>
              <strong>לב ההורות</strong>
              <small>שירה לוין</small>
            </span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label="פתיחת תפריט ניווט"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            onClick={() => setMenuOpen((value) => !value)}
          >
            תפריט
          </button>

          <nav
            id="site-nav"
            className={menuOpen ? "site-nav is-open" : "site-nav"}
            aria-label="ניווט ראשי"
          >
            <a href="#fit" onClick={() => setMenuOpen(false)}>
              למי מתאים
            </a>
            <a href="#help" onClick={() => setMenuOpen(false)}>
              איך אני עוזרת
            </a>
            <a href="#services" onClick={() => setMenuOpen(false)}>
              השירותים
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              עליי
            </a>
            <a href="#faq" onClick={() => setMenuOpen(false)}>
              שאלות נפוצות
            </a>
          </nav>

          <a
            className="button button-small header-cta"
            href={whatsappMessage}
            target="_blank"
            rel="noopener noreferrer"
          >
            לתיאום שיחת היכרות
          </a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero section" id="top" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">הדרכת הורים אונליין בגישת אדלר</p>
              <h1 id="hero-title">לב ההורות</h1>
              <p className="hero-kicker">הדרכת הורים שמתחילה ביחסים</p>
              <p className="hero-identity">שירה לוין, מדריכת הורים ומנחת קבוצות בגישת אדלר</p>
              <p className="hero-subtitle">חיזוק הקשר, הסמכות ההורית והתקשורת בבית</p>
              <p>
                אני מלווה הורים לילדים בגיל בית הספר, למתבגרים ולהורים לילדים על
                הרצף האוטיסטי, בתהליך אישי ואונליין ליצירת בית בטוח, יציב ומחבר.
              </p>
              <p className="lead-note">
                הכול מתחיל ביחסים. כשהקשר בין הורה לילד טוב, שיתוף הפעולה גדל.
              </p>
              <div className="hero-actions">
                <a
                  className="button"
                  href={whatsappMessage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  לתיאום שיחת היכרות בוואטסאפ
                </a>
                <a className="text-link" href="#process">
                  איך נראה התהליך?
                </a>
              </div>
              <p className="microcopy">שיחת היכרות קצרה וללא התחייבות</p>
            </div>

            <figure className="image-card hero-image">
              <img
                src="/assets/shira-levin-hero.webp"
                alt="שירה לוין, מדריכת הורים ומנחת קבוצות בגישת אדלר"
                width="960"
                height="1200"
                loading="eager"
                fetchPriority="high"
              />
            </figure>
          </div>
        </section>

        <section className="trust-strip" aria-label="פרטי אמון">
          <div className="container trust-grid">
            {trustItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>

        <section className="section soft-section" aria-labelledby="need-title">
          <div className="container narrow">
            <h2 id="need-title">אולי גם אצלכם בבית...</h2>
            <div className="emotion-list">
              <p>כל בקשה הופכת לוויכוח.</p>
              <p>קשה להציב גבולות בלי להגיע למאבק.</p>
              <p>המתבגר מתרחק וקשה להגיע אליו.</p>
              <p>אתם רוצים להיות מכילים, אבל מרגישים שהסמכות ההורית נשחקה.</p>
              <p>בסוף היום נשארים עם תסכול, אשמה ותחושה שכבר ניסיתם הכול.</p>
            </div>
            <p className="section-summary">
              הקושי אינו אומר שנכשלתם כהורים. הוא אומר שהמשפחה זקוקה לדרך חדשה
              להיפגש.
            </p>
            <a className="button" href={whatsappMessage} target="_blank" rel="noopener noreferrer">
              לתיאום שיחת היכרות בוואטסאפ
            </a>
          </div>
        </section>

        <section className="section" aria-labelledby="principles-title">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">הגישה המקצועית</p>
              <h2 id="principles-title">שלושה עקרונות שמחזיקים את הדרך</h2>
            </div>
            <div className="cards three-columns">
              {principles.map((principle) => (
                <article className="card" key={principle.title}>
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section tinted-section" id="fit" aria-labelledby="fit-title">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">למי מתאים</p>
              <h2 id="fit-title">למי הליווי מתאים?</h2>
            </div>
            <div className="cards three-columns fit-cards">
              {fitCards.map((card) => (
                <article className="card" key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
            <p className="fit-note">
              הליווי מתאים לאימהות, לאבות ולזוגות הורים. גם כאשר רק הורה אחד
              משתתף, הוא יכול להתחיל שינוי משמעותי במערכת המשפחתית.
            </p>
          </div>
        </section>

        <section className="section" id="help" aria-labelledby="help-title">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">איך אני יכולה לעזור</p>
              <h2 id="help-title">במה אני יכולה לעזור?</h2>
            </div>
            <div className="cards two-columns">
              {supportAreas.map((area) => (
                <article className="card" key={area.title}>
                  <h3>{area.title}</h3>
                  <p>{area.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section service-highlight" id="services" aria-labelledby="services-title">
          <div className="container service-grid">
            <div>
              <p className="eyebrow">השירות המרכזי</p>
              <h2 id="services-title">הדרכת הורים אישית אונליין</h2>
              <p>
                תהליך אישי שמחבר בין הבנת הדינמיקה המשפחתית לבין כלים מעשיים
                שאפשר ליישם בבית.
              </p>
              <ul className="check-list">
                <li>לרוב 8 עד 12 מפגשים, בהתאם לצורך</li>
                <li>מפגשים אונליין בזום</li>
                <li>משימות וכלים בין המפגשים</li>
                <li>ליווי בוואטסאפ לאורך התהליך</li>
                <li>הגדרת מטרות ובחינת ההתקדמות</li>
              </ul>
            </div>
            <aside className="service-side" aria-label="שירותים נוספים">
              <h3>אפשרויות נוספות</h3>
              <ul>
                <li>פגישת ייעוץ ממוקדת</li>
                <li>ליווי מתמשך</li>
                <li>הרצאות להורים</li>
                <li>סדנאות קבוצתיות</li>
                <li>וובינרים</li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="section" id="process" aria-labelledby="process-title">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">הדרך בפועל</p>
              <h2 id="process-title">איך נראה התהליך?</h2>
            </div>
            <ol className="process-list">
              {processSteps.map((step, index) => (
                <li key={step}>
                  <span aria-hidden="true">{index + 1}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section soft-section" aria-labelledby="strengthen-title">
          <div className="container split">
            <div>
              <p className="eyebrow">מה נרצה לחזק</p>
              <h2 id="strengthen-title">להוביל את המשפחה מתוך בהירות</h2>
              <p>
                המטרה היא שתוכלו להבין טוב יותר את הילדים שלכם, להציב גבולות מתוך
                בהירות, לנהל שיח גם ברגעים מורכבים ולהרגיש שוב שאתם יודעים להוביל
                את המשפחה.
              </p>
              <p className="list-intro">בתהליך נרצה לחזק:</p>
            </div>
            <ul className="check-list">
              <li>יותר ביטחון ומסוגלות הורית</li>
              <li>תקשורת רגועה ומכבדת יותר</li>
              <li>גבולות ברורים ועקביים</li>
              <li>קשר קרוב ובטוח יותר</li>
            </ul>
          </div>
        </section>

        <section className="section" id="about" aria-labelledby="about-title">
          <div className="container about-grid">
            <figure className="image-card about-image">
              <img
                src="/assets/shira-levin-about.webp"
                alt="שירה לוין, מייסדת לב ההורות ומדריכת הורים"
                width="900"
                height="1125"
                loading="lazy"
              />
            </figure>
            <div>
              <p className="eyebrow">קצת עליי</p>
              <h2 id="about-title">נעים להכיר, אני שירה לוין</h2>
              <p>
                אני מדריכת הורים ומנחת קבוצות, ומלווה הורים לילדים ולמתבגרים בדרך
                לבניית קשר קרוב, גבולות ברורים ותחושת ביטחון בבית.
              </p>
              <p>
                הגישה שלי מבוססת על עקרונות אדלריאניים ועל ההבנה שהורות היא מערכת
                יחסים. בתהליך אני משלבת הקשבה, אמפתיה והבנת עולמו של הילד עם
                אחריות הורית וכלים מעשיים.
              </p>
              <p>
                חשוב לי שהורים שמגיעים אליי ירגישו שהם אינם לבד, שאין כאן שיפוטיות
                ושאפשר לצאת בהדרגה מהבלבול ומהמאבק.
              </p>
              <h3>הכשרות וניסיון</h3>
              <ul className="check-list">
                <li>הדרכת הורים והנחיית קבוצות במכון אדלר</li>
                <li>התמחות בהדרכת הורים למתבגרים</li>
                <li>התמחות בליווי הורים לילדים על הרצף האוטיסטי</li>
                <li>5 שנות ניסיון בליווי הורים ומשפחות</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section testimonials is-pending" aria-labelledby="testimonials-title">
          {/* TODO: insert real client-approved testimonials */}
          <div className="container">
            <h2 id="testimonials-title">המלצות</h2>
            <p>אזור זה ייפתח לאחר קבלת המלצות מאושרות לפרסום.</p>
          </div>
        </section>

        <section className="section" id="faq" aria-labelledby="faq-title">
          <div className="container narrow">
            <div className="section-heading">
              <p className="eyebrow">שאלות נפוצות</p>
              <h2 id="faq-title">מה הורים שואלים לפני שמתחילים?</h2>
            </div>
            <div className="faq-list">
              {faqItems.map((item, index) => {
                const isOpen = openFaq === index;
                const panelId = `faq-panel-${index}`;
                const buttonId = `faq-button-${index}`;
                return (
                  <article className="faq-item" key={item.question}>
                    <h3>
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                      >
                        {item.question}
                        <span aria-hidden="true">{isOpen ? "-" : "+"}</span>
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      hidden={!isOpen}
                    >
                      <p>{item.answer}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section final-cta" aria-labelledby="final-title">
          <div className="container narrow">
            <h2 id="final-title">כל שינוי גדול מתחיל בצעד קטן</h2>
            <p>
              אם אתם רוצים לחזק את הקשר עם הילדים, להציב גבולות מתוך ביטחון
              ולהחזיר לבית יותר רוגע ושיתוף פעולה, אני מזמינה אתכם לשיחת היכרות
              קצרה.
            </p>
            <a className="button" href={whatsappMessage} target="_blank" rel="noopener noreferrer">
              לתיאום שיחת היכרות בוואטסאפ
            </a>
          </div>
        </section>

        <section className="section contact-section" id="contact" aria-labelledby="contact-title">
          <div className="container contact-grid">
            <div>
              <p className="eyebrow">יצירת קשר</p>
              <h2 id="contact-title">אפשר להתחיל בהודעה קצרה</h2>
              <p>שלחו לי הודעה ואחזור אליכם לתיאום שיחת היכרות קצרה.</p>
              <div className="contact-list" aria-label="אפשרויות יצירת קשר">
                <a
                  className="contact-link"
                  href={whatsappMessage}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="שלחו לי הודעה בוואטסאפ"
                  data-track="click_whatsapp"
                >
                  <ContactIcon />
                  <span>שלחו לי הודעה בוואטסאפ</span>
                </a>
                <a className="contact-link" href="tel:+972507532044" data-track="click_phone">
                  <ContactIcon />
                  <span>050-753-2044</span>
                </a>
                <a className="contact-link" href="mailto:shumi25@gmail.com">
                  <ContactIcon />
                  <span>shumi25@gmail.com</span>
                </a>
                <a
                  className="contact-link"
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="אינסטגרם של שירה לוין"
                  data-track="open_instagram"
                >
                  <ContactIcon />
                  <span>@shira_goldman_levin</span>
                </a>
                <a
                  className="contact-link"
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="פייסבוק של שירה גולדמן לוין"
                  data-track="open_facebook"
                >
                  <ContactIcon />
                  <span>שירה גולדמן לוין</span>
                </a>
              </div>
            </div>

            <form
              className="contact-form"
              action="#"
              method="post"
              noValidate
              onSubmit={submitContact}
            >
              {/* TODO: connect form to approved backend or form service */}
              <div className="field">
                <label htmlFor="name">שם מלא</label>
                <input id="name" name="name" type="text" autoComplete="name" required />
              </div>
              <div className="field">
                <label htmlFor="phone">טלפון</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="childAge">גיל הילד, הילדה או הילדים</label>
                <input id="childAge" name="childAge" type="text" required />
              </div>
              <div className="field">
                <label htmlFor="message">הודעה</label>
                <textarea id="message" name="message" rows={4} />
              </div>
              <label className="checkbox-field" htmlFor="privacy">
                <input id="privacy" name="privacy" type="checkbox" required />
                <span>
                  קראתי את <a href="/privacy.html">מדיניות הפרטיות</a> ואני מאשר/ת
                  את שליחת הפרטים לצורך יצירת קשר.
                </span>
              </label>
              <button className="button" type="submit" data-track="submit_contact_form">
                שליחת פרטים
              </button>
              <p
                className={statusType ? `form-status ${statusType}` : "form-status"}
                role="status"
                aria-live="polite"
              >
                {status}
              </p>
              <p className="form-note">אחזור אליכם בהקדם לתיאום שיחת היכרות קצרה.</p>
            </form>
          </div>
        </section>

      </main>

      <div className="accessibility-widget">
        <button
          className="accessibility-trigger"
          type="button"
          aria-label="פתיחת תפריט נגישות"
          aria-expanded={accessibilityOpen}
          aria-controls="accessibility-menu"
          onClick={() => setAccessibilityOpen((value) => !value)}
        >
          נגישות
        </button>
        <div
          id="accessibility-menu"
          className={accessibilityOpen ? "accessibility-menu is-open" : "accessibility-menu"}
          hidden={!accessibilityOpen}
        >
          <p className="menu-title">אפשרויות נגישות</p>
          <button
            type="button"
            onClick={() => updatePreference("scale", Math.min(1.18, preferences.scale + 0.06))}
          >
            הגדלת טקסט
          </button>
          <button
            type="button"
            onClick={() => updatePreference("scale", Math.max(0.94, preferences.scale - 0.06))}
          >
            הקטנת טקסט
          </button>
          <button
            type="button"
            aria-pressed={preferences.highContrast}
            onClick={() => updatePreference("highContrast", !preferences.highContrast)}
          >
            ניגודיות גבוהה
          </button>
          <button
            type="button"
            aria-pressed={preferences.grayscale}
            onClick={() => updatePreference("grayscale", !preferences.grayscale)}
          >
            גווני אפור
          </button>
          <button
            type="button"
            aria-pressed={preferences.highlightLinks}
            onClick={() => updatePreference("highlightLinks", !preferences.highlightLinks)}
          >
            הדגשת קישורים
          </button>
          <button
            type="button"
            aria-pressed={preferences.reduceMotion}
            onClick={() => updatePreference("reduceMotion", !preferences.reduceMotion)}
          >
            עצירת אנימציות
          </button>
          <button
            type="button"
            aria-pressed={preferences.readableFont}
            onClick={() => updatePreference("readableFont", !preferences.readableFont)}
          >
            גופן קריא
          </button>
          <button type="button" onClick={() => setPreferences(defaultPreferences)}>
            איפוס הגדרות
          </button>
          <a href="/accessibility.html" onClick={() => setAccessibilityOpen(false)}>
            הצהרת הנגישות
          </a>
        </div>
      </div>

      <a
        className="sticky-whatsapp"
        href={whatsappMessage}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="שליחת הודעת וואטסאפ לשירה לוין לתיאום שיחת היכרות"
        data-track="click_whatsapp"
      >
        לתיאום שיחת היכרות בוואטסאפ
      </a>

      <footer className="site-footer">
        <div className="container footer-links">
          <a href="/accessibility.html">הצהרת נגישות</a>
          <a href="/privacy.html">מדיניות פרטיות</a>
        </div>
        <div className="creator-footer">
          <p>נבנה ועוצב על ידי טלי רוזנברג | אסטרטגיה וצמיחה עסקית</p>
          <p>כרטיסי שיווק דיגיטליים חכמים לעסקים</p>
          <a
            href="https://wa.me/message/R774GIXF2DOGP1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="לבניית כרטיס שיווק דיגיטלי"
          >
            לבניית כרטיס שיווק דיגיטלי
          </a>
        </div>
      </footer>
    </>
  );
}
