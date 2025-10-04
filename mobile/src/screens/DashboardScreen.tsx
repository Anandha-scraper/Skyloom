import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import WeatherSummaryCard from '../components/WeatherSummaryCard';
import LocationDateControls from '../components/LocationDateControls';
import { 
  generateMockData, 
  filterWeatherDataByDateRange, 
  calculateWeatherSummary,
  formatDate,
  MOCK_LOCATIONS 
} from '@climatesight/shared';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const [selectedLocation, setSelectedLocation] = useState('New York, USA');
  const [dateRange, setDateRange] = useState({
    start: new Date(2024, 0, 1),
    end: new Date(2024, 11, 31),
  });

  const weatherData = filterWeatherDataByDateRange(
    generateMockData(2020, 2024),
    formatDate(dateRange.start, 'yyyy-MM-dd'),
    formatDate(dateRange.end, 'yyyy-MM-dd')
  );

  const summary = calculateWeatherSummary(weatherData);

  const handleApply = (location: string, startDate: Date, endDate: Date) => {
    setSelectedLocation(location);
    setDateRange({ start: startDate, end: endDate });
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => navigation.navigate('Login' as never) },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logo}>
            <Text style={styles.logoEmoji}>🌍</Text>
          </View>
          <View>
            <Text style={styles.headerTitle}>NASA Earth Observation</Text>
            <Text style={styles.headerSubtitle}>Weather Data Dashboard</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <LocationDateControls onApply={handleApply} />

        <View style={styles.summaryGrid}>
          <WeatherSummaryCard
            title="Temperature"
            value={summary.temperature.avg.toFixed(1)}
            unit="°C"
            trend={summary.temperature.trend}
            icon="thermometer"
            color="#EF4444"
          />
          <WeatherSummaryCard
            title="Rainfall"
            value={summary.rainfall.avg.toFixed(1)}
            unit="mm"
            trend={summary.rainfall.trend}
            icon="rainy"
            color="#3B82F6"
          />
          <WeatherSummaryCard
            title="Wind Speed"
            value={summary.windSpeed.avg.toFixed(1)}
            unit="km/h"
            trend={summary.windSpeed.trend}
            icon="leaf"
            color="#8B5CF6"
          />
          <WeatherSummaryCard
            title="Humidity"
            value={summary.humidity.avg.toFixed(1)}
            unit="%"
            trend={summary.humidity.trend}
            icon="water"
            color="#10B981"
          />
        </View>

        <TouchableOpacity
          style={styles.chartButton}
          onPress={() => navigation.navigate('Charts' as never)}
        >
          <Ionicons name="bar-chart" size={24} color="#3B82F6" />
          <Text style={styles.chartButtonText}>View Detailed Charts</Text>
          <Ionicons name="chevron-forward" size={20} color="#6B7280" />
        </TouchableOpacity>

        <View style={styles.info}>
          <Text style={styles.infoText}>
            Displaying weather data for {selectedLocation}
          </Text>
          <Text style={styles.infoText}>
            Period: {formatDate(dateRange.start)} - {formatDate(dateRange.end)}
          </Text>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#EBF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoEmoji: {
    fontSize: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  logoutButton: {
    padding: 8,
  },
  content: {
    padding: 20,
    gap: 20,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  chartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 12,
  },
  chartButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  info: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 8,
    gap: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});