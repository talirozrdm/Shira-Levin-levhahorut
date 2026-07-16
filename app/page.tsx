"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useState } from "react";

const whatsappMessage =
  "https://wa.me/972507532044?text=%D7%A9%D7%9C%D7%95%D7%9D%20%D7%A9%D7%99%D7%A8%D7%94%2C%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20%D7%94%D7%90%D7%AA%D7%A8%20%D7%A9%D7%9C%20%D7%9C%D7%91%20%D7%94%D7%94%D7%95%D7%A8%D7%95%D7%AA%20%D7%95%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%AA%D7%90%D7%9D%20%D7%A9%D7%99%D7%97%D7%AA%20%D7%94%D7%99%D7%9B%D7%A8%D7%95%D7%AA";
const instagramUrl = "https://www.instagram.com/shira_goldman_levin/";
const facebookUrl = "https://www.facebook.com/shira.goldmanlevin?locale=he_IL";

const trustItems = [
  {
    title: "5 שנות ניסיון",
    text: "אני מלווה הורים ומשפחות",
  },
  {
    title: "גישת אדלר",
    text: "אני מדריכת הורים ומנחת קבוצות",
  },
  {
    title: "התמחות במתבגרים",
    text: "אני מלווה הורים בגיל ההתבגרות",
  },
  {
    title: "התמחות ברצף האוטיסטי",
    text: "אני מתאימה את הליווי לצורכי המשפחה",
  },
  {
    title: "ליווי אונליין",
    text: "אני מלווה בזום בכל הארץ",
  },
];

const principles = [
  {
    title: "הורות היא מערכת יחסים, לא פרויקט ניהולי.",
    text: "אני מאמינה ששינוי אינו מתחיל בשליטה בילד, אלא בהבנת הקשר והדינמיקה המשפחתית.",
  },
  {
    title: "לא צריך להיות הורה חזק, צריך להיות הורה יציב.",
    text: "אני מאמינה שילדים זקוקים להורה עקבי, מוביל ונוכח, לא להורה קשוח יותר.",
  },
  {
    title: "הכול מתחיל ביחסים.",
    text: "אני רואה שוב ושוב שכאשר יש קשר, שייכות וביטחון, אפשר להציב גבולות ולבנות שיתוף פעולה.",
  },
];

const supportAreas = [
  {
    title: "גבולות וסמכות הורית",
    text: "אני עוזרת להציב גבולות ברורים בלי להפוך כל בקשה למאבק.",
  },
  {
    title: "תקשורת וקשר",
    text: "אני עוזרת לחזק את הקשר ולנהל שיח גם ברגעים של כעס וריחוק.",
  },
  {
    title: "אתגרי גיל ההתבגרות",
    text: "אני מלווה סביב תקשורת עם מתבגרים, מסכים, עצמאות, התנגדויות ומאבקי כוח.",
  },
  {
    title: "הורות לילדים על הרצף האוטיסטי",
    text: "אני מתאימה את הליווי לצורכי הילד, ההורים והמערכת המשפחתית.",
  },
];

const fitCards = [
  {
    title: "הורים לילדים בגיל בית הספר",
    text: "אני מלווה סביב גבולות, שיתוף פעולה, מסכים, מריבות בין אחים ותקשורת בבית.",
  },
  {
    title: "הורים למתבגרים",
    text: "אני מלווה סביב ריחוק, עצמאות, מאבקי כוח ויצירת תקשורת שמאפשרת גם גבולות וגם קרבה.",
  },
  {
    title: "הורים לילדים על הרצף האוטיסטי",
    text: "אני מתאימה את הליווי לצרכים הייחודיים של הילד, ההורים והמערכת המשפחתית.",
  },
];

const processSteps = [
  "אתם שולחים הודעה, ואני מתאמת איתכם שיחת היכרות קצרה.",
  "במפגש הראשון אני ממפה יחד איתכם את האתגרים ומגדירה מטרות.",
  "בכל מפגש אני משלבת הבנה, כלים ותרגול מותאם לבית.",
  "בין המפגשים אתם מיישמים, ובמפגש הבא אני בוחנת יחד איתכם את ההתקדמות.",
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
    answer: "כן. אני מלווה אונליין בזום, כך שאפשר להצטרף מכל מקום בארץ.",
  },
  {
    question: "האם מקבלים כלים ליישום בבית?",
    answer:
      "כן. בכל מפגש אני משלבת כלים ותרגול מעשי שאפשר ליישם בבית בין המפגשים.",
  },
  {
    question: "האם הילדים משתתפים במפגשים?",
    answer: "לא. אני מקיימת את המפגשים עם ההורים.",
  },
  {
    question: "האם הליווי מתאים להורים למתבגרים?",
    answer:
      "כן. אני מתמחה בליווי הורים למתבגרים ובתקשורת בתקופה שבה הילדים מפתחים עצמאות וזהות.",
  },
  {
    question: "האם הליווי מתאים להורים לילדים על הרצף האוטיסטי?",
    answer:
      "כן. אני מתאימה את הליווי לצרכים הייחודיים של הילד, ההורים והמשפחה.",
  },
  {
    question: "איך קובעים שיחת היכרות?",
    answer: "אתם שולחים הודעת וואטסאפ, ואני מתאמת איתכם שיחת היכרות קצרה.",
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
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
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

type ContactIconName = "whatsapp" | "phone" | "mail" | "instagram" | "facebook";

const directWhatsappLabel = "שלחו לי הודעה בוואטסאפ";
const directPhoneLabel = "התקשרו אליי";
const directEmailLabel = "שלחו לי מייל";
const instagramLabel = "לעמוד האינסטגרם";
const facebookLabel = "לעמוד הפייסבוק";

function ContactIcon({ name }: { name: ContactIconName }) {
  const paths: Record<ContactIconName, string> = {
    whatsapp:
      "M12.04 4.25a7.55 7.55 0 0 0-6.45 11.48l-.72 3.04 3.12-.7a7.55 7.55 0 1 0 4.05-13.82Zm0 1.65a5.9 5.9 0 1 1-3.12 10.91l-.3-.18-1.63.36.38-1.58-.2-.32A5.9 5.9 0 0 1 12.04 5.9Zm-2.3 3.1c-.16 0-.42.06-.64.3-.22.25-.84.83-.84 2.03 0 1.2.86 2.36.98 2.52.12.16 1.68 2.68 4.16 3.65 2.06.8 2.48.64 2.92.6.45-.04 1.44-.6 1.64-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.47-.29-.25-.12-1.44-.72-1.67-.8-.22-.08-.39-.12-.55.13-.16.25-.63.8-.77.96-.14.17-.28.19-.53.06-.24-.12-1.03-.38-1.96-1.22-.73-.65-1.22-1.45-1.36-1.7-.14-.25-.02-.38.1-.5.11-.1.25-.27.37-.41.12-.15.16-.25.24-.42.08-.16.04-.31-.02-.44-.06-.12-.55-1.35-.75-1.84-.2-.47-.4-.4-.55-.4h-.46Z",
    phone:
      "M7.15 5.05c.33-.33.87-.33 1.2 0l1.86 1.86c.3.3.33.78.08 1.12l-.86 1.14a.9.9 0 0 0-.06.98 11.1 11.1 0 0 0 4.48 4.48.9.9 0 0 0 .98-.06l1.14-.86c.34-.25.82-.22 1.12.08l1.86 1.86c.33.33.33.87 0 1.2l-.86.86c-.73.73-1.8 1-2.8.72-4.74-1.3-8.42-4.98-9.72-9.72-.28-1 .01-2.07.72-2.8l.86-.86Z",
    mail:
      "M5.75 6.75h12.5c.7 0 1.25.56 1.25 1.25v8c0 .69-.56 1.25-1.25 1.25H5.75c-.7 0-1.25-.56-1.25-1.25V8c0-.69.56-1.25 1.25-1.25Zm.55 1.5 5.24 4.1c.27.22.65.22.92 0l5.24-4.1H6.3Zm11.7 1.48-4.62 3.62a2.2 2.2 0 0 1-2.76 0L6 9.73v6.02h12V9.73Z",
    instagram:
      "M8.2 4.75h7.6a3.45 3.45 0 0 1 3.45 3.45v7.6a3.45 3.45 0 0 1-3.45 3.45H8.2a3.45 3.45 0 0 1-3.45-3.45V8.2A3.45 3.45 0 0 1 8.2 4.75Zm0 1.6A1.85 1.85 0 0 0 6.35 8.2v7.6c0 1.02.83 1.85 1.85 1.85h7.6a1.85 1.85 0 0 0 1.85-1.85V8.2a1.85 1.85 0 0 0-1.85-1.85H8.2Zm3.8 2.68a2.97 2.97 0 1 1 0 5.94 2.97 2.97 0 0 1 0-5.94Zm0 1.55a1.42 1.42 0 1 0 0 2.84 1.42 1.42 0 0 0 0-2.84Zm3.28-2.38a.72.72 0 1 1 0 1.44.72.72 0 0 1 0-1.44Z",
    facebook:
      "M13.15 19.25v-6.38h2.12l.32-2.48h-2.44V8.81c0-.72.2-1.2 1.23-1.2h1.31V5.39a17.5 17.5 0 0 0-1.91-.1c-1.9 0-3.2 1.16-3.2 3.28v1.82H8.44v2.48h2.14v6.38h2.57Z",
  };

  return (
    <svg
      className="contact-icon"
      aria-hidden="true"
      viewBox="0 0 24 24"
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  );
}

function TrustIcon() {
  return (
    <svg className="trust-icon" aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path d="M20 6.75 9.6 17.15 4.75 12.3" />
    </svg>
  );
}

function AccessibilityIcon() {
  return (
    <svg className="accessibility-icon" aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path d="M12 4.4a1.65 1.65 0 1 1 0 3.3 1.65 1.65 0 0 1 0-3.3Zm-5.9 5.1c0-.5.4-.9.9-.9h10c.5 0 .9.4.9.9s-.4.9-.9.9h-3.75v2.15l1.9 5.25a.9.9 0 0 1-1.7.6L12 14.4l-1.45 4a.9.9 0 0 1-1.7-.6l1.9-5.25V10.4H7a.9.9 0 0 1-.9-.9Z" />
    </svg>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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

  useEffect(() => {
    const root = document.documentElement;
    const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal-item"));

    if (!items.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    root.classList.add("reveal-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    items.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  const updatePreference = (key: keyof Preferences, value: boolean | number) => {
    setPreferences((current) => ({ ...current, [key]: value }));
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
            <span className="site-logo" aria-hidden="true">
              <img
                src="/assets/lev-hahorut-logo-512.png"
                alt=""
                width="512"
                height="512"
                className="brand-logo"
                decoding="async"
              />
            </span>
            <span className="brand-text">
              <strong>שירה לוין</strong>
              <small>הדרכת הורים</small>
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
        </div>
      </header>

      <main id="main-content">
        <section className="hero section" id="top" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">הדרכת הורים אונליין בגישת אדלר</p>
              <h1 id="hero-title">לב ההורות</h1>
              <p className="hero-kicker">הדרכת הורים שמתחילה ביחסים</p>
              <p className="hero-identity">אני שירה לוין, מדריכת הורים ומנחת קבוצות בגישת אדלר</p>
              <p>
                אני מלווה הורים אונליין לילדים בגיל בית הספר, הורים למתבגרים
                והורים לילדים על הרצף האוטיסטי, כדי לחזק את הקשר, הסמכות ההורית
                והתקשורת בבית.
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

        <section className="trust-strip reveal-item" aria-label="פרטי אמון">
          <div className="container trust-grid">
            {trustItems.map((item) => (
              <div className="trust-item" key={item.title}>
                <TrustIcon />
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section soft-section need-section reveal-item" aria-labelledby="need-title">
          <div className="container narrow">
            <h2 id="need-title">אולי גם אצלכם בבית...</h2>
            <div className="emotion-list" role="list">
              <div className="emotion-column">
                <p role="listitem">כל בקשה הופכת לוויכוח.</p>
                <p role="listitem">קשה להציב גבולות בלי להגיע למאבק.</p>
                <p role="listitem">אתם רוצים להיות מכילים, אבל מרגישים שהסמכות ההורית נשחקה.</p>
              </div>
              <div className="emotion-column">
                <p role="listitem">המתבגר מתרחק וקשה להגיע אליו.</p>
                <p role="listitem">בסוף היום נשארים עם תסכול, אשמה ותחושה שכבר ניסיתם הכול.</p>
              </div>
            </div>
            <p className="section-summary">
              הקושי אינו אומר שנכשלתם כהורים. הוא מסמן שאולי הגיע הזמן למצוא דרך
              חדשה להיפגש בבית.
            </p>
          </div>
        </section>

        <section className="section reveal-item" aria-labelledby="principles-title">
          <div className="container">
            <div className="section-heading">
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

        <section className="section tinted-section reveal-item" id="fit" aria-labelledby="fit-title">
          <div className="container">
            <div className="section-heading">
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
              אני מלווה אימהות, אבות וזוגות הורים. גם כאשר רק הורה אחד
              משתתף, הוא יכול להתחיל שינוי משמעותי במערכת המשפחתית.
            </p>
          </div>
        </section>

        <section className="section reveal-item" id="help" aria-labelledby="help-title">
          <div className="container">
            <div className="section-heading">
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

        <section className="section service-highlight reveal-item" id="services" aria-labelledby="services-title">
          <div className="container service-grid">
            <div>
              <h2 id="services-title">הדרכת הורים אישית אונליין</h2>
              <p>
                בתהליך אישי אני מחברת בין הבנת הדינמיקה המשפחתית לבין כלים מעשיים
                שאפשר לתרגל בבית, בקצב שמתאים למשפחה שלכם.
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

        <section className="section reveal-item" id="process" aria-labelledby="process-title">
          <div className="container">
            <div className="section-heading">
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

        <section className="section soft-section reveal-item" aria-labelledby="strengthen-title">
          <div className="container split">
            <div>
              <h2 id="strengthen-title">להוביל את המשפחה מתוך בהירות</h2>
              <p>
                המטרה שלי היא שתוכלו להבין טוב יותר את הילדים שלכם, להציב גבולות מתוך
                בהירות ולנהל שיח גם ברגעים מורכבים.
              </p>
              <p className="list-intro">בתהליך אני רוצה לחזק יחד איתכם:</p>
            </div>
            <ul className="check-list">
              <li>יותר ביטחון ומסוגלות הורית</li>
              <li>תקשורת רגועה ומכבדת יותר</li>
              <li>גבולות ברורים ועקביים</li>
              <li>קשר קרוב ובטוח יותר</li>
            </ul>
          </div>
        </section>

        <section className="section reveal-item" id="about" aria-labelledby="about-title">
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

        <section className="section reveal-item" id="faq" aria-labelledby="faq-title">
          <div className="container narrow">
            <div className="section-heading">
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
                      aria-hidden={!isOpen}
                      className={isOpen ? "faq-panel is-open" : "faq-panel"}
                    >
                      <p>{item.answer}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section final-cta reveal-item" aria-labelledby="final-title">
          <div className="container narrow">
            <h2 id="final-title">כל שינוי גדול מתחיל בצעד קטן</h2>
            <p>
              אם אתם רוצים לחזק את הקשר עם הילדים, להציב גבולות מתוך ביטחון
              ולהכניס לבית יותר רוגע ושיתוף פעולה, אני מזמינה אתכם להתחיל בשיחת היכרות
              קצרה.
            </p>
            <a className="button" href={whatsappMessage} target="_blank" rel="noopener noreferrer">
              לתיאום שיחת היכרות בוואטסאפ
            </a>
          </div>
        </section>

        <section className="section contact-section reveal-item" id="contact" aria-labelledby="contact-title">
          <div className="container contact-container">
            <div className="contact-panel">
              <div className="contact-actions">
                <h2 id="contact-title">אפשר להתחיל בהודעה קצרה</h2>
                <p>
                  אפשר לפנות אליי בוואטסאפ, בטלפון או במייל. אחזור אליכם לתיאום
                  שיחת היכרות קצרה.
                </p>

                <div className="contact-group" aria-label="יצירת קשר ישירה">
                  <h3>דברו איתי</h3>
                  <a
                    className="contact-link contact-link-primary"
                    href={whatsappMessage}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="שליחת הודעת וואטסאפ לשירה לוין"
                    data-track="click_whatsapp"
                  >
                    <ContactIcon name="whatsapp" />
                    <span>
                      <strong>{directWhatsappLabel}</strong>
                      <small>לתיאום שיחת היכרות</small>
                    </span>
                  </a>
                  <a className="contact-link" href="tel:+972507532044" data-track="click_phone">
                    <ContactIcon name="phone" />
                    <span>
                      <strong>{directPhoneLabel}</strong>
                      <small dir="ltr">050-753-2044</small>
                    </span>
                  </a>
                  <a className="contact-link" href="mailto:shumi25@gmail.com">
                    <ContactIcon name="mail" />
                    <span>
                      <strong>{directEmailLabel}</strong>
                      <small dir="ltr">shumi25@gmail.com</small>
                    </span>
                  </a>
                </div>

                <div className="contact-group social-group" aria-label="רשתות חברתיות">
                  <h3>עקבו אחרי לב ההורות</h3>
                  <div className="social-grid">
                    <a
                      className="contact-link social-link instagram-link"
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="מעבר לעמוד האינסטגרם של שירה לוין"
                      data-track="open_instagram"
                    >
                      <ContactIcon name="instagram" />
                      <span>
                        <strong>{instagramLabel}</strong>
                        <small dir="ltr">@shira_goldman_levin</small>
                      </span>
                    </a>
                    <a
                      className="contact-link social-link facebook-link"
                      href={facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="מעבר לעמוד הפייסבוק של שירה גולדמן לוין"
                      data-track="open_facebook"
                    >
                      <ContactIcon name="facebook" />
                      <span>
                        <strong>{facebookLabel}</strong>
                        <small>שירה גולדמן לוין</small>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <div className="accessibility-widget">
        <button
          className="accessibility-trigger"
          type="button"
          aria-label="פתיחת תפריט נגישות"
          title="אפשרויות נגישות"
          aria-expanded={accessibilityOpen}
          aria-controls="accessibility-menu"
          onClick={() => setAccessibilityOpen((value) => !value)}
        >
          <AccessibilityIcon />
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
        <ContactIcon name="whatsapp" />
        <span className="sticky-short">שיחת היכרות בוואטסאפ</span>
        <span className="sticky-full">כתבו לי בוואטסאפ</span>
      </a>

      <footer className="site-footer">
        <nav className="container legal-links" aria-label="קישורים משפטיים">
          <a href="/privacy.html">
            <ContactIcon name="mail" />
            <span>מדיניות פרטיות</span>
          </a>
          <a href="/accessibility.html">
            <AccessibilityIcon />
            <span>הצהרת נגישות</span>
          </a>
        </nav>
        <div className="creator-footer">
          <p>נבנה ועוצב על ידי טלי רוזנברג | אסטרטגיה וצמיחה עסקית</p>
          <p>כרטיסי שיווק דיגיטליים חכמים לעסקים</p>
          <a
            href="https://wa.me/message/R774GIXF2DOGP1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="יצירת קשר עם טלי רוזנברג לבניית כרטיס שיווק דיגיטלי"
          >
            לבניית כרטיס שיווק דיגיטלי
          </a>
        </div>
      </footer>
    </>
  );
}
