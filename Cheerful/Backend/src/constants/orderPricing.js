const ONLINE_ORDER_FEE_CENTS = 165;
const SALES_TAX_RATE = 0.085;

function taxInclusiveUnitPriceCents(price) {
	const priceCents = Math.round(Number(price) * 100);
	return Math.round(priceCents * (1 + SALES_TAX_RATE));
}

module.exports = { ONLINE_ORDER_FEE_CENTS, SALES_TAX_RATE, taxInclusiveUnitPriceCents };