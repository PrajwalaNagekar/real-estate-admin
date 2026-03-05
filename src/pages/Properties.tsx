import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { properties } from "@/data/mockData";

export default function Properties() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 border-border"><CardContent className="p-5"><p className="text-sm text-muted-foreground">Total Properties</p><p className="text-2xl font-bold mt-1">{properties.length}</p></CardContent></Card>
        <Card className="bg-emerald-50 border-border"><CardContent className="p-5"><p className="text-sm text-muted-foreground">Total Value</p><p className="text-2xl font-bold mt-1">AED {(properties.reduce((a, p) => a + p.value, 0) / 1000000).toFixed(1)}M</p></CardContent></Card>
        <Card className="bg-amber-50 border-border"><CardContent className="p-5"><p className="text-sm text-muted-foreground">Avg Occupancy</p><p className="text-2xl font-bold mt-1">{Math.round(properties.reduce((a, p) => a + p.occupancy, 0) / properties.length)}%</p></CardContent></Card>
      </div>
      <Card className="bg-card border-border">
        <CardHeader><CardTitle className="text-base">Property Listings</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Location</TableHead><TableHead>Value</TableHead><TableHead>Ownership Sold</TableHead><TableHead>Occupancy</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>
              {properties.map(p => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="text-muted-foreground">{p.location}</TableCell>
                  <TableCell>AED {(p.value / 1000000).toFixed(1)}M</TableCell>
                  <TableCell><div className="flex items-center gap-2"><Progress value={p.ownershipSold} className="h-2 w-20" /><span className="text-xs text-muted-foreground">{p.ownershipSold}%</span></div></TableCell>
                  <TableCell>{p.occupancy}%</TableCell>
                  <TableCell><Badge className={p.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"}>{p.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
