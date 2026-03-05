import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Download, Plus, Eye, Edit, UserX, Trash2 } from "lucide-react";
import { users as initialUsers } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export default function UserManagement() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [userList, setUserList] = useState(initialUsers);
  const [addOpen, setAddOpen] = useState(false);
  const [viewUser, setViewUser] = useState<typeof initialUsers[0] | null>(null);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Investor", phone: "" });
  const { toast } = useToast();

  const filtered = userList.filter(u =>
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())) &&
    (roleFilter === "all" || u.role === roleFilter)
  );

  const handleAddUser = () => {
    const user = { id: `USR${String(userList.length + 1).padStart(3, "0")}`, ...newUser, status: "Active", joinDate: new Date().toISOString().slice(0, 10), avatar: newUser.name.split(" ").map(n => n[0]).join("").slice(0, 2) };
    setUserList(prev => [...prev, user]);
    setAddOpen(false);
    setNewUser({ name: "", email: "", role: "Investor", phone: "" });
    toast({ title: "User Added", description: `${user.name} has been added successfully.` });
  };

  const handleSuspend = (id: string) => {
    setUserList(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "Suspended" ? "Active" : "Suspended" } : u));
    toast({ title: "User Updated", description: "User status has been updated." });
  };

  const handleDelete = (id: string) => {
    setUserList(prev => prev.filter(u => u.id !== id));
    toast({ title: "User Deleted", description: "User has been removed.", variant: "destructive" });
  };

  const exportCSV = () => {
    const csv = "ID,Name,Email,Role,Status,Join Date,Phone\n" + userList.map(u => `${u.id},${u.name},${u.email},${u.role},${u.status},${u.joinDate},${u.phone}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "users.csv"; a.click();
    toast({ title: "Exported", description: "User data exported to CSV." });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">All Users</CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={exportCSV}><Download className="w-4 h-4 mr-1" />Export</Button>
              <Button size="sm" onClick={() => setAddOpen(true)}><Plus className="w-4 h-4 mr-1" />Add User</Button>
            </div>
          </div>
          <div className="flex gap-3 mt-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search users..." className="pl-9 bg-muted" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-40 bg-muted"><SelectValue placeholder="All Roles" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Investor">Investor</SelectItem>
                <SelectItem value="Property Owner">Property Owner</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Agent">Agent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Role</TableHead><TableHead>Status</TableHead><TableHead>Join Date</TableHead><TableHead className="w-10"></TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(user => (
                <TableRow key={user.id}>
                  <TableCell><div className="flex items-center gap-3"><Avatar className="h-8 w-8"><AvatarFallback className="bg-primary/20 text-primary text-xs">{user.avatar}</AvatarFallback></Avatar><span className="font-medium">{user.name}</span></div></TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell><Badge variant="outline" className="text-xs">{user.role}</Badge></TableCell>
                  <TableCell><Badge className={user.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : user.status === "Pending" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-destructive/10 text-destructive border-destructive/20"}>{user.status}</Badge></TableCell>
                  <TableCell className="text-muted-foreground">{user.joinDate}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setViewUser(user)}><Eye className="w-4 h-4 mr-2" />View</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSuspend(user.id)}><UserX className="w-4 h-4 mr-2" />{user.status === "Suspended" ? "Activate" : "Suspend"}</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(user.id)}><Trash2 className="w-4 h-4 mr-2" />Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add New User</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Full Name</Label><Input value={newUser.name} onChange={e => setNewUser(p => ({ ...p, name: e.target.value }))} className="bg-muted" /></div>
            <div className="space-y-2"><Label>Email</Label><Input value={newUser.email} onChange={e => setNewUser(p => ({ ...p, email: e.target.value }))} className="bg-muted" /></div>
            <div className="space-y-2"><Label>Phone</Label><Input value={newUser.phone} onChange={e => setNewUser(p => ({ ...p, phone: e.target.value }))} className="bg-muted" /></div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={newUser.role} onValueChange={v => setNewUser(p => ({ ...p, role: v }))}>
                <SelectTrigger className="bg-muted"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Investor">Investor</SelectItem>
                  <SelectItem value="Property Owner">Property Owner</SelectItem>
                  <SelectItem value="Agent">Agent</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAddUser} className="w-full" disabled={!newUser.name || !newUser.email}>Add User</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View User Dialog */}
      <Dialog open={!!viewUser} onOpenChange={() => setViewUser(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>User Details</DialogTitle></DialogHeader>
          {viewUser && (
            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-4"><Avatar className="h-12 w-12"><AvatarFallback className="bg-primary/20 text-primary">{viewUser.avatar}</AvatarFallback></Avatar><div><p className="font-semibold">{viewUser.name}</p><p className="text-sm text-muted-foreground">{viewUser.role}</p></div></div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-muted-foreground">Email</p><p className="font-medium">{viewUser.email}</p></div>
                <div><p className="text-muted-foreground">Phone</p><p className="font-medium">{viewUser.phone}</p></div>
                <div><p className="text-muted-foreground">Status</p><p className="font-medium">{viewUser.status}</p></div>
                <div><p className="text-muted-foreground">Join Date</p><p className="font-medium">{viewUser.joinDate}</p></div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
