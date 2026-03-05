import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { chartData } from "@/data/mockData";

const payouts = [
  { id: "PAY001", recipient: "Ahmed Al Maktoum", amount: 12000, property: "Dubai Marina Luxury Apartment", date: "2024-05-25", status: "Completed" },
  { id: "PAY002", recipient: "Khalid Al Qasimi", amount: 8500, property: "Palm Jumeirah Villa", date: "2024-05-20", status: "Completed" },
  { id: "PAY003", recipient: "Fatima Al Nahyan", amount: 15000, property: "DIFC Tower Suite", date: "2024-06-01", status: "Pending" },
];

export default function Financials() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 border-border"><CardContent className="p-5"><p className="text-sm text-muted-foreground">Monthly Revenue</p><p className="text-2xl font-bold mt-1">AED 5.8M</p></CardContent></Card>
        <Card className="bg-emerald-50 border-border"><CardContent className="p-5"><p className="text-sm text-muted-foreground">Total Earnings</p><p className="text-2xl font-bold mt-1">AED 26.6M</p></CardContent></Card>
        <Card className="bg-amber-50 border-border"><CardContent className="p-5"><p className="text-sm text-muted-foreground">Pending Payouts</p><p className="text-2xl font-bold mt-1">AED 15,000</p></CardContent></Card>
      </div>
      <Card className="bg-card border-border">
        <CardHeader><CardTitle className="text-base">Revenue Trend</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData.revenue}>
              <defs><linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(215,75%,50%)" stopOpacity={0.3} /><stop offset="95%" stopColor="hsl(215,75%,50%)" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
              <XAxis dataKey="month" stroke="hsl(220,10%,46%)" fontSize={12} />
              <YAxis stroke="hsl(220,10%,46%)" fontSize={12} tickFormatter={(v) => `AED ${(v / 1000000).toFixed(1)}M`} />
              <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid hsl(220,13%,91%)", borderRadius: "8px", color: "hsl(220,20%,15%)" }} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(215,75%,50%)" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="bg-card border-border">
        <CardHeader><CardTitle className="text-base">Recent Payouts</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Recipient</TableHead><TableHead>Amount</TableHead><TableHead>Property</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>
              {payouts.map(p => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.recipient}</TableCell>
                  <TableCell>AED {p.amount.toLocaleString('en-AE')}</TableCell>
                  <TableCell className="text-muted-foreground">{p.property}</TableCell>
                  <TableCell className="text-muted-foreground">{p.date}</TableCell>
                  <TableCell><span className={`text-xs font-medium ${p.status === "Completed" ? "text-emerald-600" : "text-amber-600"}`}>{p.status}</span></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
