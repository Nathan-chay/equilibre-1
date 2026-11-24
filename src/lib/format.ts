import type { Currency } from "../types";

export const formatEUR = (cents: number) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
};

export const formatMoney = (
  cents: number,
  currency: Currency,
  rate: number,
) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
  }).format((cents / 100) * rate);
};