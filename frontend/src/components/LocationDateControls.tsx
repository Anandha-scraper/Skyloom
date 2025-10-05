"use client";

import React, { useState } from "react";
import { format } from "date-fns";

interface LocationDateControlsProps {
  onApply: (location: string, startDate: Date | null, endDate: Date | null) => void;
}

export default function LocationDateControls({ onApply }: LocationDateControlsProps) {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Mock locations for easy selection
  const mockLocations = [
    { name: "New York, NY", coordinates: { latitude: 40.7128, longitude: -74.0060 } },
    { name: "Los Angeles, CA", coordinates: { latitude: 34.0522, longitude: -118.2437 } },
    { name: "Chicago, IL", coordinates: { latitude: 41.8781, longitude: -87.6298 } },
    { name: "Houston, TX", coordinates: { latitude: 29.7604, longitude: -95.3698 } },
    { name: "Phoenix, AZ", coordinates: { latitude: 33.4484, longitude: -112.0740 } },
    { name: "Philadelphia, PA", coordinates: { latitude: 39.9526, longitude: -75.1652 } },
    { name: "San Antonio, TX", coordinates: { latitude: 29.4241, longitude: -98.4936 } },
    { name: "San Diego, CA", coordinates: { latitude: 32.7157, longitude: -117.1611 } },
    { name: "Dallas, TX", coordinates: { latitude: 32.7767, longitude: -96.7970 } },
    { name: "San Jose, CA", coordinates: { latitude: 37.3382, longitude: -121.8863 } }
  ];

  const handleApply = () => {
    if (!startDate || !endDate) {
      console.log("Please select both start and end dates");
      return;
    }
    onApply(location, startDate, endDate);
  };

  const handleClear = () => {
    setLocation("");
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div style={{
      backgroundColor: 'rgba(15, 23, 42, 0.8)',
      borderRadius: '12px',
      border: '1px solid rgba(148, 163, 184, 0.2)',
      padding: '1rem',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
      maxWidth: '400px',
      width: '100%'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Location Field */}
        <div>
          <label style={{ 
            fontSize: '0.875rem', 
            fontWeight: '600', 
            color: '#f8fafc',
            fontFamily: 'Inter, sans-serif'
          }}>
            Location
          </label>
            <input
              placeholder="Search location..."
              value={location}
            onChange={(e) => setLocation(e.target.value)}
              style={{
                width: '100%',
                height: '40px',
              padding: '0 12px',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(148, 163, 184, 0.3)',
                borderRadius: '8px',
                color: '#f8fafc',
                fontSize: '0.875rem',
                fontFamily: 'Inter, sans-serif',
              outline: 'none'
            }}
          />
        </div>

        {/* Mock Locations */}
        <div style={{ marginTop: '0.5rem' }}>
          <div style={{ 
            fontSize: '0.75rem', 
            color: '#94a3b8', 
            marginBottom: '0.5rem',
            fontFamily: 'Inter, sans-serif'
          }}>
            Quick select locations:
          </div>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '0.5rem',
            maxHeight: '120px',
            overflowY: 'auto'
          }}>
            {mockLocations.map((loc, index) => (
              <button
                key={index}
                onClick={() => setLocation(loc.name)}
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(148, 163, 184, 0.3)',
                  borderRadius: '6px',
                  color: '#f8fafc',
                  fontSize: '0.75rem',
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
                  (e.target as HTMLButtonElement).style.borderColor = '#3b82f6';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(15, 23, 42, 0.6)';
                  (e.target as HTMLButtonElement).style.borderColor = 'rgba(148, 163, 184, 0.3)';
                }}
              >
                {loc.name}
              </button>
            ))}
          </div>
        </div>

        {/* Start Date Field */}
        <div>
          <label style={{ 
            fontSize: '0.875rem', 
            fontWeight: '600', 
            color: '#f8fafc',
            fontFamily: 'Inter, sans-serif'
          }}>
            Start Date
          </label>
          <input
            type="date"
            value={startDate ? startDate.toISOString().split('T')[0] : ''}
            max={new Date().toISOString().split('T')[0]}
            onChange={(e) => {
              const date = e.target.value ? new Date(e.target.value) : null;
              const today = new Date();
              today.setHours(23, 59, 59, 999); // Set to end of today
              
              if (date && date > today) {
                // Don't allow future dates
                return;
              }
              
              setStartDate(date);
              // Only reset end date if it's before the new start date (not equal)
              if (endDate && date && endDate < date) {
                setEndDate(null);
              }
            }}
            onBlur={(e) => {
              const date = e.target.value ? new Date(e.target.value) : null;
              const today = new Date();
              today.setHours(23, 59, 59, 999);
              
              if (date && date > today) {
                // Reset to current value if future date was entered
                e.target.value = startDate ? startDate.toISOString().split('T')[0] : '';
              }
            }}
                style={{
                  width: '100%',
                  height: '40px',
                  padding: '0 12px',
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(148, 163, 184, 0.3)',
                  borderRadius: '8px',
                  color: '#f8fafc',
                  fontSize: '0.875rem',
                  fontFamily: 'Inter, sans-serif',
              outline: 'none'
            }}
          />
        </div>

        {/* End Date Field */}
        <div>
          <label style={{ 
            fontSize: '0.875rem', 
            fontWeight: '600', 
            color: '#f8fafc',
            fontFamily: 'Inter, sans-serif'
          }}>
            End Date
          </label>
          <input
            type="date"
            value={endDate ? endDate.toISOString().split('T')[0] : ''}
            max={new Date().toISOString().split('T')[0]}
            onChange={(e) => {
              const date = e.target.value ? new Date(e.target.value) : null;
              const today = new Date();
              today.setHours(23, 59, 59, 999); // Set to end of today
              
              if (date && date > today) {
                // Don't allow future dates
                return;
              }
              
              // Allow end date to be same as start date or after start date
              if (startDate && date && date >= startDate) {
                setEndDate(date);
              }
            }}
            onBlur={(e) => {
              const date = e.target.value ? new Date(e.target.value) : null;
              const today = new Date();
              today.setHours(23, 59, 59, 999);
              
              if (date && date > today) {
                // Reset to current value if future date was entered
                e.target.value = endDate ? endDate.toISOString().split('T')[0] : '';
              } else if (startDate && date && date < startDate) {
                // Reset if end date is before start date
                e.target.value = endDate ? endDate.toISOString().split('T')[0] : '';
              }
            }}
            disabled={!startDate}
                style={{
                  width: '100%',
                  height: '40px',
                  padding: '0 12px',
              backgroundColor: startDate ? 'rgba(15, 23, 42, 0.6)' : 'rgba(15, 23, 42, 0.3)',
                  border: '1px solid rgba(148, 163, 184, 0.3)',
                  borderRadius: '8px',
              color: startDate ? '#f8fafc' : '#64748b',
                  fontSize: '0.875rem',
                  fontFamily: 'Inter, sans-serif',
              outline: 'none',
              opacity: startDate ? 1 : 0.5
            }}
          />
      </div>

      {/* Action Buttons */}
      <div style={{ 
        display: 'flex', 
        gap: '0.75rem', 
        justifyContent: 'flex-end',
        marginTop: '1rem'
      }}>
        <button
          onClick={handleClear}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'transparent',
            border: '1px solid rgba(148, 163, 184, 0.3)',
            borderRadius: '8px',
            color: '#94a3b8',
            fontSize: '0.875rem',
            fontFamily: 'Inter, sans-serif',
              cursor: 'pointer'
            }}
          >
          Clear
        </button>
        <button
          onClick={handleApply}
            disabled={!startDate || !endDate}
          style={{
            padding: '0.5rem 1rem',
              backgroundColor: (!startDate || !endDate) ? '#64748b' : '#3b82f6',
            border: 'none',
            borderRadius: '8px',
            color: '#ffffff',
            fontSize: '0.875rem',
            fontFamily: 'Inter, sans-serif',
              cursor: (!startDate || !endDate) ? 'not-allowed' : 'pointer',
              opacity: (!startDate || !endDate) ? 0.6 : 1
            }}
          >
          Apply Filters
        </button>
        </div>
      </div>
    </div>
  );
}