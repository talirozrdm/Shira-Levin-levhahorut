import type { Metadata } from "next";
import "./globals.css";

const title = "שירה לוין | לב ההורות - הדרכת הורים אונליין למתבגרים ולמשפחות";
const description =
  "שירה לוין, מדריכת הורים בגישת אדלר, מלווה אונליין הורים לילדים בגיל בית הספר, למתבגרים ולהורים לילדים על הרצף האוטיסטי, לחיזוק הקשר, הסמכות ההורית והתקשורת בבית.";
const canonicalUrl = "https://example.com/lev-hahorut";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://example.com"),
  alternates: {
    canonical: canonicalUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: canonicalUrl,
    locale: "he_IL",
    images: [
      {
        url: "/assets/lev-hahorut-og-placeholder.jpg",
        width: 1200,
        height: 630,
        alt: "לב ההורות - הדרכת הורים אונליין עם שירה לוין",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/assets/lev-hahorut-og-placeholder.jpg"],
  },
  icons: {
    icon: "/assets/lev-hahorut-logo-512.png",
    shortcut: "/assets/lev-hahorut-logo-512.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
