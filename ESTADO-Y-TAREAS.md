# Curso "Se Acabó el Juego" — Estado y tareas

> Documento maestro del curso online de ETC. Resume **qué es**, **cómo funciona**, **qué está hecho** y **qué queda por hacer**.
> Última actualización: **21 junio 2026**.

---

## 1. Qué es

Curso online de recuperación de la ludopatía: **15 clases en vídeo** + ejercicios, a tu ritmo.
Es un proyecto **independiente** de la plataforma terapéutica de Juan (ETC-Plataforma).

### Dos planes (mismo curso, copia-pega)
| Plan | Precio | Diferencia |
|------|--------|------------|
| **Básico** | **190€** | Las 15 clases. El cuadro de sesión está disponible siempre: "Reserva tu sesión privada con Nacho o Marcos" → reserva + **pago 65€**. |
| **Premium** | **219€** | Las mismas 15 clases + **sesión final 1:1 con Nacho GRATIS**. Durante el curso el cuadro sale bloqueado ("Tendrás tu sesión final GRATIS cuando acabes la clase 15"); al completar las 15 se **desbloquea** y aparece además un **bloque dorado** "Reserva tu última sesión con Nacho — GRATIS". |

> Spec original del producto: `/Users/inaki/Desktop/Archivos Md Claude/curso_landing_ ideas estructura.md`

---

## 2. Dónde vive (repos, deploy)

| Recurso | Valor |
|---------|-------|
| GitHub | `Equilibratucamino/etc-curso` (rama `main`) |
| Deploy | Vercel → **https://etc-curso.vercel.app** (push a `main` = despliegue automático) |
| Local | `/Users/inaki/etc-curso/` |
| Dominio pendiente | `curso.equilibratucamino.com` (DNS en Hostinger) |

**Stack:** HTML + CSS + JavaScript puro (sitio **estático**, sin backend propio). El progreso se guarda en el navegador (`localStorage`).

### Enlaces para ver cada versión
- Premium: `https://etc-curso.vercel.app/dashboard.html?plan=premium`
- Básico:  `https://etc-curso.vercel.app/dashboard.html?plan=basic`
- Landing: `https://etc-curso.vercel.app/`

> El parámetro `?plan=` fija la versión en ese navegador. En real lo fijará la **compra** (Stripe). Por defecto = premium.

---

## 3. Páginas

| Archivo | Qué es |
|---------|--------|
| `index.html` | **Landing** (venta del curso): hero, "El programa" (15 clases en 3 fases), instructores (Nacho y Marcos), certificado, **webinars**, **casos de éxito** (3 vídeos de YouTube), reseñas Google. |
| `dashboard.html` | **Mi curso**: progreso, anillo, tarjetas de las 15 clases, cuadro de **sesión** (premium/básico), webinar, **bloque dorado de sesión final** (premium completado) y banner de certificado. |
| `modulo.html?n=` | **Clase individual** (1–15): vídeo, "lo que trabajarás", **ejercicios con respuesta guardable**, **notas guardables**, botón **"Marcar como completada → desbloquear siguiente"**, sidebar con progreso y lista de clases. |
| `certificate.html` | **Certificado**: bloqueado hasta completar las 15; luego diploma con el **diseño real de ETC** y el **nombre del alumno** superpuesto + descarga en PDF. |
| `reserva.html` | Página de **reserva** (embebe, de momento, el calendario de la plataforma). |

---

## 4. Cómo funciona (lo que YA está hecho ✅)

- **Desbloqueo secuencial**: al marcar una clase como completada se desbloquea la siguiente. Si intentas abrir una clase bloqueada, te redirige al dashboard.
- **Notas y respuestas que se guardan** por clase (botón "Guardar notas" + autoguardado). Persisten en el dispositivo.
- **Certificado**: se desbloquea al completar las 15. Usa el diseño real (azul noche + dorado + sello ETC). El alumno escribe su nombre → aparece en tipografía manuscrita (Great Vibes), centrado, autoajustando tamaño. Descarga en PDF (html2canvas + jsPDF).
- **Plan premium/básico** con flag `etc_plan` (acepta `?plan=` en URL):
  - Básico → "Reserva tu sesión privada con Nacho o Marcos" (siempre).
  - Premium bloqueado → "Tendrás tu sesión final GRATIS cuando acabes la clase 15".
  - Premium completado → "Reserva tu última sesión con Nacho" + bloque dorado.
- **Landing**: programa por 3 fases, métricas (15 clases · +8 h · 60+ ejercicios · acceso de por vida), casos de éxito con los vídeos de YouTube de la web, reseñas con badge oficial de Google, webinars €25, animaciones de aparición (reveal + giro de hoja en las fases).
- Estética: fría/neutra, tipografía Inter + Fraunces (sin la mono "de ordenador"), oro mate elegante, fondo oscuro premium en casos de éxito.

### Dónde se guarda cada cosa (localStorage)
| Clave | Contenido |
|-------|-----------|
| `etc_progress_v1` | `{ completed:[...] }` clases completadas |
| `etc_notes_v1` | notas por clase |
| `etc_answers_v1` | respuestas de ejercicios por clase |
| `etc_name` | nombre para el certificado |
| `etc_plan` | `premium` / `basic` |

---

## 5. Pendiente por hacer

### 🔴 Julio — grabaciones (lo más importante)
Por cada una de las 15 clases, cuando Iñaki envíe la grabación:
1. **Alojar el vídeo** → meter el ID de YouTube en el objeto `VIDEOS` de `modulo.html` (el reproductor ya está cableado).
2. **Analizar** lo que se dice en esa clase.
3. **Crear el contenido real** en `CONTENT[n]` de `modulo.html`: título/descripción, "lo que trabajarás" y **ejercicios a medida de lo que cuenta esa clase**.
> Los textos actuales de las clases son **provisionales** (placeholder).

### 🟡 Calendario de reserva
- Debe ser **igual que el de la web** (`https://app.equilibratucamino.com/reserva/`: aside de info + rejilla semanal de slots + barra de confirmar), pero **conectado al Google Calendar de Iñaki**.
- **Plan acordado:** cuando el calendario de la web esté **confirmado y funcionando** (Google Calendar + Stripe), **copiarlo tal cual** al curso. No rehacerlo.
- Precios al reservar: **Premium 0€** (gratis) · **Básico 65€** (Stripe). Iñaki creará el producto Stripe **"Sesión final con Nacho"**.
- De momento `reserva.html` embebe el flujo `/leads` de la plataforma como placeholder.

### 🟢 Otros
- **Landing**: añadir sección **"Los dos planes"** (tabla Básico vs Premium) + **FAQ** (están en el md de spec; el upsell ya apunta a `index.html#planes`).
- Conectar el flag `etc_plan` con el **pago real** (Stripe / plataforma de Juan).
- DNS `curso.equilibratucamino.com` en Hostinger.
- (Opcional) **Cuentas + base de datos** si se quiere que el progreso/notas sigan al alumno **entre dispositivos** o que Iñaki vea sus respuestas. Hoy todo es por navegador (localStorage). Encajaría con Supabase, como la plataforma de Juan.

---

## 6. Cómo hacer cambios típicos

- **Meter el vídeo de una clase:** en `modulo.html`, buscar `const VIDEOS = {}` y poner `{ 1:'IDyoutube', 2:'...', ... }`.
- **Contenido real de una clase:** en `modulo.html`, objeto `CONTENT` → `CONTENT[n] = { desc, learn:[...], exercises:[...] }`.
- **URL del calendario / reserva:** en `reserva.html` (iframe) y, si se enlaza directo, en `CALENDAR_URL` de `dashboard.html`.
- **Certificado:** imagen base en `images/certificado-base.jpg`; el nombre se superpone por CSS/JS en `certificate.html` (fuente Great Vibes; tamaño/posición ajustables ahí).
- **Publicar:** `git add -A && git commit -m "..." && git push origin main` → Vercel despliega solo.

---

*Mantener este documento al día al cerrar cada sesión de trabajo.*
