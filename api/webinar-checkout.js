// /api/webinar-checkout.js
// Crea una sesión de Stripe Checkout para el webinar (25€)

const ALLOWED_ORIGINS = [
  'https://curso.equilibratucamino.com',
  'https://app.equilibratucamino.com',
];

export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, tipo, titulo, fecha } = req.body || {};

  if (!name || !email || !tipo) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const fechaLabel = fecha || process.env.WEBINAR_DATE || '';
  const tipoLabel  = tipo === 'adictos' ? 'Pacientes y exludópatas' : 'Familias y entorno cercano';
  const tituloStr  = titulo ? `${titulo}` : 'Webinar ETC.';
  const productName = `${tituloStr} — ${tipoLabel}`;
  const productDesc = fechaLabel ? `${fechaLabel} · En directo con Nacho` : 'En directo con Nacho';

  const successUrl = `https://curso.equilibratucamino.com/webinar-success.html?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl  = `https://app.equilibratucamino.com/webinars/`;

  try {
    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        mode: 'payment',
        'payment_method_types[]': 'card',
        'line_items[0][price_data][currency]': 'eur',
        'line_items[0][price_data][unit_amount]': '2500',
        'line_items[0][price_data][product_data][name]': productName,
        'line_items[0][price_data][product_data][description]': productDesc,
        'line_items[0][quantity]': '1',
        'customer_email': email,
        'metadata[name]': name,
        'metadata[tipo]': tipo,
        'metadata[titulo]': tituloStr,
        'metadata[fecha]': fechaLabel,
        success_url: successUrl,
        cancel_url:  cancelUrl,
      }).toString(),
    });

    if (!stripeRes.ok) {
      const err = await stripeRes.json();
      console.error('Stripe error:', err);
      return res.status(500).json({ error: 'Stripe session creation failed' });
    }

    const session = await stripeRes.json();
    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe fetch error:', err);
    return res.status(500).json({ error: 'Stripe fetch failed' });
  }
}
