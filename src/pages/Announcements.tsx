import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Megaphone } from "lucide-react";
import { announcements as initialAnnouncements } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Announcements() {
  const [list, setList] = useState(initialAnnouncements);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", message: "", audience: "All Users" });
  const { toast } = useToast();

  const handleCreate = () => {
    const newAnn = { id: `ANN${String(list.length + 1).padStart(3, "0")}`, ...form, date: new Date().toISOString().slice(0, 10), status: "Active" };
    setList(prev => [newAnn, ...prev]);
    setOpen(false);
    setForm({ title: "", message: "", audience: "All Users" });
    toast({ title: "Announcement Created", description: `"${newAnn.title}" has been published.` });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div />
        <Button size="sm" onClick={() => setOpen(true)}><Plus className="w-4 h-4 mr-1" />Create Announcement</Button>
      </div>
      {list.map(a => (
        <Card key={a.id} className="bg-card border-border">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center"><Megaphone className="w-4 h-4 text-primary" /></div>
                <div>
                  <CardTitle className="text-base">{a.title}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.date} · {a.audience}</p>
                </div>
              </div>
              <Badge className={a.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-muted text-muted-foreground border-border"}>{a.status}</Badge>
            </div>
          </CardHeader>
          <CardContent><p className="text-sm text-muted-foreground">{a.message}</p></CardContent>
        </Card>
      ))}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Create Announcement</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Title</Label><Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="bg-muted" /></div>
            <div className="space-y-2"><Label>Message</Label><Textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} className="bg-muted" rows={4} /></div>
            <div className="space-y-2">
              <Label>Audience</Label>
              <Select value={form.audience} onValueChange={v => setForm(p => ({ ...p, audience: v }))}>
                <SelectTrigger className="bg-muted"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Users">All Users</SelectItem>
                  <SelectItem value="Investors">Investors</SelectItem>
                  <SelectItem value="Property Owners">Property Owners</SelectItem>
                  <SelectItem value="Agents">Agents</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleCreate} className="w-full" disabled={!form.title || !form.message}>Publish Announcement</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
