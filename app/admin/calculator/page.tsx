import { Container } from "@/components/ui/Container";
import { ProfitCalculator } from "@/components/admin/ProfitCalculator";

export const metadata = { title: "Profit calculator" };

export default function CalculatorPage() {
  return (
    <Container className="max-w-5xl py-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink">
          Profit calculator
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-ink-soft">
          Build a turn from your price list, enter what you pay the crew and
          overhead, and see the take-home before you quote. Painting and flooring
          square footage uses the unit floor area.
        </p>
      </div>
      <ProfitCalculator />
    </Container>
  );
}
