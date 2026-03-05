import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { FileBarChart, Users, Building2, Download, TrendingUp, BarChart3 } from "lucide-react";
import { chartData, investmentByEmirate } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const tooltipStyle = { backgroundColor: "#fff", border: "1px solid hsl(220,13%,91%)", borderRadius: "8px", color: "hsl(220,20%,15%)" };
const PIE_COLORS = ["hsl(215,75%,50%)", "hsl(160,60%,45%)", "hsl(35,90%,55%)", "hsl(199,89%,48%)", "hsl(280,60%,55%)", "hsl(340,65%,50%)", "hsl(50,80%,50%)"];

const reportTypes = [
  { title: "Financial Report", description: "Revenue, expenses, and profit analysis across all properties", icon: FileBarChart, color: "text-primary" },
  { title: "Property Performance", description: "Occupancy rates, valuation changes, and investment returns", icon: Building2, color: "text-emerald-600" },
  { title: "User Activity", description: "User engagement, registration trends, and KYC completion rates", icon: Users, color: "text-sky-600" },
];

const kpiCards = [
  { title: "Total Users", value: "1,240", icon: Users, bg: "bg-blue-50" },
  { title: "Total Revenue", value: "AED 5.8M", icon: TrendingUp, bg: "bg-emerald-50" },
  { title: "Properties Listed", value: "45", icon: Building2, bg: "bg-amber-50" },
  { title: "Conversion Rate", value: "12.4%", icon: BarChart3, bg: "bg-sky-50" },
];

export default function Analytics() {
  const { toast } = useToast();

  const handleGenerateReport = (title: string) => {
    const csvContent = `Report: ${title}\nGenerated: ${new Date().toISOString()}\nStatus: Generated Successfully\n\nMonth,Revenue (AED)\n${chartData.revenue.map(r => `${r.month},${r.revenue}`).join("\n")}`;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/\s+/g, "_").toLowerCase()}_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Report Generated", description: `${title} has been downloaded.` });
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map(kpi => (
          <Card key={kpi.title} className={`${kpi.bg} border-border`}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{kpi.title}</span>
                <div className="w-9 h-9 rounded-lg bg-white/70 flex items-center justify-center">
                  <kpi.icon className="w-4 h-4 text-primary" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardHeader><CardTitle className="text-base">User Engagement</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData.userEngagement}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
                <XAxis dataKey="month" stroke="hsl(220,10%,46%)" fontSize={12} />
                <YAxis stroke="hsl(220,10%,46%)" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="activeUsers" stroke="hsl(215,75%,50%)" fill="hsl(215,75%,50%)" fillOpacity={0.15} strokeWidth={2} name="Active Users" />
                <Area type="monotone" dataKey="newUsers" stroke="hsl(199,89%,48%)" fill="hsl(199,89%,48%)" fillOpacity={0.15} strokeWidth={2} name="New Users" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader><CardTitle className="text-base">Property Views</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData.propertyViews}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
                <XAxis dataKey="property" stroke="hsl(220,10%,46%)" fontSize={11} />
                <YAxis stroke="hsl(220,10%,46%)" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="views" fill="hsl(215,75%,50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardHeader><CardTitle className="text-base">Revenue Trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={chartData.revenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
                <XAxis dataKey="month" stroke="hsl(220,10%,46%)" fontSize={12} />
                <YAxis stroke="hsl(220,10%,46%)" fontSize={12} tickFormatter={(v) => `AED ${(v / 1000000).toFixed(1)}M`} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`AED ${(v / 1000000).toFixed(1)}M`, "Revenue"]} />
                <Line type="monotone" dataKey="revenue" stroke="hsl(160,60%,45%)" strokeWidth={2} dot={{ fill: "hsl(160,60%,45%)", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader><CardTitle className="text-base">Investment Distribution by Emirate</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={investmentByEmirate} cx="50%" cy="50%" outerRadius={100} dataKey="value" nameKey="emirate" label={({ emirate, percent }) => `${emirate} ${(percent * 100).toFixed(0)}%`} fontSize={11}>
                  {investmentByEmirate.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`AED ${(v / 1000000).toFixed(1)}M`, "Investment"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Reports Section */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reportTypes.map(r => (
            <Card key={r.title} className="bg-card border-border">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center"><r.icon className={`w-5 h-5 ${r.color}`} /></div>
                  <CardTitle className="text-base">{r.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{r.description}</p>
                <Button variant="outline" size="sm" className="w-full" onClick={() => handleGenerateReport(r.title)}><Download className="w-4 h-4 mr-1" />Generate Report</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
