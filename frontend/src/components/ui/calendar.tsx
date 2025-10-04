import * as React from "react"
import { cn } from "@/lib/utils"

interface CalendarProps {
  mode?: "single" | "range"
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  initialFocus?: boolean
  className?: string
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ className, mode = "single", selected, onSelect, initialFocus, ...props }, ref) => {
    const [currentDate, setCurrentDate] = React.useState(selected || new Date())
    
    React.useEffect(() => {
      if (selected) {
        setCurrentDate(selected)
      }
    }, [selected])

    const handleDateClick = (day: number) => {
      const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      setCurrentDate(newDate)
      onSelect?.(newDate)
    }

    const goToPreviousMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
    }

    const goToNextMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
    }

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i)

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-md border bg-card text-card-foreground shadow-sm p-4",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-accent rounded-md"
          >
            ←
          </button>
          <h3 className="font-semibold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-accent rounded-md"
          >
            →
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`} className="p-2" />
          ))}
          {days.map((day) => (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              className={cn(
                "p-2 text-center hover:bg-accent rounded-md",
                selected && selected.getDate() === day && selected.getMonth() === currentDate.getMonth() && selected.getFullYear() === currentDate.getFullYear()
                  ? "bg-primary text-primary-foreground"
                  : ""
              )}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    )
  }
)
Calendar.displayName = "Calendar"

export { Calendar }
