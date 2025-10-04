"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DayPicker } from "react-day-picker";
import { CalendarIcon, MapPin, Search, X } from "lucide-react";
import { format } from "date-fns";
import { MOCK_LOCATIONS } from "@climatesight/shared";

interface LocationDateControlsProps {
  onApply: (location: string, startDate: Date, endDate: Date) => void;
}

export default function LocationDateControls({ onApply }: LocationDateControlsProps) {
  const [location, setLocation] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date(2024, 0, 1));
  const [endDate, setEndDate] = useState<Date>(new Date(2024, 11, 31));
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [startMonth, setStartMonth] = useState<Date>(new Date(2024, 0, 1));
  const [endMonth, setEndMonth] = useState<Date>(new Date(2024, 11, 31));

  const filteredLocations = MOCK_LOCATIONS.filter(loc =>
    loc.name.toLowerCase().includes(location.toLowerCase())
  ).slice(0, 5);

  const handleApply = () => {
    console.log("Applying filters", { location, startDate, endDate });
    onApply(location, startDate, endDate);
  };

  const handleClear = () => {
    console.log("Clearing filters");
    setLocation("");
    setStartDate(new Date(2024, 0, 1));
    setEndDate(new Date(2024, 11, 31));
  };


  return (
    <div style={{
      backgroundColor: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      border: '1px solid rgba(148, 163, 184, 0.2)',
      padding: '1rem',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
      maxWidth: '400px',
      width: '100%'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Location Field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative' }}>
          <label htmlFor="location" style={{ 
            fontSize: '0.875rem', 
            fontWeight: '600', 
            color: '#f8fafc',
            fontFamily: 'Inter, sans-serif'
          }}>
            Location
          </label>
          <div style={{ position: 'relative' }}>
            <MapPin style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              width: '16px', 
              height: '16px', 
              color: '#94a3b8',
              zIndex: 10
            }} />
            <input
              id="location"
              data-testid="input-location"
              placeholder="Search location..."
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setShowSuggestions(true);
              }}
              style={{
                width: '100%',
                height: '40px',
                paddingLeft: '40px',
                paddingRight: '12px',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(148, 163, 184, 0.3)',
                borderRadius: '8px',
                color: '#f8fafc',
                fontSize: '0.875rem',
                fontFamily: 'Inter, sans-serif',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => {
                setShowSuggestions(true);
                (e.target as HTMLInputElement).style.borderColor = '#3b82f6';
              }}
              onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = 'rgba(148, 163, 184, 0.3)'}
            />
          </div>
          {showSuggestions && filteredLocations.length > 0 && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 50,
              marginTop: '4px',
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '8px',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
              padding: '0.5rem'
            }}>
              {filteredLocations.map((loc, idx) => (
                <button
                  key={idx}
                  data-testid={`suggestion-${idx}`}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.875rem',
                    borderRadius: '6px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#f8fafc',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(148, 163, 184, 0.1)'}
                  onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = 'transparent'}
                  onClick={() => {
                    setLocation(loc.name);
                    setShowSuggestions(false);
                  }}
                >
                  <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>{loc.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'monospace' }}>{loc.coordinates}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Start Date Field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ 
            fontSize: '0.875rem', 
            fontWeight: '600', 
            color: '#f8fafc',
            fontFamily: 'Inter, sans-serif'
          }}>
            Start Date
          </label>
          <Popover open={showStartCalendar} onOpenChange={setShowStartCalendar}>
            <PopoverTrigger asChild>
              <button
                data-testid="button-start-date"
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
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s'
                }}
                onMouseEnter={(e) => (e.target as HTMLButtonElement).style.borderColor = '#3b82f6'}
                onMouseLeave={(e) => (e.target as HTMLButtonElement).style.borderColor = 'rgba(148, 163, 184, 0.3)'}
              >
                <CalendarIcon style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                {format(startDate, "MMM dd, yyyy")}
              </button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-auto p-0" 
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '12px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                maxWidth: '280px',
                width: '280px'
              }}
            >
              <DayPicker
                mode="single"
                selected={startDate}
                onSelect={(date) => {
                  if (date) {
                    setStartDate(date);
                    setShowStartCalendar(false);
                  }
                }}
                month={startMonth}
                onMonthChange={setStartMonth}
                initialFocus
                fromYear={1990}
                toYear={2025}
                captionLayout="dropdown"
                showOutsideDays={false}
                fixedWeeks
                className="rdp"
                style={{
                  backgroundColor: 'transparent',
                  color: '#f8fafc'
                }}
                components={{
                  Caption: ({ displayMonth }) => {
                    const currentYear = displayMonth.getFullYear();
                    const currentMonth = displayMonth.toLocaleDateString('en-US', { month: 'long' });
                    
                    return (
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        color: '#f8fafc',
                        fontSize: '1rem',
                        fontWeight: '600',
                        backgroundColor: 'rgba(15, 23, 42, 0.1)',
                        borderRadius: '6px',
                        marginBottom: '0.5rem',
                        minHeight: '36px'
                      }}>
                        <span style={{
                          fontSize: '1rem',
                          fontWeight: '700',
                          color: '#f8fafc',
                          lineHeight: '1.4',
                          display: 'flex',
                          alignItems: 'center',
                          height: '32px'
                        }}>
                          {currentMonth}
                        </span>
                        <select
                          value={currentYear}
                          onChange={(e) => {
                            const newDate = new Date(displayMonth);
                            newDate.setFullYear(parseInt(e.target.value));
                            setStartMonth(newDate);
                          }}
                          style={{
                            backgroundColor: 'rgba(15, 23, 42, 0.9)',
                            color: '#f8fafc',
                            border: '1px solid rgba(148, 163, 184, 0.3)',
                            borderRadius: '4px',
                            padding: '4px 8px',
                            fontSize: '0.75rem',
                            fontFamily: 'Inter, sans-serif',
                            width: '70px',
                            height: '32px',
                            textAlign: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          {Array.from({ length: 36 }, (_, i) => 1990 + i).map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                    );
                  }
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* End Date Field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ 
            fontSize: '0.875rem', 
            fontWeight: '600', 
            color: '#f8fafc',
            fontFamily: 'Inter, sans-serif'
          }}>
            End Date
          </label>
          <Popover open={showEndCalendar} onOpenChange={setShowEndCalendar}>
            <PopoverTrigger asChild>
              <button
                data-testid="button-end-date"
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
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s'
                }}
                onMouseEnter={(e) => (e.target as HTMLButtonElement).style.borderColor = '#3b82f6'}
                onMouseLeave={(e) => (e.target as HTMLButtonElement).style.borderColor = 'rgba(148, 163, 184, 0.3)'}
              >
                <CalendarIcon style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                {format(endDate, "MMM dd, yyyy")}
              </button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-auto p-0" 
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '12px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                maxWidth: '280px',
                width: '280px'
              }}
            >
              <DayPicker
                mode="single"
                selected={endDate}
                onSelect={(date) => {
                  if (date) {
                    setEndDate(date);
                    setShowEndCalendar(false);
                  }
                }}
                month={endMonth}
                onMonthChange={setEndMonth}
                initialFocus
                fromYear={1990}
                toYear={2025}
                captionLayout="dropdown"
                showOutsideDays={false}
                fixedWeeks
                className="rdp"
                style={{
                  backgroundColor: 'transparent',
                  color: '#f8fafc'
                }}
                components={{
                  Caption: ({ displayMonth }) => {
                    const currentYear = displayMonth.getFullYear();
                    const currentMonth = displayMonth.toLocaleDateString('en-US', { month: 'long' });
                    
                    return (
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        color: '#f8fafc',
                        fontSize: '1rem',
                        fontWeight: '600',
                        backgroundColor: 'rgba(15, 23, 42, 0.1)',
                        borderRadius: '6px',
                        marginBottom: '0.5rem',
                        minHeight: '36px'
                      }}>
                        <span style={{
                          fontSize: '1rem',
                          fontWeight: '700',
                          color: '#f8fafc',
                          lineHeight: '1.4',
                          display: 'flex',
                          alignItems: 'center',
                          height: '32px'
                        }}>
                          {currentMonth}
                        </span>
                        <select
                          value={currentYear}
                          onChange={(e) => {
                            const newDate = new Date(displayMonth);
                            newDate.setFullYear(parseInt(e.target.value));
                            setEndMonth(newDate);
                          }}
                          style={{
                            backgroundColor: 'rgba(15, 23, 42, 0.9)',
                            color: '#f8fafc',
                            border: '1px solid rgba(148, 163, 184, 0.3)',
                            borderRadius: '4px',
                            padding: '4px 8px',
                            fontSize: '0.75rem',
                            fontFamily: 'Inter, sans-serif',
                            width: '70px',
                            height: '32px',
                            textAlign: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          {Array.from({ length: 36 }, (_, i) => 1990 + i).map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                    );
                  }
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

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
          data-testid="button-clear"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'transparent',
            border: '1px solid rgba(148, 163, 184, 0.3)',
            borderRadius: '8px',
            color: '#94a3b8',
            fontSize: '0.875rem',
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.borderColor = '#3b82f6';
            (e.target as HTMLButtonElement).style.color = '#f8fafc';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.borderColor = 'rgba(148, 163, 184, 0.3)';
            (e.target as HTMLButtonElement).style.color = '#94a3b8';
          }}
        >
          <X style={{ width: '16px', height: '16px' }} />
          Clear
        </button>
        <button
          onClick={handleApply}
          data-testid="button-apply"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#3b82f6',
            border: 'none',
            borderRadius: '8px',
            color: '#ffffff',
            fontSize: '0.875rem',
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#2563eb'}
          onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#3b82f6'}
        >
          <Search style={{ width: '16px', height: '16px' }} />
          Apply Filters
        </button>
      </div>
    </div>
  );
}