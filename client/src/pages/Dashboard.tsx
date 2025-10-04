import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, Sun, Moon } from "lucide-react";
import LocationDateControls from "@/components/LocationDateControls";
import WeatherSummaryCard from "@/components/WeatherSummaryCard";
import WeatherChart from "@/components/WeatherChart";
import { getMockWeatherData, getDataSummary } from "@/lib/mockWeatherData";
import { Thermometer, CloudRain, Wind, Droplets } from "lucide-react";
import { format } from "date-fns";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [darkMode, setDarkMode] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState("New York, USA");
  const [dateRange, setDateRange] = useState({
    start: new Date(2024, 0, 1),
    end: new Date(2024, 11, 31),
  });

  const weatherData = getMockWeatherData(
    selectedLocation,
    format(dateRange.start, "yyyy-MM-dd"),
    format(dateRange.end, "yyyy-MM-dd")
  );

  const summary = getDataSummary(weatherData);

  const handleApply = (location: string, startDate: Date, endDate: Date) => {
    console.log("Filters applied:", { location, startDate, endDate });
    setSelectedLocation(location);
    setDateRange({ start: startDate, end: endDate });
  };

  const handleLogout = () => {
    console.log("Logging out");
    setLocation("/");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  if (darkMode && !document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.add("dark");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">🌍</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">NASA Earth Observation</h1>
                <p className="text-sm text-muted-foreground">Weather Data Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                data-testid="button-theme-toggle"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  DU
                </AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                data-testid="button-logout"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <LocationDateControls onApply={handleApply} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <WeatherSummaryCard
            title="Temperature"
            value={summary.temperature.avg.toFixed(1)}
            unit="°C"
            trend={summary.temperature.trend}
            icon={Thermometer}
            iconColor="text-chart-1"
          />
          <WeatherSummaryCard
            title="Rainfall"
            value={summary.rainfall.avg.toFixed(1)}
            unit="mm"
            trend={summary.rainfall.trend}
            icon={CloudRain}
            iconColor="text-chart-2"
          />
          <WeatherSummaryCard
            title="Wind Speed"
            value={summary.windSpeed.avg.toFixed(1)}
            unit="km/h"
            trend={summary.windSpeed.trend}
            icon={Wind}
            iconColor="text-chart-4"
          />
          <WeatherSummaryCard
            title="Humidity"
            value={summary.humidity.avg.toFixed(1)}
            unit="%"
            trend={summary.humidity.trend}
            icon={Droplets}
            iconColor="text-chart-2"
          />
        </div>

        <WeatherChart data={weatherData} />

        <div className="text-center text-sm text-muted-foreground py-4">
          <p>
            Displaying weather data for <span className="font-medium text-foreground">{selectedLocation}</span>
          </p>
          <p className="mt-1">
            Period: {format(dateRange.start, "MMM dd, yyyy")} - {format(dateRange.end, "MMM dd, yyyy")}
          </p>
        </div>
      </main>
    </div>
  );
}
