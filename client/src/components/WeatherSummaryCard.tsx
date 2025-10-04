import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface WeatherSummaryCardProps {
  title: string;
  value: string;
  unit: string;
  trend: number;
  icon: LucideIcon;
  iconColor?: string;
}

export default function WeatherSummaryCard({
  title,
  value,
  unit,
  trend,
  icon: Icon,
  iconColor = "text-primary",
}: WeatherSummaryCardProps) {
  const getTrendIcon = () => {
    if (trend > 0.1) return <TrendingUp className="h-4 w-4 text-chart-3" />;
    if (trend < -0.1) return <TrendingDown className="h-4 w-4 text-destructive" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const getTrendText = () => {
    if (trend > 0.1) return `+${Math.abs(trend).toFixed(1)}${unit}`;
    if (trend < -0.1) return `-${Math.abs(trend).toFixed(1)}${unit}`;
    return "Stable";
  };

  return (
    <Card data-testid={`card-summary-${title.toLowerCase()}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="text-2xl font-mono font-semibold" data-testid={`text-value-${title.toLowerCase()}`}>
            {value}
            <span className="text-base text-muted-foreground ml-1">{unit}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            {getTrendIcon()}
            <span>{getTrendText()}</span>
            <span>vs. first half</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
