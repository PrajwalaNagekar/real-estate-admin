import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { agents } from "@/data/mockData";

export default function Agents() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {agents.map(a => (
          <Card key={a.id} className="bg-card border-border">
            <CardContent className="p-5 text-center">
              <Avatar className="h-14 w-14 mx-auto mb-3"><AvatarFallback className="bg-primary/20 text-primary font-medium">{a.photo}</AvatarFallback></Avatar>
              <p className="font-semibold">{a.name}</p>
              <Badge className={a.status === "Active" ? "bg-success/10 text-success border-success/20 mt-1" : "bg-warning/10 text-warning border-warning/20 mt-1"}>{a.status}</Badge>
              <div className="flex items-center justify-center gap-1 mt-2"><Star className="w-3 h-3 text-warning fill-warning" /><span className="text-sm">{a.rating}</span></div>
              <p className="text-xs text-muted-foreground mt-1">{a.propertiesManaged} properties managed</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="bg-card border-border">
        <CardHeader><CardTitle className="text-base">Agent Performance</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Agent</TableHead><TableHead>Email</TableHead><TableHead>Properties</TableHead><TableHead>Rating</TableHead><TableHead>Commission</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>
              {agents.map(a => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">{a.name}</TableCell>
                  <TableCell className="text-muted-foreground">{a.email}</TableCell>
                  <TableCell>{a.propertiesManaged}</TableCell>
                  <TableCell><div className="flex items-center gap-1"><Star className="w-3 h-3 text-warning fill-warning" />{a.rating}</div></TableCell>
                  <TableCell>AED {a.commission.toLocaleString('en-AE')}</TableCell>
                  <TableCell><Badge className={a.status === "Active" ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"}>{a.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
