import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Lock, User } from "lucide-react";

export default function LoginForm() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted", { username, password });
    setLocation("/dashboard");
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="space-y-2 text-center">
        <div className="flex justify-center mb-2">
          <Globe className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">NASA Earth Observation</CardTitle>
        <CardDescription className="text-base">
          Access historical weather data and climate analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="username"
                data-testid="input-username"
                type="text"
                placeholder="demo"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                data-testid="input-password"
                type="password"
                placeholder="demo"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full" size="lg" data-testid="button-login">
            Sign In
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            Demo credentials: username and password are both "demo"
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
