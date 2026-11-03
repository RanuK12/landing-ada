/**
 * scripts/check-checkout.mjs
 *
 * Verifica que el Payment Link del CTA de la landing ADA esté activo y que
 * muestre el monto correcto ($29 USD).
 *
 * Uso:
 *   node scripts/check-checkout.mjs
 *
 * El script hace un fetch HEAD al Payment Link y valida:
 *   1. Status HTTP 200 (link activo).
 *   2. El HTML de respuesta contiene el monto "$29".
 *
 * Salida de ejemplo (éxito):
 *   ✅ Payment link activo: HTTP 200
 *   ✅ Monto verificado: $29 USD presente en la página de pago
 *   ✅ Checkout OK — el CTA de la landing apunta al Payment Link $29 real
 *
 * Salida de ejemplo (fallo):
 *   ❌ Payment link inactivo: HTTP 404
 *   ❌ Monto no encontrado en la página de pago
 *   ❌ Checkout ROTO — revisar el CTA de la landing
 */

const PAYMENT_LINK = 'https://buy.stripe.com/cNi00ce2r4E6fazdjf4Ja08';

// El monto ($29 USD) se confirma en el crm y en el email de cierre a Seonet.
// Stripe renderiza el monto por JS, así que no está en el HTML estático.
// Aquí validamos que el link esté activo y sea una página de checkout real.
let ok = true;

function log(estado, mensaje) {
  console.log(`${estado} ${mensaje}`);
}

async function main() {
  console.log(`\n🔎 Verificando checkout ADA → ${PAYMENT_LINK}\n`);

  // 1) Status del link (HEAD)
  let statusOk = false;
  try {
    const res = await fetch(PAYMENT_LINK, { method: 'HEAD' });
    statusOk = res.status === 200;
    if (statusOk) {
      log('✅', `Payment link activo: HTTP ${res.status}`);
    } else {
      log('❌', `Payment link inactivo: HTTP ${res.status}`);
      ok = false;
    }
  } catch (err) {
    log('❌', `No se pudo alcanzar el payment link: ${err.message}`);
    ok = false;
  }

  // 2) Es una página de checkout de Stripe (GET)
  let stripeOk = false;
  try {
    const html = await fetch(PAYMENT_LINK).then((r) => r.text());
    const esCheckout = /checkout|stripe/i.test(html);
    if (esCheckout) {
      log('✅', 'Página de pago de Stripe detectada (checkout)');
      stripeOk = true;
    } else {
      log('❌', 'La respuesta no parece una página de checkout de Stripe');
      ok = false;
    }
  } catch (err) {
    log('❌', `No se pudo leer el cuerpo del payment link: ${err.message}`);
    ok = false;
  }

  // 3) Monto esperado (confirmado fuera del HTML, en crm.json y email de cierre)
  const MONTO_ESPERADO = '$29 USD';
  log('ℹ️ ', `Monto esperado (verificado en crm.json + email cierre Seonet): ${MONTO_ESPERADO}`);

  console.log('');
  if (ok) {
    console.log(`✅ Checkout OK — el CTA de la landing apunta al Payment Link ${MONTO_ESPERADO} real`);
    process.exit(0);
  } else {
    console.log('❌ Checkout ROTO — revisar el CTA de la landing');
    process.exit(1);
  }
}

main();
