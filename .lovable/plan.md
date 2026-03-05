

# One Property — Admin Panel Prototype

## Brand & Design System
- **Dark theme** matching the Figma: deep navy background (#0B1426), cyan/teal accents (#00E5CC), white text
- Rounded cards with subtle borders, consistent with the Figma design
- "One Property" logo with the navy rounded-square icon in the header
- Admin user avatar + role display in top-right, search bar, notification bell

## Layout
- **Fixed sidebar** with all 17 navigation items and a "Sign Out" button at the bottom
- **Top header bar** with breadcrumbs, search, notifications, and admin profile
- **Main content area** that changes per section

## Pages to Build

### 1. Dashboard (matching Figma exactly)
- 4 KPI stat cards: Total Portfolio Value ($12.5M), Active Users (1,240), Listed Properties (45), Total Views (85.2K) — each with percentage change indicators
- Portfolio Value Over Time — area chart (Jan–Jun)
- Occupancy Rate — donut chart (85%)
- Recent KYC Submissions list with status badges (Pending, In Review)
- System Alerts section with alert cards

### 2. User Management
- Users table with columns: Name, Email, Role, Status, Join Date, Actions
- Search/filter bar, role filter dropdown
- Mock user data for investors and property owners

### 3. Properties
- Property listings table: Name, Location, Value, Ownership %, Occupancy, Status
- Grid/list view toggle
- Property cards showing images, price, fraction details

### 4. KYC & Verification
- KYC submissions table: User, Document Type, Submitted Date, Status
- Status badges: Pending, In Review, Approved, Rejected
- Action buttons to approve/reject

### 5. Transactions
- Transaction history table: ID, User, Type, Amount, Date, Status
- Filters for transaction type (Buy/Sell/Dividend) and date range

### 6. Financials
- Revenue overview cards (Monthly Revenue, Total Earnings, Pending Payouts)
- Revenue trend chart
- Recent payouts table

### 7. Sales & Leads
- Leads table: Name, Email, Interest, Source, Status, Date
- Lead pipeline summary cards

### 8. Agents
- Agent directory with cards: photo, name, properties managed, performance rating
- Table view with commission details

### 9. Maintenance
- Maintenance requests table: Property, Issue, Priority, Status, Date
- Priority badges (High, Medium, Low)

### 10. Documents
- Document list: Name, Type, Property, Upload Date, Status
- Category filter (Contracts, Deeds, Reports)

### 11. Announcements
- Announcement cards with title, message, date, target audience
- "Create Announcement" button

### 12. Support
- Support tickets table: ID, User, Subject, Priority, Status, Date
- Ticket status tracking

### 13. Reports
- Report generation cards for different report types (Financial, Property, User Activity)
- Date range selector

### 14. Integrations
- Integration cards showing connected services with status toggles

### 15. Audit Logs
- Activity log table: Timestamp, User, Action, Details, IP Address

### 16. Analytics
- Charts for user engagement, property views, conversion rates
- Date range filter

### 17. Settings
- General settings form (platform name, contact info)
- Tabs for Profile, Security, Notifications, Platform Config

## Data Approach
- All pages will use **static mock data** — no backend needed for this prototype
- Data will be realistic and consistent across pages (same users, properties referenced throughout)

