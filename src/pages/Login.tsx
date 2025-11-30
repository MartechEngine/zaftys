import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Assuming Tabs component exists, if not I'll use state.
// Actually, to be safe and avoid "module not found" if Tabs isn't there, I'll build a custom tab UI or use state.
// Workspace snapshot showed `ui/` folder but not specific files. I'll stick to standard state for maximum reliability.
import { UserCircle, Truck, Lock, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";

const Login = () => {
  const [activeTab, setActiveTab] = useState<"client" | "team">("client");

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4 relative overflow-hidden">
      <SEO 
        title="Login - ZAFTYS TSM™ Portal" 
        description="Secure login for ZAFTYS Clients and Team members. Access real-time tracking and fleet management tools." 
        canonical="/login"
      />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNHYtNGgtMnY0aC0ydjRoMnY0aDJ2LTRoMnYtNGgtMnpNMzYgMzRWMzRoNDB2MmgtNDB2LTJ6bTAgMHYtMmgydjJ4LTIyek02IDZ2MmgyVjZINnptMCA0aDJ2MmgtMlYxMHptMCA0aDJ2MmgtMlYxNHptMCA0aDJ2MmgtMlYxOHoiIGZpbGw9IiNmZmYiLz48L2c+PC9zdmc+')]"></div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/90 to-primary/20 pointer-events-none"></div>

      <Card className="w-full max-w-md relative z-10 border-white/10 bg-white/95 backdrop-blur shadow-2xl animate-fade-in-up">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4 text-accent">
            <Lock size={24} />
          </div>
          <CardTitle className="text-2xl font-heading font-bold text-navy">Welcome Back</CardTitle>
          <CardDescription>
            Secure access to ZAFTYS TSM™ Platform
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {/* Custom Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg mb-6">
            <button
              onClick={() => setActiveTab("client")}
              className={`flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-md transition-all ${
                activeTab === "client" 
                  ? "bg-white text-navy shadow-sm" 
                  : "text-muted-foreground hover:text-navy"
              }`}
            >
              <UserCircle size={18} />
              Client Portal
            </button>
            <button
              onClick={() => setActiveTab("team")}
              className={`flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-md transition-all ${
                activeTab === "team" 
                  ? "bg-white text-navy shadow-sm" 
                  : "text-muted-foreground hover:text-navy"
              }`}
            >
              <Truck size={18} />
              Team / Driver
            </button>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="email">
                {activeTab === "client" ? "Business Email" : "Employee ID / Email"}
              </Label>
              <Input 
                id="email" 
                type={activeTab === "client" ? "email" : "text"} 
                placeholder={activeTab === "client" ? "name@company.com" : "EMP-ID-1234"}
                className="bg-white"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-primary hover:underline font-medium">
                  Forgot password?
                </a>
              </div>
              <Input id="password" type="password" placeholder="••••••••" className="bg-white" />
            </div>

            <Button className="w-full bg-navy hover:bg-navy/90 text-white font-bold h-11 mt-2">
              Login to {activeTab === "client" ? "Client" : "Team"} Portal 
              <ArrowRight className="ml-2" size={18} />
            </Button>

            <div className="text-center text-sm text-muted-foreground mt-4">
              Don't have an account?{" "}
              <Link to={activeTab === "client" ? "/contact" : "/careers"} className="text-accent hover:underline font-semibold">
                {activeTab === "client" ? "Contact Sales" : "Apply Now"}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
