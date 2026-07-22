// /api/webinar-config.js
// ⚠️  PARA CAMBIAR LA FECHA DEL WEBINAR:
//     Ve a Vercel → Settings → Environment Variables → WEBINAR_DATE
//     Ejemplo: "28 de agosto de 2026 · 19:00h (España)"
//     Después haz un redeploy (o haz cualquier push y Vercel lo despliega solo)

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({
    date: process.env.WEBINAR_DATE || '28 de agosto de 2026 · 19:00h (España)',
  });
}
