
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AlertTriangle, 
  Check, 
  ClipboardList, 
  Clock, 
  TrendingUp
} from "lucide-react";
import { mockApplications, mockDashboardMetrics } from "@/data/mockData";
import { getStatusColor, getStatusLabel, formatDate } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  // Calculate recent applications (last 7 days)
  const recentApplications = mockApplications
    .sort((a, b) => new Date(b.dateSubmitted).getTime() - new Date(a.dateSubmitted).getTime())
    .slice(0, 5);

  // Chart data - applications by status
  const chartData = [
    { name: 'Pending', value: mockApplications.filter(a => a.status === 'pending').length },
    { name: 'Documents', value: mockApplications.filter(a => a.status === 'documents_required').length },
    { name: 'Payment', value: mockApplications.filter(a => a.status === 'payment_required').length },
    { name: 'Processing', value: mockApplications.filter(a => a.status === 'processing').length },
    { name: 'Approved', value: mockApplications.filter(a => a.status === 'approved').length },
    { name: 'Rejected', value: mockApplications.filter(a => a.status === 'rejected').length },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Metrics cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Applications
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockDashboardMetrics.pendingApplications}
            </div>
            <p className="text-xs text-muted-foreground">
              +5 from yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Require Attention
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-visa-gold-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockDashboardMetrics.requireAttention}
            </div>
            <p className="text-xs text-muted-foreground">
              4 urgent cases
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Today
            </CardTitle>
            <Check className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockDashboardMetrics.completedToday}
            </div>
            <p className="text-xs text-muted-foreground">
              +3 in the last hour
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Approval Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockDashboardMetrics.approvalRate}%
            </div>
            <p className="text-xs text-muted-foreground">
              +2.5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Applications chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Applications by Status</CardTitle>
            <CardDescription>
              Current distribution of all applications
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-1">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0066FF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent applications */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>
              Latest submitted visa applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((application) => (
                <div 
                  key={application.id} 
                  className="flex items-center justify-between rounded-md border p-3"
                >
                  <div className="flex items-start gap-3">
                    <Clock className="h-9 w-9 rounded-full bg-blue-50 p-2 text-visa-blue-600" />
                    <div>
                      <div className="font-medium">{application.applicantName}</div>
                      <div className="text-sm text-muted-foreground">
                        {application.nationality} • {formatDate(application.dateSubmitted)}
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(application.status)}>
                    {getStatusLabel(application.status)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
