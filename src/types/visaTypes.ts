
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

export type PaymentStatus = 
  | 'pending'
  | 'completed'
  | 'failed'
  | 'refunded';

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
  purpose?: string;
  plan?: string;
  travelers?: number;
  payment?: PaymentDetails;
  travelDateEnd?: string;
  documents?: Document[];
  travelerDetails?: TravelerDetails;
}

export interface PaymentDetails {
  status: PaymentStatus;
  visaFee: number;
  serviceFee: number;
  couponDiscount?: number;
  totalAmount: number;
  transactionId?: string;
  paymentDate?: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  fileSize: string;
  fileUrl: string;
}

export interface TravelerDetails {
  fullName: string;
  dateOfBirth: string;
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  address: string;
  phoneNumber: string;
  email: string;
  occupation?: string;
  employer?: string;
  additionalInfo?: Record<string, string>;
  requiredDocuments?: RequiredDocument[];
}

export interface RequiredDocument {
  id: string;
  name: string;
  description?: string;
  required: boolean;
  status: 'pending' | 'uploaded' | 'approved' | 'rejected';
  notes?: string;
  fileUrl?: string;
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
