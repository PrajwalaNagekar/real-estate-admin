import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, UserPlus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { maintenanceRequests as initialRequests } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const priorityColor = (p: string) => p === "High" ? "bg-red-50 text-red-700 border-red-200" : p === "Medium" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-sky-50 text-sky-700 border-sky-200";
const statusColor = (s: string) => s === "Completed" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : s === "In Progress" ? "bg-sky-50 text-sky-700 border-sky-200" : s === "Scheduled" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-muted text-muted-foreground border-border";

export default function Maintenance() {
  const [requests, setRequests] = useState(initialRequests);
  const [assignOpen, setAssignOpen] = useState(false);
  const [assignId, setAssignId] = useState("");
  const [assignee, setAssignee] = useState("");
  const { toast } = useToast();

  const handleComplete = (id: string) => {
    setRequests(prev => prev.map(m => m.id === id ? { ...m, status: "Completed" } : m));
    toast({ title: "Request Completed", description: `Maintenance request ${id} marked as completed.` });
  };

  const handleAssign = () => {
    setRequests(prev => prev.map(m => m.id === assignId ? { ...m, assignedTo: assignee, status: "In Progress" } : m));
    toast({ title: "Assigned", description: `Request assigned to ${assignee}.` });
    setAssignOpen(false);
    setAssignee("");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-border"><CardContent className="p-5"><p className="text-sm text-muted-foreground">Total Requests</p><p className="text-2xl font-bold mt-1">{requests.length}</p></CardContent></Card>
        <Card className="bg-amber-50 border-border"><CardContent className="p-5"><p className="text-sm text-muted-foreground">Open</p><p className="text-2xl font-bold mt-1">{requests.filter(m => m.status === "Open").length}</p></CardContent></Card>
        <Card className="bg-sky-50 border-border"><CardContent className="p-5"><p className="text-sm text-muted-foreground">In Progress</p><p className="text-2xl font-bold mt-1">{requests.filter(m => m.status === "In Progress").length}</p></CardContent></Card>
        <Card className="bg-emerald-50 border-border"><CardContent className="p-5"><p className="text-sm text-muted-foreground">Completed</p><p className="text-2xl font-bold mt-1">{requests.filter(m => m.status === "Completed").length}</p></CardContent></Card>
      </div>
      <Card className="bg-card border-border">
        <CardHeader><CardTitle className="text-base">Maintenance Requests</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Property</TableHead><TableHead>Issue</TableHead><TableHead>Priority</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead><TableHead>Assigned To</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {requests.map(m => (
                <TableRow key={m.id}>
                  <TableCell><div><p className="font-medium">{m.property}</p><p className="text-xs text-muted-foreground">{m.unit}</p></div></TableCell>
                  <TableCell className="text-muted-foreground">{m.issue}</TableCell>
                  <TableCell><Badge className={priorityColor(m.priority)}>{m.priority}</Badge></TableCell>
                  <TableCell><Badge className={statusColor(m.status)}>{m.status}</Badge></TableCell>
                  <TableCell className="text-muted-foreground">{m.date}</TableCell>
                  <TableCell className="text-muted-foreground">{m.assignedTo || "—"}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {m.status !== "Completed" && !m.assignedTo && (
                        <Button size="sm" variant="ghost" onClick={() => { setAssignId(m.id); setAssignOpen(true); }}><UserPlus className="w-4 h-4 mr-1" />Assign</Button>
                      )}
                      {m.status !== "Completed" && m.assignedTo && (
                        <Button size="sm" variant="ghost" className="text-emerald-600" onClick={() => handleComplete(m.id)}><CheckCircle className="w-4 h-4 mr-1" />Complete</Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Assign Maintenance Request</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Assign To</Label><Input value={assignee} onChange={e => setAssignee(e.target.value)} placeholder="Enter company/person name" className="bg-muted" /></div>
            <Button onClick={handleAssign} className="w-full" disabled={!assignee}>Assign</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
