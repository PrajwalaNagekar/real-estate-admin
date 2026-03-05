import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Download } from "lucide-react";
import { kycSubmissions as initialKyc } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const statusColor = (s: string) =>
  s === "Approved" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
  s === "Rejected" ? "bg-destructive/10 text-destructive border-destructive/20" :
  s === "In Review" ? "bg-sky-50 text-sky-700 border-sky-200" :
  "bg-amber-50 text-amber-700 border-amber-200";

const statBg = ["bg-amber-50", "bg-sky-50", "bg-emerald-50", "bg-red-50"];

export default function KYCVerification() {
  const [submissions, setSubmissions] = useState(initialKyc);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectId, setRejectId] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const { toast } = useToast();

  const handleApprove = (id: string) => {
    setSubmissions(prev => prev.map(k => k.id === id ? { ...k, status: "Approved" } : k));
    toast({ title: "KYC Approved", description: `Submission ${id} has been approved.` });
  };

  const handleReject = () => {
    setSubmissions(prev => prev.map(k => k.id === rejectId ? { ...k, status: "Rejected", notes: rejectReason } : k));
    toast({ title: "KYC Rejected", description: `Submission ${rejectId} has been rejected.`, variant: "destructive" });
    setRejectOpen(false);
    setRejectReason("");
  };

  const exportCSV = () => {
    const csv = "ID,User,Document,Submitted,Status,Notes\n" + submissions.map(k => `${k.id},${k.userName},${k.documentType},${k.submittedDate},${k.status},"${k.notes}"`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "kyc_submissions.csv"; a.click();
    toast({ title: "Exported", description: "KYC data exported to CSV." });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {["Pending", "In Review", "Approved", "Rejected"].map((s, i) => (
          <Card key={s} className={`${statBg[i]} border-border`}><CardContent className="p-5"><p className="text-sm text-muted-foreground">{s}</p><p className="text-2xl font-bold mt-1">{submissions.filter(k => k.status === s).length}</p></CardContent></Card>
        ))}
      </div>
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">KYC Submissions</CardTitle>
            <Button size="sm" variant="outline" onClick={exportCSV}><Download className="w-4 h-4 mr-1" />Export CSV</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>User</TableHead><TableHead>Document</TableHead><TableHead>Submitted</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {submissions.map(k => (
                <TableRow key={k.id}>
                  <TableCell className="font-medium">{k.userName}</TableCell>
                  <TableCell className="text-muted-foreground">{k.documentType}</TableCell>
                  <TableCell className="text-muted-foreground">{k.submittedDate}</TableCell>
                  <TableCell><Badge className={statusColor(k.status)}>{k.status}</Badge></TableCell>
                  <TableCell>
                    {(k.status === "Pending" || k.status === "In Review") && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="text-emerald-600 hover:text-emerald-700" onClick={() => handleApprove(k.id)}><CheckCircle className="w-4 h-4" /></Button>
                        <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => { setRejectId(k.id); setRejectOpen(true); }}><XCircle className="w-4 h-4" /></Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Reject KYC Submission</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Reason for Rejection</Label><Textarea value={rejectReason} onChange={e => setRejectReason(e.target.value)} placeholder="Enter reason..." className="bg-muted" /></div>
            <Button onClick={handleReject} variant="destructive" className="w-full">Confirm Rejection</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
