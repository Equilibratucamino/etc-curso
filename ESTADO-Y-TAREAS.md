# Curso "Se Acabó el Juego" — Documento maestro

> Estado completo del curso online de ETC: **producto, diseño, flujos, planes (premium/básico) y todo lo que queda por hacer**.
> Proyecto **independiente** de la plataforma terapéutica de Juan (ETC-Plataforma).
> Última actualización: **21 junio 2026**.

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
| Deploy | **https://etc-curso.vercel.app** — push a `main` = despliegue automático en Vercel |
| Local | `/Users/inaki/etc-curso/` |
| Dominio pendiente | `curso.equilibratucamino.com` (DNS en Hostinger) |
| WhatsApp ETC | +34 611 847 645 |

### Enlaces de prueba
- **Premium:** `https://etc-curso.vercel.app/dashboard.html?plan=premium`
- **Básico:** `https://etc-curso.vercel.app/dashboard.html?plan=basic`
- **Landing:** `https://etc-curso.vercel.app/`
- **Certificado:** `https://etc-curso.vercel.app/certificate.html` (requiere 15/15)

> `?plan=` fija la versión en ese navegador. Para verlos a la vez, usar dos navegadores. En real lo fijará la compra.

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
- **Nav** adaptativa (clara sobre hero, oscura al entrar en secciones oscuras).
- **Hero** claro con burbujas teal + mascotas (corazón / tragaperras), titular Fraunces, **badge oficial de Google Reviews** (logo 4 colores + estrellas amarillas + "5,0 · 47 reseñas"), CTAs y stats (15 clases · 500+ personas · ∞ acceso de por vida). En móvil: 2 stats arriba + "acceso de por vida" debajo.
- **El programa** (sección oscura): métricas (15 clases · +8 h · 60+ ejercicios · ∞) + las 15 clases agrupadas en **3 fases** (Entender / Reconstruir / Avanzar) con duración por fase y por clase + chips "incluye" (certificado, ejercicios, sesiones, webinars, 100% privado).
- **Instructores**: Nacho + Marcos (fotos reales), compactos.
- **Certificado**: diploma de muestra.
- **Webinars**: tarjeta compacta, oro mate, 25€/sesión.
- **Casos de éxito** (sección oscura): 3 vídeos de YouTube (los mismos de la web).
- **Reseñas** (sección oscura): 3 testimonios + badge Google (sin círculos de iniciales).
- **CTA final**.
- **Falta**: sección "Los dos planes" (tabla Básico vs Premium) + FAQ (el upsell ya apunta a `#planes`).

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
| 01 | Aceptar la realidad | 28 min | Entender |
| 02 | La mente de un ludópata | 32 min | Entender |
| 03 | Dopamina y cerebro | 30 min | Entender |
| 04 | Las mentiras que te cuentas | 35 min | Entender |
| 05 | Romper el ciclo | 32 min | Entender |
| 06 | Gestión de impulsos | 38 min | Reconstruir |
| 07 | Ansiedad, culpa y vergüenza | 36 min | Reconstruir |
| 08 | Reconstruir la confianza | 34 min | Reconstruir |
| 09 | Dinero y recuperación | 40 min | Reconstruir |
| 10 | La nueva identidad | 30 min | Reconstruir |
| 11 | Crear nuevos hábitos | 33 min | Avanzar |
| 12 | Familia y entorno | 37 min | Avanzar |
| 13 | Prevenir recaídas | 35 min | Avanzar |
| 14 | Diseñar una nueva vida | 32 min | Avanzar |
| 15 | El futuro empieza hoy | 28 min | Avanzar |

> Títulos y duraciones **provisionales**: se ajustarán con las grabaciones reales (julio).

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
- **Stripe**: producto a crear **"Sesión final con Nacho"** (65€ básico; premium 0€).
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

### 🟢 Otros
- **Landing**: sección "Los dos planes" (tabla) + **FAQ**.
- Conectar `etc_plan` con el **pago real** (Stripe / plataforma de Juan).
- **DNS** `curso.equilibratucamino.com` (Hostinger).
- (Opcional) **Cuentas + base de datos** (Supabase) si se quiere progreso/notas entre dispositivos o que Iñaki vea las respuestas.
- Sustituir la imagen base del certificado por el original en máxima calidad si Iñaki lo tiene en PNG/JPG.

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
