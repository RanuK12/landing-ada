# Landing ADA — Reporte Técnico Prioritario

Landing de venta del reporte técnico prioritario de ADA ($29 USD). Pago vía Stripe.

## Cómo verificar el flujo de pago

1. Abrir `index.html` en el navegador (o levantar un servidor local: `python3 -m http.server 8000`).
2. Hacer click en el botón CTA "Pagar y solicitar reporte" (sección central) y en el del footer.
3. Confirmar que se abre Stripe Checkout con:
   - Monto: **$29 USD**
   - `client_reference_id=landing-ada` en la URL de Stripe
   - URL de success/cancel configuradas en el producto de Stripe
4. Completar el checkout en modo prueba (tarjeta de test de Stripe) y verificar que el pago se registra.

## Checklist de verificación

- [ ] Link de Stripe apunta a `buy.stripe.com` (no roto)
- [ ] Monto mostrado en la landing coincide con el de Stripe ($29 USD)
- [ ] `client_reference_id=landing-ada` presente en el href del CTA
- [ ] Ambos CTA (sección central y footer) apuntan al mismo link
- [ ] Checkout de prueba completado con éxito
- [ ] Webhook/email de confirmación recibido (si aplica)

## Notas

- No pushear a main sin aprobación de Emilio.
- Cualquier cambio en el precio o el link de Stripe debe actualizarse en ambos CTA.