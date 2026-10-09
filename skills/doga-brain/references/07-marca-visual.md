# 07. Marca visual

Resumen. La especificación completa del design system vive en `CLAUDE.md` en la raíz del repo y en `tokens/`.

## Principios

| Pilar | En UI |
| :--- | :--- |
| Precisión | Grillas estrictas, espaciado en múltiplos de 4. |
| Fuerza | Alto contraste, titulares pesados en mayúsculas, fondos oscuros dominantes. |
| Confianza | Consistencia total, licencias y garantías visibles, nada decorativo que no sume. |

Estética: estructurada, industrial, limpia. Sin gradientes, sin sombras decorativas, sin efectos.

## Color

| Nombre | HEX | Uso |
| :--- | :--- | :--- |
| DOGA Blue | `#19263C` | Fondo primario dominante. |
| DOGA Yellow | `#FFB000` | Acento, CTAs, titulares sobre oscuro. |
| DOGA Grey | `#F1F1F1` | Fondo secundario en modo claro. |
| Black | `#0C0C0C` | Texto sobre claro. Nunca `#000000`. |
| White | `#FFFFFF` | Texto sobre oscuro. |
| Slate | `#4D5A6A` | Texto secundario sobre claro. |
| Gray | `#9E9B98` | Captions sobre oscuro. |
| Olive | pendiente | No usar hasta confirmar HEX. |

No usar: `#112233`, `#F5F5F2`, `#F5A000`.

Reglas:
1. Amarillo nunca como texto de cuerpo.
2. Amarillo nunca como texto sobre blanco o gris (falla contraste).
3. Titulares amarillos solo sobre blue o black.
4. Un solo acento amarillo dominante por pieza.
5. Modo oscuro es el default de marca.

## Tipografía

- Montserrat 900 y 700 para titulares, siempre en mayúsculas (por CSS), y 400 a 600 para cuerpo.
- Trash Hand: solo para una palabra o frase corta manuscrita de énfasis. Nunca en cuerpo ni botones. Archivo pendiente.
- Números de oferta ($99/mes, 18 meses, $0) en peso 900.
- Máximo 2 pesos por bloque.

## Logo

- Configuraciones: stacked y horizontal.
- Sobre claro: azul. Sobre oscuro: blanco, o isotipo amarillo con wordmark blanco. Sobre amarillo: azul.
- Digital y social: logo arriba a la izquierda.
- Prohibido estirar, rotar, recolorear, sombras, gradientes, contornos.
- URLs oficiales en `assets/logos.md` del repo de design system.

## Formatos de anuncio

- 1:1 (1080x1080) y 9:16 (1080x1920).
- Fondo oscuro, logo arriba a la izquierda, titular amarillo, cuerpo blanco, CTA o número abajo.
- Zona segura 9:16: 250px libres arriba y 340px abajo.
- Máximo 3 bloques de texto por pieza.

## Formatos de creativo que mejor funcionan (referencia Motion 2026)

- Mejor hit rate y gasto: Offer First Banners, Demos.
- Alto hit rate, menor gasto: Behind the Scenes, Unboxing, POV, Founder.
- Otros: ASMR, Listicle, Us vs Them, Letter, Unconventional Text Placement, Sign, Feature Benefit Product, UGC Overlay, Greenscreen, How To, Expert Explainer, Static-Video Hybrid, Headline, Before and After.
- En la cuenta de DOGA: estáticos Offer-First hoy concentran la inversión, y los videos de obra y before and after retienen mejor. Ver 08.

## Aplicaciones fuera de pantalla

- Casco: base amarilla, logo azul horizontal en la corona.
- Señalética de obra: fondo azul, logo amarillo, cuerpo blanco, marco amarillo, teléfono siempre visible.
- Vehículo: base azul, franja amarilla, logo en puerta y capó.
- Documentos: encabezado azul con logo blanco, titulares Montserrat Bold azul, separadores amarillos, cuerpo negro.
