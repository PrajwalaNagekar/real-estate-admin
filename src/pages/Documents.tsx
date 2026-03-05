import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { documents as initialDocs, properties } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Documents() {
  const [docs, setDocs] = useState(initialDocs);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [form, setForm] = useState({ name: "", type: "Contract", property: "" });
  const { toast } = useToast();

  const handleUpload = () => {
    const newDoc = { id: `DOC${String(docs.length + 1).padStart(3, "0")}`, ...form, uploadDate: new Date().toISOString().slice(0, 10), status: "Draft", size: "1.0 MB" };
    setDocs(prev => [newDoc, ...prev]);
    setUploadOpen(false);
    setForm({ name: "", type: "Contract", property: "" });
    toast({ title: "Document Uploaded", description: `"${newDoc.name}" has been uploaded.` });
  };

  const handleDownload = (doc: typeof initialDocs[0]) => {
    const content = `Document: ${doc.name}\nType: ${doc.type}\nProperty: ${doc.property}\nUploaded: ${doc.uploadDate}\nStatus: ${doc.status}`;
    const blob = new Blob([content], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `${doc.name.replace(/\s+/g, "_")}.txt`; a.click();
    toast({ title: "Downloaded", description: `${doc.name} has been downloaded.` });
  };

  const exportCSV = () => {
    const csv = "ID,Name,Type,Property,Upload Date,Size,Status\n" + docs.map(d => `${d.id},"${d.name}",${d.type},${d.property},${d.uploadDate},${d.size},${d.status}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "documents.csv"; a.click();
    toast({ title: "Exported", description: "Documents data exported to CSV." });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">All Documents</CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={exportCSV}><Download className="w-4 h-4 mr-1" />Export</Button>
              <Button size="sm" onClick={() => setUploadOpen(true)}><Plus className="w-4 h-4 mr-1" />Upload Document</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Type</TableHead><TableHead>Property</TableHead><TableHead>Upload Date</TableHead><TableHead>Size</TableHead><TableHead>Status</TableHead><TableHead className="w-10"></TableHead></TableRow></TableHeader>
            <TableBody>
              {docs.map(d => (
                <TableRow key={d.id}>
                  <TableCell><div className="flex items-center gap-2"><FileText className="w-4 h-4 text-muted-foreground" /><span className="font-medium">{d.name}</span></div></TableCell>
                  <TableCell><Badge variant="outline">{d.type}</Badge></TableCell>
                  <TableCell className="text-muted-foreground">{d.property}</TableCell>
                  <TableCell className="text-muted-foreground">{d.uploadDate}</TableCell>
                  <TableCell className="text-muted-foreground">{d.size}</TableCell>
                  <TableCell><Badge className={d.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : d.status === "Draft" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-muted text-muted-foreground border-border"}>{d.status}</Badge></TableCell>
                  <TableCell><Button variant="ghost" size="icon" onClick={() => handleDownload(d)}><Download className="w-4 h-4" /></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Upload Document</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Document Name</Label><Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="bg-muted" /></div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={form.type} onValueChange={v => setForm(p => ({ ...p, type: v }))}>
                <SelectTrigger className="bg-muted"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Deed">Deed</SelectItem>
                  <SelectItem value="Report">Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Property</Label>
              <Select value={form.property} onValueChange={v => setForm(p => ({ ...p, property: v }))}>
                <SelectTrigger className="bg-muted"><SelectValue placeholder="Select property" /></SelectTrigger>
                <SelectContent>
                  {properties.map(p => <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleUpload} className="w-full" disabled={!form.name || !form.property}>Upload</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
