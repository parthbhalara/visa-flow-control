
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Download, 
  ChevronDown, 
  File,
  FileText,
  Upload,
  Save,
  Clipboard
} from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { mockApplications } from "@/data/mockData";
import { VisaApplication, Document, RequiredDocument } from "@/types/visaTypes";
import ApplicationSummary from "@/components/ApplicationSummary";
import DocumentSection from "@/components/DocumentSection";
import TravelerDetails from "@/components/TravelerDetails";

const ApplicationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [application, setApplication] = useState<VisaApplication | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    
    // Find the application in mock data
    const app = mockApplications.find(app => app.id === id);
    
    if (app) {
      // Enhance with additional details for our demo
      const enhancedApp: VisaApplication = {
        ...app,
        purpose: app.visaType === 'tourist' ? 'Tourism' : 
                app.visaType === 'business' ? 'Business' : 
                app.visaType === 'student' ? 'Study' : 'Work',
        plan: app.processingSpeed === 'standard' ? 'Standard' : 
              app.processingSpeed === 'express' ? 'Premium' : 'VIP',
        travelers: 1,
        travelDateEnd: app.travelDate ? new Date(new Date(app.travelDate).getTime() + 10 * 24 * 60 * 60 * 1000).toISOString() : undefined,
        payment: {
          status: app.status === 'payment_required' ? 'pending' : 'completed',
          visaFee: 160,
          serviceFee: 100,
          couponDiscount: app.status === 'approved' ? 25 : 0,
          totalAmount: app.status === 'approved' ? 235 : 260,
          transactionId: app.status === 'approved' ? 'TXN-' + Math.floor(Math.random() * 1000000) : undefined,
          paymentDate: app.status === 'approved' ? app.lastUpdated : undefined
        },
        documents: [
          {
            id: 'd1',
            name: 'Passport.pdf',
            type: 'PDF',
            uploadDate: app.dateSubmitted,
            fileSize: '2.3 MB',
            fileUrl: '#'
          },
          {
            id: 'd2',
            name: 'Photo.jpg',
            type: 'JPG',
            uploadDate: app.dateSubmitted,
            fileSize: '500 KB',
            fileUrl: '#'
          },
          {
            id: 'd3',
            name: 'Travel_Itinerary.pdf',
            type: 'PDF',
            uploadDate: app.dateSubmitted,
            fileSize: '1.7 MB',
            fileUrl: '#'
          }
        ],
        travelerDetails: {
          fullName: app.applicantName,
          dateOfBirth: '1990-05-15',
          passportNumber: 'A' + Math.floor(Math.random() * 10000000),
          passportIssueDate: '2019-03-10',
          passportExpiryDate: '2029-03-09',
          address: '123 Main St, City, Country',
          phoneNumber: '+1 (555) 123-4567',
          email: app.contactEmail,
          occupation: 'Software Engineer',
          employer: 'Tech Company',
          additionalInfo: {
            maritalStatus: 'Single',
            previousVisits: 'None'
          },
          requiredDocuments: [
            {
              id: 'rd1',
              name: 'Visa Application Form',
              description: 'Completed and signed',
              required: true,
              status: app.status === 'documents_required' ? 'pending' : 'approved'
            },
            {
              id: 'rd2',
              name: 'Passport Scan',
              description: 'Color scan of bio page',
              required: true,
              status: 'approved'
            },
            {
              id: 'rd3',
              name: 'Photo',
              description: '2x2 inches, white background',
              required: true,
              status: 'approved'
            },
            {
              id: 'rd4',
              name: 'Flight Reservation',
              description: 'Round trip booking',
              required: true,
              status: app.status === 'documents_required' ? 'pending' : 'approved',
              notes: app.status === 'documents_required' ? 'Please provide a confirmed booking' : undefined
            },
            {
              id: 'rd5',
              name: 'Hotel Reservation',
              description: 'For the entire stay',
              required: true,
              status: app.status === 'documents_required' ? 'pending' : 'approved'
            }
          ]
        }
      };
      
      setApplication(enhancedApp);
    }
    
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading application details...</p>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={() => navigate('/applications')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Applications
        </Button>
        <Card>
          <CardContent className="pt-6">
            <p>Application not found. The requested application may have been removed or you don't have access.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={() => navigate('/applications')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Applications
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Clipboard className="mr-2 h-4 w-4" />
            Add Note
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Application Details</CardTitle>
            <Badge className={application.priority ? "bg-visa-gold-500" : "bg-visa-blue-500"}>
              {application.priority ? "Priority" : getStatusLabel(application.status)}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <Accordion type="single" collapsible defaultValue="summary" className="w-full">
            {/* Application Summary Section */}
            <AccordionItem value="summary">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  <span className="text-lg font-medium">Application Summary</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ApplicationSummary application={application} />
              </AccordionContent>
            </AccordionItem>

            {/* Document Management Section */}
            <AccordionItem value="documents">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center">
                  <File className="mr-2 h-5 w-5" />
                  <span className="text-lg font-medium">Documents</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <DocumentSection documents={application.documents || []} />
              </AccordionContent>
            </AccordionItem>

            {/* Traveler Details Section */}
            <AccordionItem value="traveler">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center">
                  <Upload className="mr-2 h-5 w-5" />
                  <span className="text-lg font-medium">Traveler Details & Documents</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {application.travelerDetails && (
                  <TravelerDetails travelerDetails={application.travelerDetails} />
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper function to get status label
const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'Pending Review';
    case 'documents_required':
      return 'Documents Required';
    case 'payment_required':
      return 'Payment Required';
    case 'processing':
      return 'In Processing';
    case 'approved':
      return 'Approved';
    case 'rejected':
      return 'Rejected';
    default:
      return status;
  }
};

export default ApplicationDetail;
