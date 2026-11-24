import { useState, type ReactNode } from "react"
import type { Currency } from "../types"
import { formatEUR, formatMoney } from "../lib/format"
import { CurrencyContext } from "./CurrencyContext"
import { useRate } from "../hooks/useRate"

type CurrencyProviderProps = {
  children: ReactNode;
}

export const CurrencyProvider = ({children}: CurrencyProviderProps) => {
  const [currency, setCurrency] = useState<Currency>("EUR");
  const {error, loading, rate} = useRate(currency);

  const formatAmount = (cents: number) => {
    if(rate === null) {
      return formatEUR(cents);
    }
    return formatMoney(cents, currency, rate);
  }

  return(
    <CurrencyContext value={{
      currency,
      formatAmount,
      setCurrency,
      error,
      loading,
    }}>
      {children}
    </CurrencyContext>
  )
}