import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { getTrendInfo } from "@skyloom/shared";

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
  const trendInfo = getTrendInfo(trend);

  const getTrendIcon = () => {
    if (trendInfo.direction === 'up') return <TrendingUp className="h-4 w-4 text-chart-3" />;
    if (trendInfo.direction === 'down') return <TrendingDown className="h-4 w-4 text-destructive" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <div 
      data-testid={`card-summary-${title.toLowerCase()}`}
      style={{
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        border: '1px solid rgba(148, 163, 184, 0.2)',
        padding: '1.5rem',
        transition: 'all 0.2s',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.5rem',
        marginBottom: '1rem'
      }}>
        <p style={{ 
          fontSize: '0.875rem', 
          fontWeight: '500', 
          color: '#94a3b8',
          margin: 0,
          fontFamily: 'Inter, sans-serif'
        }}>
          {title}
        </p>
        <Icon style={{ 
          width: '20px', 
          height: '20px', 
          color: '#3b82f6'
        }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flexGrow: 1, justifyContent: 'center' }}>
        <div style={{
          fontSize: '1.5rem',
          fontFamily: 'monospace',
          fontWeight: '600',
          color: '#f8fafc',
          display: 'flex',
          alignItems: 'baseline',
          gap: '0.25rem'
        }} data-testid={`text-value-${title.toLowerCase()}`}>
          {value}
          <span style={{ 
            fontSize: '1rem', 
            color: '#94a3b8',
            fontWeight: '400'
          }}>
            {unit}
          </span>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          fontSize: '0.75rem',
          color: '#94a3b8',
          fontFamily: 'Inter, sans-serif'
        }}>
          {getTrendIcon()}
          <span>{trendInfo.value}</span>
          <span>vs. first half</span>
        </div>
      </div>
    </div>
  );
}