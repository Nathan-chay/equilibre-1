import { useCurrency } from "../context/CurrencyContext"
import { currencies } from "../data"
import type { Currency } from "../types"

export const CurrencySelect = () => {
  const {currency, setCurrency} = useCurrency()

  return(
    <select value={currency} onChange={(e)=>setCurrency(e.target.value as Currency)}>
      {currencies.map((c)=>(
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  )
}