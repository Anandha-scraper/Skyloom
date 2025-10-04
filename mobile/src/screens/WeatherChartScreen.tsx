import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from 'victory-native';
import { 
  generateMockData, 
  filterWeatherDataByDateRange, 
  formatDate,
  generateChartData 
} from '@climatesight/shared';

export default function WeatherChartScreen() {
  const weatherData = filterWeatherDataByDateRange(
    generateMockData(2020, 2024),
    '2024-01-01',
    '2024-12-31'
  );

  const chartData = generateChartData(weatherData);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Weather Analysis</Text>
        <Text style={styles.subtitle}>{weatherData.length} data points</Text>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Temperature Trend</Text>
        <VictoryChart
          theme={VictoryTheme.material}
          height={300}
          padding={{ left: 50, top: 20, right: 20, bottom: 50 }}
        >
          <VictoryAxis dependentAxis />
          <VictoryAxis />
          <VictoryLine
            data={chartData}
            x="dateFormatted"
            y="temperature"
            style={{
              data: { stroke: '#EF4444', strokeWidth: 2 },
            }}
          />
        </VictoryChart>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Rainfall Trend</Text>
        <VictoryChart
          theme={VictoryTheme.material}
          height={300}
          padding={{ left: 50, top: 20, right: 20, bottom: 50 }}
        >
          <VictoryAxis dependentAxis />
          <VictoryAxis />
          <VictoryLine
            data={chartData}
            x="dateFormatted"
            y="rainfall"
            style={{
              data: { stroke: '#3B82F6', strokeWidth: 2 },
            }}
          />
        </VictoryChart>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Wind Speed Trend</Text>
        <VictoryChart
          theme={VictoryTheme.material}
          height={300}
          padding={{ left: 50, top: 20, right: 20, bottom: 50 }}
        >
          <VictoryAxis dependentAxis />
          <VictoryAxis />
          <VictoryLine
            data={chartData}
            x="dateFormatted"
            y="windSpeed"
            style={{
              data: { stroke: '#8B5CF6', strokeWidth: 2 },
            }}
          />
        </VictoryChart>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Humidity Trend</Text>
        <VictoryChart
          theme={VictoryTheme.material}
          height={300}
          padding={{ left: 50, top: 20, right: 20, bottom: 50 }}
        >
          <VictoryAxis dependentAxis />
          <VictoryAxis />
          <VictoryLine
            data={chartData}
            x="dateFormatted"
            y="humidity"
            style={{
              data: { stroke: '#10B981', strokeWidth: 2 },
            }}
          />
        </VictoryChart>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
});