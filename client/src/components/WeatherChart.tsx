import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { WeatherDataPoint } from "@/lib/mockWeatherData";
import { format } from "date-fns";

interface WeatherChartProps {
  data: WeatherDataPoint[];
}

export default function WeatherChart({ data }: WeatherChartProps) {
  const [activeTab, setActiveTab] = useState("combined");

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), "MMM dd");
  };

  const chartData = data.map(d => ({
    ...d,
    dateFormatted: formatDate(d.date),
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card>
          <CardContent className="p-3">
            <p className="text-sm font-medium mb-2">{payload[0].payload.date}</p>
            {payload.map((entry: any, index: number) => (
              <p key={index} className="text-sm" style={{ color: entry.color }}>
                {entry.name}: {entry.value.toFixed(1)}
              </p>
            ))}
          </CardContent>
        </Card>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2 space-y-0 pb-4">
        <CardTitle className="text-xl">Weather Analysis</CardTitle>
        <Badge variant="secondary" data-testid="badge-data-points">
          {data.length} data points
        </Badge>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="combined" data-testid="tab-combined">Combined</TabsTrigger>
            <TabsTrigger value="temperature" data-testid="tab-temperature">Temperature</TabsTrigger>
            <TabsTrigger value="rainfall" data-testid="tab-rainfall">Rainfall</TabsTrigger>
            <TabsTrigger value="wind" data-testid="tab-wind">Wind</TabsTrigger>
            <TabsTrigger value="humidity" data-testid="tab-humidity">Humidity</TabsTrigger>
          </TabsList>

          <TabsContent value="combined" className="mt-6">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="dateFormatted" 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="hsl(var(--chart-1))" 
                  name="Temperature (°C)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="rainfall" 
                  stroke="hsl(var(--chart-2))" 
                  name="Rainfall (mm)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="windSpeed" 
                  stroke="hsl(var(--chart-4))" 
                  name="Wind Speed (km/h)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="temperature" className="mt-6">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="dateFormatted" 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="hsl(var(--chart-1))" 
                  name="Temperature (°C)"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="rainfall" className="mt-6">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="dateFormatted" 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="rainfall" 
                  stroke="hsl(var(--chart-2))" 
                  name="Rainfall (mm)"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="wind" className="mt-6">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="dateFormatted" 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="windSpeed" 
                  stroke="hsl(var(--chart-4))" 
                  name="Wind Speed (km/h)"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="humidity" className="mt-6">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="dateFormatted" 
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="humidity" 
                  stroke="hsl(var(--chart-2))" 
                  name="Humidity (%)"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
