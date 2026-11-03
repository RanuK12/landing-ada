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

## Verificación de checkout (script automatizado)

Para verificar que el Payment Link del CTA esté activo y muestre el monto correcto (`$29 USD`), ejecutá:

```bash
node scripts/check-checkout.mjs
```

El script hace un `fetch HEAD` al payment link y valida:
1. Status HTTP `200` (link activo).
2. La respuesta es una página de checkout de Stripe real.

El monto (`$29 USD`) se confirma por separado en `~/.ranukita/ada_outreach/crm.json` y en el email de cierre a Seonet (Stripe lo renderiza por JS, no está en el HTML estático).

Salida esperada en éxito:

```
✅ Payment link activo: HTTP 200
✅ Página de pago de Stripe detectada (checkout)
ℹ️  Monto esperado (verificado en crm.json + email cierre Seonet): $29 USD
✅ Checkout OK — el CTA de la landing apunta al Payment Link $29 real
```

## Notas

- No pushear a main sin aprobación de Emilio.
- Cualquier cambio en el precio o el link de Stripe debe actualizarse en ambos CTA.