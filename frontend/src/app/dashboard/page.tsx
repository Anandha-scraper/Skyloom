"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, Sun, Moon } from "lucide-react";
import LocationDateControls from "@/components/LocationDateControls";
import WeatherSummaryCard from "@/components/WeatherSummaryCard";
import WeatherChart from "@/components/WeatherChart";
import { 
  generateMockData, 
  filterWeatherDataByDateRange, 
  calculateWeatherSummary,
  formatDate,
  MOCK_LOCATIONS 
} from "@climatesight/shared";
import { Thermometer, CloudRain, Wind, Droplets } from "lucide-react";

export default function DashboardPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState("New York, USA");
  const [dateRange, setDateRange] = useState({
    start: new Date(2024, 0, 1),
    end: new Date(2024, 11, 31),
  });

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      redirect("/");
    }
  }, []);

  const allMockData = generateMockData(1990, 2030);
  const startDateStr = formatDate(dateRange.start, "yyyy-MM-dd");
  const endDateStr = formatDate(dateRange.end, "yyyy-MM-dd");
  
  const weatherData = filterWeatherDataByDateRange(
    allMockData,
    startDateStr,
    endDateStr
  );

  const summary = calculateWeatherSummary(weatherData);

  const handleApply = (location: string, startDate: Date, endDate: Date) => {
    setSelectedLocation(location);
    setDateRange({ start: startDate, end: endDate });
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    redirect("/");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle("dark");
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && darkMode && !document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.add("dark");
    }
  }, [darkMode]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc' }}>
      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid #334155',
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '1rem 0'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              height: '40px',
              width: '40px',
              borderRadius: '8px',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '1.5rem' }}>🌍</span>
            </div>
            <div>
              <h1 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 'bold', 
                color: '#f8fafc',
                margin: 0,
                fontFamily: 'Inter, sans-serif'
              }}>
                NASA Earth Observation
              </h1>
              <p style={{ 
                fontSize: '0.875rem', 
                color: '#94a3b8',
                margin: 0,
                fontFamily: 'Inter, sans-serif'
              }}>
                Weather Data Dashboard
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={toggleDarkMode}
              style={{
                padding: '0.5rem',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '6px',
                color: '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              data-testid="button-theme-toggle"
            >
              {darkMode ? <Sun style={{ width: '20px', height: '20px' }} /> : <Moon style={{ width: '20px', height: '20px' }} />}
            </button>
            <div style={{
              height: '36px',
              width: '36px',
              borderRadius: '50%',
              backgroundColor: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              DU
            </div>
            <button
              onClick={handleLogout}
              style={{
                padding: '0.5rem 0.75rem',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '6px',
                color: '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                fontFamily: 'Inter, sans-serif'
              }}
              data-testid="button-logout"
            >
              <LogOut style={{ width: '16px', height: '16px' }} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '2rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        {/* Controls Section */}
        <div style={{ width: '100%' }}>
          <LocationDateControls onApply={handleApply} />
        </div>

        {/* Summary Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
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

        {/* Chart Section */}
        <div style={{ width: '100%' }}>
          <WeatherChart data={weatherData} />
        </div>

        {/* Footer Info */}
        <div style={{ 
          textAlign: 'center', 
          fontSize: '0.875rem', 
          color: '#94a3b8', 
          padding: '1rem 0',
          fontFamily: 'Inter, sans-serif'
        }}>
          <p style={{ margin: '0 0 0.25rem 0' }}>
            Displaying weather data for <span style={{ fontWeight: '500', color: '#f8fafc' }}>{selectedLocation}</span>
          </p>
          <p style={{ margin: 0 }}>
            Period: {formatDate(dateRange.start)} - {formatDate(dateRange.end)}
          </p>
        </div>
      </main>
    </div>
  );
}