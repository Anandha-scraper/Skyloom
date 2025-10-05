"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import LocationDateControls from "@/components/LocationDateControls";
import WeatherSummaryCard from "@/components/WeatherSummaryCard";
import WeatherChart from "@/components/WeatherChart";
import { 
  formatDate,
  MOCK_LOCATIONS 
} from "@climatesight/shared";
import { weatherApiService } from "@/services/weatherApi";
import { Thermometer, CloudRain, Wind, Droplets } from "lucide-react";

export default function DashboardPage() {
  const { logout } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState("");
  
  // Use current year as default
  const currentYear = new Date().getFullYear();
  const [dateRange, setDateRange] = useState({
    start: new Date(currentYear, 0, 1),
    end: new Date(currentYear, 11, 31),
  });
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      redirect("/");
    }
  }, []);

  // Fetch weather data when component mounts or when location/date changes
  useEffect(() => {
    // Add a small delay to ensure backend is ready
    const timer = setTimeout(() => {
      fetchWeatherData();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [selectedLocation, dateRange]);

  const fetchWeatherData = async () => {
    // Don't fetch data if no location is selected
    if (!selectedLocation || selectedLocation.trim() === '') {
      setWeatherData([]);
      setSummary(null);
      setError(null);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const startDateStr = formatDate(dateRange.start, "yyyy-MM-dd");
      const endDateStr = formatDate(dateRange.end, "yyyy-MM-dd");
      
      const [weatherDataResult, summaryResult] = await Promise.all([
        weatherApiService.getWeatherData(selectedLocation, startDateStr, endDateStr),
        weatherApiService.getWeatherSummary(selectedLocation, startDateStr, endDateStr)
      ]);
      
      setWeatherData(weatherDataResult);
      setSummary(summaryResult);
    } catch (err) {
      console.error('Failed to fetch weather data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (location: string, startDate: Date | null, endDate: Date | null) => {
    if (!location || location.trim() === '') {
      alert('Please select a location before applying filters.');
      return;
    }
    
    if (!startDate || !endDate) {
      alert('Please select both start and end dates before applying filters.');
      return;
    }
    
    setSelectedLocation(location);
    setDateRange({ start: startDate, end: endDate });
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      logout();
    }
  };


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
                Skyloom
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* User Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Avatar style={{ width: '32px', height: '32px' }}>
                <AvatarFallback style={{ 
                  backgroundColor: 'rgba(59, 130, 246, 0.1)', 
                  color: '#3b82f6',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  {localStorage.getItem("username")?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <span style={{ 
                fontSize: '0.875rem', 
                color: '#f8fafc',
                fontFamily: 'Inter, sans-serif'
              }}>
                Welcome, {localStorage.getItem("username") || 'User'}
              </span>
            </div>
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              style={{
                padding: '0.5rem 0.75rem',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '6px',
                color: '#fca5a5',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
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
        {loading ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                padding: '1.5rem',
                height: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  border: '3px solid rgba(148, 163, 184, 0.3)',
                  borderTop: '3px solid #3b82f6',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
              </div>
            ))}
          </div>
        ) : error ? (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center',
            color: '#fca5a5'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem' }}>Error Loading Weather Data</h3>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem' }}>{error}</p>
            <button
              onClick={fetchWeatherData}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#3b82f6',
                border: 'none',
                borderRadius: '6px',
                color: '#ffffff',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              Retry
            </button>
          </div>
        ) : summary ? (
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
              title="Precipitation"
              value={summary.precipitation.avg.toFixed(1)}
              unit="mm"
              trend={summary.precipitation.trend}
              icon={CloudRain}
              iconColor="text-chart-2"
            />
            <WeatherSummaryCard
              title="Wind Speed"
              value={summary.wind.speed.avg.toFixed(1)}
              unit="m/s"
              trend={summary.wind.speed.trend}
              icon={Wind}
              iconColor="text-chart-4"
            />
            <WeatherSummaryCard
              title="Humidity"
              value={summary.humidity.relative.avg.toFixed(1)}
              unit="%"
              trend={summary.humidity.relative.trend}
              icon={Droplets}
              iconColor="text-chart-2"
            />
          </div>
        ) : null}

        {/* Chart Section */}
        <div style={{ width: '100%' }}>
          {loading ? (
            <div style={{
              backgroundColor: 'rgba(15, 23, 42, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              padding: '3rem',
              textAlign: 'center',
              color: '#94a3b8'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                border: '4px solid rgba(148, 163, 184, 0.3)',
                borderTop: '4px solid #3b82f6',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 1rem auto'
              }} />
              <p style={{ margin: 0, fontSize: '0.875rem' }}>Loading weather data...</p>
            </div>
          ) : weatherData.length > 0 ? (
            <WeatherChart data={weatherData} />
          ) : null}
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