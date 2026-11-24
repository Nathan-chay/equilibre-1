import { useState, type ReactNode } from "react"
import type { Currency } from "../types"
import { formatMoney } from "../lib/format"
import { fakeRate } from "../data"
import { CurrencyContext } from "./CurrencyContext"

type CurrencyProviderProps = {
  children: ReactNode
}

export const CurrencyProvider = ({children}: CurrencyProviderProps) => {
  const [currency, setCurrency] = useState<Currency>("EUR");

  const formatAmount = (cents: number) => {
    return formatMoney(cents, currency, fakeRate[currency]);
  }

  return(
    <CurrencyContext value={{
      currency,
      formatAmount,
      setCurrency,
    }}>
      {children}
    </CurrencyContext>
  )
}