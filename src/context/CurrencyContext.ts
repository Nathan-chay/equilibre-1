import { createContext, useContext} from "react"
import type { Currency } from "../types"

type CurrencyContextValue = {
  currency: Currency
  setCurrency: (currency: Currency) => void
  formatAmount: (cents: number) => string
  loading: boolean;
  error : boolean;
}

export const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export const useCurrency = () => {
  const context = useContext(CurrencyContext)
  if(context === null) {
    throw new Error("useCurrency doit être utilisé dans un CurrencyProvider");
  }
  return context;
}