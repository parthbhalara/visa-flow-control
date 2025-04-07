
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Calendar, User, Flag, MapPin, Clock, CreditCard } from "lucide-react";
import { VisaApplication } from "@/types/visaTypes";

interface ApplicationSummaryProps {
  application: VisaApplication;
}

const ApplicationSummary = ({ application }: ApplicationSummaryProps) => {
  // Format dates for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  // Format travel dates range
  const formatTravelDates = () => {
    if (application.travelDate && application.travelDateEnd) {
      return `${formatDate(application.travelDate)} - ${formatDate(application.travelDateEnd)}`;
    } else if (application.travelDate) {
      return formatDate(application.travelDate);
    }
    return "Not specified";
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Basic Information */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">Basic Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Application ID:</span>
                <span className="font-medium">{application.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date Submitted:</span>
                <span>{formatDate(application.dateSubmitted)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Visa Type:</span>
                <span>{application.visaType.charAt(0).toUpperCase() + application.visaType.slice(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Processing Speed:</span>
                <span>{application.processingSpeed.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge className={getStatusColor(application.status)}>
                  {getStatusLabel(application.status)}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated:</span>
                <span>{formatDate(application.lastUpdated)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Travel Information */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">Travel Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Destination:</span>
                </div>
                <span>{application.destinationCountry}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Travel Dates:</span>
                </div>
                <span>{formatTravelDates()}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Primary Traveler:</span>
                </div>
                <span>{application.applicantName}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Nationality:</span>
                </div>
                <span>{application.nationality}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Flag className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Purpose:</span>
                </div>
                <span>{application.purpose || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Number of Travelers:</span>
                </div>
                <span>{application.travelers || 1}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Information */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-4">Payment Information</h3>
          
          <div className="flex items-center mb-4">
            <CreditCard className="h-5 w-5 mr-2" />
            <span className="text-lg">Payment Status: </span>
            <Badge className={getPaymentStatusColor(application.payment?.status || 'pending')} className="ml-2">
              {application.payment?.status === 'completed' ? 'Paid' : 'Payment Pending'}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Visa Fee:</span>
                <span>${application.payment?.visaFee.toFixed(2) || "0.00"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service Fee:</span>
                <span>${application.payment?.serviceFee.toFixed(2) || "0.00"}</span>
              </div>
              {application.payment?.couponDiscount && application.payment.couponDiscount > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Coupon Discount:</span>
                  <span className="text-green-500">-${application.payment.couponDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>Total Amount:</span>
                <span>${application.payment?.totalAmount.toFixed(2) || "0.00"}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              {application.payment?.transactionId && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaction ID:</span>
                  <span>{application.payment.transactionId}</span>
                </div>
              )}
              {application.payment?.paymentDate && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Date:</span>
                  <span>{formatDate(application.payment.paymentDate)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method:</span>
                <span>{application.payment?.status === 'completed' ? 'Credit Card' : 'Not Paid'}</span>
              </div>
            </div>
          </div>
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

// Helper function to get status color
const getStatusColor = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500 hover:bg-yellow-600';
    case 'documents_required':
      return 'bg-orange-500 hover:bg-orange-600';
    case 'payment_required':
      return 'bg-blue-500 hover:bg-blue-600';
    case 'processing':
      return 'bg-purple-500 hover:bg-purple-600';
    case 'approved':
      return 'bg-green-500 hover:bg-green-600';
    case 'rejected':
      return 'bg-red-500 hover:bg-red-600';
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
};

// Helper function to get payment status color
const getPaymentStatusColor = (status: string): string => {
  switch (status) {
    case 'completed':
      return 'bg-green-500 hover:bg-green-600';
    case 'pending':
      return 'bg-yellow-500 hover:bg-yellow-600';
    case 'failed':
      return 'bg-red-500 hover:bg-red-600';
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
};

export default ApplicationSummary;
