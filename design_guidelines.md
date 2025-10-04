# Weather Data Visualization Dashboard - Design Guidelines

## Design Approach: Data Visualization System

**Selected Approach**: Custom design system inspired by NASA's Earthdata dashboards, Observable, and Material Design's data visualization principles
**Justification**: This is a data-heavy, analytics-focused application requiring clear information hierarchy, professional scientific aesthetic, and robust data visualization components

**Key Design Principles**:
- Clarity over decoration - data is the hero
- Professional scientific aesthetic matching NASA's visual language
- Dark-first design reducing eye strain during extended analysis
- Spatial organization reflecting the scale of Earth observation data

---

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary)**:
- Background Base: 220 20% 12% (deep space blue-black)
- Surface: 220 18% 18% (elevated panels)
- Surface Elevated: 220 16% 22% (cards, modals)
- Primary: 210 90% 58% (NASA blue - data highlights, CTAs)
- Secondary: 195 80% 52% (cyan - secondary actions)
- Success/Positive: 142 76% 45% (vegetation green - positive trends)
- Warning: 38 92% 58% (solar orange - warnings)
- Error: 0 84% 60% (alert red - errors, extremes)
- Text Primary: 0 0% 95%
- Text Secondary: 220 10% 70%
- Border: 220 15% 28%

**Light Mode (Secondary)**:
- Background Base: 210 20% 98%
- Surface: 0 0% 100%
- Primary: 210 90% 48%
- Text Primary: 220 20% 15%
- Text Secondary: 220 10% 45%

**Data Visualization Colors** (accessible gradient):
- Temperature: 0 80% 60% → 210 85% 55% → 250 75% 65% (red to blue spectrum)
- Rainfall: 195 75% 45% → 170 65% 50% (cyan to teal)
- Wind: 280 60% 55% → 320 50% 60% (purple to pink)
- Humidity: 200 70% 50% → 220 60% 55% (blue variations)

### B. Typography

**Font Families**:
- Primary: Inter (Google Fonts) - UI, data labels, body text
- Data/Metrics: JetBrains Mono (Google Fonts) - numerical values, coordinates
- Headings: Inter with increased letter-spacing

**Type Scale**:
- H1 (Dashboard Title): 2rem (32px), font-weight 700, letter-spacing -0.02em
- H2 (Section Headers): 1.5rem (24px), font-weight 600
- H3 (Card Titles): 1.25rem (20px), font-weight 600
- Body: 0.938rem (15px), font-weight 400, line-height 1.6
- Small/Caption: 0.813rem (13px), font-weight 400
- Data Values: 1.125rem (18px), JetBrains Mono, font-weight 500
- Coordinates/Technical: 0.875rem (14px), JetBrains Mono

### C. Layout System

**Spacing Primitives**: Use Tailwind units 2, 4, 6, 8, 12, 16, 20 for consistency
- Micro spacing (elements): 2, 4
- Component padding: 6, 8
- Section spacing: 12, 16, 20
- Page margins: 8, 12, 16

**Grid Structure**:
- Dashboard: 12-column grid with responsive breakpoints
- Graph area: 8-column main content + 4-column controls/filters
- Login page: Centered single column, max-width 28rem

### D. Component Library

**Login Page**:
- Centered card (max-w-md) with subtle elevation (shadow-xl)
- NASA Earth observation themed background with blue-tinted gradient overlay
- Logo placement at top of card
- Input fields with clear labels, border-b style focused states
- Primary button full-width, vibrant NASA blue
- Minimal text: "NASA Earth Observation Dashboard" headline
- Mock credentials helper text below form

**Dashboard Navigation**:
- Top app bar: Logo, dashboard title, user avatar (mock), logout
- Height: 64px, background: surface color with border-b
- Sticky positioning during scroll

**Location & Date Controls Panel**:
- Horizontal layout with grouped inputs
- Location autocomplete input with dropdown (max 5 suggestions)
- Date range picker with calendar icon trigger
- Quick select buttons: "Last 7 Days", "Last Month", "Last Year", "Custom"
- Apply/Clear buttons aligned right
- Panel background: surface elevated, rounded corners, p-6

**Data Summary Cards** (4-card grid):
- Icon + metric label + large value + trend indicator
- Cards: Temperature, Rainfall, Wind Speed, Humidity
- Icons from Heroicons (cloud, water, wind, beaker)
- Background: surface color with subtle border
- Trend arrows with color coding (green up, red down)
- Compact: p-6, rounded-lg

**Graph Visualization Area**:
- Primary chart: Multi-line graph showing all metrics over time
- Tabbed interface: "Temperature", "Rainfall", "Wind", "Humidity", "Combined"
- Legend positioned top-right with toggleable data series
- Tooltip on hover showing exact values + timestamp
- Grid lines subtle (border color at 20% opacity)
- Axes labels in secondary text color
- Chart library: Chart.js or Recharts with custom theming
- Height: min-h-[500px], responsive scaling

**Secondary Visualizations**:
- Comparison view: Year-over-year area charts (2-column grid)
- Distribution: Histogram or bar chart showing data frequency
- Background: surface color, p-6, rounded-lg, gap-6

**Data Table** (optional detailed view):
- Striped rows for readability
- Sortable columns with arrow indicators
- Hover state on rows
- Pagination at bottom
- Sticky header during scroll

**Loading States**:
- Skeleton loaders matching component shapes
- Pulsing animation (subtle)
- NASA blue accent color in loading spinners

### E. Animations

**Use Very Sparingly**:
- Login transition: Fade in form (300ms)
- Graph rendering: Stagger line draw-in (600ms total, once on load)
- Data updates: Smooth value transitions (400ms)
- Dropdown/Modal: Slide down with fade (200ms)
- NO continuous animations, NO hover transforms on graphs

---

## Images

**Login Page Hero Image**:
- Full-screen background: NASA Earth observation satellite imagery (preferably showing Earth from space with weather patterns visible)
- Apply blue-tinted overlay (NASA blue at 30-40% opacity) for text legibility
- Image should convey scale and scientific precision
- Position: Background, fixed attachment for depth

**No images needed on dashboard** - data visualizations are the visual focus

---

## Additional Specifications

**Responsive Breakpoints**:
- Mobile: Single column, stacked graphs, simplified controls
- Tablet (md): 2-column summary cards, side-by-side date controls
- Desktop (lg): Full 12-column grid, optimal graph sizes

**Accessibility**:
- WCAG AA contrast ratios in dark mode
- Focus indicators on all interactive elements (ring-2 ring-primary)
- Keyboard navigation for date picker and dropdowns
- Screen reader labels for graph data points

**Hash-Based Routing States**:
- #/login (default)
- #/dashboard?location=coordinates&start=date&end=date
- Maintain state in URL for shareable analysis views