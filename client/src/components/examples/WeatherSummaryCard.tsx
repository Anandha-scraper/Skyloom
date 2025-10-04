import WeatherSummaryCard from '../WeatherSummaryCard';
import { Thermometer, CloudRain, Wind, Droplets } from "lucide-react";

export default function WeatherSummaryCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <WeatherSummaryCard
        title="Temperature"
        value="18.5"
        unit="°C"
        trend={2.3}
        icon={Thermometer}
        iconColor="text-chart-1"
      />
      <WeatherSummaryCard
        title="Rainfall"
        value="45.2"
        unit="mm"
        trend={-5.7}
        icon={CloudRain}
        iconColor="text-chart-2"
      />
      <WeatherSummaryCard
        title="Wind Speed"
        value="15.8"
        unit="km/h"
        trend={0.5}
        icon={Wind}
        iconColor="text-chart-4"
      />
      <WeatherSummaryCard
        title="Humidity"
        value="68.4"
        unit="%"
        trend={3.2}
        icon={Droplets}
        iconColor="text-chart-2"
      />
    </div>
  );
}
