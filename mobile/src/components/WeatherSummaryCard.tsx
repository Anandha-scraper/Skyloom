import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getTrendInfo } from '@climatesight/shared';

interface WeatherSummaryCardProps {
  title: string;
  value: string;
  unit: string;
  trend: number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

export default function WeatherSummaryCard({
  title,
  value,
  unit,
  trend,
  icon,
  color,
}: WeatherSummaryCardProps) {
  const trendInfo = getTrendInfo(trend);

  const getTrendIcon = () => {
    if (trendInfo.direction === 'up') return 'trending-up';
    if (trendInfo.direction === 'down') return 'trending-down';
    return 'remove';
  };

  const getTrendColor = () => {
    if (trendInfo.direction === 'up') return '#10B981';
    if (trendInfo.direction === 'down') return '#EF4444';
    return '#6B7280';
  };

  return (
    <View style={[styles.card, { width: '48%' }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <View style={styles.content}>
        <Text style={styles.value}>
          {value}
          <Text style={styles.unit}>{unit}</Text>
        </Text>
        <View style={styles.trend}>
          <Ionicons name={getTrendIcon()} size={16} color={getTrendColor()} />
          <Text style={[styles.trendText, { color: getTrendColor() }]}>
            {trendInfo.value}
          </Text>
          <Text style={styles.trendLabel}>vs. first half</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  content: {
    gap: 8,
  },
  value: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1F2937',
    fontFamily: 'monospace',
  },
  unit: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '400',
  },
  trend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '500',
  },
  trendLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
});