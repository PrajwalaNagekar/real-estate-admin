import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreditCard, Mail, MessageSquare, BarChart3, FileSignature } from "lucide-react";
import { integrations } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const iconMap: Record<string, React.ElementType> = { CreditCard, Mail, MessageSquare, BarChart3, FileSignature };

export default function SettingsPage() {
  const { toast } = useToast();
  const [passwordOpen, setPasswordOpen] = useState(false);

  const handleSave = (section: string) => {
    toast({ title: "Settings Saved", description: `${section} settings have been saved successfully.` });
  };

  const handleChangePassword = () => {
    setPasswordOpen(false);
    toast({ title: "Password Changed", description: "Your password has been updated successfully." });
  };

  return (
    <div className="space-y-6">
      {/* General */}
      <Card className="bg-card border-border">
        <CardHeader><CardTitle className="text-base">General Settings</CardTitle></CardHeader>
        <CardContent className="space-y-4 max-w-lg">
          <div className="space-y-2"><Label>Platform Name</Label><Input defaultValue="One Property" className="bg-muted" /></div>
          <div className="space-y-2"><Label>Contact Email</Label><Input defaultValue="admin@oneproperty.ae" className="bg-muted" /></div>
          <div className="space-y-2"><Label>Support Phone</Label><Input defaultValue="+971 4 567 8901" className="bg-muted" /></div>
          <Button onClick={() => handleSave("General")}>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="bg-card border-border">
        <CardHeader><CardTitle className="text-base">Security Settings</CardTitle></CardHeader>
        <CardContent className="space-y-4 max-w-lg">
          <div className="flex items-center justify-between"><div><p className="text-sm font-medium">Two-Factor Authentication</p><p className="text-xs text-muted-foreground">Add extra security to your account</p></div><Switch /></div>
          <div className="flex items-center justify-between"><div><p className="text-sm font-medium">Session Timeout</p><p className="text-xs text-muted-foreground">Auto logout after inactivity</p></div><Switch defaultChecked /></div>
          <Dialog open={passwordOpen} onOpenChange={setPasswordOpen}>
            <DialogTrigger asChild><Button variant="outline">Change Password</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Change Password</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2"><Label>Current Password</Label><Input type="password" className="bg-muted" /></div>
                <div className="space-y-2"><Label>New Password</Label><Input type="password" className="bg-muted" /></div>
                <div className="space-y-2"><Label>Confirm New Password</Label><Input type="password" className="bg-muted" /></div>
                <Button onClick={handleChangePassword} className="w-full">Update Password</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="bg-card border-border">
        <CardHeader><CardTitle className="text-base">Notification Preferences</CardTitle></CardHeader>
        <CardContent className="space-y-4 max-w-lg">
          {["Email Notifications", "SMS Alerts", "Push Notifications", "KYC Updates", "Transaction Alerts"].map(n => (
            <div key={n} className="flex items-center justify-between"><p className="text-sm">{n}</p><Switch defaultChecked /></div>
          ))}
          <Button onClick={() => handleSave("Notification")}>Save Preferences</Button>
        </CardContent>
      </Card>

      {/* Platform */}
      <Card className="bg-card border-border">
        <CardHeader><CardTitle className="text-base">Platform Configuration</CardTitle></CardHeader>
        <CardContent className="space-y-4 max-w-lg">
          <div className="flex items-center justify-between"><div><p className="text-sm font-medium">Maintenance Mode</p><p className="text-xs text-muted-foreground">Temporarily disable the platform</p></div><Switch /></div>
          <div className="flex items-center justify-between"><div><p className="text-sm font-medium">User Registration</p><p className="text-xs text-muted-foreground">Allow new user sign-ups</p></div><Switch defaultChecked /></div>
          <div className="space-y-2"><Label>Max Properties per User</Label><Input type="number" defaultValue="10" className="bg-muted" /></div>
          <Button onClick={() => handleSave("Platform")}>Save Configuration</Button>
        </CardContent>
      </Card>

      {/* Integrations */}
      <Card className="bg-card border-border">
        <CardHeader><CardTitle className="text-base">Integrations</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map(i => {
              const Icon = iconMap[i.icon] || BarChart3;
              return (
                <Card key={i.id} className="bg-muted/30 border-border">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center"><Icon className="w-5 h-5 text-primary" /></div>
                        <div>
                          <CardTitle className="text-sm">{i.name}</CardTitle>
                          <Badge className={i.status === "Connected" ? "bg-emerald-50 text-emerald-700 border-emerald-200 mt-1" : "bg-muted text-muted-foreground border-border mt-1"}>{i.status}</Badge>
                        </div>
                      </div>
                      <Switch checked={i.status === "Connected"} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">{i.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">Last sync: {i.lastSync}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
