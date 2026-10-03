import { SALES_TAX_RATE } from "../constants/orderPricing";

export function taxInclusiveUnitPriceCents(price) {
  const priceCents = Math.round(Number(price) * 100);
  return Math.round(priceCents * (1 + SALES_TAX_RATE));
}

export function taxInclusivePrice(price, quantity = 1) {
  return (taxInclusiveUnitPriceCents(price) * quantity) / 100;
}