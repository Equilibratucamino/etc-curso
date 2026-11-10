// /api/optin-lead.js
// Recibe datos del lead desde landing-optin.html
// Envía email de bienvenida con el vídeo vía Resend

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { nombre, apellidos, email, tlf } = req.body || {};
  if (!nombre || !apellidos || !email) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  // Intentar enviar el email, pero no bloquear el flujo si falla
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Nacho de ETC <hola@equilibratucamino.com>',
        to: email,
        subject: `${nombre}, aquí tienes tu regalo`,
        html: buildOptinEmailHTML({ nombre, apellidos }),
      }),
    });

    if (!r.ok) {
      const err = await r.json();
      console.error('Resend error:', JSON.stringify(err));
    }

    // Notificación interna a Nacho
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'ETC. Landing <hola@equilibratucamino.com>',
        to: 'equilibratucamino@gmail.com',
        subject: `🎯 Nuevo lead — ${nombre} ${apellidos}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:460px;margin:0 auto;padding:28px 20px;background:#f9f9f9;border-radius:12px;">
            <h2 style="margin:0 0 14px;font-size:1.2rem;color:#1E211D;">🎯 Nuevo lead del optin</h2>
            <table style="width:100%;border-collapse:collapse;font-size:.9rem;">
              <tr><td style="padding:7px 0;color:#666;border-bottom:1px solid #eee;width:35%">Nombre</td>
                  <td style="padding:7px 0;font-weight:600;border-bottom:1px solid #eee">${nombre} ${apellidos}</td></tr>
              <tr><td style="padding:7px 0;color:#666;border-bottom:1px solid #eee">Email</td>
                  <td style="padding:7px 0;border-bottom:1px solid #eee"><a href="mailto:${email}" style="color:#2FA97F">${email}</a></td></tr>
              <tr><td style="padding:7px 0;color:#666">Teléfono</td>
                  <td style="padding:7px 0">${tlf || '—'}</td></tr>
            </table>
          </div>
        `,
      }),
    }).catch(() => {}); // notificación interna: si falla, ignorar
  } catch (err) {
    // Email fallido no impide mostrar el vídeo al usuario
    console.error('Resend fetch error:', err);
  }

  return res.status(200).json({ ok: true });
}

function buildOptinEmailHTML({ nombre, apellidos }) {
  const videoUrl = 'https://www.youtube.com/watch?v=I_zWGSli3Bs';
  const thumbnailUrl = 'https://img.youtube.com/vi/I_zWGSli3Bs/maxresdefault.jpg';
  const landingUrl = 'https://curso.equilibratucamino.com/landing-optin.html';

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Tu regalo de ETC. — ${nombre}</title>
</head>
<body style="margin:0;padding:0;background:#F2F3F2;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
         style="background:#F2F3F2;padding:48px 20px;">
    <tr><td align="center">

      <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
             style="max-width:560px;background:#ffffff;border-radius:20px;border:1px solid #E5E4DF;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.07);">

        <!-- Header -->
        <tr>
          <td bgcolor="#C8EDE4" style="background:#C8EDE4;padding:28px 40px 24px;text-align:center;">
            <img src="https://curso.equilibratucamino.com/images/logo-etc-badge-circle.png"
                 alt="ETC. Equilibra Tu Camino" width="120"
                 style="display:block;margin:0 auto;width:120px;max-width:120px;height:auto;border:0;"/>
          </td>
        </tr>

        <!-- Saludo -->
        <tr>
          <td style="padding:36px 40px 20px;">
            <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#2FA97F;">
              Tu regalo
            </p>
            <h1 style="margin:0 0 18px;font-size:26px;font-weight:700;line-height:1.2;color:#1E211D;letter-spacing:-.5px;">
              ${nombre}, como te prometí —<br>
              <span style="color:#2FA97F;">aquí está tu vídeo.</span>
            </h1>
            <p style="margin:0 0 24px;font-size:15px;font-weight:300;line-height:1.75;color:#4a4a4a;">
              En este vídeo te explico <strong>cómo trabajamos en ETC.</strong>,
              qué es lo que realmente funciona para salir de la adicción al juego,
              y por qué <em>ahora es el momento de dar ese paso hacia adelante.</em>
            </p>
            <p style="margin:0 0 24px;font-size:15px;font-weight:300;line-height:1.75;color:#4a4a4a;">
              Dedicale 10 minutos. Puede que sea lo más importante que hagas hoy.
            </p>
          </td>
        </tr>

        <!-- Thumbnail del vídeo -->
        <tr>
          <td style="padding:0 40px 32px;text-align:center;">
            <a href="${videoUrl}" target="_blank" rel="noopener"
               style="display:block;border-radius:14px;overflow:hidden;position:relative;text-decoration:none;border:0;">
              <!-- Thumbnail -->
              <img src="${thumbnailUrl}"
                   alt="Ver el vídeo de Nacho — ETC."
                   width="480"
                   style="display:block;width:100%;max-width:480px;height:auto;border-radius:14px;border:0;"/>
              <!-- Overlay oscuro + botón play -->
              <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(8,14,30,.45);border-radius:14px;display:flex;align-items:center;justify-content:center;">
              </div>
            </a>
            <!-- Botón play separado (para clientes de email que bloquean position:absolute) -->
            <a href="${videoUrl}" target="_blank" rel="noopener"
               style="display:inline-block;margin-top:-48px;position:relative;z-index:2;
                      background:#ffffff;border-radius:50%;width:60px;height:60px;line-height:60px;
                      text-align:center;font-size:22px;text-decoration:none;
                      box-shadow:0 4px 20px rgba(0,0,0,.35);">
              ▶
            </a>
            <p style="margin:14px 0 0;font-size:13px;color:#A1A399;">
              Haz clic en la imagen para ver el vídeo →
            </p>
          </td>
        </tr>

        <!-- Separador -->
        <tr>
          <td style="padding:0 40px;">
            <hr style="border:none;border-top:1px solid #E5E4DF;margin:0;"/>
          </td>
        </tr>

        <!-- CTA secundario -->
        <tr>
          <td style="padding:28px 40px;text-align:center;">
            <p style="margin:0 0 20px;font-size:14px;color:#4a4a4a;line-height:1.65;">
              Cuando estés listo para dar el siguiente paso,<br>
              <strong>Nacho estará aquí.</strong>
            </p>
            <a href="https://wa.me/34611847645?text=Hola%20Nacho%2C%20acabo%20de%20ver%20tu%20v%C3%ADdeo%20y%20quiero%20saber%20m%C3%A1s"
               target="_blank" rel="noopener"
               style="display:inline-block;background:linear-gradient(135deg,#2FA97F,#1F8C68);color:#ffffff;
                      font-size:15px;font-weight:600;text-decoration:none;
                      padding:14px 32px;border-radius:999px;
                      box-shadow:0 6px 20px rgba(47,169,127,.3);">
              Hablar con Nacho por WhatsApp →
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#F2F3F2;padding:20px 40px;text-align:center;">
            <p style="margin:0 0 6px;font-size:11px;color:#A1A399;line-height:1.6;">
              100% privado y confidencial · Nadie sabe que estás aquí
            </p>
            <p style="margin:0;font-size:11px;color:#A1A399;">
              ¿Tienes dudas? Escríbenos a
              <a href="mailto:equilibratucamino@gmail.com" style="color:#2FA97F;text-decoration:none;">equilibratucamino@gmail.com</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;
}
