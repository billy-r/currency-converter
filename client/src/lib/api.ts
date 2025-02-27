export async function fetchExchangeRates(baseCurrency: string): Promise<Record<string, number>> {
  const API_KEY = "59e33b9a3e8762379ad50669"; // Replace with actual API key
  const response = await fetch(
    `https://open.er-api.com/v6/latest/${baseCurrency}`
  );
  
  if (!response.ok) {
    throw new Error("Failed to fetch exchange rates");
  }

  const data = await response.json();
  return data.rates;
}
