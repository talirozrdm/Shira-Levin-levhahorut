"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";

const whatsappMessage =
  "https://wa.me/972507532044?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%A9%D7%99%D7%A8%D7%94%2C%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20%D7%94%D7%9B%D7%A8%D7%98%D7%99%D7%A1%20%D7%A9%D7%9C%20%D7%9C%D7%91%20%D7%94%D7%94%D7%95%D7%A8%D7%95%D7%AA%20%D7%95%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%AA%D7%90%D7%9D%20%D7%A9%D7%99%D7%97%D7%AA%20%D7%94%D7%99%D7%9B%D7%A8%D7%95%D7%AA";

const trustItems = [
  "5 שנות ניסיון",
  "הכשרה במכון אדלר",
  "התמחות בהדרכת הורים למתבגרים",
  "התמחות בהדרכת הורים לילדים על הרצף האוטיסטי",
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
    text: "הצבת גבולות, עקביות, מאבקי כוח וחוסר שיתוף פעולה.",
  },
  {
    title: "תקשורת וקשר",
    text: "ריחוק, צעקות, קושי בשיח וחיזוק הקשר בין הורים לילדים.",
  },
  {
    title: "אתגרי גיל ההתבגרות",
    text: "עצמאות, מסכים, התנגדויות, סערות רגשיות ותקשורת עם מתבגרים.",
  },
  {
    title: "הורות לילדים על הרצף האוטיסטי",
    text: "ליווי המותאם לצורכי הילד, ההורים והמערכת המשפחתית.",
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
            {/* TODO: replace with final high-resolution transparent logo supplied by client */}
            <Image
              src="/assets/lev-hahorut-logo-placeholder.png"
              alt="לב ההורות - הדרכת הורים עם שירה לוין"
              width="72"
              height="72"
              className="brand-logo"
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
              <h1 id="hero-title">לב ההורות - הדרכת הורים שמתחילה ביחסים</h1>
              <p className="hero-subtitle">חיזוק הקשר, הסמכות ההורית והתקשורת בבית</p>
              <p>
                אני שירה לוין, מדריכת הורים בגישת אדלר. אני מלווה הורים לילדים בגיל
                בית הספר, למתבגרים ולהורים לילדים על הרצף האוטיסטי, בתהליך אישי
                ואונליין ליצירת בית בטוח, יציב ומחבר.
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
                  בואו נבדוק מה נכון למשפחה שלכם
                </a>
                <a className="text-link" href="#process">
                  איך נראה התהליך?
                </a>
              </div>
              <p className="microcopy">שיחת היכרות קצרה וללא התחייבות</p>
            </div>

            <figure className="image-card hero-image">
              {/* TODO: replace hero placeholder with approved brand photo, WebP or optimized PNG preferred */}
              <Image
                src="/assets/hero-parent-guidance-placeholder.png"
                alt="איור עדין וניטרלי המסמן קשר, יציבות והקשבה במשפחה"
                width="720"
                height="840"
                priority
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
          <div className="container split">
            <div>
              <p className="eyebrow">למי מתאים</p>
              <h2 id="fit-title">למי הליווי מתאים?</h2>
              <p>
                הליווי מתאים לאימהות, לאבות ולזוגות הורים. גם כאשר רק הורה אחד
                משתתף, הוא יכול להתחיל שינוי משמעותי במערכת המשפחתית.
              </p>
            </div>
            <ul className="check-list">
              <li>הורים לילדים בגיל בית הספר</li>
              <li>הורים למתבגרים</li>
              <li>הורים לילדים על הרצף האוטיסטי</li>
            </ul>
          </div>
        </section>

        <section className="section" id="help" aria-labelledby="help-title">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">איך אני יכולה לעזור</p>
              <h2 id="help-title">ארבעה אשכולות ליווי מרכזיים</h2>
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
                תהליך אישי ומותאם למשפחה, המשלב הבנה מעמיקה של הדינמיקה בבית עם
                כלים מעשיים ליישום בין המפגשים.
              </p>
              <ul className="check-list">
                <li>לרוב 8-12 מפגשים, בהתאם לצורך</li>
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
              {/* TODO: replace about placeholder with approved portrait or brand image supplied by client */}
              <Image
                src="/assets/about-shira-placeholder.png"
                alt="מקום שמור לתמונת תדמית מאושרת של שירה לוין"
                width="640"
                height="720"
                loading="lazy"
              />
            </figure>
            <div>
              <p className="eyebrow">קצת עליי</p>
              <h2 id="about-title">נעים להכיר, אני שירה לוין</h2>
              <p>
                אני מדריכת הורים ומנחת קבוצות, ומלווה הורים לילדים ולמתבגרים בדרך
                ליצירת מערכות יחסים קרובות, בטוחות ומיטיבות יותר בתוך המשפחה.
              </p>
              <p>
                הגישה שלי מבוססת על עקרונות אדלריאניים ועל הסתכלות על המשפחה כמערכת
                שלמה. אני משלבת הקשבה והבנה עמוקה של עולמם הרגשי של הילדים עם
                גבולות, אחריות הורית וכלים מעשיים שאפשר ליישם בבית.
              </p>
              <p>
                חשוב לי שהורים שמגיעים אליי ירגישו שהם אינם לבד, שאין כאן שיפוטיות
                ושאפשר לצאת בהדרגה מהבלבול ומהמאבק.
              </p>
              <h3>הכשרות וניסיון</h3>
              <ul className="check-list">
                <li>הדרכת הורים והנחיית קבוצות במכון אדלר</li>
                <li>התמחות בהדרכת הורים למתבגרים</li>
                <li>התמחות בהדרכת הורים לילדים על הרצף האוטיסטי</li>
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
              שינוי בבית אינו מתחיל בשלמות. הוא מתחיל ברגע שבו בוחרים לעצור, להבין
              ולפעול אחרת.
            </p>
            <p>
              אם אתם רוצים לחזק את הקשר עם הילדים, להציב גבולות מתוך ביטחון ולהחזיר
              לבית יותר רוגע ושיתוף פעולה, אני מזמינה אתכם לשיחת היכרות קצרה, שבה
              נבין מה אתם חווים ונבדוק מה נכון עבור המשפחה שלכם.
            </p>
            <a className="button" href={whatsappMessage} target="_blank" rel="noopener noreferrer">
              בואו נבדוק מה נכון למשפחה שלכם
            </a>
          </div>
        </section>

        <section className="section contact-section" id="contact" aria-labelledby="contact-title">
          <div className="container contact-grid">
            <div>
              <p className="eyebrow">יצירת קשר</p>
              <h2 id="contact-title">אפשר להתחיל בהודעה קצרה</h2>
              <ul className="contact-list">
                <li>
                  <strong>טלפון:</strong>{" "}
                  <a href="tel:+972507532044" data-track="click_phone">
                    050-753-2044
                  </a>
                </li>
                <li>
                  <strong>אימייל:</strong>{" "}
                  <a href="mailto:shumi25@gmail.com">shumi25@gmail.com</a>
                </li>
                <li>
                  <strong>וואטסאפ:</strong>{" "}
                  <a
                    href={whatsappMessage}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="click_whatsapp"
                  >
                    שליחת הודעה לשירה
                  </a>
                </li>
                <li>
                  <strong>אינסטגרם:</strong>{" "}
                  <a
                    href="https://www.instagram.com/shira_goldman_levin/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="open_instagram"
                  >
                    shira_goldman_levin
                  </a>
                </li>
                <li>
                  <strong>פייסבוק:</strong> Shira Goldman-Levin
                </li>
              </ul>
            </div>

            <form
              className="contact-form"
              action="#"
              method="post"
              noValidate
              onSubmit={submitContact}
            >
              {/* TODO: connect this form to a real form service or secure backend before publishing */}
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
                <label htmlFor="childAge">גיל הילד/ה או הילדים</label>
                <input id="childAge" name="childAge" type="text" required />
              </div>
              <div className="field">
                <label htmlFor="message">הודעה</label>
                <textarea id="message" name="message" rows={4} />
              </div>
              <label className="checkbox-field" htmlFor="privacy">
                <input id="privacy" name="privacy" type="checkbox" required />
                <span>
                  קראתי את <a href="#privacy-policy">מדיניות הפרטיות</a> ואני מאשר/ת
                  יצירת קשר.
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
            </form>
          </div>
        </section>

        <section className="section legal-section" id="accessibility" aria-labelledby="accessibility-title">
          <div className="container narrow">
            {/* TODO: review accessibility statement wording before publishing */}
            <h2 id="accessibility-title">הצהרת נגישות</h2>
            <p>
              לב ההורות מחויבת לאפשר שימוש נגיש ונוח ככל האפשר באתר, מתוך כבוד
              להורים ולמבקרים המשתמשים באמצעים שונים לגלישה.
            </p>
            <h3>התאמות שבוצעו בפועל</h3>
            <p>
              העמוד נבנה ב-HTML סמנטי, כולל כותרות מסודרות, קישור דילוג לתוכן
              הראשי, מצבי פוקוס ברורים, labels גלויים לשדות, alt לתמונות, ניווט
              מקלדת, תמיכה בהעדפת הפחתת תנועה ותפריט נגישות בסיסי.
            </p>
            <h3>ניווט ושימוש</h3>
            <p>
              ניתן לנווט באתר באמצעות מקלדת, לפתוח את תפריט הניווט, לפתוח ולסגור
              שאלות נפוצות, לעבור בין שדות הטופס ולהפעיל את תפריט הנגישות.
            </p>
            <h3>דיווח על קושי</h3>
            <p>
              אם נתקלתם בקושי בשימוש באתר, ניתן לפנות לשירה לוין בטלפון
              050-753-2044 או במייל shumi25@gmail.com.
            </p>
            <h3>מגבלות קיימות</h3>
            <p>
              בשלב זה תמונות התדמית והלוגו הם placeholders זמניים. לאחר קבלת חומרי
              המותג הסופיים יש לבדוק שוב את הטקסט החלופי, משקל הקבצים והתצוגה.
            </p>
            <p className="updated">תאריך עדכון: 16 ביולי 2026</p>
          </div>
        </section>

        <section className="section legal-section" id="privacy-policy" aria-labelledby="privacy-title">
          <div className="container narrow">
            {/* TODO: legal review of privacy policy before publishing */}
            <h2 id="privacy-title">מדיניות פרטיות</h2>
            <p>
              הטופס באתר מיועד לאפשר חזרה לפונים ומתן מידע על שירותי הדרכת ההורים
              של לב ההורות.
            </p>
            <h3>איזה מידע נאסף</h3>
            <p>
              בטופס נאספים שם, טלפון, גיל הילד/ה או הילדים והודעה חופשית, אם נכתבה.
            </p>
            <h3>מטרת איסוף המידע</h3>
            <p>
              המידע מיועד ליצירת קשר עם הפונה, לתיאום שיחת היכרות ולמתן מידע על
              השירותים.
            </p>
            <h3>עדכון או מחיקה</h3>
            <p>
              ניתן לבקש עדכון או מחיקה של פרטים באמצעות פנייה לכתובת
              shumi25@gmail.com או לטלפון 050-753-2044.
            </p>
            <h3>עוגיות וכלי מדידה</h3>
            <p>
              בשלב זה לא נטענים באתר Google Analytics, Meta Pixel או כלי מדידה
              חיצוניים. אם יופעלו בעתיד, יש לעדכן מדיניות זו ולקבל את האישורים
              הנדרשים לפני הטמעה.
            </p>
            <p className="updated">תאריך עדכון: 16 ביולי 2026</p>
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
          <a href="#accessibility" onClick={() => setAccessibilityOpen(false)}>
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
          <a href="#accessibility">הצהרת נגישות</a>
          <a href="#privacy-policy">מדיניות פרטיות</a>
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
