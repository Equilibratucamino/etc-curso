// /api/webinar-checkout.js
// Crea una sesión de Stripe Checkout para el webinar (25€)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, tipo } = req.body || {};

  if (!name || !email || !tipo) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const successUrl = `https://curso.equilibratucamino.com/webinar-success.html?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl  = `https://curso.equilibratucamino.com/webinar-success.html?cancelled=1`;

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
        'line_items[0][price_data][product_data][name]': 'Webinar ETC. — 28 de agosto de 2026',
        'line_items[0][price_data][product_data][description]': `Sesión grupal en directo con Nacho · ${tipo === 'activos' ? 'Clientes activos' : 'Familiares'} · ${process.env.WEBINAR_DATE || '28 de agosto de 2026 · 19:00h (España)'}`,
        'line_items[0][quantity]': '1',
        'customer_email': email,
        'metadata[name]': name,
        'metadata[tipo]': tipo,
        success_url: successUrl,
        cancel_url: cancelUrl,
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
