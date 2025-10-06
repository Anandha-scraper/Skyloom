"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { WeatherDataPoint, generateChartData } from "@skyloom/shared";

interface WeatherChartProps {
  data: WeatherDataPoint[];
}

export default function WeatherChart({ data }: WeatherChartProps) {
  const [activeTab, setActiveTab] = useState("combined");

  const chartData = generateChartData(data);
  
  if (data.length === 0) {
    return (
      <div style={{
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        border: '1px solid rgba(148, 163, 184, 0.2)',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#f8fafc',
          margin: '0 0 1rem 0',
          fontFamily: 'Inter, sans-serif'
        }}>Weather Analysis</h2>
        <p style={{
          color: '#94a3b8',
          fontSize: '1rem',
          fontFamily: 'Inter, sans-serif'
        }}>No weather data available for the selected date range.</p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          borderRadius: '12px',
          padding: '1rem',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
        }}>
          <p style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#f8fafc',
            margin: '0 0 0.75rem 0',
            fontFamily: 'Inter, sans-serif'
          }}>{payload[0].payload.date}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {payload.map((entry: any, index: number) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div 
                  style={{ 
                    width: '12px', 
                    height: '12px', 
                    borderRadius: '50%',
                    backgroundColor: entry.color 
                  }}
                />
                <span style={{
                  fontSize: '0.875rem',
                  color: '#cbd5e1',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {entry.name}: <span style={{ fontWeight: '600', color: '#f8fafc' }}>{entry.value.toFixed(1)}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{
      backgroundColor: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      border: '1px solid rgba(148, 163, 184, 0.2)',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        padding: '1.5rem',
        borderBottom: '1px solid rgba(148, 163, 184, 0.2)'
      }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#f8fafc',
          margin: 0,
          fontFamily: 'Inter, sans-serif'
        }}>Weather Analysis</h2>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '0.375rem 0.75rem',
          borderRadius: '9999px',
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(148, 163, 184, 0.3)'
        }}>
          <span style={{
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#cbd5e1',
            fontFamily: 'Inter, sans-serif'
          }} data-testid="badge-data-points">
            {data.length} data points
          </span>
        </div>
      </div>
      
      <div style={{ padding: '1.5rem' }}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            width: '100%',
            backgroundColor: 'rgba(15, 23, 42, 0.3)',
            border: '1px solid rgba(148, 163, 184, 0.3)',
            borderRadius: '12px',
            padding: '0.25rem'
          }}>
            <TabsTrigger 
              value="combined" 
              data-testid="tab-combined"
              style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                borderRadius: '8px',
                padding: '0.5rem',
                backgroundColor: activeTab === 'combined' ? 'rgba(15, 23, 42, 0.6)' : 'transparent',
                color: activeTab === 'combined' ? '#f8fafc' : '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Combined
            </TabsTrigger>
            <TabsTrigger 
              value="temperature" 
              data-testid="tab-temperature"
              style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                borderRadius: '8px',
                padding: '0.5rem',
                backgroundColor: activeTab === 'temperature' ? 'rgba(15, 23, 42, 0.6)' : 'transparent',
                color: activeTab === 'temperature' ? '#f8fafc' : '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Temperature
            </TabsTrigger>
            <TabsTrigger 
              value="precipitation" 
              data-testid="tab-precipitation"
              style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                borderRadius: '8px',
                padding: '0.5rem',
                backgroundColor: activeTab === 'precipitation' ? 'rgba(15, 23, 42, 0.6)' : 'transparent',
                color: activeTab === 'precipitation' ? '#f8fafc' : '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Precipitation
            </TabsTrigger>
            <TabsTrigger 
              value="wind" 
              data-testid="tab-wind"
              style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                borderRadius: '8px',
                padding: '0.5rem',
                backgroundColor: activeTab === 'wind' ? 'rgba(15, 23, 42, 0.6)' : 'transparent',
                color: activeTab === 'wind' ? '#f8fafc' : '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Wind
            </TabsTrigger>
            <TabsTrigger 
              value="humidity" 
              data-testid="tab-humidity"
              style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                borderRadius: '8px',
                padding: '0.5rem',
                backgroundColor: activeTab === 'humidity' ? 'rgba(15, 23, 42, 0.6)' : 'transparent',
                color: activeTab === 'humidity' ? '#f8fafc' : '#94a3b8',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Humidity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="combined" style={{ marginTop: '1.5rem' }}>
            <div style={{
              backgroundColor: 'rgba(15, 23, 42, 0.3)',
              borderRadius: '12px',
              padding: '1rem',
              border: '1px solid rgba(148, 163, 184, 0.2)'
            }}>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.3} />
                  <XAxis 
                    dataKey="dateFormatted" 
                    stroke="#94a3b8"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="temperature" 
                    stroke="#ef4444" 
                    name="Temperature (°C)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="precipitation" 
                    stroke="#06b6d4" 
                    name="Precipitation (mm)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="windSpeed" 
                    stroke="#8b5cf6" 
                    name="Wind Speed (m/s)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="humidity" 
                    stroke="#10b981" 
                    name="Humidity (%)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="temperature" style={{ marginTop: '1.5rem' }}>
            <div style={{
              backgroundColor: 'rgba(15, 23, 42, 0.3)',
              borderRadius: '12px',
              padding: '1rem',
              border: '1px solid rgba(148, 163, 184, 0.2)'
            }}>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.3} />
                  <XAxis 
                    dataKey="dateFormatted" 
                    stroke="#94a3b8"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="temperature" 
                    stroke="#ef4444" 
                    name="Temperature (°C)"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="precipitation" style={{ marginTop: '1.5rem' }}>
            <div style={{
              backgroundColor: 'rgba(15, 23, 42, 0.3)',
              borderRadius: '12px',
              padding: '1rem',
              border: '1px solid rgba(148, 163, 184, 0.2)'
            }}>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.3} />
                  <XAxis 
                    dataKey="dateFormatted" 
                    stroke="#94a3b8"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="precipitation" 
                    stroke="#06b6d4" 
                    name="Precipitation (mm)"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="wind" style={{ marginTop: '1.5rem' }}>
            <div style={{
              backgroundColor: 'rgba(15, 23, 42, 0.3)',
              borderRadius: '12px',
              padding: '1rem',
              border: '1px solid rgba(148, 163, 184, 0.2)'
            }}>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.3} />
                  <XAxis 
                    dataKey="dateFormatted" 
                    stroke="#94a3b8"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="windSpeed" 
                    stroke="#8b5cf6" 
                    name="Wind Speed (m/s)"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="humidity" style={{ marginTop: '1.5rem' }}>
            <div style={{
              backgroundColor: 'rgba(15, 23, 42, 0.3)',
              borderRadius: '12px',
              padding: '1rem',
              border: '1px solid rgba(148, 163, 184, 0.2)'
            }}>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" opacity={0.3} />
                  <XAxis 
                    dataKey="dateFormatted" 
                    stroke="#94a3b8"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="humidity" 
                    stroke="#06b6d4" 
                    name="Humidity (%)"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}