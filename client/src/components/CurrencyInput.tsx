import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { currencyData } from "@/lib/currencyData";
import { NumberInput } from "./NumberInput";

interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
  currency: string;
  onCurrencyChange: (currency: string) => void;
  currencies: string[];
  isLoading?: boolean;
}

export default function CurrencyInput({
  value,
  onChange,
  currency,
  onCurrencyChange,
  currencies,
  isLoading = false,
}: CurrencyInputProps) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-8" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-muted-foreground">
        {currencyData[currency].name} ({currencyData[currency].symbol})
      </div>
      <NumberInput
        value={value}
        onChange={onChange}
        className="text-lg h-12"
      />
      <Select value={currency} onValueChange={onCurrencyChange}>
        <SelectTrigger className="h-10">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {currencies.map((curr) => (
            <SelectItem key={curr} value={curr}>
              {curr}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}