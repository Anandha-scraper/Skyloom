import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DatePicker from 'react-native-date-picker';
import { MOCK_LOCATIONS } from '@climatesight/shared';

interface LocationDateControlsProps {
  onApply: (location: string, startDate: Date, endDate: Date) => void;
}

export default function LocationDateControls({ onApply }: LocationDateControlsProps) {
  const [location, setLocation] = useState('');
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date(2024, 0, 1));
  const [endDate, setEndDate] = useState(new Date(2024, 11, 31));
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const filteredLocations = MOCK_LOCATIONS.filter(loc =>
    loc.name.toLowerCase().includes(location.toLowerCase())
  );

  const handleApply = () => {
    onApply(location, startDate, endDate);
  };

  const handleClear = () => {
    setLocation('');
    setStartDate(new Date(2024, 0, 1));
    setEndDate(new Date(2024, 11, 31));
  };

  const setQuickRange = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    setStartDate(start);
    setEndDate(end);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Weather Data</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowLocationPicker(true)}
        >
          <Ionicons name="location-outline" size={20} color="#6B7280" />
          <Text style={styles.inputText}>
            {location || 'Select location...'}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <View style={styles.dateRow}>
        <View style={styles.dateInput}>
          <Text style={styles.label}>Start Date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowStartDatePicker(true)}
          >
            <Ionicons name="calendar-outline" size={20} color="#6B7280" />
            <Text style={styles.inputText}>{formatDate(startDate)}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dateInput}>
          <Text style={styles.label}>End Date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowEndDatePicker(true)}
          >
            <Ionicons name="calendar-outline" size={20} color="#6B7280" />
            <Text style={styles.inputText}>{formatDate(endDate)}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.quickSelect}>
        <Text style={styles.label}>Quick Select</Text>
        <View style={styles.quickButtons}>
          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => setQuickRange(7)}
          >
            <Text style={styles.quickButtonText}>7D</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => setQuickRange(30)}
          >
            <Text style={styles.quickButtonText}>30D</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => setQuickRange(365)}
          >
            <Text style={styles.quickButtonText}>1Y</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Ionicons name="close" size={20} color="#6B7280" />
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Ionicons name="search" size={20} color="#FFFFFF" />
          <Text style={styles.applyButtonText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>

      {/* Location Picker Modal */}
      {showLocationPicker && (
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Location</Text>
              <TouchableOpacity onPress={() => setShowLocationPicker(false)}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.locationList}>
              {filteredLocations.map((loc, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.locationItem}
                  onPress={() => {
                    setLocation(loc.name);
                    setShowLocationPicker(false);
                  }}
                >
                  <Text style={styles.locationName}>{loc.name}</Text>
                  <Text style={styles.locationCoords}>{loc.coordinates}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}

      {/* Date Pickers */}
      <DatePicker
        modal
        open={showStartDatePicker}
        date={startDate}
        mode="date"
        minimumDate={new Date(1990, 0, 1)}
        maximumDate={new Date(2025, 11, 31)}
        onConfirm={(date) => {
          setShowStartDatePicker(false);
          setStartDate(date);
        }}
        onCancel={() => setShowStartDatePicker(false)}
      />

      <DatePicker
        modal
        open={showEndDatePicker}
        date={endDate}
        mode="date"
        minimumDate={new Date(1990, 0, 1)}
        maximumDate={new Date(2025, 11, 31)}
        onConfirm={(date) => {
          setShowEndDatePicker(false);
          setEndDate(date);
        }}
        onCancel={() => setShowEndDatePicker(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 8,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  dateRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  dateInput: {
    flex: 1,
  },
  quickSelect: {
    marginBottom: 20,
  },
  quickButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  quickButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  quickButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  clearButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 8,
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  applyButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 12,
    gap: 8,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '90%',
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  locationList: {
    maxHeight: 300,
  },
  locationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  locationName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  locationCoords: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    fontFamily: 'monospace',
  },
});