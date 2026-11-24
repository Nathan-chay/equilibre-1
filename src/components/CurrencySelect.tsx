import { useCurrency } from "../context/CurrencyContext"
import { currencies } from "../data"
import type { Currency } from "../types"

export const CurrencySelect = () => {
  const {currency, setCurrency, error, loading} = useCurrency()

  return(
    <>
      <select value={currency} onChange={(e)=>setCurrency(e.target.value as Currency)}>
        {currencies.map((c)=>(
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      {loading && <p>Chargement du taux ...</p>}
      {error && <p>Taux indisponible: montant affichés en EUR</p>}
    </>
  )
}