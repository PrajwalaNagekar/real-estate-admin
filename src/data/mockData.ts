// ===== SHARED MOCK DATA (UAE Context) =====

export const users = [
  { id: "USR001", name: "Ahmed Al Maktoum", email: "ahmed@oneproperty.ae", role: "Investor", status: "Active", joinDate: "2024-01-15", avatar: "AM", phone: "+971 50 123 4567" },
  { id: "USR002", name: "Fatima Al Nahyan", email: "fatima@oneproperty.ae", role: "Property Owner", status: "Active", joinDate: "2024-02-20", avatar: "FA", phone: "+971 55 234 5678" },
  { id: "USR003", name: "Omar Hassan", email: "omar@oneproperty.ae", role: "Investor", status: "Pending", joinDate: "2024-03-10", avatar: "OH", phone: "+971 52 345 6789" },
  { id: "USR004", name: "Layla Khalifa", email: "layla@oneproperty.ae", role: "Admin", status: "Active", joinDate: "2023-11-05", avatar: "LK", phone: "+971 56 456 7890" },
  { id: "USR005", name: "Khalid Al Qasimi", email: "khalid@oneproperty.ae", role: "Investor", status: "Active", joinDate: "2024-04-01", avatar: "KQ", phone: "+971 54 567 8901" },
  { id: "USR006", name: "Mariam Al Suwaidi", email: "mariam@oneproperty.ae", role: "Property Owner", status: "Suspended", joinDate: "2024-01-22", avatar: "MS", phone: "+971 58 678 9012" },
  { id: "USR007", name: "Rashid Al Falasi", email: "rashid@oneproperty.ae", role: "Investor", status: "Active", joinDate: "2024-05-15", avatar: "RF", phone: "+971 50 789 0123" },
  { id: "USR008", name: "Noura Al Shamsi", email: "noura@oneproperty.ae", role: "Agent", status: "Active", joinDate: "2024-02-10", avatar: "NS", phone: "+971 55 890 1234" },
];

export const properties = [
  { id: "PROP001", name: "Dubai Marina Luxury Apartment", location: "Dubai", value: 12500000, ownershipSold: 72, occupancy: 95, status: "Active", image: "/placeholder.svg", fractions: 100, pricePerFraction: 125000, type: "Residential" },
  { id: "PROP002", name: "Palm Jumeirah Villa", location: "Dubai", value: 28000000, ownershipSold: 85, occupancy: 88, status: "Active", image: "/placeholder.svg", fractions: 80, pricePerFraction: 350000, type: "Residential" },
  { id: "PROP003", name: "Saadiyat Island Residence", location: "Abu Dhabi", value: 18000000, ownershipSold: 60, occupancy: 78, status: "Active", image: "/placeholder.svg", fractions: 70, pricePerFraction: 257143, type: "Residential" },
  { id: "PROP004", name: "DIFC Tower Suite", location: "Dubai", value: 35000000, ownershipSold: 45, occupancy: 100, status: "Coming Soon", image: "/placeholder.svg", fractions: 200, pricePerFraction: 175000, type: "Commercial" },
  { id: "PROP005", name: "Sharjah Waterfront Apartment", location: "Sharjah", value: 5200000, ownershipSold: 90, occupancy: 92, status: "Active", image: "/placeholder.svg", fractions: 120, pricePerFraction: 43333, type: "Residential" },
  { id: "PROP006", name: "Ajman Corniche Studio", location: "Ajman", value: 1800000, ownershipSold: 55, occupancy: 82, status: "Active", image: "/placeholder.svg", fractions: 150, pricePerFraction: 12000, type: "Residential" },
  { id: "PROP007", name: "Ras Al Khaimah Beach Resort", location: "Ras Al Khaimah", value: 22000000, ownershipSold: 68, occupancy: 90, status: "Active", image: "/placeholder.svg", fractions: 110, pricePerFraction: 200000, type: "Hospitality" },
  { id: "PROP008", name: "Fujairah Mountain View Villa", location: "Fujairah", value: 8500000, ownershipSold: 40, occupancy: 75, status: "Active", image: "/placeholder.svg", fractions: 100, pricePerFraction: 85000, type: "Residential" },
  { id: "PROP009", name: "Umm Al Quwain Marina Flat", location: "Umm Al Quwain", value: 2200000, ownershipSold: 35, occupancy: 70, status: "Coming Soon", image: "/placeholder.svg", fractions: 80, pricePerFraction: 27500, type: "Residential" },
];

export const kycSubmissions = [
  { id: "KYC001", userId: "USR003", userName: "Omar Hassan", documentType: "Emirates ID", submittedDate: "2024-06-01", status: "Pending", notes: "" },
  { id: "KYC002", userId: "USR005", userName: "Khalid Al Qasimi", documentType: "UAE Passport", submittedDate: "2024-05-28", status: "In Review", notes: "Verifying address" },
  { id: "KYC003", userId: "USR001", userName: "Ahmed Al Maktoum", documentType: "UAE Residence Visa", submittedDate: "2024-05-15", status: "Approved", notes: "" },
  { id: "KYC004", userId: "USR006", userName: "Mariam Al Suwaidi", documentType: "Trade License", submittedDate: "2024-06-02", status: "Rejected", notes: "Document expired" },
  { id: "KYC005", userId: "USR007", userName: "Rashid Al Falasi", documentType: "Emirates ID", submittedDate: "2024-06-03", status: "Pending", notes: "" },
];

export const transactions = [
  { id: "TXN001", userId: "USR001", userName: "Ahmed Al Maktoum", type: "Buy", amount: 375000, propertyName: "Dubai Marina Luxury Apartment", date: "2024-06-01", status: "Completed" },
  { id: "TXN002", userId: "USR005", userName: "Khalid Al Qasimi", type: "Buy", amount: 700000, propertyName: "Palm Jumeirah Villa", date: "2024-05-30", status: "Completed" },
  { id: "TXN003", userId: "USR007", userName: "Rashid Al Falasi", type: "Sell", amount: 257143, propertyName: "Saadiyat Island Residence", date: "2024-05-28", status: "Processing" },
  { id: "TXN004", userId: "USR001", userName: "Ahmed Al Maktoum", type: "Dividend", amount: 12000, propertyName: "Dubai Marina Luxury Apartment", date: "2024-05-25", status: "Completed" },
  { id: "TXN005", userId: "USR002", userName: "Fatima Al Nahyan", type: "Buy", amount: 525000, propertyName: "DIFC Tower Suite", date: "2024-06-02", status: "Pending" },
  { id: "TXN006", userId: "USR005", userName: "Khalid Al Qasimi", type: "Dividend", amount: 8500, propertyName: "Palm Jumeirah Villa", date: "2024-05-20", status: "Completed" },
];

export const leads = [
  { id: "LEAD001", name: "Sultan Al Mansoori", email: "sultan@email.ae", interest: "Dubai Marina Luxury Apartment", source: "Website", status: "New", date: "2024-06-03" },
  { id: "LEAD002", name: "Hessa Al Dhaheri", email: "hessa@email.ae", interest: "DIFC Tower Suite", source: "Referral", status: "Contacted", date: "2024-06-02" },
  { id: "LEAD003", name: "Yousuf Al Ketbi", email: "yousuf@email.ae", interest: "Palm Jumeirah Villa", source: "Social Media", status: "Qualified", date: "2024-06-01" },
  { id: "LEAD004", name: "Moza Al Mazrouei", email: "moza@email.ae", interest: "Sharjah Waterfront Apartment", source: "Website", status: "Negotiating", date: "2024-05-30" },
  { id: "LEAD005", name: "Hamdan Al Nuaimi", email: "hamdan@email.ae", interest: "Ras Al Khaimah Beach Resort", source: "Event", status: "New", date: "2024-06-03" },
];

export const agents = [
  { id: "AGT001", name: "Noura Al Shamsi", photo: "NS", propertiesManaged: 8, rating: 4.8, commission: 125000, email: "noura@oneproperty.ae", phone: "+971 55 890 1234", status: "Active" },
  { id: "AGT002", name: "Saeed Al Tayer", photo: "ST", propertiesManaged: 12, rating: 4.6, commission: 198000, email: "saeed@oneproperty.ae", phone: "+971 50 901 2345", status: "Active" },
  { id: "AGT003", name: "Amna Al Habtoor", photo: "AH", propertiesManaged: 6, rating: 4.9, commission: 89000, email: "amna@oneproperty.ae", phone: "+971 52 012 3456", status: "Active" },
  { id: "AGT004", name: "Majid Al Futtaim", photo: "MF", propertiesManaged: 10, rating: 4.5, commission: 156000, email: "majid@oneproperty.ae", phone: "+971 56 123 4567", status: "On Leave" },
];

export const maintenanceRequests = [
  { id: "MNT001", property: "Dubai Marina Luxury Apartment", unit: "Apt 1204", issue: "AC not cooling", priority: "High", status: "Open", date: "2024-06-03", assignedTo: "EmiratesCool AC Services" },
  { id: "MNT002", property: "Palm Jumeirah Villa", unit: "Villa 8", issue: "Water leak in bathroom", priority: "High", status: "In Progress", date: "2024-06-02", assignedTo: "DubaiPlumb Solutions" },
  { id: "MNT003", property: "Saadiyat Island Residence", unit: "Suite 501", issue: "Elevator maintenance", priority: "Medium", status: "Scheduled", date: "2024-06-01", assignedTo: "LiftPro UAE" },
  { id: "MNT004", property: "Ajman Corniche Studio", unit: "Studio 3", issue: "Paint touch-up needed", priority: "Low", status: "Open", date: "2024-05-30", assignedTo: "" },
  { id: "MNT005", property: "Dubai Marina Luxury Apartment", unit: "Apt 806", issue: "Broken window latch", priority: "Medium", status: "Completed", date: "2024-05-28", assignedTo: "GlassFix Dubai" },
];

export const documents = [
  { id: "DOC001", name: "Dubai Marina Apartment - Sale Agreement", type: "Contract", property: "Dubai Marina Luxury Apartment", uploadDate: "2024-05-15", status: "Active", size: "2.4 MB" },
  { id: "DOC002", name: "Palm Jumeirah Villa - Title Deed", type: "Deed", property: "Palm Jumeirah Villa", uploadDate: "2024-04-20", status: "Active", size: "1.8 MB" },
  { id: "DOC003", name: "Q1 2024 Financial Report", type: "Report", property: "All Properties", uploadDate: "2024-04-01", status: "Active", size: "5.2 MB" },
  { id: "DOC004", name: "DIFC Tower Suite - Inspection Report", type: "Report", property: "DIFC Tower Suite", uploadDate: "2024-06-01", status: "Draft", size: "3.1 MB" },
  { id: "DOC005", name: "Saadiyat Island Residence - Lease Agreement", type: "Contract", property: "Saadiyat Island Residence", uploadDate: "2024-03-10", status: "Expired", size: "2.0 MB" },
];

export const announcements = [
  { id: "ANN001", title: "Platform Maintenance Scheduled", message: "The platform will undergo maintenance on June 10th from 2 AM to 6 AM GST.", date: "2024-06-03", audience: "All Users", status: "Active" },
  { id: "ANN002", title: "New Property Listed: DIFC Tower Suite", message: "Exciting new investment opportunity! DIFC Tower Suite in Dubai is now available for fractional ownership.", date: "2024-06-01", audience: "Investors", status: "Active" },
  { id: "ANN003", title: "Dividend Payout Complete", message: "Q1 2024 dividend payouts have been processed for all eligible investors.", date: "2024-05-25", audience: "Investors", status: "Archived" },
];

export const supportTickets = [
  { id: "TKT001", userId: "USR001", userName: "Ahmed Al Maktoum", subject: "Cannot access investment dashboard", priority: "High", status: "Open", date: "2024-06-03", category: "Technical" },
  { id: "TKT002", userId: "USR003", userName: "Omar Hassan", subject: "KYC verification taking too long", priority: "Medium", status: "In Progress", date: "2024-06-02", category: "KYC" },
  { id: "TKT003", userId: "USR005", userName: "Khalid Al Qasimi", subject: "Dividend payment not received", priority: "High", status: "Open", date: "2024-06-01", category: "Financial" },
  { id: "TKT004", userId: "USR007", userName: "Rashid Al Falasi", subject: "How to sell my fractions?", priority: "Low", status: "Resolved", date: "2024-05-28", category: "General" },
];

export const auditLogs = [
  { id: "LOG001", timestamp: "2024-06-03 14:30:22", user: "Layla Khalifa", action: "User Role Updated", details: "Changed role of USR003 from Pending to Investor", ip: "192.168.1.45", module: "User Management", severity: "Medium" },
  { id: "LOG002", timestamp: "2024-06-03 13:15:08", user: "System", action: "KYC Auto-Check", details: "Initiated automated KYC verification for KYC005 — Rashid Al Falasi", ip: "10.0.0.1", module: "KYC", severity: "Low" },
  { id: "LOG003", timestamp: "2024-06-03 11:42:33", user: "Layla Khalifa", action: "Property Published", details: "Published DIFC Tower Suite listing with AED 35M valuation", ip: "192.168.1.45", module: "Properties", severity: "High" },
  { id: "LOG004", timestamp: "2024-06-02 16:20:11", user: "Noura Al Shamsi", action: "Document Uploaded", details: "Uploaded inspection report for DIFC Tower Suite", ip: "192.168.2.30", module: "Documents", severity: "Low" },
  { id: "LOG005", timestamp: "2024-06-02 10:05:44", user: "System", action: "Dividend Processed", details: "Processed Q1 dividends for Dubai Marina investors — AED 320K distributed", ip: "10.0.0.1", module: "Financials", severity: "High" },
  { id: "LOG006", timestamp: "2024-06-01 09:30:00", user: "Layla Khalifa", action: "Settings Updated", details: "Updated platform notification settings — enabled SMS alerts", ip: "192.168.1.45", module: "Settings", severity: "Low" },
  { id: "LOG007", timestamp: "2024-06-01 08:15:30", user: "Saeed Al Tayer", action: "Lead Assigned", details: "Assigned lead LEAD003 (Yousuf Al Ketbi) to agent Amna Al Habtoor", ip: "192.168.3.12", module: "Sales & Leads", severity: "Medium" },
  { id: "LOG008", timestamp: "2024-05-31 17:45:10", user: "System", action: "Backup Completed", details: "Daily database backup completed successfully — 2.4 GB archived", ip: "10.0.0.1", module: "System", severity: "Low" },
  { id: "LOG009", timestamp: "2024-05-31 14:22:05", user: "Ahmed Al Maktoum", action: "Transaction Initiated", details: "Buy order for 3 fractions of Dubai Marina Luxury Apartment — AED 375K", ip: "103.45.67.89", module: "Transactions", severity: "High" },
  { id: "LOG010", timestamp: "2024-05-31 11:10:33", user: "System", action: "Security Alert", details: "Multiple failed login attempts detected for user USR006 — account temporarily locked", ip: "182.73.45.12", module: "Security", severity: "Critical" },
  { id: "LOG011", timestamp: "2024-05-30 16:00:00", user: "Layla Khalifa", action: "User Suspended", details: "Suspended user USR006 (Mariam Al Suwaidi) — policy violation", ip: "192.168.1.45", module: "User Management", severity: "High" },
  { id: "LOG012", timestamp: "2024-05-30 10:30:15", user: "Amna Al Habtoor", action: "Maintenance Created", details: "Created maintenance request MNT004 for Ajman Corniche Studio — paint touch-up", ip: "192.168.4.22", module: "Maintenance", severity: "Low" },
  { id: "LOG013", timestamp: "2024-05-29 09:05:00", user: "System", action: "API Rate Limit", details: "Rate limit threshold reached for payment gateway API — 500 requests/min", ip: "10.0.0.1", module: "System", severity: "Medium" },
  { id: "LOG014", timestamp: "2024-05-28 15:40:22", user: "Fatima Al Nahyan", action: "Property Updated", details: "Updated occupancy details for Palm Jumeirah Villa — 88% occupied", ip: "103.22.33.44", module: "Properties", severity: "Low" },
  { id: "LOG015", timestamp: "2024-05-28 08:20:00", user: "System", action: "Scheduled Report", details: "Weekly analytics report generated and emailed to admin team", ip: "10.0.0.1", module: "Reports", severity: "Low" },
];

export const integrations = [
  { id: "INT001", name: "Stripe Payments", description: "Payment processing for property transactions", status: "Connected", icon: "CreditCard", lastSync: "2024-06-03" },
  { id: "INT002", name: "SendGrid Email", description: "Email notifications and marketing campaigns", status: "Connected", icon: "Mail", lastSync: "2024-06-03" },
  { id: "INT003", name: "Twilio SMS", description: "SMS notifications and OTP verification", status: "Connected", icon: "MessageSquare", lastSync: "2024-06-02" },
  { id: "INT004", name: "Google Analytics", description: "Website traffic and user behavior tracking", status: "Disconnected", icon: "BarChart3", lastSync: "2024-05-15" },
  { id: "INT005", name: "UAE Pass", description: "Digital identity verification for KYC", status: "Connected", icon: "FileSignature", lastSync: "2024-06-01" },
];

export const chartData = {
  portfolioValue: [
    { month: "Jan", value: 82000000 },
    { month: "Feb", value: 91000000 },
    { month: "Mar", value: 98000000 },
    { month: "Apr", value: 105000000 },
    { month: "May", value: 112000000 },
    { month: "Jun", value: 125000000 },
  ],
  occupancyRate: [
    { name: "Occupied", value: 85 },
    { name: "Vacant", value: 15 },
  ],
  revenue: [
    { month: "Jan", revenue: 3200000 },
    { month: "Feb", revenue: 3800000 },
    { month: "Mar", revenue: 4100000 },
    { month: "Apr", revenue: 4500000 },
    { month: "May", revenue: 5200000 },
    { month: "Jun", revenue: 5800000 },
  ],
  userEngagement: [
    { month: "Jan", activeUsers: 800, newUsers: 120 },
    { month: "Feb", activeUsers: 920, newUsers: 150 },
    { month: "Mar", activeUsers: 980, newUsers: 130 },
    { month: "Apr", activeUsers: 1050, newUsers: 160 },
    { month: "May", activeUsers: 1150, newUsers: 180 },
    { month: "Jun", activeUsers: 1240, newUsers: 200 },
  ],
  propertyViews: [
    { property: "Dubai Marina", views: 18500 },
    { property: "Palm Jumeirah", views: 15200 },
    { property: "Saadiyat Island", views: 12500 },
    { property: "DIFC Tower", views: 10200 },
    { property: "Sharjah", views: 7800 },
    { property: "RAK Resort", views: 9100 },
  ],
};

export const investmentByEmirate = [
  { emirate: "Dubai", value: 78500000 },
  { emirate: "Abu Dhabi", value: 18000000 },
  { emirate: "Sharjah", value: 5200000 },
  { emirate: "Ajman", value: 1800000 },
  { emirate: "RAK", value: 22000000 },
  { emirate: "Fujairah", value: 8500000 },
  { emirate: "UAQ", value: 2200000 },
];
