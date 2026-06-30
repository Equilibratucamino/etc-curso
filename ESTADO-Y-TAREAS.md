# Curso "Se Acabó el Juego" — Documento maestro

> Estado completo del curso online de ETC: **producto, diseño, flujos, planes (premium/básico) y todo lo que queda por hacer**.
> Proyecto **independiente** de la plataforma terapéutica de Juan (ETC-Plataforma).
> Última actualización: **30 junio 2026**.

---

## 🆕 NOVEDADES (30-jun-2026)

- **Nueva página de VENTA / funnel: `funel.html`** (antes se probó como `venta.html`, renombrada). Es la página comercial del curso, una "sales funnel page" estilo academias (Madrid Content Club, Mundo Amazon, etc.). Vive **aparte** de `index.html` (que sigue siendo la landing original del curso). → ver sección **6 bis** y **enlaces**.
- **Estilo propio del funnel**: tipografía **Roboto** (Black, ancha, mayúsculas), paleta **charcoal oscuro + dorado/ámbar (`#FFB300`)** (NO el verde/teal del resto del curso), con countdown de urgencia, precios tachados, etc. Es deliberadamente distinto al `index.html`.
- **Duración real del contenido corregida: ~3 h (más de 3 horas), NO 8 h.** Actualizado en funnel y en la tabla de clases (duraciones por clase reducidas a ~10-15 min).
- **Frase del dashboard cambiada**: `Bienvenido a tu camino.` → **"Empieza tu camino, Se acabó el Juego."** (`dashboard.html`, id `heroTitle`).
- **Capturas de prensa reales** añadidas (Diario Público, Canal 4 "Mallorca a la Carta", Mejor Informado…) en el funnel y también en la **home de la web oficial** (`etc-landing`, carrusel de medios). Imágenes nuevas en `images/`: `publico-apuestas-1.jpg`, `publico-apuestas-2.jpg`, `media-2/3/4.webp`, `media-canal4.webp`, `logo-*` de medios.
- **Pendiente grande para el PRÓXIMO CHAT**: poner el curso EN VENTA → pago (Stripe), email automático tras pagar y acceso del alumno (¿con usuario/contraseña o sin login?). → ver sección **18. Puesta en venta**.

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
- **Premium:** `https://curso.equilibratucamino.com/dashboard.html?plan=premium`
- **Básico:** `https://curso.equilibratucamino.com/dashboard.html?plan=basic`
- **Empezar de 0 (demo):** añade `&reset=1` (borra progreso/notas/nombre y arranca en la clase 1)
- **Certificado:** `https://curso.equilibratucamino.com/certificate.html` (requiere 15/15)

> `?plan=` fija la versión en ese navegador (en real lo fijará la compra). `?reset=1` reinicia el curso a 0 para demos.

---

## 4. Arquitectura técnica

- **Sitio estático**: HTML + CSS + JavaScript puro. **Sin backend propio, sin login, sin base de datos.**
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
- Bento: **hero** (saludo dinámico + ilustración + "continuar"), **panel de progreso** (anillo + X/15), **cuadro de sesión** (premium/básico, ver flujos) y **webinar**.
- **"Tus 15 clases"**: tarjetas tipo curso (portada de color, número grande, estado: completada / actual / bloqueada).
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
- Duración corregida a ~3 h; frase del dashboard → "Empieza tu camino, Se acabó el Juego.".

---

## 14. Pendiente ⏳

### 🔴 Julio — grabaciones (prioridad máxima)
Por cada clase, cuando Iñaki envíe la grabación:
1. **Alojar el vídeo** → ID de YouTube en `VIDEOS` de `modulo.html`.
2. **Analizar** el contenido de la grabación.
3. **Crear el contenido real** en `CONTENT[n]`: título/descripción, "lo que trabajarás" y **ejercicios a medida de esa clase**.
> Los textos actuales son placeholder.

### 🟡 Calendario de reserva
- Hacerlo **igual que el de la web** (`app.equilibratucamino.com/reserva/`) pero **conectado al Google Calendar de Iñaki**.
- **Plan acordado:** cuando el de la web esté confirmado y funcionando (Google Calendar + Stripe), **copiarlo tal cual** al curso.
- Directo al calendario (sin las 3 preguntas). Premium 0€ / Básico 65€ (producto Stripe "Sesión final con Nacho").

### 🔴 Poner el curso EN VENTA (pago + email + acceso) → **ver sección 18**
- Crear productos/Payment Links en Stripe (190€ / 219€ / 65€) y pegarlos en `funel.html`.
- Email automático tras pagar + decidir modelo de acceso (sin login / código / cuentas Supabase).
- Conectar `etc_plan` con el plan comprado de verdad y proteger el acceso a las clases.

### 🟢 Otros
- `funel.html`: sustituir el iMac CSS por el **mockup hiperrealista de Canva** si Iñaki exporta el PNG.
- `index.html` (landing original): actualizar "+8 h" → "+3 h" (el funnel ya está corregido); valorar añadir tabla de planes + FAQ.
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

## 18. Puesta en venta del curso (pago + email + acceso) — PARA EL PRÓXIMO CHAT

**Objetivo:** que un visitante compre en `funel.html`, pague, reciba un email y pueda **acceder a las clases**. Hoy el curso es **estático, sin backend, sin login** (el acceso a `dashboard.html` está abierto a cualquiera con la URL). Hay que decidir el modelo de venta/acceso.

### Estado actual del pago
- En `funel.html`, los botones de plan usan `const STRIPE = { basic:'', premium:'' }` (vacíos → caen a WhatsApp). Falta crear los productos en Stripe y pegar los **Payment Links**.
- El curso vive en Vercel (`etc-curso`), que **sí permite funciones serverless** (`/api`) si hiciera falta backend (webhooks, generar accesos, enviar emails).

### El gran punto a decidir: ¿cómo accede el alumno tras pagar?
Tres modelos, de menos a más trabajo:

**Opción A — Sin login, acceso por enlace (la más rápida).**
- Stripe **Payment Link** → al pagar, Stripe redirige a una **URL de éxito** (p. ej. `dashboard.html?plan=premium&ok=1`) y envía su **recibo por email** automáticamente.
- El acceso es "por conocer la URL". El progreso sigue en `localStorage` (por dispositivo).
- ✅ Cero backend, se monta hoy. ❌ Cualquiera con el enlace entra; no hay cuentas; no se recupera el progreso en otro dispositivo.
- Email automático: el recibo de Stripe + (opcional) un email propio con el enlace usando **Resend** desde una función `/api` activada por **webhook de Stripe**.

**Opción B — Acceso con "código/contraseña" simple (intermedia).**
- Stripe Payment Link → página de éxito que muestra/envía un **código de acceso**. `dashboard.html` pide ese código (una contraseña compartida o por compra) antes de mostrar las clases.
- ✅ Poco backend. ❌ No son cuentas reales; un código se puede compartir.

**Opción C — Cuentas reales (usuario + contraseña) con BBDD (la "pro").**
- **Supabase** (Auth + Postgres) para registro/login. Webhook de Stripe marca al usuario como "comprado" (y su plan básico/premium). `dashboard.html`/`modulo.html` comprueban sesión.
- Progreso/notas/respuestas pasan de `localStorage` a la BBDD → **siguen al alumno entre dispositivos** y Iñaki puede ver respuestas.
- ✅ Lo correcto a medio plazo (control de acceso real, multi-dispositivo, datos). ❌ Más trabajo: Auth, esquema BBDD, migrar el estado de `localStorage`, proteger páginas.

> **Recomendación para arrancar:** Opción A (vender ya con Payment Links + email de Stripe/Resend) y migrar a **Opción C (Supabase)** cuando haya volumen. La plataforma de Juan (ETC-Plataforma) ya usa Supabase+Stripe+Resend; se puede reutilizar el patrón, **sin tocar su repo**.

### Checklist para el próximo chat
- [ ] Crear en Stripe: **Plan Básico 190€**, **Plan Premium 219€**, **Sesión final 65€** (modo live).
- [ ] Pegar los Payment Links en `funel.html` (`STRIPE.basic`, `STRIPE.premium`).
- [ ] Definir **URL de éxito** de cada Payment Link (a dónde llega el alumno tras pagar) y **URL de cancelación**.
- [ ] Decidir modelo de acceso (A / B / C).
- [ ] **Email post-pago**: recibo de Stripe (auto) y/o email propio con acceso (Resend + función `/api` + **webhook de Stripe**).
- [ ] (Si C) Supabase: Auth, tabla de compras/plan, proteger `dashboard.html`/`modulo.html`, migrar progreso de `localStorage`.
- [ ] Conectar el flag `etc_plan` con el plan realmente comprado.
- [ ] Pensar **control de acceso** real a las clases (hoy `dashboard.html` es público).

### Contexto técnico útil (para arrancar rápido en el nuevo chat)
- Repo curso: `Equilibratucamino/etc-curso` (Vercel, estático + soporta `/api`). Local `/Users/inaki/etc-curso/`.
- WhatsApp ventas: +34 611 847 645. Email/Google: `equilibratucamino@gmail.com`.
- Referencia de patrón (NO tocar): `Equilibratucamino/ETC-Plataforma` (Next.js + Supabase + Stripe + Resend + Google Calendar) — proyecto de Juan.
