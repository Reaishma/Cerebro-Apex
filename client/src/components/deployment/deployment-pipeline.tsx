
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, GitCommit, Package } from "lucide-react";

export default function DeploymentPipeline() {
  const { data: deployments = [] } = useQuery({
    queryKey: ['/api/deployments']
  });

  const { data: services = [] } = useQuery({
    queryKey: ['/api/services']
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-success text-white">Success</Badge>;
      case 'failed':
        return <Badge className="bg-destructive text-white">Failed</Badge>;
      case 'running':
        return <Badge className="bg-primary text-white">Running</Badge>;
      case 'pending':
        return <Badge className="bg-warning text-white">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const pipelineStages = [
    { name: "Source", status: "completed", icon: GitCommit },
    { name: "Build", status: "completed", icon: Package },
    { name: "Test", status: "running", icon: Play },
    { name: "Deploy", status: "pending", icon: Play }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Deployment Pipeline</h2>
        <Button className="bg-primary hover:bg-blue-600">
          <Play className="w-4 h-4 mr-2" />
          Start Deployment
        </Button>
      </div>

      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle className="text-white">Current Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="deployment-pipeline">
            <div className="grid grid-cols-4 gap-4">
              {pipelineStages.map((stage, index) => {
                const Icon = stage.icon;
                return (
                  <div key={stage.name} className="pipeline-stage">
                    <div className="flex flex-col items-center space-y-2">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        stage.status === 'completed' ? 'bg-success' : 
                        stage.status === 'running' ? 'bg-primary status-pulse' : 
                        'bg-slate-600'
                      }`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-white text-sm font-medium">{stage.name}</span>
                      <span className="text-slate-400 text-xs capitalize">{stage.status}</span>
                    </div>
                    {index < pipelineStages.length - 1 && (
                      <div className="absolute top-6 left-full w-full h-0.5 bg-slate-600 -translate-x-2"></div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Overall Progress</span>
                <span className="text-white">65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle className="text-white">Recent Deployments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {deployments.length === 0 ? (
                <div className="text-center text-slate-400 py-8">
                  No deployments found
                </div>
              ) : (
                deployments.map((deployment: any) => (
                  <div key={deployment.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div>
                      <p className="text-white text-sm">Version {deployment.version}</p>
                      <p className="text-slate-400 text-xs">{deployment.strategy} deployment</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(deployment.status)}
                      <span className="text-slate-400 text-xs">{deployment.progress}%</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle className="text-white">Deployment Strategies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-slate-700/30 rounded-lg">
                <h4 className="text-white font-medium mb-2">Rolling Deployment</h4>
                <p className="text-slate-400 text-sm">Gradually replace instances with zero downtime</p>
                <div className="mt-2">
                  <Badge variant="outline" className="text-primary border-primary">Recommended</Badge>
                </div>
              </div>
              
              <div className="p-3 bg-slate-700/30 rounded-lg">
                <h4 className="text-white font-medium mb-2">Blue-Green Deployment</h4>
                <p className="text-slate-400 text-sm">Switch between two identical production environments</p>
              </div>
              
              <div className="p-3 bg-slate-700/30 rounded-lg">
                <h4 className="text-white font-medium mb-2">Canary Deployment</h4>
                <p className="text-slate-400 text-sm">Gradually roll out to subset of users</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
