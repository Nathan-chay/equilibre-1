import { useEffect, useState } from "react"
import type { Currency } from "../types"

type RateResponse = {
  base: string;
  date: string;
  quote: string;
  rate: number;
}

export const useRate = (currency: Currency) => {
  const [data, setData] = useState<RateResponse | null>(null);
  const [failed, setFailed] = useState<Currency | null>(null);

  useEffect (()=>{
    if(currency === 'EUR') return;
    const load = async () => {
      try {
        const response = await fetch(`https://api.frankfurter.dev/v2/rate/EUR/${currency}`);
        if(!response.ok) throw new Error(`Erreur ${response.status}`);
        setData(await response.json());
        setFailed(null);
      } catch {
        setFailed(currency);
      }
    };
    load();
  },[currency]);

  if(currency === 'EUR') {
    return {
      rate: 1,
      loading: false,
      error: false
    }
  };

  const rate = data?.quote === currency ? data.rate : null;
  const error = failed === currency

  return {
    rate,
    loading: rate === null && !error,
    error,
  };
};