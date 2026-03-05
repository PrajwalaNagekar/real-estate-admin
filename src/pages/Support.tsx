import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle } from "lucide-react";
import { supportTickets as initialTickets } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const priorityColor = (p: string) => p === "High" ? "bg-red-50 text-red-700 border-red-200" : p === "Medium" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-sky-50 text-sky-700 border-sky-200";
const statusColor = (s: string) => s === "Open" ? "bg-amber-50 text-amber-700 border-amber-200" : s === "In Progress" ? "bg-sky-50 text-sky-700 border-sky-200" : "bg-emerald-50 text-emerald-700 border-emerald-200";

export default function Support() {
  const [tickets, setTickets] = useState(initialTickets);
  const { toast } = useToast();

  const handleResolve = (id: string) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: "Resolved" } : t));
    toast({ title: "Ticket Resolved", description: `Ticket ${id} has been marked as resolved.` });
  };

  const exportCSV = () => {
    const csv = "ID,User,Subject,Category,Priority,Status,Date\n" + tickets.map(t => `${t.id},${t.userName},"${t.subject}",${t.category},${t.priority},${t.status},${t.date}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "support_tickets.csv"; a.click();
    toast({ title: "Exported", description: "Support data exported to CSV." });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-amber-50 border-border"><CardContent className="p-5"><p className="text-sm text-muted-foreground">Open Tickets</p><p className="text-2xl font-bold mt-1">{tickets.filter(t => t.status === "Open").length}</p></CardContent></Card>
        <Card className="bg-sky-50 border-border"><CardContent className="p-5"><p className="text-sm text-muted-foreground">In Progress</p><p className="text-2xl font-bold mt-1">{tickets.filter(t => t.status === "In Progress").length}</p></CardContent></Card>
        <Card className="bg-emerald-50 border-border"><CardContent className="p-5"><p className="text-sm text-muted-foreground">Resolved</p><p className="text-2xl font-bold mt-1">{tickets.filter(t => t.status === "Resolved").length}</p></CardContent></Card>
      </div>
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Support Tickets</CardTitle>
            <Button size="sm" variant="outline" onClick={exportCSV}><Download className="w-4 h-4 mr-1" />Export CSV</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>User</TableHead><TableHead>Subject</TableHead><TableHead>Category</TableHead><TableHead>Priority</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {tickets.map(t => (
                <TableRow key={t.id}>
                  <TableCell className="text-muted-foreground font-mono text-xs">{t.id}</TableCell>
                  <TableCell className="font-medium">{t.userName}</TableCell>
                  <TableCell className="text-muted-foreground">{t.subject}</TableCell>
                  <TableCell><Badge variant="outline">{t.category}</Badge></TableCell>
                  <TableCell><Badge className={priorityColor(t.priority)}>{t.priority}</Badge></TableCell>
                  <TableCell><Badge className={statusColor(t.status)}>{t.status}</Badge></TableCell>
                  <TableCell className="text-muted-foreground">{t.date}</TableCell>
                  <TableCell>
                    {t.status !== "Resolved" && (
                      <Button size="sm" variant="ghost" className="text-emerald-600" onClick={() => handleResolve(t.id)}><CheckCircle className="w-4 h-4 mr-1" />Resolve</Button>
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
