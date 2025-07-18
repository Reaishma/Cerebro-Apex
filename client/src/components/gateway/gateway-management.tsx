import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, ExternalLink } from "lucide-react";

export default function GatewayManagement() {
  const { data: routes = [] } = useQuery({
    queryKey: ['/api/routes']
  });

  const getMethodBadge = (method: string) => {
    const colors = {
      GET: "bg-success text-white",
      POST: "bg-primary text-white", 
      PUT: "bg-warning text-white",
      DELETE: "bg-destructive text-white"
    };
    return <Badge className={colors[method as keyof typeof colors] || "bg-secondary"}>{method}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">API Gateway</h2>
        <Button className="bg-primary hover:bg-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Route
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle className="text-white">Gateway Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-400">Gateway URL</span>
              <span className="text-white">http://localhost:8080</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Status</span>
              <Badge className="bg-success text-white">Active</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Rate Limit</span>
              <span className="text-white">1000 req/min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Timeout</span>
              <span className="text-white">30s</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle className="text-white">Gateway Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-400">Total Requests</span>
              <span className="text-white">15,247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Success Rate</span>
              <span className="text-success">99.7%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Avg Response Time</span>
              <span className="text-white">127ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Active Connections</span>
              <span className="text-white">234</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle className="text-white">API Routes</CardTitle>
        </CardHeader>
        <CardContent>
          {routes.length === 0 ? (
            <div className="text-center text-slate-400 py-8">
              No API routes configured
            </div>
          ) : (
            <div className="space-y-3">
              {routes.map((route: any) => (
                <div key={route.id} className="gateway-route border-l-4 border-gateway bg-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getMethodBadge(route.method)}
                      <span className="text-white font-mono">{route.path}</span>
                      <span className="text-slate-400">→</span>
                      <span className="text-primary">{route.targetService}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={route.isActive ? "default" : "secondary"}>
                        {route.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Button size="sm" variant="ghost">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {(route.rateLimit || route.timeout) && (
                    <div className="mt-2 flex space-x-4 text-sm text-slate-400">
                      {route.rateLimit && <span>Rate Limit: {route.rateLimit}/min</span>}
                      {route.timeout && <span>Timeout: {route.timeout}ms</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

