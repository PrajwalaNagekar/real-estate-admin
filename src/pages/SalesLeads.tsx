import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import { leads as initialLeads } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const statusOrder = ["New", "Contacted", "Qualified", "Negotiating"];
const statusColor = (s: string) =>
  s === "New" ? "bg-sky-50 text-sky-700 border-sky-200" :
  s === "Contacted" ? "bg-amber-50 text-amber-700 border-amber-200" :
  s === "Qualified" ? "bg-blue-50 text-blue-700 border-blue-200" :
  "bg-emerald-50 text-emerald-700 border-emerald-200";

export default function SalesLeads() {
  const [leadList, setLeadList] = useState(initialLeads);
  const { toast } = useToast();

  const pipelineCounts = Object.fromEntries(statusOrder.map(s => [s, leadList.filter(l => l.status === s).length]));

  const advanceStatus = (id: string) => {
    setLeadList(prev => prev.map(l => {
      if (l.id !== id) return l;
      const idx = statusOrder.indexOf(l.status);
      if (idx < statusOrder.length - 1) {
        const next = statusOrder[idx + 1];
        toast({ title: "Lead Updated", description: `${l.name} moved to ${next}.` });
        return { ...l, status: next };
      }
      return l;
    }));
  };

  const exportCSV = () => {
    const csv = "ID,Name,Email,Interest,Source,Status,Date\n" + leadList.map(l => `${l.id},${l.name},${l.email},${l.interest},${l.source},${l.status},${l.date}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "leads.csv"; a.click();
    toast({ title: "Exported", description: "Leads data exported to CSV." });
  };

  const statBg = ["bg-sky-50", "bg-amber-50", "bg-blue-50", "bg-emerald-50"];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statusOrder.map((stage, i) => (
          <Card key={stage} className={`${statBg[i]} border-border`}><CardContent className="p-5"><p className="text-sm text-muted-foreground">{stage}</p><p className="text-2xl font-bold mt-1">{pipelineCounts[stage]}</p></CardContent></Card>
        ))}
      </div>
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">All Leads</CardTitle>
            <Button size="sm" variant="outline" onClick={exportCSV}><Download className="w-4 h-4 mr-1" />Export CSV</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Interest</TableHead><TableHead>Source</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {leadList.map(l => (
                <TableRow key={l.id}>
                  <TableCell className="font-medium">{l.name}</TableCell>
                  <TableCell className="text-muted-foreground">{l.email}</TableCell>
                  <TableCell className="text-muted-foreground">{l.interest}</TableCell>
                  <TableCell className="text-muted-foreground">{l.source}</TableCell>
                  <TableCell><Badge className={statusColor(l.status)}>{l.status}</Badge></TableCell>
                  <TableCell className="text-muted-foreground">{l.date}</TableCell>
                  <TableCell>
                    {statusOrder.indexOf(l.status) < statusOrder.length - 1 && (
                      <Button size="sm" variant="ghost" onClick={() => advanceStatus(l.id)}><ArrowRight className="w-4 h-4 mr-1" />Advance</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
