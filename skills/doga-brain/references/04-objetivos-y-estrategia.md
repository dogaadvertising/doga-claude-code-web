# 04. Objetivos y estrategia

## Objetivo central (Q4 2026)

Pasar de optimizar por lead barato a optimizar por **lead que agenda cita**.

Meta explícita: subir la tasa lead a cita de 9 a 11% hacia **15%** con el mismo presupuesto.

## Diagnóstico (auditoría Motion, 21 de septiembre de 2026)

- El cuello de botella es lead a cita (9 a 11%), no cita a venta (23%).
- Meta registra 7 citas, Strety registra cerca de 15. El algoritmo optimiza sin señal de calidad.
- Optimizar por CPL empeora el problema: el CPL más barato produce las peores citas. Ejemplo: Miami $99 (04) tuvo CPL $14.46 y cero citas.
- 73% de la inversión está en un solo ángulo (pagos mensuales accesibles, $99/mes) en formato estático Offer-First. Riesgo de concentración.
- El mismo creativo rinde distinto por ciudad. Orlando $99 (01) dio 3 citas en Tampa y 1 en Orlando.
- Los testimonios tienen la mejor retención de la cuenta (thumbstop 50 a 59%, thruplay 40%) pero solo corren en ThruPlay y no hay retargeting que los cosecha.
- No hay retargeting. El setter hizo 772 llamadas para 4 citas.
- Mejor creativo por costo por cita: Gráfica Conversión 08 (video), $196 por cita y 13% lead a cita.
- Videos de obra y before and after: mejor retención de la cuenta (thumbstop 84 a 92%, thruplay 65 a 68%) con muy poca inversión.
- Videos de protección y huracán: retención alta (thumbstop 84%) con muestra chica, nunca probados para leads.
- Personas casi sin cobertura: José el Urgenciado y Don Carlos el Planificador.

## Estructura de presupuesto objetivo

| Bloque | Antes | Objetivo |
| :--- | :--- | :--- |
| Prospección | n/d | 60% |
| Retargeting | 0% | 25% |
| Nurturing | 21% | 15% (la campaña 05 lo baja a 14%, con un único fin: llenar audiencias de video viewers) |

## Decisiones de la auditoría (acciones recomendadas)

1. Medir y decidir por costo por cita, no por CPL. Pausar Miami $99 (04).
2. Reestructurar en Prospección 60 / Retargeting 25 / Nurturing 15.
3. Recortar testimonios a 15 a 20 segundos con CTA a formulario y crear retargeting de video viewers al 50%.
4. Formulario de alta intención con 3 preguntas calificadoras.
5. Test de Click to WhatsApp, cerca de $150 por semana.
6. CAPI (Conversions API) por una sola vía (n8n) con 4 eventos de etapa de GHL y `lead_id`.
7. Registrar Leads Calificados en Strety.

## KPIs que mandan

1. Costo por cita (principal).
2. Tasa lead a cita (meta 15%).
3. Cita a venta (hoy 23%).
4. Calidad de lead (lead calificado).
5. Secundarios: CPL, CTR, CPM, frecuencia, thumbstop (hook rate), thruplay (hold). Un CPL bajo o un CPM bajo no garantizan buenos resultados en esta cuenta.

## Reglas operativas aprendidas

- Frecuencia arriba de 3.0 en audiencia fría es señal de saturación. Refrescar creativo.
- Un error de entrega destruye eficiencia. Auditar creativos con error antes de asignar presupuesto.
- Anuncios con CTR alto y cero leads sugieren falla de formulario o landing.
- Validar pixel, CAPI, deduplicación y ruteo al CRM antes de dar más presupuesto a campañas de conversión.
- Evaluar al nivel de campaña o ad set, no solo promedios por anuncio.
- Una sola vía de CAPI para evitar eventos duplicados.
- Reportar piezas de awareness por separado de las de leads.

## Objetivos de contenido y marca

- Español primero, comunidad hispana de Florida.
- Construir confianza: prueba social real, caras del equipo, obra real.
- Ampliar cobertura de personas (urgencia, planificación, propietarios comerciales, inversores).
- Evitar concentración en un solo ángulo. Distribuir pruebas entre pilares.
- Mantener una cadencia de pruebas (ver pipeline en `10-metodologia-y-glosario.md`).

## Lo que el Brain NO trae (pendiente de DOGA)

- Metas de ingresos, número de proyectos o metas de ventas anuales.
- Presupuesto total mensual en Meta.
- Ticket promedio o margen.
Si se necesitan, preguntar. No estimar sin dato. Ver 11.
