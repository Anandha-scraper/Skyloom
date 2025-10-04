import WeatherChart from '../WeatherChart';
import { getMockWeatherData } from '@/lib/mockWeatherData';

export default function WeatherChartExample() {
  const mockData = getMockWeatherData("New York, USA", "2024-01-01", "2024-12-31");

  return (
    <div className="p-6">
      <WeatherChart data={mockData} />
    </div>
  );
}
