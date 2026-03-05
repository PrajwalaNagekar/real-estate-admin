import { TrendingUp, TrendingDown, Users, Building2, Eye, Banknote, AlertTriangle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { chartData, kycSubmissions } from "@/data/mockData";

const kpiCards = [
  { title: "Total Portfolio Value", value: "AED 125M", change: "+12.5%", trend: "up", icon: Banknote, bg: "bg-blue-50" },
  { title: "Active Users", value: "1,240", change: "+8.2%", trend: "up", icon: Users, bg: "bg-emerald-50" },
  { title: "Listed Properties", value: "45", change: "+3", trend: "up", icon: Building2, bg: "bg-amber-50" },
  { title: "Total Views", value: "85.2K", change: "-2.1%", trend: "down", icon: Eye, bg: "bg-sky-50" },
];

const alerts = [
  { title: "High server load detected", type: "warning", time: "2 hours ago" },
  { title: "3 KYC submissions awaiting review", type: "info", time: "5 hours ago" },
  { title: "Payment gateway timeout reported", type: "error", time: "1 day ago" },
];

const COLORS = ["hsl(215,75%,50%)", "hsl(220,30%,20%)"];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => (
          <Card key={kpi.title} className={`${kpi.bg} border-border`}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{kpi.title}</span>
                <div className="w-9 h-9 rounded-lg bg-white/70 flex items-center justify-center">
                  <kpi.icon className="w-4 h-4 text-primary" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
              <div className="flex items-center gap-1 mt-1">
                {kpi.trend === "up" ? (
                  <TrendingUp className="w-3 h-3 text-emerald-600" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-destructive" />
                )}
                <span className={`text-xs font-medium ${kpi.trend === "up" ? "text-emerald-600" : "text-destructive"}`}>{kpi.change}</span>
                <span className="text-xs text-muted-foreground ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Portfolio Value Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={chartData.portfolioValue}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(215,75%,50%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(215,75%,50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
                <XAxis dataKey="month" stroke="hsl(220,10%,46%)" fontSize={12} />
                <YAxis stroke="hsl(220,10%,46%)" fontSize={12} tickFormatter={(v) => `AED ${(v / 1000000).toFixed(0)}M`} />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid hsl(220,13%,91%)", borderRadius: "8px", color: "hsl(220,20%,15%)" }} formatter={(v: number) => [`AED ${(v / 1000000).toFixed(1)}M`, "Value"]} />
                <Area type="monotone" dataKey="value" stroke="hsl(215,75%,50%)" fillOpacity={1} fill="url(#colorVal)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Occupancy Rate</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={chartData.occupancyRate} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value" startAngle={90} endAngle={-270}>
                  {chartData.occupancyRate.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center -mt-4">
              <p className="text-3xl font-bold text-foreground">85%</p>
              <p className="text-sm text-muted-foreground">Occupied</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Recent KYC Submissions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {kycSubmissions.filter(k => k.status !== "Approved").slice(0, 4).map((kyc) => (
              <div key={kyc.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{kyc.userName}</p>
                  <p className="text-xs text-muted-foreground">{kyc.documentType} · {kyc.submittedDate}</p>
                </div>
                <Badge className={
                  kyc.status === "Pending" ? "bg-warning/10 text-warning border-warning/20" :
                  kyc.status === "In Review" ? "bg-info/10 text-info border-info/20" :
                  "bg-destructive/10 text-destructive border-destructive/20"
                }>
                  {kyc.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">System Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  alert.type === "warning" ? "bg-amber-50" : alert.type === "error" ? "bg-red-50" : "bg-sky-50"
                }`}>
                  {alert.type === "warning" ? <AlertTriangle className="w-4 h-4 text-warning" /> :
                   alert.type === "error" ? <AlertTriangle className="w-4 h-4 text-destructive" /> :
                   <Clock className="w-4 h-4 text-info" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{alert.title}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
