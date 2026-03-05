import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { transactions } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Transactions() {
  const { toast } = useToast();

  const exportCSV = () => {
    const csv = "ID,User,Type,Amount,Property,Date,Status\n" + transactions.map(t => `${t.id},${t.userName},${t.type},${t.amount},${t.propertyName},${t.date},${t.status}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "transactions.csv"; a.click();
    toast({ title: "Exported", description: "Transaction data exported to CSV." });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 border-border"><CardContent className="p-5"><p className="text-sm text-muted-foreground">Total Transactions</p><p className="text-2xl font-bold mt-1">{transactions.length}</p></CardContent></Card>
        <Card className="bg-emerald-50 border-border"><CardContent className="p-5"><p className="text-sm text-muted-foreground">Total Volume</p><p className="text-2xl font-bold mt-1">AED {(transactions.reduce((a, t) => a + t.amount, 0) / 1000000).toFixed(2)}M</p></CardContent></Card>
        <Card className="bg-amber-50 border-border"><CardContent className="p-5"><p className="text-sm text-muted-foreground">Pending</p><p className="text-2xl font-bold mt-1">{transactions.filter(t => t.status === "Pending" || t.status === "Processing").length}</p></CardContent></Card>
      </div>
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Transaction History</CardTitle>
            <Button size="sm" variant="outline" onClick={exportCSV}><Download className="w-4 h-4 mr-1" />Export CSV</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>User</TableHead><TableHead>Type</TableHead><TableHead>Amount</TableHead><TableHead>Property</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>
              {transactions.map(t => (
                <TableRow key={t.id}>
                  <TableCell className="text-muted-foreground font-mono text-xs">{t.id}</TableCell>
                  <TableCell className="font-medium">{t.userName}</TableCell>
                  <TableCell><Badge variant="outline" className={t.type === "Buy" ? "border-emerald-200 text-emerald-700" : t.type === "Sell" ? "border-destructive/30 text-destructive" : "border-sky-200 text-sky-700"}>{t.type}</Badge></TableCell>
                  <TableCell>AED {t.amount.toLocaleString('en-AE')}</TableCell>
                  <TableCell className="text-muted-foreground">{t.propertyName}</TableCell>
                  <TableCell className="text-muted-foreground">{t.date}</TableCell>
                  <TableCell><Badge className={t.status === "Completed" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : t.status === "Pending" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-sky-50 text-sky-700 border-sky-200"}>{t.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
