import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import CurrencyInput from "@/components/CurrencyInput";
import { ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { currencyData } from "@/lib/currencyData";

const currencies = [
  "USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR", "NZD"
];

export default function Home() {
  const [amount1, setAmount1] = useState<string>("1");
  const [amount2, setAmount2] = useState<string>("");
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("EUR");

  const { data: rates, isLoading, isError } = useQuery({
    queryKey: ["/api/exchange-rates", currency1],
    refetchInterval: 60000 // Refetch every minute
  });

  const handleAmount1Change = (value: string) => {
    setAmount1(value);
    if (rates) {
      const rate = rates[currency2] / rates[currency1];
      setAmount2((parseFloat(value || "0") * rate).toFixed(2));
    }
  };

  const handleAmount2Change = (value: string) => {
    setAmount2(value);
    if (rates) {
      const rate = rates[currency1] / rates[currency2];
      setAmount1((parseFloat(value || "0") * rate).toFixed(2));
    }
  };

  const swapCurrencies = () => {
    setCurrency1(currency2);
    setCurrency2(currency1);
    setAmount1(amount2);
    setAmount2(amount1);
  };

  const rate = rates ? (rates[currency2] / rates[currency1]).toFixed(2) : null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl border-primary/20">
        <CardContent className="pt-4 pb-4 space-y-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent text-center mb-2">
            Currency Converter
          </h1>

          {isError && (
            <Alert variant="destructive">
              <AlertDescription>
                Failed to fetch exchange rates. Please try again later.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
            <CurrencyInput
              value={amount1}
              onChange={handleAmount1Change}
              currency={currency1}
              onCurrencyChange={setCurrency1}
              currencies={currencies}
              isLoading={isLoading}
            />

            <Button
              variant="ghost"
              size="icon"
              onClick={swapCurrencies}
              className="rounded-full hover:bg-primary/10 dark:hover:bg-primary/20"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>

            <CurrencyInput
              value={amount2}
              onChange={handleAmount2Change}
              currency={currency2}
              onCurrencyChange={setCurrency2}
              currencies={currencies}
              isLoading={isLoading}
            />
          </div>

          {rate && (
            <p className="text-sm text-muted-foreground text-center">
              1 {currency1} ({currencyData[currency1].name}) = {rate} {currency2} ({currencyData[currency2].name})
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}