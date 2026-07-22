// /api/send-webinar.js
// Envía email de confirmación de plaza al webinar + notificación a Nacho

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sessionId } = req.body || {};

  if (!sessionId) {
    return res.status(400).json({ error: 'Missing sessionId' });
  }

  let email, name, tipo;
  try {
    const stripeRes = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${sessionId}`,
      { headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` } }
    );
    if (!stripeRes.ok) {
      const err = await stripeRes.json();
      console.error('Stripe error:', err);
      return res.status(500).json({ error: 'Could not retrieve Stripe session' });
    }
    const session = await stripeRes.json();
    email = session.customer_details?.email || session.customer_email;
    name  = session.metadata?.name || session.customer_details?.name || '';
    tipo  = session.metadata?.tipo || 'activos';
    if (!email) return res.status(400).json({ error: 'No email in Stripe session' });
  } catch (err) {
    console.error('Stripe fetch error:', err);
    return res.status(500).json({ error: 'Stripe fetch failed' });
  }

  const WEBINAR_DATE = process.env.WEBINAR_DATE || '28 de agosto de 2026 · 19:00h (España)';
  const WEBINAR_DAY  = WEBINAR_DATE.split('·')[0].trim(); // "28 de agosto de 2026"
  const firstName    = name ? name.split(' ')[0] : '';
  const tipoLabel    = tipo === 'activos' ? 'Clientes activos' : 'Familiares';
  const subject      = firstName
    ? `${firstName}, tienes tu plaza en el Webinar del ${WEBINAR_DAY}`
    : `Tu plaza en el Webinar del ${WEBINAR_DAY} — ETC.`;

  try {
    await Promise.all([
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
        body: JSON.stringify({
          from: 'Nacho <hola@equilibratucamino.com>',
          to: email,
          subject,
          html: buildWebinarEmailHTML({ firstName, tipoLabel }),
        }),
      }),
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
        body: JSON.stringify({
          from: 'ETC. Curso <hola@equilibratucamino.com>',
          to: 'equilibratucamino@gmail.com',
          subject: `🎙️ Nueva plaza webinar — ${tipoLabel} (25€)`,
          html: `<div style="font-family:Arial,sans-serif;max-width:480px;padding:32px 24px;background:#f9f9f9;border-radius:12px;">
            <h2 style="margin:0 0 16px;color:#1E211D;">🎙️ Nueva inscripción al webinar</h2>
            <table style="width:100%;font-size:.9rem;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#666;border-bottom:1px solid #eee;width:35%">Tipo</td><td style="padding:8px 0;font-weight:600;border-bottom:1px solid #eee">${tipoLabel}</td></tr>
              <tr><td style="padding:8px 0;color:#666;border-bottom:1px solid #eee">Nombre</td><td style="padding:8px 0;border-bottom:1px solid #eee">${name || '—'}</td></tr>
              <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#2FA97F">${email}</a></td></tr>
            </table>
            <p style="margin:20px 0 0;font-size:.8rem;color:#999;">Stripe session: ${sessionId}</p>
          </div>`,
        }),
      }),
    ]);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Email send failed' });
  }
}

function buildWebinarEmailHTML({ firstName, tipoLabel }) {
  const greeting = firstName ? `¡${firstName}, tienes tu plaza!` : '¡Tienes tu plaza!';

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Plaza confirmada — Webinar ETC.</title>
</head>
<body style="margin:0;padding:0;background:#F2F3F2;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#F2F3F2;padding:48px 20px;">
    <tr><td align="center">

      <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
             style="max-width:560px;background:#ffffff;border-radius:20px;border:1px solid #E5E4DF;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.07);">

        <!-- Header dorado -->
        <tr>
          <td style="background:linear-gradient(135deg,#D4B05A,#B08C38);padding:34px 40px 30px;text-align:center;">
            <img src="https://curso.equilibratucamino.com/images/logo-etc-white.png"
                 alt="ETC." width="130"
                 style="display:block;margin:0 auto;width:130px;max-width:130px;height:auto;border:0;"/>
            <p style="margin:16px 0 0;font-size:.75rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.75);">Webinar en directo</p>
          </td>
        </tr>

        <!-- Emoji celebración -->
        <tr>
          <td style="padding:36px 40px 0;text-align:center;">
            <div style="display:inline-block;font-size:48px;line-height:1;">🎉</div>
          </td>
        </tr>

        <!-- Título -->
        <tr>
          <td style="padding:20px 40px 0;text-align:center;">
            <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#B08C38;">Plaza confirmada</p>
            <h1 style="margin:10px 0 14px;font-size:28px;font-weight:700;line-height:1.15;color:#1E211D;letter-spacing:-.5px;">
              ${greeting}
            </h1>
            <p style="margin:0 0 28px;font-size:15px;font-weight:300;line-height:1.75;color:#6E7168;">
              Tu plaza en el webinar de ETC. está reservada.<br>
              Nos vemos el <strong style="color:#1E211D;">${WEBINAR_DAY}</strong>.
            </p>
          </td>
        </tr>

        <!-- Tarjeta de fecha -->
        <tr>
          <td style="padding:0 40px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="background:linear-gradient(135deg,#fffbeb,#fef3c7);border:1.5px solid #fde68a;border-radius:16px;padding:22px 24px;text-align:center;">
                  <p style="margin:0 0 4px;font-size:.7rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:#B08C38;">Sesión grupal en directo · ${tipoLabel}</p>
                  <p style="margin:0;font-size:1.35rem;font-weight:700;color:#241C06;letter-spacing:-.02em;">${WEBINAR_DATE}</p>
                  <p style="margin:6px 0 0;font-size:1rem;color:#92640a;font-weight:500;">Con Nacho</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Divisor -->
        <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #E5E4DF;margin:0;"/></td></tr>

        <!-- Qué incluye -->
        <tr>
          <td style="padding:28px 40px 20px;">
            <p style="margin:0 0 16px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#A1A399;">Tu plaza incluye</p>
            <table cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
              <tr>
                <td style="padding:8px 0;vertical-align:top;font-size:.9rem;color:#3d3d3d;line-height:1.5;">
                  <span style="color:#B08C38;font-weight:700;margin-right:10px;">✓</span> Sesión en directo de 90 minutos con Nacho
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;vertical-align:top;font-size:.9rem;color:#3d3d3d;line-height:1.5;">
                  <span style="color:#B08C38;font-weight:700;margin-right:10px;">✓</span> Preguntas en directo y casos reales
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;vertical-align:top;font-size:.9rem;color:#3d3d3d;line-height:1.5;">
                  <span style="color:#B08C38;font-weight:700;margin-right:10px;">✓</span> Grabación disponible después del webinar
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;vertical-align:top;font-size:.9rem;color:#3d3d3d;line-height:1.5;">
                  <span style="color:#B08C38;font-weight:700;margin-right:10px;">✓</span> Acceso 100% privado y confidencial
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Nota link -->
        <tr>
          <td style="padding:0 40px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="background:#eef9f5;border:1px solid rgba(47,169,127,.2);border-radius:12px;padding:16px 20px;">
                  <p style="margin:0;font-size:.85rem;color:#1e6649;line-height:1.65;">
                    📩 <strong>Recibirás el link de acceso</strong> unos días antes del webinar directamente en este email. Estate atento.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Divisor -->
        <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #E5E4DF;margin:0;"/></td></tr>

        <!-- Footer -->
        <tr>
          <td style="background:#F2F3F2;padding:24px 40px;text-align:center;">
            <p style="margin:0 0 6px;font-size:11px;color:#A1A399;line-height:1.6;">100% privado y confidencial · ETC. Equilibra Tu Camino</p>
            <p style="margin:0;font-size:11px;color:#A1A399;line-height:1.6;">
              ¿Tienes alguna duda? Escríbenos a
              <a href="mailto:equilibratucamino@gmail.com" style="color:#2FA97F;text-decoration:none;">equilibratucamino@gmail.com</a>
              o por <a href="https://wa.me/34611847645" style="color:#2FA97F;text-decoration:none;">WhatsApp</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;
}
