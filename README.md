# לב ההורות - שירה לוין

דף נחיתה בעברית ובכיוון RTL עבור "לב ההורות", הדרכת הורים אונליין עם שירה לוין.

## טכנולוגיות

- Next.js
- React
- Tailwind CSS
- Vinext עבור פריסת Sites

## פיתוח מקומי

```bash
pnpm install
pnpm run dev
```

## בדיקות

```bash
pnpm test
pnpm run lint
```

## פריסה ל-Vercel

הפרויקט כולל `vercel.json` שמגדיר את Vercel לבנות את האתר כ-Next.js:

```bash
next build --webpack
```

הגדרה זו משאירה את קבצי Sites/Vinext בפרויקט, אבל מונעת מ-Vercel להריץ את build ברירת המחדל של Vinext.

## הערות פרסום

- יש לעדכן את ה-canonical ואת כתובת ה-Open Graph לדומיין הסופי לאחר חיבור דומיין.
- יש להחליף את תמונת השיתוף placeholder בתמונה סופית 1200x630.
