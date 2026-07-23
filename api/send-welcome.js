// /api/send-welcome.js
// Vercel serverless function — se llama desde success.html tras el pago
// Recupera el email del comprador desde Stripe y envía el email de bienvenida con Resend

export default async function handler(req, res) {
  // Solo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sessionId, plan } = req.body || {};

  if (!sessionId) {
    return res.status(400).json({ error: 'Missing sessionId' });
  }

  // ── 1. Recuperar datos del comprador desde Stripe ──
  let email, name;
  try {
    const stripeRes = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${sessionId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        },
      }
    );

    if (!stripeRes.ok) {
      const err = await stripeRes.json();
      console.error('Stripe error:', err);
      return res.status(500).json({ error: 'Could not retrieve Stripe session' });
    }

    const session = await stripeRes.json();
    email = session.customer_details?.email;
    name  = session.customer_details?.name || '';

    if (!email) {
      return res.status(400).json({ error: 'No email in Stripe session' });
    }
  } catch (err) {
    console.error('Stripe fetch error:', err);
    return res.status(500).json({ error: 'Stripe fetch failed' });
  }

  // ── 2. Preparar contenido del email ──
  const isPremium   = plan === 'premium';
  const firstName   = name ? name.split(' ')[0] : '';
  const dashboardUrl = `https://curso.equilibratucamino.com/dashboard.html?plan=${plan}&access=granted`;
  const subject     = isPremium
    ? `${firstName ? firstName + ', tu' : 'Tu'} acceso al curso + sesión con Nacho`
    : `${firstName ? firstName + ', tu' : 'Tu'} acceso al curso Se Acabó el Juego`;

  // ── 3. Enviar emails en paralelo: bienvenida al comprador + notificación a Nacho ──
  const price = isPremium ? '219€' : '190€';

  try {
    const [resendRes] = await Promise.all([
      // Email de bienvenida al comprador
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
        body: JSON.stringify({
          from: 'Nacho <hola@equilibratucamino.com>',
          to: email,
          subject,
          html: buildEmailHTML({ firstName, plan, isPremium, dashboardUrl, email }),
        }),
      }),
      // Notificación a Nacho
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
        body: JSON.stringify({
          from: 'ETC. Curso <hola@equilibratucamino.com>',
          to: 'equilibratucamino@gmail.com',
          subject: `💰 Nueva venta — ${isPremium ? 'Plan Premium' : 'Plan Básico'} (${price})`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#f9f9f9;border-radius:12px;">
              <h2 style="margin:0 0 16px;font-size:1.4rem;color:#1E211D;">💰 Nueva venta del curso</h2>
              <table style="width:100%;border-collapse:collapse;font-size:.9rem;">
                <tr><td style="padding:8px 0;color:#666;border-bottom:1px solid #eee;width:40%">Plan</td>
                    <td style="padding:8px 0;font-weight:600;border-bottom:1px solid #eee;color:${isPremium?'#92640a':'#1E211D'}">${isPremium ? '⭐ Premium' : 'Básico'} — ${price}</td></tr>
                <tr><td style="padding:8px 0;color:#666;border-bottom:1px solid #eee">Comprador</td>
                    <td style="padding:8px 0;border-bottom:1px solid #eee">${name || '—'}</td></tr>
                <tr><td style="padding:8px 0;color:#666">Email</td>
                    <td style="padding:8px 0"><a href="mailto:${email}" style="color:#2FA97F">${email}</a></td></tr>
              </table>
              <p style="margin:20px 0 0;font-size:.8rem;color:#999;">Stripe session: ${sessionId}</p>
            </div>
          `,
        }),
      }),
    ]);

    if (!resendRes.ok) {
      const err = await resendRes.json();
      console.error('Resend error:', err);
      return res.status(500).json({ error: 'Email send failed' });
    }

    return res.status(200).json({ ok: true, email });
  } catch (err) {
    console.error('Resend fetch error:', err);
    return res.status(500).json({ error: 'Resend fetch failed' });
  }
}

// ── Plantilla del email ──────────────────────────────────────────────────────
function buildEmailHTML({ firstName, isPremium, dashboardUrl, email }) {
  const greeting = firstName ? `${firstName}, ya` : 'Ya';

  const extraItems = isPremium
    ? `<tr>
        <td style="padding:7px 0;vertical-align:top;">
          <span style="display:inline-block;width:20px;height:20px;background:#fffbeb;border-radius:50%;text-align:center;line-height:20px;font-size:11px;margin-right:10px;flex-shrink:0;">⭐</span>
          <span style="font-size:.9rem;font-weight:400;color:#92640a;line-height:1.5;">
            <strong>Sesión final 1:1 de 1h con Nacho — GRATIS</strong><br>
            <span style="font-size:.8rem;color:#a07a20;">Se desbloquea al completar la clase 15</span>
          </span>
        </td>
      </tr>`
    : `<tr>
        <td style="padding:7px 0;vertical-align:top;">
          <span style="display:inline-block;width:20px;height:20px;background:#f2f3f2;border-radius:50%;text-align:center;line-height:20px;font-size:11px;margin-right:10px;flex-shrink:0;color:#6E7168;">→</span>
          <span style="font-size:.9rem;font-weight:300;color:#6E7168;line-height:1.5;">
            Sesión 1:1 con Nacho disponible por 65€ al terminar
          </span>
        </td>
      </tr>`;

  const premiumBanner = isPremium
    ? `<tr>
        <td style="padding:0 40px 28px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="background:#fffbeb;border:1px solid #fde68a;border-radius:14px;padding:16px 20px;">
                <p style="margin:0;font-size:.85rem;color:#92640a;line-height:1.65;">
                  ⭐ <strong>Plan Premium:</strong> al completar la clase 15 se desbloquea automáticamente tu sesión gratuita de 1h con Nacho. Sin hacer nada extra — aparece directamente en tu curso.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
    : '';

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Acceso a tu curso — ETC.</title>
</head>
<body style="margin:0;padding:0;background:#F2F3F2;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
         style="background:#F2F3F2;padding:48px 20px;">
    <tr><td align="center">

      <!-- Wrapper -->
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
             style="max-width:560px;background:#ffffff;border-radius:20px;border:1px solid #E5E4DF;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.07);">

        <!-- Header verde suave con el logo real de ETC (transparente, limpio, sin recuadro) -->
        <tr>
          <td bgcolor="#C8EDE4" style="background:#C8EDE4;padding:34px 40px 30px;text-align:center;">
            <img src="https://curso.equilibratucamino.com/images/logo-etc-badge-circle.png" alt="ETC. Equilibra Tu Camino" width="150" style="display:block;margin:0 auto;width:150px;max-width:150px;height:auto;border:0;"/>
          </td>
        </tr>

        <!-- Check animado — imagen inline (alternativa texto) -->
        <tr>
          <td style="padding:36px 40px 0;text-align:center;">
            <div style="display:inline-block;width:64px;height:64px;background:linear-gradient(135deg,#2FA97F,#1F8C68);border-radius:50%;line-height:64px;font-size:28px;box-shadow:0 8px 24px rgba(47,169,127,.28);">✓</div>
          </td>
        </tr>

        <!-- Título -->
        <tr>
          <td style="padding:24px 40px 0;text-align:center;">
            <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#2FA97F;">Pago confirmado</p>
            <h1 style="margin:10px 0 14px;font-size:28px;font-weight:700;line-height:1.15;color:#1E211D;letter-spacing:-.5px;">
              ${greeting} eres parte de<br>
              <span style="color:#2FA97F;font-style:italic;">Se Acabó el Juego.</span>
            </h1>
            <p style="margin:0 0 28px;font-size:15px;font-weight:300;line-height:1.75;color:#6E7168;">
              Las 15 clases están listas para ti. Empieza cuando quieras, a tu ritmo y con total privacidad.
            </p>
          </td>
        </tr>

        <!-- Botón CTA -->
        <tr>
          <td style="padding:0 40px 36px;text-align:center;">
            <a href="${dashboardUrl}"
               style="display:inline-block;white-space:nowrap;background:linear-gradient(135deg,#2FA97F,#1F8C68);color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;padding:16px 40px;border-radius:999px;box-shadow:0 6px 20px rgba(47,169,127,.3);font-family:Arial,Helvetica,sans-serif;">
              ¡Empieza ya el curso! →
            </a>
            <p style="margin:12px 0 0;font-size:11px;color:#A1A399;">Acceso inmediato · Las 15 clases te esperan</p>
          </td>
        </tr>

        <!-- Divisor -->
        <tr>
          <td style="padding:0 40px;">
            <hr style="border:none;border-top:1px solid #E5E4DF;margin:0;"/>
          </td>
        </tr>

        <!-- Lo que incluye -->
        <tr>
          <td style="padding:28px 40px 20px;">
            <p style="margin:0 0 16px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#A1A399;">
              Tu plan incluye
            </p>
            <table cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
              <tr>
                <td style="padding:7px 0;vertical-align:top;">
                  <span style="display:inline-block;width:20px;height:20px;background:#eef9f5;border-radius:50%;text-align:center;line-height:20px;font-size:11px;margin-right:10px;color:#2FA97F;font-weight:700;">✓</span>
                  <span style="font-size:.9rem;font-weight:300;color:#3d3d3d;line-height:1.5;">15 clases en vídeo · más de 3 horas de contenido</span>
                </td>
              </tr>
              <tr>
                <td style="padding:7px 0;vertical-align:top;">
                  <span style="display:inline-block;width:20px;height:20px;background:#eef9f5;border-radius:50%;text-align:center;line-height:20px;font-size:11px;margin-right:10px;color:#2FA97F;font-weight:700;">✓</span>
                  <span style="font-size:.9rem;font-weight:300;color:#3d3d3d;line-height:1.5;">60+ ejercicios prácticos</span>
                </td>
              </tr>
              <tr>
                <td style="padding:7px 0;vertical-align:top;">
                  <span style="display:inline-block;width:20px;height:20px;background:#eef9f5;border-radius:50%;text-align:center;line-height:20px;font-size:11px;margin-right:10px;color:#2FA97F;font-weight:700;">✓</span>
                  <span style="font-size:.9rem;font-weight:300;color:#3d3d3d;line-height:1.5;">Certificado personalizado de ETC. al finalizar</span>
                </td>
              </tr>
              <tr>
                <td style="padding:7px 0;vertical-align:top;">
                  <span style="display:inline-block;width:20px;height:20px;background:#eef9f5;border-radius:50%;text-align:center;line-height:20px;font-size:11px;margin-right:10px;color:#2FA97F;font-weight:700;">✓</span>
                  <span style="font-size:.9rem;font-weight:300;color:#3d3d3d;line-height:1.5;">Acceso de por vida — sin fecha límite</span>
                </td>
              </tr>
              ${extraItems}
            </table>
          </td>
        </tr>

        ${premiumBanner}

        ${isPremium ? `
        <!-- Sesión 1:1 — cómo reservarla -->
        <tr>
          <td style="padding:0 40px 28px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#f0fdf8;border:1.5px solid #6ee7c0;border-radius:14px;padding:18px 20px;">
                  <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:#1F8C68;">Cómo reservar tu sesión gratuita</p>
                  <p style="margin:0 0 12px;font-size:.88rem;color:#1e6649;line-height:1.65;">
                    Al terminar la clase 15, escríbenos desde <strong>${email}</strong> — el mismo con el que compraste — y te reservamos tu sesión de 1h con Nacho.
                  </p>
                  <p style="margin:0;font-size:.8rem;color:#2FA97F;">
                    📧 <a href="mailto:equilibratucamino@gmail.com" style="color:#1F8C68;text-decoration:none;font-weight:600;">equilibratucamino@gmail.com</a>
                    &nbsp;·&nbsp;
                    💬 <a href="https://wa.me/34611847645" style="color:#1F8C68;text-decoration:none;font-weight:600;">WhatsApp</a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        ` : ''}

        <!-- Divisor -->
        <tr>
          <td style="padding:0 40px;">
            <hr style="border:none;border-top:1px solid #E5E4DF;margin:0;"/>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#F2F3F2;padding:24px 40px;text-align:center;">
            <p style="margin:0 0 6px;font-size:11px;color:#A1A399;line-height:1.6;">
              100% privado y confidencial · Nadie sabe que estás aquí
            </p>
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
