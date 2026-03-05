import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { auditLogs } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const severityClass = (s: string) =>
  s === "Critical" ? "bg-red-50 text-red-700 border-red-200" :
  s === "High" ? "bg-amber-50 text-amber-700 border-amber-200" :
  s === "Medium" ? "bg-sky-50 text-sky-700 border-sky-200" :
  "bg-muted text-muted-foreground border-border";

const statBg = ["bg-blue-50", "bg-red-50", "bg-amber-50", "bg-sky-50"];

export default function AuditLogs() {
  const { toast } = useToast();

  const exportCSV = () => {
    const csv = "ID,Timestamp,User,Action,Module,Details,Severity,IP\n" + auditLogs.map(l => `${l.id},${l.timestamp},${l.user},${l.action},${l.module},"${l.details}",${l.severity},${l.ip}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "audit_logs.csv"; a.click();
    toast({ title: "Exported", description: "Audit logs exported to CSV." });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Logs", value: auditLogs.length },
          { label: "Critical", value: auditLogs.filter(l => l.severity === "Critical").length, cls: "text-destructive" },
          { label: "High Severity", value: auditLogs.filter(l => l.severity === "High").length, cls: "text-amber-700" },
          { label: "System Events", value: auditLogs.filter(l => l.user === "System").length },
        ].map((s, i) => (
          <Card key={s.label} className={`${statBg[i]} border-border`}><CardContent className="p-5"><p className="text-sm text-muted-foreground">{s.label}</p><p className={`text-2xl font-bold mt-1 ${s.cls || ""}`}>{s.value}</p></CardContent></Card>
        ))}
      </div>
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Activity Log</CardTitle>
            <Button size="sm" variant="outline" onClick={exportCSV}><Download className="w-4 h-4 mr-1" />Export CSV</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map(l => (
                <TableRow key={l.id}>
                  <TableCell className="text-muted-foreground font-mono text-xs whitespace-nowrap">{l.timestamp}</TableCell>
                  <TableCell className="font-medium">{l.user}</TableCell>
                  <TableCell>{l.action}</TableCell>
                  <TableCell><Badge variant="outline" className="text-xs">{l.module}</Badge></TableCell>
                  <TableCell className="text-muted-foreground text-xs max-w-xs truncate">{l.details}</TableCell>
                  <TableCell><Badge className={severityClass(l.severity)}>{l.severity}</Badge></TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">{l.ip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
