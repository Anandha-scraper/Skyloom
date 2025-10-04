import LocationDateControls from '../LocationDateControls';

export default function LocationDateControlsExample() {
  const handleApply = (location: string, startDate: Date, endDate: Date) => {
    console.log("Filters applied:", { location, startDate, endDate });
  };

  return (
    <div className="p-6">
      <LocationDateControls onApply={handleApply} />
    </div>
  );
}
