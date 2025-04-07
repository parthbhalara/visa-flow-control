
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TravelerDetails as TravelerDetailsType, RequiredDocument } from "@/types/visaTypes";
import { User, Upload, Clock, AlertCircle, Check, X, FilePlus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

interface TravelerDetailsProps {
  travelerDetails: TravelerDetailsType;
}

const TravelerDetails = ({ travelerDetails }: TravelerDetailsProps) => {
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [documents, setDocuments] = useState<RequiredDocument[]>(
    travelerDetails.requiredDocuments || []
  );

  const handleNoteChange = (id: string, note: string) => {
    setNotes({ ...notes, [id]: note });
  };

  const handleUploadDocument = (id: string) => {
    alert(`Upload document for ${id}`);
    // In a real app, this would open a file picker
    
    // Update the document status
    setDocuments(
      documents.map((doc) =>
        doc.id === id
          ? { ...doc, status: 'uploaded', notes: notes[id] || doc.notes }
          : doc
      )
    );
  };

  const handleUpdateStatus = (id: string, status: 'approved' | 'rejected') => {
    setDocuments(
      documents.map((doc) =>
        doc.id === id
          ? { ...doc, status, notes: notes[id] || doc.notes }
          : doc
      )
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'uploaded':
        return <Badge className="bg-blue-500">Uploaded</Badge>;
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      {/* Traveler Personal Information */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-4">Traveler Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Full Name:</span>
                <span>{travelerDetails.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date of Birth:</span>
                <span>{formatDate(travelerDetails.dateOfBirth)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span>{travelerDetails.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span>{travelerDetails.phoneNumber}</span>
              </div>
              {travelerDetails.occupation && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Occupation:</span>
                  <span>{travelerDetails.occupation}</span>
                </div>
              )}
              {travelerDetails.employer && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Employer:</span>
                  <span>{travelerDetails.employer}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Passport Number:</span>
                <span>{travelerDetails.passportNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Passport Issue Date:</span>
                <span>{formatDate(travelerDetails.passportIssueDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Passport Expiry Date:</span>
                <span>{formatDate(travelerDetails.passportExpiryDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Address:</span>
                <span>{travelerDetails.address}</span>
              </div>
              
              {/* Display additional info if available */}
              {travelerDetails.additionalInfo && Object.entries(travelerDetails.additionalInfo).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-muted-foreground">{key.split(/(?=[A-Z])/).join(' ').replace(/^\w/, c => c.toUpperCase())}:</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Required Documents Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Required Documents</h3>
          <Button variant="outline">
            <FilePlus className="mr-2 h-4 w-4" />
            Add Custom Document
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24">
                      No required documents specified for this application.
                    </TableCell>
                  </TableRow>
                ) : (
                  documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.name}</TableCell>
                      <TableCell>{doc.description || "N/A"}</TableCell>
                      <TableCell>{getStatusBadge(doc.status)}</TableCell>
                      <TableCell>
                        <Textarea
                          placeholder="Add notes for this document"
                          value={notes[doc.id] || doc.notes || ""}
                          onChange={(e) => handleNoteChange(doc.id, e.target.value)}
                          className="min-h-[60px] text-sm"
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          {doc.status === 'pending' && (
                            <Button variant="outline" size="sm" onClick={() => handleUploadDocument(doc.id)}>
                              <Upload className="h-4 w-4 mr-1" />
                              Upload
                            </Button>
                          )}
                          
                          {doc.status === 'uploaded' && (
                            <>
                              <Button variant="outline" size="sm" className="bg-green-50 text-green-600 hover:bg-green-100" 
                                onClick={() => handleUpdateStatus(doc.id, 'approved')}>
                                <Check className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button variant="outline" size="sm" className="bg-red-50 text-red-600 hover:bg-red-100"
                                onClick={() => handleUpdateStatus(doc.id, 'rejected')}>
                                <X className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          
                          {(doc.status === 'approved' || doc.status === 'rejected') && (
                            <Button variant="outline" size="sm" onClick={() => handleUpdateStatus(doc.id, 'pending')}>
                              <Clock className="h-4 w-4 mr-1" />
                              Reset
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TravelerDetails;
