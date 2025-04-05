
import { AdminUser, DashboardMetrics, VisaApplication } from "../types/visaTypes";

// Mock applications data
export const mockApplications: VisaApplication[] = [
  {
    id: "APP-2025-001",
    applicantName: "John Smith",
    nationality: "United Kingdom",
    visaType: "tourist",
    processingSpeed: "standard",
    dateSubmitted: "2025-04-01T08:30:00Z",
    status: "pending",
    priority: false,
    destinationCountry: "United States",
    travelDate: "2025-06-15T00:00:00Z",
    stayDuration: 14,
    contactEmail: "john.smith@example.com",
    contactPhone: "+44 7700 900123",
    lastUpdated: "2025-04-01T08:30:00Z"
  },
  {
    id: "APP-2025-002",
    applicantName: "Maria Garcia",
    nationality: "Spain",
    visaType: "business",
    processingSpeed: "express",
    dateSubmitted: "2025-04-02T10:15:00Z",
    status: "documents_required",
    priority: true,
    destinationCountry: "Japan",
    travelDate: "2025-05-20T00:00:00Z",
    stayDuration: 7,
    contactEmail: "maria.garcia@example.com",
    contactPhone: "+34 612 345 678",
    assignedTo: "admin1",
    lastUpdated: "2025-04-03T14:25:00Z"
  },
  {
    id: "APP-2025-003",
    applicantName: "Ahmed Khan",
    nationality: "Pakistan",
    visaType: "student",
    processingSpeed: "standard",
    dateSubmitted: "2025-04-01T12:45:00Z",
    status: "payment_required",
    priority: false,
    destinationCountry: "Canada",
    travelDate: "2025-08-25T00:00:00Z",
    stayDuration: 365,
    contactEmail: "ahmed.khan@example.com",
    contactPhone: "+92 321 1234567",
    assignedTo: "admin2",
    lastUpdated: "2025-04-02T09:10:00Z"
  },
  {
    id: "APP-2025-004",
    applicantName: "Yuki Tanaka",
    nationality: "Japan",
    visaType: "work",
    processingSpeed: "super_express",
    dateSubmitted: "2025-04-03T09:30:00Z",
    status: "processing",
    priority: true,
    destinationCountry: "Australia",
    travelDate: "2025-05-10T00:00:00Z",
    stayDuration: 90,
    contactEmail: "yuki.tanaka@example.com",
    contactPhone: "+81 90 1234 5678",
    assignedTo: "admin3",
    lastUpdated: "2025-04-04T11:20:00Z"
  },
  {
    id: "APP-2025-005",
    applicantName: "Sophia Chen",
    nationality: "China",
    visaType: "tourist",
    processingSpeed: "standard",
    dateSubmitted: "2025-04-02T14:20:00Z",
    status: "approved",
    priority: false,
    destinationCountry: "France",
    travelDate: "2025-06-05T00:00:00Z",
    stayDuration: 30,
    contactEmail: "sophia.chen@example.com",
    contactPhone: "+86 131 2345 6789",
    assignedTo: "admin1",
    lastUpdated: "2025-04-05T10:15:00Z"
  },
  {
    id: "APP-2025-006",
    applicantName: "Carlos Rodriguez",
    nationality: "Mexico",
    visaType: "business",
    processingSpeed: "express",
    dateSubmitted: "2025-04-01T16:45:00Z",
    status: "rejected",
    priority: false,
    destinationCountry: "Germany",
    travelDate: "2025-05-01T00:00:00Z",
    stayDuration: 10,
    contactEmail: "carlos.rodriguez@example.com",
    contactPhone: "+52 55 1234 5678",
    assignedTo: "admin2",
    lastUpdated: "2025-04-04T08:30:00Z"
  },
  {
    id: "APP-2025-007",
    applicantName: "Aarav Patel",
    nationality: "India",
    visaType: "work",
    processingSpeed: "standard",
    dateSubmitted: "2025-04-03T11:10:00Z",
    status: "pending",
    priority: false,
    destinationCountry: "United Kingdom",
    travelDate: "2025-07-15T00:00:00Z",
    stayDuration: 180,
    contactEmail: "aarav.patel@example.com",
    contactPhone: "+91 98765 43210",
    lastUpdated: "2025-04-03T11:10:00Z"
  },
  {
    id: "APP-2025-008",
    applicantName: "Emma Johnson",
    nationality: "United States",
    visaType: "transit",
    processingSpeed: "express",
    dateSubmitted: "2025-04-04T13:25:00Z",
    status: "processing",
    priority: false,
    destinationCountry: "Singapore",
    travelDate: "2025-05-05T00:00:00Z",
    stayDuration: 3,
    contactEmail: "emma.johnson@example.com",
    contactPhone: "+1 415 555 0123",
    assignedTo: "admin3",
    lastUpdated: "2025-04-05T09:45:00Z"
  }
];

// Mock admin users
export const mockAdmins: AdminUser[] = [
  {
    id: "admin1",
    name: "Alex Williams",
    email: "alex.williams@visaflow.example",
    role: "admin",
    lastActive: "2025-04-05T09:30:00Z"
  },
  {
    id: "admin2",
    name: "Jordan Taylor",
    email: "jordan.taylor@visaflow.example",
    role: "supervisor",
    lastActive: "2025-04-05T10:15:00Z"
  },
  {
    id: "admin3",
    name: "Sam Johnson",
    email: "sam.johnson@visaflow.example",
    role: "agent",
    lastActive: "2025-04-05T08:45:00Z"
  }
];

// Mock dashboard metrics
export const mockDashboardMetrics: DashboardMetrics = {
  pendingApplications: 43,
  requireAttention: 12,
  completedToday: 8,
  approvalRate: 86
};

// Helper function to get status label
export const getStatusLabel = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: "Pending Review",
    documents_required: "Documents Required",
    payment_required: "Payment Required",
    processing: "In Processing",
    approved: "Approved",
    rejected: "Rejected"
  };
  
  return statusMap[status] || status;
};

// Helper function to get status color
export const getStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    pending: "bg-blue-100 text-blue-800",
    documents_required: "bg-orange-100 text-orange-800",
    payment_required: "bg-purple-100 text-purple-800",
    processing: "bg-indigo-100 text-indigo-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800"
  };
  
  return colorMap[status] || "bg-gray-100 text-gray-800";
};

// Helper function to get visa type label
export const getVisaTypeLabel = (type: string): string => {
  const typeMap: Record<string, string> = {
    tourist: "Tourist",
    business: "Business",
    student: "Student",
    work: "Work",
    transit: "Transit",
    diplomatic: "Diplomatic"
  };
  
  return typeMap[type] || type;
};

// Helper function to format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
