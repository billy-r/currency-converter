import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface NumberInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function NumberInput({ value, onChange, className }: NumberInputProps) {
  const handleIncrement = () => {
    const currentValue = parseFloat(value) || 0;
    onChange((currentValue + 1).toString());
  };

  const handleDecrement = () => {
    const currentValue = parseFloat(value) || 0;
    if (currentValue > 0) {
      onChange((currentValue - 1).toString());
    }
  };

  return (
    <div className={cn("relative", className)}>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pr-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <div className="absolute right-1 top-1 bottom-1 flex flex-col gap-0.5">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-[calc(50%-2px)] w-6 p-0 opacity-50 hover:opacity-100 hover:bg-primary/10"
          onClick={handleIncrement}
        >
          <ChevronUp className="h-3 w-3" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-[calc(50%-2px)] w-6 p-0 opacity-50 hover:opacity-100 hover:bg-primary/10"
          onClick={handleDecrement}
        >
          <ChevronDown className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}