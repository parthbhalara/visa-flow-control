import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  CalendarIcon, 
  Flag, 
  Search, 
  SlidersHorizontal,
  ArrowUpDown,
  FileText
} from "lucide-react";
import { mockApplications } from "@/data/mockData";
import { getStatusColor, getStatusLabel, getVisaTypeLabel, formatDate } from "@/data/mockData";
import { VisaApplication, VisaStatus, VisaType } from "@/types/visaTypes";

const ApplicationQueue = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<VisaStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<VisaType | "all">("all");
  const [sortField, setSortField] = useState<keyof VisaApplication>("dateSubmitted");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: keyof VisaApplication) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredApplications = useMemo(() => {
    let result = [...mockApplications];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (app) =>
          app.id.toLowerCase().includes(term) ||
          app.applicantName.toLowerCase().includes(term) ||
          app.nationality.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((app) => app.status === statusFilter);
    }

    if (typeFilter !== "all") {
      result = result.filter((app) => app.visaType === typeFilter);
    }

    result.sort((a, b) => {
      let valueA = a[sortField];
      let valueB = b[sortField];

      if (typeof valueA === "string" && typeof valueB === "string") {
        if (
          sortField === "dateSubmitted" ||
          sortField === "lastUpdated" ||
          sortField === "travelDate"
        ) {
          valueA = new Date(valueA).getTime();
          valueB = new Date(valueB).getTime();
        } else {
          valueA = valueA.toLowerCase();
          valueB = valueB.toLowerCase();
        }
      }

      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [searchTerm, statusFilter, typeFilter, sortField, sortDirection]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Application Queue</h1>
        <Button onClick={() => alert("Create new application")}>
          New Application
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Visa Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, ID, or nationality..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as VisaStatus | "all")}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="documents_required">Documents Required</SelectItem>
                  <SelectItem value="payment_required">Payment Required</SelectItem>
                  <SelectItem value="processing">In Processing</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={typeFilter}
                onValueChange={(value) => setTypeFilter(value as VisaType | "all")}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="tourist">Tourist</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="transit">Transit</SelectItem>
                  <SelectItem value="diplomatic">Diplomatic</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead 
                    className="w-[100px] cursor-pointer"
                    onClick={() => handleSort("id")}
                  >
                    <div className="flex items-center">
                      ID
                      {sortField === "id" && (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="min-w-[150px] cursor-pointer"
                    onClick={() => handleSort("applicantName")}
                  >
                    <div className="flex items-center">
                      Applicant
                      {sortField === "applicantName" && (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Nationality</TableHead>
                  <TableHead>Visa Type</TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("dateSubmitted")}
                  >
                    <div className="flex items-center">
                      Submitted
                      {sortField === "dateSubmitted" && (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center h-24">
                      No applications found matching your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell>
                        {application.priority && (
                          <Flag className="h-4 w-4 text-visa-gold-500" />
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{application.id}</TableCell>
                      <TableCell>{application.applicantName}</TableCell>
                      <TableCell>{application.nationality}</TableCell>
                      <TableCell>{getVisaTypeLabel(application.visaType)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                          <span>{formatDate(application.dateSubmitted)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(application.status)}>
                          {getStatusLabel(application.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => navigate(`/applications/${application.id}`)}
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationQueue;
