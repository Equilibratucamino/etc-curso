# Curso "Se Acabó el Juego" — Documento maestro

> Estado completo del curso online de ETC: **producto, diseño, flujos, planes (premium/básico) y todo lo que queda por hacer**.
> Proyecto **independiente** de la plataforma terapéutica de Juan (ETC-Plataforma).
> Última actualización: **4 julio 2026**.

---

## 🆕 NOVEDADES (4-jul-2026, tarde) — prensa, favicon, home + VENTA CONFIRMADA con pago real

- **✅✅ VENTA CONFIRMADA CON PAGO REAL.** Iñaki hizo una compra real (1€) y el flujo funcionó de punta a punta: pago → `success.html` → función `/api/send-welcome` devolvió **200** (log de Vercel) → **email enviado**. El correo llegó a la **dirección que se escribió en el checkout de Stripe** (por eso al principio "no llegaba": se buscaba en otra cuenta). Comportamiento correcto. *(Los logs de Vercel van en UTC; +3h para hora local.)*
- **🔎 Cómo depurar envíos:** logs de la función en Vercel (`get_runtime_logs`, proyecto `etc-curso`) muestran cada POST a `/api/send-welcome` y su status (200 = enviado, 500 = clave/sesión mal, 400 = sin sessionId). Y **Resend → Emails/Logs** muestra el destinatario real y si se entregó.
- **🎙️ Sección de prensa del funnel rediseñada** (`funel.html`, `#prensa`): **banner cinematográfico de podcast** (`images/podcast-studio.jpg`, foto de stock libre de Pexels — dos personas, micros, luz dramática) con titular dorado encima; y los **recortes de periódico ahora pequeños, sutiles (66% opacidad) y en carrusel automático continuo** (`.press-mq`/`.pclip`, se pausan al pasar el ratón). Antes era un collage estático grande.
- **🔖 Favicon ETC** (cuadrado charcoal redondeado con "ETC." blanco) en la **pestaña del navegador** de todas las páginas: `images/favicon.png` / `favicon-32.png` / `apple-touch-icon.png`.
- **🌐 Web oficial (`etc-landing`), sección "El curso":** añadido un punto **bonus destacado** debajo de la lista — **"+" amarillo (mismo estilo que los ticks) · "1 sesión final con Nacho GRATIS"** en una sola línea (también en móvil). Refuerza el gancho de la sesión gratis del Premium.

---

## 🆕 NOVEDADES (4-jul-2026) — venta 100% operativa + pulido

- **✅ Email de bienvenida FUNCIONANDO de punta a punta.** Probado con pago real: al pagar llega el correo automático. Se arreglaron las variables de Vercel (`STRIPE_SECRET_KEY` con una `sk_live_` nueva creada en Stripe, `RESEND_API_KEY`) — el fallo era una clave de Stripe incorrecta. Diagnóstico temporal ya retirado.
- **🖼️ Logo del email = sello circular blanco con el logo ETC original, sobre verde `#C8EDE4`.** Clave: es una **imagen opaca en alta resolución** (`images/logo-etc-badge-circle.png`, ~1020px, generada desde `logo-etc-real.png`) → **a prueba de modo oscuro** (los clientes de correo oscurecen fondos/texto pero NO los píxeles de una imagen opaca). Sin sombra, logo centrado ópticamente, tamaño fijado en el `style` para que no se estire.
- **👤 El nombre ya NO se pide en `success.html`.** `success.html` solo da bienvenida + botón **"¡Empieza ya el curso!"**. El nombre se pide **al entrar al curso** (`dashboard.html`): una "puerta" obligatoria (*"Lo primero de todo, ¿cómo te llamas?"*, nombre+apellidos → `etc_name`, sin opción a saltar) que aparece antes de pintar el curso y pone las iniciales en el avatar.
- **⏱️ Duración corregida en el dashboard:** chip "15 clases · ~8 horas" → **"+3 horas"**, y las duraciones por clase bajadas a 10-14 min (suma ≈ 3 h).
- **🔗 Links de pago con MARCA (`/premium` y `/basico`).** Al compartir por WhatsApp/redes salían feos (`buy.stripe.com` → "Stripe Checkout"). Ahora se comparten `curso.equilibratucamino.com/premium` y `/basico`: páginas ligeras con **tarjeta Open Graph** (imagen `images/og-curso.png` — charcoal+dorado, "SE ACABÓ EL JUEGO", 5,0★) que **redirigen al instante** a Stripe (redirección solo por JS, sin `meta refresh` — así el robot de preview lee la tarjeta). Añadido `vercel.json` con `cleanUrls:true` (URLs sin `.html`).
- **🖼️ `og:image` añadida también al `funel.html`** (misma tarjeta de marca).
- Nota WhatsApp: cachea la preview; para forzar refresco al probar, añadir `?v=2` a la URL.

---

## 🆕 NOVEDADES (30-jun-2026)

- **Nueva página de VENTA / funnel: `funel.html`** (antes se probó como `venta.html`, renombrada). Es la página comercial del curso, una "sales funnel page" estilo academias (Madrid Content Club, Mundo Amazon, etc.). Vive **aparte** de `index.html` (que sigue siendo la landing original del curso). → ver sección **6 bis** y **enlaces**.
- **Estilo propio del funnel**: tipografía **Roboto** (Black, ancha, mayúsculas), paleta **charcoal oscuro + dorado/ámbar (`#FFB300`)** (NO el verde/teal del resto del curso), con countdown de urgencia, precios tachados, etc. Es deliberadamente distinto al `index.html`.
- **Duración real del contenido corregida: ~3 h (más de 3 horas), NO 8 h.** Actualizado en funnel y en la tabla de clases (duraciones por clase reducidas a ~10-15 min).
- **Frase del dashboard cambiada**: `Bienvenido a tu camino.` → **"Empieza tu camino, Se acabó el Juego."** (`dashboard.html`, id `heroTitle`).
- **Capturas de prensa reales** añadidas (Diario Público, Canal 4 "Mallorca a la Carta", Mejor Informado…) en el funnel y también en la **home de la web oficial** (`etc-landing`, carrusel de medios). Imágenes nuevas en `images/`: `publico-apuestas-1.jpg`, `publico-apuestas-2.jpg`, `media-2/3/4.webp`, `media-canal4.webp`, `logo-*` de medios.
- **✅ VENTA ACTIVADA (2-jul):** el curso **ya se puede comprar**. Flujo completo funcionando:
  - Botones del funnel → **Stripe Payment Links** (Básico 190€ / Premium 219€; cupón `MARCOS10` = −10€ solo en Premium).
  - Tras pagar → **`success.html`** (página de gracias, detecta el plan, pide nombre+apellidos → `etc_name`, guarda `etc_plan`).
  - **Email de bienvenida automático** vía función serverless **`/api/send-welcome.js`** (Stripe da el email del comprador + Resend lo envía). Requiere variables en Vercel: `STRIPE_SECRET_KEY`, `RESEND_API_KEY`.
- **Pendiente grande (siguiente bloque):** el **acceso al curso sigue abierto** (cualquiera con la URL de `dashboard.html` entra; progreso en `localStorage`, por dispositivo). La protección real (**cuentas/login con Supabase** + progreso en la nube + **vídeos propios protegidos**) es la recomendación → ver sección **18**. Se hará junto con las grabaciones de julio.

---

## ÍNDICE
1. Resumen
2. Producto y planes
3. Repos, deploy y enlaces
4. Arquitectura técnica
5. Sistema de diseño
6. Páginas en detalle
7. Las 15 clases
8. Flujos paso a paso
9. Lógica funcional
10. Datos guardados (localStorage)
11. Integraciones externas
12. Precios
13. Hecho ✅
14. Pendiente ⏳
15. Cómo hacer cambios típicos
16. Decisiones a confirmar
17. Workflow
18. **Puesta en venta del curso (pago + email + acceso)** ← para el próximo chat

---

## 1. Resumen

Curso online para dejar la ludopatía: **15 clases en vídeo + ejercicios**, a tu ritmo, desde cualquier dispositivo. Creado por **Nacho** (fundador de ETC, exludópata) y **Marcos Agudo** (especialista). El curso funciona como **gancho**: al terminar, el alumno puede reservar una **sesión privada/final con Nacho** (de pago en básico, gratis en premium) o apuntarse a **webinars** mensuales.

Tono de marca: directo, cercano, sin tecnicismos, "de alguien que lo ha vivido". Nada clínico ni corporativo.

---

## 2. Producto y planes

**Mismo curso, dos planes** (el premium es un "copia-pega" del básico + un extra al final):

### Plan Básico — 190€
- Acceso completo a las 15 clases.
- Cuadro de sesión visible **siempre**: *"Reserva tu sesión privada con Nacho o Marcos"* → calendario → **pago 65€** (Stripe).
- Sin sesión final incluida.

### Plan Premium — 219€
- Las mismas 15 clases.
- **Sesión final 1:1 con Nacho GRATIS** (incluida).
- Durante el curso el cuadro de sesión sale **bloqueado**: *"Tendrás tu sesión final GRATIS cuando acabes la clase 15"* + 🔒.
- Al **completar las 15**, se desbloquea automáticamente y, además, aparece un **bloque dorado** entre las clases y el certificado: *"Reserva tu última sesión con Nacho — GRATIS"*.

> El precio premium (219€) está muy cerca del básico (190€): valorar subirlo (la diferencia de 29€ por una sesión 1:1 es muy baja).
> Spec original: `/Users/inaki/Desktop/Archivos Md Claude/curso_landing_ ideas estructura.md`

---

## 3. Repos, deploy y enlaces

| Recurso | Valor |
|---------|-------|
| GitHub | `Equilibratucamino/etc-curso` (rama `main`) |
| **Dominio LIVE** | **https://curso.equilibratucamino.com** ✅ (subdominio, SSL ok) |
| URL Vercel | `https://etc-curso-equilibratucamino.vercel.app` (la `etc-curso.vercel.app` da 404, NO usar) |
| Deploy | push a `main` = despliegue automático en Vercel |
| Local | `/Users/inaki/etc-curso/` |
| Proyecto Vercel | `prj_obDjmjDw3r4SEzOm05RnjFb7Amc5` · team `team_XX0LTqydH1xCMINCkHC0ANQs` |
| WhatsApp ETC | +34 611 847 645 |

### Dominio y despliegue (resuelto 23-jun)
- El subdominio **`curso.equilibratucamino.com`** apunta a Vercel con un **CNAME** en Hostinger: `curso` → `cname.vercel-dns.com` (Vercel sugiere `5467a7a7d97e4810.vercel-dns-016.com` pero el clásico funciona). Conectado a **Production**.
- `.curso` NO es un TLD válido → se descartó `equilibratucamino.curso`. Los subdominios son **gratis**.
- Estaba activada la **Deployment Protection (Vercel Authentication)** → bloqueaba todo con login (401). Se **desactivó** (Settings → Deployment Protection → Require Log In = OFF). Ahora es público.

### Enlaces
- **Home (landing original):** `https://curso.equilibratucamino.com` (= `index.html`)
- **Funnel / página de VENTA:** `https://curso.equilibratucamino.com/funel.html` ⭐ (la nueva, donde se vende)
- **🔗 Link de pago Premium (para compartir):** `https://curso.equilibratucamino.com/premium` → tarjeta de marca + redirige a Stripe 219€
- **🔗 Link de pago Básico (para compartir):** `https://curso.equilibratucamino.com/basico` → tarjeta de marca + redirige a Stripe 190€
- **Dashboard Premium:** `https://curso.equilibratucamino.com/dashboard.html?plan=premium`
- **Dashboard Básico:** `https://curso.equilibratucamino.com/dashboard.html?plan=basic`
- **Empezar de 0 (demo):** añade `?reset=1` (borra progreso/notas/nombre y arranca en la clase 1)
- **Certificado:** `https://curso.equilibratucamino.com/certificate.html` (requiere 15/15)

> `?plan=` fija la versión en ese navegador (en real lo fija la compra). `?reset=1` reinicia el curso a 0 para demos.
> **URLs limpias** (`vercel.json` → `cleanUrls:true`): `/premium`, `/basico`, `/dashboard`, etc. funcionan sin `.html` (las `.html` redirigen con 308).

---

## 4. Arquitectura técnica

- **Sitio estático**: HTML + CSS + JavaScript puro. **Sin login ni base de datos.** Única pieza de servidor: la **función serverless `/api/send-welcome.js`** (Vercel) que manda el email de bienvenida (Stripe + Resend).
- Todo el estado (progreso, notas, nombre, plan) se guarda en el **navegador del alumno** (`localStorage`). → Implicación: el progreso/notas **no** siguen al alumno entre dispositivos, y Iñaki **no** ve las respuestas. Para eso haría falta cuentas + BD (ver Pendiente).
- Fuentes: Google Fonts (**Fraunces** display/serif + **Inter** cuerpo; **Great Vibes** solo para el nombre del certificado).
- Dependencias externas solo por CDN y bajo demanda: **html2canvas + jsPDF** (descarga del certificado en PDF). El reproductor de vídeo es el embed **lite de YouTube** (carga el iframe solo al hacer clic).
- Deploy automático: cada `git push origin main` → Vercel publica.

---

## 5. Sistema de diseño

Estética: **wellness premium con toque moderno**, fría/neutra, dorado mate elegante, fondos oscuros para secciones "premium". Se descartó: la monoespaciada "de ordenador", el oro brillante "de plástico", los emojis/avatares de colores (sustituidos por iconos SVG e iniciales sobrias o eliminados).

### Paleta (tokens CSS)
| Token | Valor | Uso |
|-------|-------|-----|
| `--teal` | `#2FA97F` | Acento principal |
| `--teal-d` | `#1F8C68` | Teal oscuro (hover, textos) |
| `--teal-dd` | `#15694E` | Teal muy oscuro |
| `--ink` | `#1E211D` | Texto / fondos oscuros |
| `--ink-2` | `#2A2E28` | Fondo oscuro alterno |
| `--muted` | `#6E7168` | Texto secundario |
| `--subtle` | `#A1A399` | Labels, captions |
| `--bg` | `#F2F3F2` | Fondo base (frío neutro) |
| `--paper` | `#FFFFFF` | Tarjetas |
| `--gold-ink` | `#A07E2A` | Oro (webinar, detalles) |
| `--stone-bg/bg2/ink` | `#EEEDEA / #E5E4DF / #8B8D84` | Neutro para clases bloqueadas |
| pastels | mint/lav/sky/peach/blush | (definidos; uso reducido) |

### Tipografía
- **Fraunces** (serif): titulares, números grandes, "displays". `letter-spacing: -0.02em`.
- **Inter**: cuerpo, etiquetas (en mayúsculas con letter-spacing para los "eyebrows"). La variable `--mono` apunta a Inter (ya **no** monoespaciada).
- **Great Vibes** (script): exclusiva del **nombre en el certificado**.

### Componentes
- Radios: tiles 22px · inner 14px · botones píldora (999px) salvo donde se buscó look más tech.
- Sombras suaves en capas (`--sh-sm/md/lg`).
- Botones: primario teal (gradiente), oro mate (texto oscuro tipo foil), oscuro/ink (premium discreto).
- Animaciones: `reveal` al hacer scroll (aparición escalonada) y **giro de hoja** (rotateY) en las 3 fases del programa. Respetan `prefers-reduced-motion`.

---

## 6. Páginas en detalle

### `index.html` — Landing (venta)
- **Sin menú superior** (se eliminó el nav en móvil y desktop para un hero limpio y directo).
- **Hero** claro con burbujas teal + mascotas (corazón / tragaperras), **titular grande e impactante** "15 clases para *cerrar una etapa.*" (Fraunces 600 + em italic teal 700), **badge oficial de Google Reviews** (logo 4 colores + estrellas amarillas + "5,0 · 47 reseñas"), **botón "Accede al curso" grande con latido** (animación `btnPulse`), y stats (15 clases · 500+ personas · ∞ acceso de por vida). En móvil: 2 stats arriba + "acceso de por vida" debajo.
- **El programa** (sección oscura): métricas (15 clases · +8 h · 60+ ejercicios · ∞) + las 15 clases agrupadas en **3 fases** (Entender / Reconstruir / Avanzar) con duración por fase y por clase + chips "incluye" (certificado, ejercicios, sesiones, webinars, 100% privado).
- **Instructores**: Nacho + Marcos (fotos reales), compactos.
- **Certificado**: diploma de muestra.
- **Webinars**: tarjeta compacta, oro mate, 25€/sesión.
- **Casos de éxito** (sección oscura): 3 vídeos de YouTube (los mismos de la web).
- **Reseñas** (sección oscura): 3 testimonios + badge Google (sin círculos de iniciales).
- **CTA final**.
- **Falta**: sección "Los dos planes" (tabla Básico vs Premium) + FAQ (el upsell ya apunta a `#planes`).

### `funel.html` — Página de VENTA (funnel) ⭐ NUEVA
La página comercial del curso, **independiente** de `index.html`. Estilo propio (Roboto + charcoal/dorado), pensada para convertir. Estructura de arriba a abajo:
1. **Barra de oferta** + nav (logo ETC grande + enlace "Precio de lanzamiento"; **sin** botón "Comprar" arriba para no saturar).
2. **Hero**: titular "Deja de jugar. Recupera tu vida.", 3 bullets, VSL (vídeo YouTube `I_zWGSli3Bs`), badge Google 5,0.
3. **Barra de autoridad**: logos de prensa en marquee (negro, gris), igual que la home oficial; al pasar el ratón va a cámara lenta (JS, no se para).
4. **Countdown** de oferta (evergreen 24 h por visitante, localStorage `etc_funnel_deadline`).
5. **Stats** con count-up (500+ · 15 · +3h · 5,0★).
6. **¿Es este curso para ti?** a 2 columnas: izquierda sí (verde) / no (rojo), más pequeño; **derecha mockup del curso real**: **iMac** (solo pantalla, sin peana, con logo Apple) mostrando una clase (`modulo.html?n=1`) + **iPhone** que se desliza solo (en desktop; quieto en móvil) mostrando el `dashboard.html`. Son **iframes** del propio curso, escalados con JS (`ResizeObserver` + paneo `translateY`).
7. **"Ya no hay excusas, se acabó el juego"** + 3 beneficios + bloque **"¿Qué incluye?"** (6 puntos en tarjetas amarillas animadas: 15 clases grabadas · referentes · exludópatas · certificado · casos reales · sorpresa).
8. **Programa** (15 clases en 3 fases), **instructores**, **prensa** (collage/mosaico de recortes: Mallorca a la Carta destacada + Diario Público/Mejor Informado), **casos de éxito** (3 vídeos + reseñas en marquee), **certificado**.
9. **Precios**: Básico 190€ vs **Premium 219€ destacado** (ribbon, borde dorado) enfatizando la **sesión final 1:1 de 1 h GRATIS** (valor 65€, "por solo 29€ más"). Precios tachados (240€/284€) de "lanzamiento".
10. Bloque **"agenda una primera sesión"** (alternativa), garantía, FAQ, CTA final, **CTA fijo en móvil**.

**CTAs de compra** → constantes JS al final del archivo:
```js
const STRIPE = { basic:'', premium:'' };  // ← pegar Payment Links de Stripe
const BOOK_URL = '';                       // ← URL del calendario de reserva
```
Mientras estén vacías, los botones de plan llevan a **WhatsApp** (+34 611 847 645). En cuanto se peguen los links de Stripe, compran por ahí. **Esto es lo que falta para vender (ver sección 18).**

### `dashboard.html` — Mi curso
- **Puerta de nombre (obligatoria) al entrar** si no hay `etc_name`: *"Lo primero de todo, ¿cómo te llamas?"* → nombre+apellidos → `etc_name` (certificado) + iniciales en el avatar. Sin opción a saltar.
- Bento: **hero** (saludo dinámico + ilustración + "continuar"), **panel de progreso** (anillo + X/15), **cuadro de sesión** (premium/básico, ver flujos) y **webinar**.
- **"Tus 15 clases"**: tarjetas tipo curso (portada de color, número grande, estado: completada / actual / bloqueada). Chip **"15 clases · +3 horas"**; duraciones 10-14 min.
- **Bloque dorado de sesión final** (solo premium + 15/15) entre las clases y el certificado.
- **Banner de certificado** → `certificate.html`.

### `modulo.html?n=` — Clase (1–15)
- Tema oscuro/cinematográfico. Cabecera con progreso dinámico.
- **Vídeo** (placeholder hasta julio; data-driven vía `VIDEOS`).
- **"Lo que trabajarás"** + **ejercicios con respuesta guardable** + **"Mis notas"** (botón "Guardar notas" + autoguardado).
- **Botón "Marcar como completada → Desbloquear siguiente"**.
- Sidebar: progreso, lista de clases (accesibles/bloqueadas), Anterior/Siguiente.
- **Control de acceso**: si la clase está bloqueada, redirige al dashboard.

### `certificate.html` — Certificado
- **Bloqueado** hasta completar las 15 (muestra progreso).
- Al completar: felicitación + **diploma con el diseño real de ETC** (imagen `images/certificado-base.jpg`, azul noche + dorado + sello de cera ETC) y el **nombre del alumno** superpuesto en Great Vibes (centrado sobre la línea, autoajuste de tamaño, por defecto "Tu nombre").
- **Descarga en PDF** (html2canvas + jsPDF) con diseño + nombre.

### `reserva.html` — Reserva
- Página dentro del curso que **embebe** (de momento) la reserva de la plataforma. Muestra el precio según plan (premium 0€ / básico 65€). Pendiente: sustituir por el calendario propio (ver Pendiente).

### `success.html` — Gracias (post-pago)
- Adonde manda Stripe tras pagar. Lee `?plan=` y `?session_id=`, guarda `etc_plan`, muestra plan + lo que incluye + botón **"¡Empieza ya el curso!"** (una línea en móvil) → `dashboard.html?plan=…`. Llama a `/api/send-welcome` para enviar el email. **No pide el nombre** (se pide en el dashboard).

### `premium.html` / `basico.html` — Links de pago con marca
- Se comparten como `/premium` y `/basico`. Llevan **tarjeta Open Graph** (`images/og-curso.png`) para que WhatsApp/redes muestren una previa profesional, y **redirigen al instante** (JS) al Payment Link de Stripe correspondiente. Splash con logo mientras redirige + enlace "Continuar al pago".

### `/api/send-welcome.js` — Email de bienvenida (serverless)
- Recibe `{sessionId, plan}`, pide el email a Stripe y lo envía con Resend. Ver sección 18.

---

## 7. Las 15 clases

| # | Clase | Dur. | Fase |
|---|-------|------|------|
| 01 | Aceptar la realidad | 10 min | Entender |
| 02 | La mente de un ludópata | 14 min | Entender |
| 03 | Dopamina y cerebro | 12 min | Entender |
| 04 | Las mentiras que te cuentas | 13 min | Entender |
| 05 | Romper el ciclo | 11 min | Entender |
| 06 | Gestión de impulsos | 14 min | Reconstruir |
| 07 | Ansiedad, culpa y vergüenza | 12 min | Reconstruir |
| 08 | Reconstruir la confianza | 11 min | Reconstruir |
| 09 | Dinero y recuperación | 15 min | Reconstruir |
| 10 | La nueva identidad | 10 min | Reconstruir |
| 11 | Crear nuevos hábitos | 12 min | Avanzar |
| 12 | Familia y entorno | 13 min | Avanzar |
| 13 | Prevenir recaídas | 12 min | Avanzar |
| 14 | Diseñar una nueva vida | 11 min | Avanzar |
| 15 | El futuro empieza hoy | 10 min | Avanzar |

> **Total ≈ 3 h** (más de 3 horas), NO 8 h. Fases: Entender 1h 00m · Reconstruir 1h 02m · Avanzar 58m.
> Títulos y duraciones **provisionales**: se ajustarán con las grabaciones reales (julio).
> ⚠️ `funel.html` ya usa +3h. **`index.html` (landing original) todavía dice "+8 h"** → actualizar cuando se toque.

---

## 8. Flujos paso a paso

### A) Alumno Básico
1. Compra el plan básico (190€).
2. Entra al dashboard → empieza la **Clase 01**.
3. Ve el vídeo, hace ejercicios y notas → **"Marcar como completada"** → se desbloquea la siguiente. Y así hasta la 15.
4. Cuadro de sesión visible todo el tiempo: *"Reserva tu sesión privada con Nacho o Marcos"* → reserva → **paga 65€** (Stripe).
5. Al completar las 15 → **certificado** descargable.

### B) Alumno Premium
1. Compra el plan premium (219€).
2. Mismo recorrido de clases 01→15.
3. Durante el curso, el cuadro de sesión sale **bloqueado**: *"Tendrás tu sesión final GRATIS cuando acabes la clase 15"*.
4. Al completar la **Clase 15**: se desbloquea + aparece **bloque dorado** *"Reserva tu última sesión con Nacho — GRATIS"* (antes del certificado).
5. Reserva su sesión final → **0€** (incluida).
6. **Certificado** descargable.

### C) Certificado
1. Disponible solo con 15/15.
2. El alumno escribe su **nombre** ("Tu nombre" por defecto) → aparece en el diploma en tiempo real.
3. **Descarga el PDF**.

### D) Reserva de sesión
- Hoy: `reserva.html` embebe el flujo `/leads` de la plataforma (formulario → calendario → pago).
- Objetivo: calendario propio **directo** (sin preguntas) conectado a Google Calendar de Iñaki; premium 0€ / básico 65€.

### E) Notas y ejercicios
- En cada clase, el alumno escribe respuestas a los ejercicios y notas libres → **se guardan** (botón + autoguardado) y siguen ahí al volver (en ese dispositivo).

---

## 9. Lógica funcional

- **Progreso/desbloqueo**: `etc_progress_v1.completed` (array). La clase "actual" es la primera no completada; las posteriores están bloqueadas. `modulo.html` redirige al dashboard si intentas saltarte el orden.
- **Plan**: `etc_plan` ('premium'|'basic'); se puede fijar con `?plan=` en la URL; por defecto premium. Controla el cuadro de sesión y el bloque dorado.
- **Notas/respuestas**: se guardan por número de clase.
- **Certificado**: comprueba 15/15; el nombre (`etc_name`) se superpone por CSS/JS y se autoajusta para no tapar "RECONOCE QUE:".

---

## 10. Datos guardados (localStorage)

| Clave | Contenido |
|-------|-----------|
| `etc_progress_v1` | `{ completed:[...] }` |
| `etc_notes_v1` | notas por clase |
| `etc_answers_v1` | respuestas de ejercicios por clase |
| `etc_name` | nombre del certificado |
| `etc_plan` | `premium` / `basic` |

---

## 11. Integraciones externas

- **Casos de éxito (YouTube)** en la landing — IDs en uso: `LC-jGG2ztBw`, `I_zWGSli3Bs`, `fLFICwNGS1g` (un 4º se quitó). Embed lite (clic para cargar).
- **WhatsApp**: +34 611 847 645 (CTAs de sesión/webinar de respaldo).
- **Reserva / calendario**: hoy embebe `etc-plataforma.vercel.app/leads`. La web usa Cal.com (`cal.com/equilibratucamino`) pero **se descartó** para el curso: el calendario bueno es el de la plataforma / el de la web conectado a Google Calendar.
- **Google Calendar** de Iñaki (`equilibratucamino@gmail.com`) — se conectará cuando se monte el calendario propio.
- **Stripe**: pendiente crear **3 productos / Payment Links**: (1) Plan Básico 190€, (2) Plan Premium 219€, (3) "Sesión final con Nacho" 65€ (para básico). Los links del curso (190/219) se pegan en `funel.html` → `const STRIPE = {basic, premium}`. (Ver sección 18.)
- **Capturas de prensa** (en `funel.html` y en la home de `etc-landing`): `publico-apuestas-1.jpg`, `publico-apuestas-2.jpg` (Diario Público, art. Polymarket/Mundial donde citan a Nacho/ETC), `publico-article.webp`, `media-3.webp` (Diario Público), `media-4.webp` (Mejor Informado), `media-2.webp` + `media-canal4.webp` (Canal 4 "Mallorca a la Carta"), `logo-publico.svg`, `logo-canal4/mamireporter/lmental/evermine2/mejorinformado/caminemos.webp`.
- **PDF**: html2canvas + jsPDF (CDN).

---

## 12. Precios

| Concepto | Precio |
|----------|--------|
| Plan Básico | 190€ |
| Plan Premium (curso + sesión final 1:1) | 219€ |
| Sesión final/privada (básico) | 65€ |
| Sesión final (premium) | 0€ (incluida) |
| Webinar grupal mensual | 25€ |

---

## 13. Hecho ✅

- Desbloqueo secuencial de clases + control de acceso.
- Notas y respuestas de ejercicios guardables y persistentes.
- Certificado con **diseño real de ETC** + nombre del alumno + descarga PDF.
- Lógica premium/básico (flag `etc_plan`), cuadro de sesión con sus 3 estados, bloque dorado de sesión final.
- Landing: programa por fases, métricas, casos de éxito con vídeos, reseñas con badge Google, webinars, animaciones (reveal + giro de hoja).
- Estética depurada: fría/neutra, Inter+Fraunces (sin mono), oro mate, casos de éxito en oscuro.
- Página de reserva (embebe plataforma) que pasa el plan.
- Responsive (desktop, tablet, móvil).
- **`funel.html`** (NUEVA): página de venta completa — hero+VSL, autoridad (logos prensa), countdown, stats, para-quién, mockup del curso real (iMac+iPhone con iframes), ¿qué incluye?, programa, instructores, collage de prensa, casos de éxito, planes (Básico/Premium con sesión 1h gratis destacada), garantía, FAQ. Botones de compra listos para Stripe (hoy → WhatsApp).
- Capturas de prensa reales integradas en `funel.html` y en la home oficial (`etc-landing`).
- Duración corregida a ~3 h (funnel **y** dashboard: chip "+3 horas" + clases 10-14 min); frase del dashboard → "Empieza tu camino, Se acabó el Juego.".
- **Venta activada de punta a punta:** funnel → Stripe → `success.html` → **email de bienvenida automático** (Resend + Stripe, variables de Vercel OK, probado con pago real).
- **Puerta de nombre** obligatoria al entrar al curso (`dashboard.html`) → `etc_name` para el certificado; iniciales en el avatar.
- **Email branded** con sello circular del logo ETC sobre verde, en alta resolución y **a prueba de modo oscuro**.
- **Links de pago con marca** `/premium` y `/basico` (tarjeta OG `og-curso.png` + redirección a Stripe); `og:image` también en el funnel; `vercel.json` con URLs limpias.

---

## 14. Pendiente ⏳

> **Lo esencial YA está hecho y la venta funciona.** Lo que queda es sobre todo **contenido/material que Iñaki grabará en las próximas semanas** (3 cosas):

### 🎯 LO QUE FALTA (próximas semanas) — material de Iñaki
1. **🎬 Vídeo HOOK / VSL de la funnel** (`funel.html`, zona hero). Hoy hay un placeholder. Cuando Iñaki grabe el vídeo de gancho, se incrusta ahí.
2. **📸 Foto real estilo podcast** para el banner de prensa del funnel → sustituir `images/podcast-studio.jpg` (hoy foto de stock) por una **foto real de Nacho frente a otra persona**, mismo estilo (set up de podcast, luz tenue/dramática, 16:9). Basta con reemplazar el archivo con el mismo nombre.
3. **🎥 Los 15 vídeos de las clases** (clase por clase). Por cada grabación que envíe Iñaki:
   - **Alojar el vídeo** (Vimeo/Mux recomendado, no YouTube — ver sección 18) → referencia en `VIDEOS` de `modulo.html`.
   - **Analizar** el contenido de esa clase.
   - **Crear el contenido real** en `CONTENT[n]`: título/descripción, "lo que trabajarás" y **ejercicios a medida de esa clase** (los textos actuales son placeholder).

### 🟢 Más adelante / opcional
- **Acceso real + progreso en la nube** (Supabase login + vídeos protegidos) → sección 18. Se monta junto con los vídeos.

### 🟡 Calendario de reserva
- Hacerlo **igual que el de la web** (`app.equilibratucamino.com/reserva/`) pero **conectado al Google Calendar de Iñaki**.
- **Plan acordado:** cuando el de la web esté confirmado y funcionando (Google Calendar + Stripe), **copiarlo tal cual** al curso.
- Directo al calendario (sin las 3 preguntas). Premium 0€ / Básico 65€ (producto Stripe "Sesión final con Nacho").

### ✅ Poner el curso EN VENTA (pago + email) — HECHO → **ver sección 18**
- Payment Links de Stripe (190€ / 219€) en `funel.html` + links de marca `/premium` `/basico`. ✅
- Email automático tras pagar (Resend + Stripe, variables de Vercel) — **probado con pago real**. ✅
- **Queda** (por Iñaki): archivar el link de prueba de 1€ (o dejarlo apuntando al Premium, como hizo) y confirmar que ambos Payment Links reales tienen la Success URL con `&session_id={CHECKOUT_SESSION_ID}`.
- **Queda (gran bloque):** acceso real / proteger la URL de `dashboard.html` + progreso en la nube (Supabase, sección 18).

### 🟢 Otros
- `funel.html`: sustituir el iMac CSS por el **mockup hiperrealista de Canva** si Iñaki exporta el PNG.
- `index.html` (landing original): actualizar "+8 h" → "+3 h" (el funnel y el dashboard ya están corregidos); valorar añadir tabla de planes + FAQ.
- (Opcional) Producto Stripe "Sesión final con Nacho" 65€ para el plan Básico (aún sin crear).
- **Foto de podcast del funnel**: `images/podcast-studio.jpg` es hoy una **foto de stock** (Pexels). Sustituir por una **foto real de Nacho frente a otra persona** con el mismo estilo (set up de podcast, luz tenue/dramática, 16:9). Basta con reemplazar el archivo con el mismo nombre.
- (Opcional) **Cuentas + base de datos** (Supabase) — detallado en sección 18 (Opción C).
- Sustituir la imagen base del certificado por el original en máxima calidad si Iñaki lo tiene en PNG/JPG.

> ✅ **Resuelto 23-jun:** dominio `curso.equilibratucamino.com` live con SSL; protección de despliegue desactivada; hero sin menú + título más grande + botón con latido.

---

## 15. Cómo hacer cambios típicos

- **Vídeo de una clase:** `modulo.html` → `const VIDEOS = { 1:'IDyoutube', ... }`.
- **Contenido real de una clase:** `modulo.html` → `CONTENT[n] = { desc, learn:[...], exercises:[...] }`.
- **Calendario/reserva:** iframe en `reserva.html`; (si se enlaza directo) `CALENDAR_URL` en `dashboard.html`.
- **Certificado:** imagen `images/certificado-base.jpg`; nombre (fuente/tamaño/posición) en `certificate.html`.
- **Precio/plan:** textos del cuadro de sesión en `dashboard.html` (bloque `PLAN + SESIÓN FINAL`).
- **Publicar:** `git add -A && git commit -m "..." && git push origin main`.

---

## 16. Decisiones a confirmar

- ¿Subir el precio premium (219€ está muy cerca de 190€)?
- URL/entorno final del calendario (producción vs develop) y si va directo al calendario o con formulario.
- Caligrafía exacta del nombre del certificado (ahora Great Vibes; se puede cambiar).
- ¿Se quiere persistencia entre dispositivos (cuentas + BD)?

---

## 17. Workflow

- Trabajamos en **la parte del curso** (este repo). Cambios → commit + push a `main` → Vercel despliega solo.
- Mantener **este documento al día** al cerrar cada sesión.

---

## 18. Puesta en venta del curso (pago + email + acceso)

### ✅ HECHO (2–4 jul-2026) — el curso se compra y el email FUNCIONA
Flujo completo **probado con pago real**: **funnel/link → pago Stripe → `success.html` → email de bienvenida → entra al curso → puerta de nombre.**

- **Pago (Stripe Payment Links).** En `funel.html`, al final:
  ```js
  const STRIPE = {
    basic:   'https://buy.stripe.com/4gM7sN64c6hC9PMeMe2go01',   // 190€
    premium: 'https://buy.stripe.com/00w28tdwE7lG6DA5bE2go00'    // 219€ (cupón MARCOS10 = −10€)
  };
  ```
  Cupón **`MARCOS10`** (−10€) **solo Premium**. El link de **prueba de 1€** Iñaki lo dejó apuntando al **mismo thankful URL del Premium** (se puede archivar en Stripe).
- **Links de marca para compartir:** `premium.html` (`/premium`) y `basico.html` (`/basico`) → tarjeta OG (`images/og-curso.png`) + redirección JS a Stripe. Ver NOVEDADES 4-jul.
- **`success.html`** — página de éxito (Fraunces+Inter). Lee `?plan=` y `?session_id=`, guarda `etc_plan`, muestra plan+incluye y botón **"¡Empieza ya el curso!"** → `dashboard.html?plan=…`. **Ya NO pide el nombre** (se pide en el dashboard). Llama a `/api/send-welcome` con el `session_id`.
- **Puerta de nombre en `dashboard.html`** — al entrar sin `etc_name`, aparece un overlay obligatorio (*"Lo primero de todo, ¿cómo te llamas?"*, nombre+apellidos, sin saltar) → guarda `etc_name` (certificado) + iniciales en el avatar. Se pinta antes que el curso (sin parpadeo para quien ya lo tiene).
- **`/api/send-welcome.js`** — función serverless (Vercel). Pide a **Stripe** el email del comprador (`STRIPE_SECRET_KEY`) y envía el **email branded** con **Resend** (`RESEND_API_KEY`) desde `Nacho · ETC. <hola@equilibratucamino.com>` (dominio verificado en Resend). Cabecera: **verde `#C8EDE4`** (fondo CSS de la celda) + **sello circular blanco** con el logo ETC original en **alta resolución** (`images/logo-etc-badge-circle.png`, ~1020px) → **a prueba de modo oscuro** (imagen opaca).
- **Variables en Vercel** (`etc-curso` → Settings → Environment Variables, Production+Preview): `STRIPE_SECRET_KEY` (`sk_live_…`, clave nueva creada 4-jul) y `RESEND_API_KEY` (`re_…`). Cambiar una variable requiere **Redeploy**.
- **Success URLs en Stripe** (After payment → Redirect), con `&session_id={CHECKOUT_SESSION_ID}`:
  - Básico: `https://curso.equilibratucamino.com/success.html?plan=basic&session_id={CHECKOUT_SESSION_ID}`
  - Premium: `https://curso.equilibratucamino.com/success.html?plan=premium&session_id={CHECKOUT_SESSION_ID}`

> ✅ **Probado:** pago real → el email llega (revisar spam la 1ª vez). El diagnóstico temporal de la función ya se retiró.
> 🔒 **Seguridad:** las claves `sk_live_`/`re_` solo van en Stripe y en Vercel — nunca en chat/email/repo.
> ⏳ **Por Iñaki:** confirmar las 2 Success URLs reales (Básico/Premium) con el `session_id`; archivar el link de 1€ de prueba.

### ⏳ PENDIENTE — el gran bloque siguiente: acceso real + progreso + vídeos
Hoy el acceso **sigue abierto**: cualquiera con la URL de `dashboard.html` entra sin pagar, y el progreso vive en `localStorage` (por dispositivo, **no le sigue** si cambia de móvil a ordenador). Decisión de Iñaki (2-jul): como al principio se venderán pocos cursos, **el riesgo de que se comparta la URL es bajo** → se deja para más adelante, junto con las grabaciones de julio.

Las 3 cosas que Iñaki quiere (que no se comparta la URL · que el progreso siga a la persona entre dispositivos · que el nombre vaya al certificado) → **todas se resuelven con lo mismo: cuentas con login + base de datos = Supabase (Opción C).**

- **Coste:** Supabase gratis para arrancar (login ~50k usuarios/mes + BBDD); ~25 €/mes solo si crece mucho. Vídeos aparte (Vimeo/Bunny ~10-20 €/mes).
- **Dificultad:** media (camino estándar). Lo trillado.
- **Las 2 partes de trabajo reales:** (1) **conectar pago↔cuenta** (paga → crea cuenta con el mismo email → webhook de Stripe le da acceso y plan); (2) **migrar la capa de datos** de `localStorage` a Supabase en `dashboard.html`/`modulo.html`/`certificate.html`.
- **Vídeos propios (llegan en ~2 semanas, del podcast):** alojarlos en **Vimeo** ("dominio permitido": solo se reproducen dentro de `curso.equilibratucamino.com`) o **Mux** (URLs firmadas). Esto es lo que de verdad protege el contenido (con YouTube oculto el ID se filtra). Se monta a la vez que el login.

**Recomendación:** vender ya con lo actual; montar **Supabase (login + progreso en la nube) + vídeos protegidos** de una tacada cuando lleguen las grabaciones.

### Contexto técnico útil (para el chat que monte esto)
- Repo curso: `Equilibratucamino/etc-curso` (Vercel, estático + soporta `/api`). Local `/Users/inaki/etc-curso/`.
- WhatsApp ventas: +34 611 847 645. Email/Google: `equilibratucamino@gmail.com`.
- Referencia de patrón (NO tocar): `Equilibratucamino/ETC-Plataforma` (Next.js + Supabase + Stripe + Resend + Google Calendar) — proyecto de Juan.
