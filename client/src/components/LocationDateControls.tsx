import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, MapPin, Search, X } from "lucide-react";
import { format } from "date-fns";
import { MOCK_LOCATIONS } from "@/lib/mockWeatherData";

interface LocationDateControlsProps {
  onApply: (location: string, startDate: Date, endDate: Date) => void;
}

export default function LocationDateControls({ onApply }: LocationDateControlsProps) {
  const [location, setLocation] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date(2024, 0, 1));
  const [endDate, setEndDate] = useState<Date>(new Date(2024, 11, 31));

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

  const setQuickRange = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2 relative">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
              <Input
                id="location"
                data-testid="input-location"
                placeholder="Search location..."
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="pl-10"
              />
            </div>
            {showSuggestions && filteredLocations.length > 0 && (
              <Card className="absolute z-50 w-full mt-1 shadow-lg">
                <CardContent className="p-2">
                  {filteredLocations.map((loc, idx) => (
                    <button
                      key={idx}
                      data-testid={`suggestion-${idx}`}
                      className="w-full text-left px-3 py-2 text-sm rounded-md hover-elevate active-elevate-2"
                      onClick={() => {
                        setLocation(loc.name);
                        setShowSuggestions(false);
                      }}
                    >
                      <div className="font-medium">{loc.name}</div>
                      <div className="text-xs text-muted-foreground font-mono">{loc.coordinates}</div>
                    </button>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-2">
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  data-testid="button-start-date"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(startDate, "MMM dd, yyyy")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => date && setStartDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  data-testid="button-end-date"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(endDate, "MMM dd, yyyy")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={(date) => date && setEndDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Quick Select</Label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuickRange(7)}
                data-testid="button-quick-7days"
                className="flex-1"
              >
                7D
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuickRange(30)}
                data-testid="button-quick-30days"
                className="flex-1"
              >
                30D
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuickRange(365)}
                data-testid="button-quick-1year"
                className="flex-1"
              >
                1Y
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6 justify-end">
          <Button
            variant="outline"
            onClick={handleClear}
            data-testid="button-clear"
          >
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
          <Button
            onClick={handleApply}
            data-testid="button-apply"
          >
            <Search className="h-4 w-4 mr-2" />
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
