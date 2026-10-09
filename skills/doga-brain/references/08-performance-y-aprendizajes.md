# 08. Performance y aprendizajes

Historial de auditorías del Performance Intelligence Log de Notion (más reciente primero). Los números son los de cada auditoría en su fecha. Si se necesita un dato actual, consultar Meta o Motion.

## 21 de septiembre de 2026. Lead a cita (Motion, mensual). Prioridad alta

**Aprendizaje**: el cuello de botella es lead a cita (9 a 11%), no cita a venta (23%). Meta registra 7 citas, Strety cerca de 15. Optimizar por CPL empeora el problema. Gráfica Conversión 08 (video) tiene el menor costo por cita ($196) y mejor tasa lead a cita (13%).

**Patrones**
- 73% de la inversión en un solo ángulo (pagos mensuales, $99/mes) en estático Offer-First.
- El CPL más barato produce las peores citas. Miami $99 (04): CPL $14.46, cero citas.
- El mismo creativo rinde distinto por ciudad. Orlando $99 (01): 3 citas en Tampa, 1 en Orlando.
- Los testimonios retienen mejor (thumbstop 50 a 59%, thruplay 40%) pero no hay retargeting.

**Acciones**: ver `04-objetivos-y-estrategia.md`.

## 25 de agosto de 2026. Meta Ads (mensual, parcial)

- Leads Form Miami es la campaña de leads más escalable: 42 leads a $15.67 de CPL, 24% bajo el benchmark de $20.65.
- Tampa: 35 leads a $18.66. Orlando: 32 leads a $20.69. La estructura de formulario por ciudad es eficiente en las tres.
- Miami | $99 al mes (01): 28 leads a $17.07. Señal sostenida más fuerte a nivel de anuncio.
- Testimonios (conversión) gastó $303.47 y devolvió un lead: problema de medición o de validación de embudo.
- Frecuencias similares (2.69 a 2.76) dan CPL muy distintos. La frecuencia sola no explica el resultado.
- CPM bajo no garantiza CPL bajo. Top Funnel Leads tiene el CPM más bajo y el CPL más alto entre campañas escalables.
- Acciones: validar pixel, CAPI, deduplicación y ruteo antes de asignar más; probar 15 a 20% más de presupuesto en Miami y Tampa; variar los anuncios de $99/mes por ciudad; mandar eventos de calidad por CAPI; probar Reels 9:16 con audio.

## 19 de junio de 2026. Meta Ads (ad hoc)

- DOGA_Leads_180325 domina Tampa: 85 leads a $20.16 de CPL, 33% bajo el promedio de la cuenta ($30.22).
- DOGA_Leads_Tampa (09): $6.29 de CPL y 3.45% de CTR con solo $31 de gasto. Pide prueba de escala.
- Tampa_Leads_040326 gastó $939 por 13 leads a $72.23 de CPL.
- Gráfica Conversión 06 corrió bajo error de entrega y dio $77.06 de CPL.
- $172 se gastaron en 10 anuncios sin leads. Algunos con CTR de 4.26%, señal de falla de formulario o landing.
- El creativo con marca DOGA supera al formato Gráfica Conversión en Tampa ($20.16 vs $37 a $72).
- Frecuencia 4.07 en Tampa_Leads_140125 (CPL $46.91). Refrescar creativo.
- Meta recomendó conectar CRM vía Conversions API (proyecta 24% menos costo por lead de calidad) y consolidar ad sets que compiten entre sí (proyecta 20% menos CPL).

## 18 de junio de 2026. Meta Ads (mensual)

- Top Funnel Leads: $11.41 de CPL, 47% bajo el promedio ($21.57).
- Gráfica Conversión 06 (Miami) fue el mejor anuncio: $9.76 de CPL.
- La campaña MOF Conversion gastó $869.04 (22% del total) con cero leads: probable falla de pixel o tracking.
- Miami supera a Orlando en eficiencia. En Miami el estático ganó al video ($9.76 vs $17.99).
- Orlando con CPM 2 a 3 veces más alto: saturación de audiencia.

## 11 de mayo de 2026. Meta Ads (mensual). Prioridad alta

- Miami Leads: $16.37 de CPL, casi 75% más barato que Orlando ($28.53). Campaña limitada por presupuesto.
- En esa fecha el video escalaba mejor que el estático. Vídeo Conversión 13 fue el mejor anuncio en Miami y Top Funnel.
- Orlando con frecuencia 2.90 y el peor CPL.
- Sin CAPI ni integración con CRM: el algoritmo optimizaba volumen, no calidad.

## Lectura transversal

1. Geografía importa: Miami suele ser la más eficiente, Orlando la más cara y saturada.
2. El formato ganador cambia en el tiempo (video en mayo, estático en junio, video de conversión 08 por costo por cita en septiembre). No casarse con un formato: probar.
3. Frecuencia alta (más de 3.0) sube el CPL y exige refresco.
4. CPL y CPM son métricas engañosas aquí. Lo que importa es costo por cita.
5. Sin CAPI con eventos de calidad, Meta optimiza lead barato.
6. Errores de entrega y trackeo han quemado miles de dólares. Auditar antes de escalar.
7. La confianza es la ventaja: testimonios y obra real retienen mejor y no se están cosechando.

## Cómo auditar (Meta Ads Review 30D)

Pedir: campañas y anuncios con gasto, CPL, costo por cita, CTR, CPM, frecuencia, thumbstop, thruplay, por ciudad. Cruzar con citas de Strety. Clasificar: todoterreno, especialista, joya oculta (buen resultado, poco gasto). Producir acciones con urgencia: inmediato, esta semana, este mes, continuo.
