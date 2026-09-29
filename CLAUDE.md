# DOGA CONSTRUCTION · DESIGN SYSTEM BRIEF PARA CLAUDE CODE

Este archivo es la especificación completa para que Claude Code construya el Design System de DOGA Construction. Colócalo en la raíz del repo como `CLAUDE.md` (o `DESIGN_SYSTEM.md` y referéncialo desde `CLAUDE.md`). Todo lo que Claude Code construya debe salir de aquí.

---

## 0. INSTRUCCIÓN PARA CLAUDE CODE

Eres el responsable de construir el Design System oficial de DOGA Construction. Sigue este documento como única fuente de verdad. No inventes colores, fuentes, radios ni componentes fuera de lo definido. Si algo no está especificado, usa la opción más sobria y deja un comentario `TODO(DOGA):` explicando la decisión pendiente.

Reglas de trabajo:
- Construye en el orden de la sección 12.
- Todo valor visual sale de tokens. Cero valores hardcodeados en componentes.
- Verifica contraste WCAG AA en cada combinación texto/fondo antes de darla por buena.
- No uses guiones largos en ningún texto visible de la documentación o componentes. Usa puntos o comas.
- Copy de ejemplo en español primero, inglés como secundario.

---

## 1. ENTREGABLES

```
doga-design-system/
├── tokens/
│   ├── tokens.json            # Fuente única (formato W3C Design Tokens)
│   ├── tokens.css             # CSS custom properties generadas
│   └── tailwind.preset.js     # Preset de Tailwind mapeado a tokens
├── components/
│   ├── Button/
│   ├── Badge/                 # Pills
│   ├── Card/
│   ├── OfferCard/
│   ├── TrustBar/
│   ├── PhoneCTA/
│   ├── SectionHeader/
│   ├── Hero/
│   ├── FormField/
│   ├── StatBlock/
│   ├── Testimonial/
│   ├── ProcessSteps/
│   ├── AdFrame/               # 1:1 y 9:16 para social
│   └── EmailHeader/
├── docs/
│   └── index.html             # Página de documentación viva (un solo archivo)
├── assets/
│   └── logos.md               # URLs oficiales de logos
└── README.md
```

Stack sugerido: HTML + CSS puro para `docs/index.html` (autocontenido, sin build), y componentes en React + Tailwind usando el preset. Si el repo ya tiene otro stack, adapta pero mantén `tokens.json` como fuente.

---

## 2. FUENTE DE VERDAD Y CONFLICTOS CONOCIDOS

La fuente autoritativa es el **Brand Identity Guidelines 2025–2026** de DOGA.

Conflicto 1. Paleta:
- Brand book oficial: DOGA Blue `#19263C`, DOGA Yellow `#FFB000`, DOGA Grey `#F1F1F1`, Black `#0C0C0C`, White `#FFFFFF`.
- Existe un set secundario en instrucciones internas (navy `#112233`, slate `#4D5A6A`, gray `#9E9B98`, white `#F5F5F2`, orange `#F5A000`).
- **Decisión para este sistema:** el brand book manda. Slate y gray del set secundario se adoptan solo como neutros de apoyo (texto secundario y captions), porque el brand book no define esos roles. Navy `#112233`, off-white `#F5F5F2` y orange `#F5A000` NO se usan.

Conflicto 2. Verde Olivo:
- El brand book lo lista como "accent use only" pero no publica HEX.
- **Decisión:** crear el token `--doga-olive` con valor placeholder y comentario `TODO(DOGA): confirmar HEX`. No usarlo en ningún componente hasta confirmar.

Conflicto 3. Teléfono:
- La señalética del brand book muestra 866-802-3737. Los materiales operativos usan 866-692-1840.
- **Decisión:** el número vive en una sola variable de configuración (`DOGA_PHONE`). Default `866-692-1840` con `TODO(DOGA): confirmar número de campaña`. Nunca hardcodear el teléfono en componentes.

---

## 3. PRINCIPIOS DE MARCA (guían cada decisión visual)

| Pilar | Qué significa en UI |
| :--- | :--- |
| PRECISIÓN | Grillas estrictas, alineación exacta, espaciado consistente en múltiplos de 4. |
| FUERZA | Alto contraste. Tipografía pesada en mayúsculas para titulares. Fondos oscuros dominantes. |
| CONFIANZA | Consistencia total. Licencias y garantías visibles. Nada decorativo que no sume. |

Estética: estructurada, industrial, limpia. Sin gradientes, sin sombras decorativas en el logo, sin efectos. Pensada tanto para pantalla como para campo (casco, valla, vehículo).

---

## 4. TOKENS DE COLOR

### 4.1 Primitivos

```json
{
  "color": {
    "blue":   { "$value": "#19263C", "$description": "DOGA Blue. Fondo primario dominante." },
    "yellow": { "$value": "#FFB000", "$description": "DOGA Yellow. Acento primario, CTAs, titulares sobre oscuro." },
    "grey":   { "$value": "#F1F1F1", "$description": "DOGA Grey. Fondo secundario en modo claro." },
    "black":  { "$value": "#0C0C0C", "$description": "Negro de marca. Nunca #000000." },
    "white":  { "$value": "#FFFFFF", "$description": "Texto sobre oscuro. Logo sobre azul o amarillo." },
    "slate":  { "$value": "#4D5A6A", "$description": "Neutro de apoyo. Texto secundario sobre claro." },
    "gray":   { "$value": "#9E9B98", "$description": "Neutro de apoyo. Captions sobre oscuro." },
    "olive":  { "$value": "#000000", "$description": "TODO(DOGA): confirmar HEX. Acento. No usar aún." }
  }
}
```

Derivados permitidos (para estados hover/pressed y bordes). Generarlos con mezcla, no inventar tonos nuevos:
- `blue-700`: blue mezclado 15% con black (hover de superficies oscuras).
- `blue-500`: blue mezclado 20% con white (bordes sobre fondo azul).
- `yellow-600`: yellow mezclado 12% con black (hover de botón primario).
- `grey-300`: grey mezclado 10% con black (bordes en modo claro).

### 4.2 Semánticos (lo que usan los componentes)

| Token | Modo oscuro (default) | Modo claro |
| :--- | :--- | :--- |
| `--bg-primary` | blue | white |
| `--bg-secondary` | blue-700 | grey |
| `--bg-accent` | yellow | yellow |
| `--text-primary` | white | black |
| `--text-secondary` | grey | slate |
| `--text-muted` | gray | slate |
| `--text-headline` | yellow | blue |
| `--text-on-accent` | blue | blue |
| `--border-default` | blue-500 | grey-300 |
| `--border-accent` | yellow | yellow |
| `--cta-bg` | yellow | yellow |
| `--cta-text` | blue | blue |
| `--cta-bg-hover` | yellow-600 | yellow-600 |

El modo oscuro es el default de marca (digital y social: "fondo oscuro, logo arriba izquierda, titular amarillo, cuerpo blanco").

### 4.3 Reglas de uso de color (no negociables)

1. Yellow NUNCA como color de texto de cuerpo.
2. Yellow NUNCA como texto sobre white o grey (contraste ~1.8:1, falla AA). Sobre fondos claros, el amarillo solo va como fondo de botón, borde o bloque.
3. Black `#0C0C0C` para texto sobre claros. Prohibido `#000000`.
4. Titulares amarillos solo sobre blue o black.
5. Un solo acento amarillo dominante por viewport o pieza. El amarillo pierde fuerza si está en todas partes.

### 4.4 Matriz de contraste (verificar y documentar en docs)

| Texto / Fondo | Ratio aprox. | Uso |
| :--- | :--- | :--- |
| White sobre Blue | ~15:1 | Cuerpo. OK |
| Yellow sobre Blue | ~8.5:1 | Titulares, links. OK |
| Blue sobre Yellow | ~8.5:1 | Texto de CTA. OK |
| Black sobre Yellow | ~10.8:1 | Alternativa de CTA. OK |
| Black sobre Grey | ~17:1 | Cuerpo modo claro. OK |
| Slate sobre White | ~7:1 | Secundario. OK |
| Gray sobre Blue | ~5.5:1 | Captions. OK (verificar) |
| Yellow sobre White/Grey | ~1.8:1 | PROHIBIDO |

Claude Code: calcula los ratios reales con fórmula WCAG y reemplaza los aproximados en la documentación.

---

## 5. TIPOGRAFÍA

### 5.1 Familias

| Rol | Fuente | Pesos | Uso |
| :--- | :--- | :--- | :--- |
| Display | Montserrat | 900 Black, 700 Bold | Titulares. Siempre MAYÚSCULAS. |
| Body | Montserrat | 400, 500, 600 | Párrafos, UI, formularios. |
| Expresiva | Trash Hand | Regular | Solo momentos manuscritos puntuales (una palabra o frase corta de énfasis). Nunca cuerpo, nunca botones. |

Carga: Montserrat desde Google Fonts (`wght@400;500;600;700;900`). Trash Hand no está en Google Fonts: dejar `@font-face` apuntando a `/assets/fonts/TrashHand.woff2` con `TODO(DOGA): subir archivo de fuente con licencia`. Fallback: `'Montserrat', system-ui, sans-serif`.

### 5.2 Escala (derivada del brand book, adaptada a web)

| Token | Brand book (print) | Web | Peso | Line-height | Tracking | Uso |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `--type-hero` | 72–96pt | `clamp(2.5rem, 6vw, 5rem)` | 900 | 1.0 | -0.01em | Hero, landing |
| `--type-h1` | 36–48pt | `clamp(2rem, 4vw, 3rem)` | 700 | 1.1 | 0 | Títulos de sección |
| `--type-h2` | 24–28pt | `clamp(1.5rem, 2.5vw, 1.75rem)` | 600 | 1.2 | 0 | Subsecciones, callouts |
| `--type-body-lg` | n/a | `1.125rem` | 400 | 1.6 | 0 | Intro de sección |
| `--type-body` | 14–16pt | `1rem` | 400 | 1.6 | 0 | Párrafos |
| `--type-label` | 10–12pt | `0.75rem` | 500 | 1.4 | 0.08em | Captions, labels, fine print (mayúsculas en labels) |
| `--type-eyebrow` | n/a | `0.8125rem` | 700 | 1.2 | 0.12em | Texto sobre titulares, mayúsculas |

Reglas:
- Titulares display en mayúsculas vía `text-transform: uppercase`, no escribiendo el texto en mayúsculas en el HTML.
- Nunca más de 2 pesos distintos en un mismo bloque.
- Números de oferta ($99/mes, 18 meses, $0) en peso 900: son el protagonista visual.

---

## 6. ESPACIADO, RADIOS, BORDES, ELEVACIÓN

### 6.1 Espaciado (base 4px)

`--space-1: 4px` · `--space-2: 8px` · `--space-3: 12px` · `--space-4: 16px` · `--space-5: 24px` · `--space-6: 32px` · `--space-7: 48px` · `--space-8: 64px` · `--space-9: 96px`

Padding lateral mínimo en móvil: 16px. Separación entre secciones: 64px móvil, 96px desktop.

### 6.2 Radios

| Token | Valor | Uso |
| :--- | :--- | :--- |
| `--radius-sm` | 6px | Inputs, chips pequeños, tags |
| `--radius-md` | 12px | Cards, contenedores, imágenes |
| `--radius-pill` | 20px | Pills, badges |
| `--radius-btn` | 6px | Botones (sólidos y estructurados, no redondeados) |

### 6.3 Bordes

- Default: 1px `--border-default`.
- Acento: 2px `--border-accent` (cards destacadas, marcos de señalética, foco).
- Motivo de marca: el chevron / líneas escalonadas del isotipo pueden usarse como patrón de línea fina amarilla en esquinas o laterales (como en la valla de obra). Solo línea, 1–1.5px, nunca relleno.

### 6.4 Elevación

Sistema plano. Sin sombras decorativas. Única excepción: `--shadow-overlay: 0 8px 24px rgba(12,12,12,0.35)` para modales y menús flotantes.

### 6.5 Foco (accesibilidad)

`outline: 2px solid var(--doga-yellow); outline-offset: 2px;` en todos los elementos interactivos. Sobre fondos claros, usar outline `--doga-blue`.

---

## 7. LAYOUT

- Contenedor máximo: 1200px. Texto largo: máximo 68ch.
- Grilla: 4 columnas móvil, 8 tablet, 12 desktop. Gutter 16/24/32px.
- Breakpoints: `sm 480px` · `md 768px` · `lg 1024px` · `xl 1280px`.
- Mobile first. La audiencia principal llega desde Meta en celular.
- Sin scroll horizontal en ningún ancho.

---

## 8. LOGO

Configuraciones aprobadas: **stacked** (isotipo centrado sobre wordmark) y **horizontal** (isotipo a la izquierda).

Variantes aprobadas:
- Sobre claro (grey/white): logo en blue.
- Sobre oscuro (blue): logo en white, o isotipo en yellow con wordmark white (señalética).
- Sobre yellow: logo en blue.
- Sobre black: logo en white.

Reglas:
- Área de respeto mínima igual a la altura de la "D".
- Escalar siempre proporcional.
- Prohibido: estirar, rotar, recolorear fuera de las variantes, sombras, gradientes, contornos, fondos con ruido o bajo contraste.
- En digital/social: logo arriba a la izquierda.

URLs oficiales (poner en `assets/logos.md` y como constantes):
- Horizontal blanco: https://assets.cdn.filesafe.space/ymI06Vj4InwHv8DzQFUD/media/69c3e749a5f609ca153b933a.png
- Vertical blanco: https://assets.cdn.filesafe.space/ymI06Vj4InwHv8DzQFUD/media/6ab3fd2418384d888bb58bfc.png
- Horizontal azul: https://assets.cdn.filesafe.space/ymI06Vj4InwHv8DzQFUD/media/698c804d017707becdd1cb9a.png
- Vertical azul: https://assets.cdn.filesafe.space/ymI06Vj4InwHv8DzQFUD/media/6ab3fd17ec718870e13aaaf8.png
- Favicon fondo amarillo: https://assets.cdn.filesafe.space/ymI06Vj4InwHv8DzQFUD/media/6ab3fc6fc745ba551e3638c9.png

`TODO(DOGA):` conseguir versiones SVG para producción.

---

## 9. COMPONENTES

Cada componente debe documentar: anatomía, variantes, estados (default, hover, active, focus, disabled), reglas de uso, y un ejemplo con copy real de DOGA.

### 9.1 Button
- Variantes: `primary` (fondo yellow, texto blue, 700, mayúsculas), `secondary` (borde 2px yellow, texto yellow, fondo transparente; solo sobre oscuro), `ghost-light` (borde 2px blue, texto blue; solo sobre claro).
- Tamaños: `md` (48px alto, mínimo táctil) y `lg` (56px, para CTA de landing).
- Icono opcional a la izquierda (teléfono para CTAs de llamada).
- Ejemplo: "LLAMA HOY" · "INSPECCIÓN GRATIS" · "VERIFICA SI CALIFICAS".

### 9.2 Badge / Pill
- Radio 20px, label 500, mayúsculas, tracking 0.08em.
- Variantes: `accent` (yellow/blue), `outline` (borde yellow, texto yellow), `neutral` (grey/black).
- Ejemplo: "$0 DE ENTRADA" · "18 MESES DIFERIDO" · "LICENCIA CGC1531954".

### 9.3 Card
- Radio 12px, padding 24px, borde 1px default.
- Variante `featured`: borde 2px yellow.
- Estructura: eyebrow opcional, título h2, cuerpo, acción opcional.

### 9.4 OfferCard (componente clave de conversión)
- Número protagonista en `--type-hero` peso 900 yellow sobre blue. Ej: "$99", sufijo "/MES" en label.
- Línea de soporte en body white.
- Lista de 2–3 beneficios con check en yellow.
- CTA primary al pie.
- Variantes por oferta: `monthly` ($99/mes), `zero-down` ($0 entrada), `deferred` (18 meses), `inspection` (gratis).
- Regla: una oferta protagonista por tarjeta. No apilar las cuatro con el mismo peso.

### 9.5 TrustBar
- Franja horizontal con: licencias (CGC1531954 · CCC1333736), "Licensed & Insured in Florida", garantía, inspección gratis.
- Iconos lineales en yellow, texto label white sobre blue (o black sobre grey en claro).
- En móvil pasa a grilla 2x2.

### 9.6 PhoneCTA
- Bloque de llamada: icono teléfono, número en h1 peso 900, microcopy "Llámanos hoy. Te atendemos en español."
- `href="tel:"` siempre. Número desde `DOGA_PHONE`.
- Versión sticky para móvil (barra inferior fija de 64px, fondo yellow, texto blue).

### 9.7 SectionHeader
- Eyebrow (yellow, mayúsculas) + título display + intro opcional.
- Alineación izquierda por defecto. Centrado solo en hero y cierres.

### 9.8 Hero
- Fondo blue (o foto con overlay blue al 80%). Logo arriba izquierda.
- Titular display yellow en mayúsculas, subtítulo white, CTA primary + PhoneCTA secundario.
- Patrón de líneas escalonadas opcional en esquina derecha.

### 9.9 FormField
- Label 500 arriba del input, input 48px alto, radio 6px, borde 1px.
- Estados: focus (borde yellow 2px), error (borde y mensaje en rojo accesible, `TODO(DOGA): definir color de error; sugerido #C62828`), disabled.
- Microcopy de ayuda en `--text-muted`.
- Bilingüe: todos los labels deben aceptar string ES/EN.

### 9.10 StatBlock
- Número grande (900, yellow sobre oscuro / blue sobre claro) + label.
- Ej: "40 AÑOS · Garantía del fabricante", "10 AÑOS · Trabajo garantizado", "18 MESES · Pago diferido".

### 9.11 Testimonial
- Cita en body-lg, nombre + ciudad en label, marcador de comillas en yellow.
- Regla: solo testimonios reales con autorización. Nunca inventar nombres ni reseñas. Dejar slots vacíos con placeholder visible `[TESTIMONIO REAL PENDIENTE]`.

### 9.12 ProcessSteps
- Pasos numerados 01, 02, 03, 04 (número en yellow 900).
- Contenido base: Permisos y aprobaciones · Ingeniería de cumplimiento de código · Materiales y logística · Inspecciones y cierre de permiso.

### 9.13 AdFrame (social)
- Plantillas 1:1 (1080x1080) y 9:16 (1080x1920).
- Fondo oscuro, logo arriba izquierda, titular amarillo, cuerpo blanco, CTA o número abajo.
- Zona segura 9:16: dejar libres 250px arriba y 340px abajo (UI de Reels/Stories).
- Máximo 3 bloques de texto por pieza.

### 9.14 EmailHeader
- 600px de ancho, fondo blue, logo horizontal blanco a la izquierda, línea yellow de 4px al pie.
- Tablas y estilos inline (compatibilidad email). Montserrat con fallback Arial.

---

## 10. VOZ Y COPY (incluir en docs como sección "Contenido")

Tono: BOLD (directo, sin relleno), RELIABLE (experto, no vendedor), GROUNDED (lenguaje de campo). "Vecino experto, no vendedor."

Sí:
- Números concretos: $99/mes, $0 de entrada, 18 meses, 40 años.
- Urgencia basada en problemas reales (tormentas, filtraciones, temporada de huracanes).
- Lenguaje de proceso simple: "Llámanos hoy", "Inspección gratis", "Nosotros nos encargamos".
- Señales de confianza: licencias, garantías, permisos cerrados.
- Español primero. Inglés como versión secundaria.

No:
- Promesas vagas ("la mejor compañía de techos").
- Presión o miedo exagerado.
- Jerga técnica o letra pequeña confusa.
- Una idea por pieza. No mezclar cinco ofertas en un anuncio.

Lenguaje aprobado por compliance (obligatorio en todo copy de ejemplo):
- Usar "trabajo garantizado". NO usar "garantía de por vida" ni "lifetime warranty".
- Elegibilidad: "podrías calificar" / "might qualify". Nunca prometer aprobación.
- No presentar reembolsos o programas como pagos o subsidios de DOGA.
- No mencionar créditos fiscales federales para instalaciones 2026.
- Los pilares internos de marca (Precisión, Fuerza, Confianza) no aparecen textualmente en copy para clientes.

Datos fijos para componentes:
- Nombre: DOGA Construction
- Licencias: CGC1531954 · CCC1333736
- Pie legal: "DOGA Construction | CGC1531954 | CCC1333736 | Licensed & Insured in Florida"
- Web: dogaconstruction.com
- Teléfono: variable `DOGA_PHONE` (ver sección 2)
- Líneas de servicio: Techos (residencial, comercial, nueva construcción, multifamiliar) · Ventanas y puertas de impacto

---

## 11. APLICACIONES FUERA DE PANTALLA (documentar como referencia)

| Aplicación | Especificación |
| :--- | :--- |
| Casco / EPP | Base yellow, logo horizontal blue centrado en la corona. |
| Señalética de obra | Fondo blue, logo yellow, cuerpo white, marco yellow, número de teléfono siempre visible. |
| Vehículo | Base blue, franja de acento yellow, logo en puerta del conductor y capó. |
| Digital / social | 1:1 y 9:16, fondo oscuro, logo arriba izquierda, titular yellow, cuerpo white. |
| Documentos (.docx) | Encabezado blue con logo blanco, titulares Montserrat Bold blue, acentos yellow en separadores, cuerpo black. |

---

## 12. ORDEN DE CONSTRUCCIÓN

1. `tokens/tokens.json` completo (primitivos, derivados, semánticos claro/oscuro, tipografía, espaciado, radios, bordes, breakpoints).
2. Generar `tokens.css` (con `:root` oscuro por defecto y `[data-theme="light"]`) y `tailwind.preset.js` desde el JSON. Script de build simple si hace falta (Style Dictionary o Node puro).
3. Calcular ratios de contraste reales y guardarlos en la doc.
4. Componentes en este orden: Button, Badge, Card, FormField, SectionHeader, TrustBar, PhoneCTA, OfferCard, StatBlock, ProcessSteps, Testimonial, Hero, AdFrame, EmailHeader.
5. `docs/index.html`: página única autocontenida con secciones Fundamentos (color, tipografía, espaciado, radios), Logo, Componentes (cada uno con variantes y estados renderizados), Contenido (voz y compliance), Aplicaciones. Toggle claro/oscuro.
6. `README.md`: cómo consumir los tokens, cómo agregar un componente, lista de `TODO(DOGA)` pendientes.

---

## 13. CHECKLIST DE VALIDACIÓN (antes de dar por terminado)

- [ ] Ningún HEX fuera de los tokens en componentes.
- [ ] Cero usos de `#000000`, `#112233`, `#F5A000`, `#F5F5F2`.
- [ ] Yellow nunca como texto sobre white o grey.
- [ ] Todo texto pasa WCAG AA (4.5:1 cuerpo, 3:1 titulares grandes).
- [ ] Todos los interactivos tienen foco visible y 48px de alto mínimo táctil.
- [ ] Titulares display en mayúsculas vía CSS.
- [ ] Teléfono solo desde `DOGA_PHONE`, con `tel:`.
- [ ] Ningún copy de ejemplo dice "garantía de por vida" o "lifetime warranty".
- [ ] Sin guiones largos en textos visibles.
- [ ] Responsive sin scroll horizontal de 320px a 1440px.
- [ ] Lista de `TODO(DOGA)` consolidada en el README.

---

## 14. PENDIENTES QUE DOGA DEBE CONFIRMAR

1. HEX del Verde Olivo.
2. Número de teléfono oficial para campañas (866-692-1840 vs 866-802-3737).
3. Archivo de fuente Trash Hand con licencia web.
4. Logos en SVG.
5. Color de error/alerta para formularios.
