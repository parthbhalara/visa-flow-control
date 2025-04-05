
// Visa application types
export type VisaStatus = 
  | 'pending' 
  | 'documents_required' 
  | 'payment_required' 
  | 'processing' 
  | 'approved' 
  | 'rejected';

export type VisaType = 
  | 'tourist' 
  | 'business' 
  | 'student' 
  | 'work' 
  | 'transit' 
  | 'diplomatic';

export type ProcessingSpeed = 
  | 'standard' 
  | 'express' 
  | 'super_express';

export interface VisaApplication {
  id: string;
  applicantName: string;
  nationality: string;
  visaType: VisaType;
  processingSpeed: ProcessingSpeed;
  dateSubmitted: string;
  status: VisaStatus;
  priority: boolean;
  destinationCountry: string;
  travelDate?: string;
  stayDuration?: number;
  contactEmail: string;
  contactPhone?: string;
  assignedTo?: string;
  lastUpdated: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'supervisor' | 'agent';
  lastActive?: string;
}

export interface DashboardMetrics {
  pendingApplications: number;
  requireAttention: number;
  completedToday: number;
  approvalRate: number;
}
