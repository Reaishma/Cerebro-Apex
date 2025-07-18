
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, Coffee, Cpu, Database, Settings } from "lucide-react";

export default function SpringBootDashboard() {
  const { data: healthData } = useQuery({
    queryKey: ['/api/actuator/health'],
    refetchInterval: 10000
  });

  const { data: infoData } = useQuery({
    queryKey: ['/api/actuator/info']
  });

  const { data: services = [] } = useQuery({
    queryKey: ['/api/services']
  });

  const springBootServices = services.filter((s: any) => 
    s.framework === "spring-boot" || s.framework === "spring-cloud"
  );

  const getHealthBadge = (status: string) => {
    return status === "UP" ? 
      <Badge className="bg-success text-white">UP</Badge> :
      <Badge className="bg-destructive text-white">DOWN</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-spring/20 rounded-lg flex items-center justify-center">
            <Coffee className="w-6 h-6 text-spring" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white">Spring Boot Dashboard</h2>
            <p className="text-slate-400">Monitor your Spring Boot microservices</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open('/api/actuator/health', '_blank')}
            className="bg-spring/20 text-spring border-spring/30 hover:bg-spring/30"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Health Endpoint
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open('/api/actuator/info', '_blank')}
            className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Info Endpoint
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glassmorphism">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Spring Boot Services</p>
                <p className="text-2xl font-bold text-spring">{springBootServices.length}</p>
              </div>
              <div className="w-12 h-12 bg-spring/20 rounded-lg flex items-center justify-center">
                <Coffee className="w-6 h-6 text-spring" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Overall Health</p>
                <p className="text-2xl font-bold text-white">{healthData?.status || "UNKNOWN"}</p>
              </div>
              <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active Profile</p>
                <p className="text-2xl font-bold text-primary">production</p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Java Version</p>
                <p className="text-2xl font-bold text-amber-400">17</p>
              </div>
              <div className="w-12 h-12 bg-amber-400/20 rounded-lg flex items-center justify-center">
                <Cpu className="w-6 h-6 text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle className="text-white">Application Info</CardTitle>
          </CardHeader>
          <CardContent>
            {infoData ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-spring font-medium">Application Details</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Name</span>
                      <span className="text-white">{infoData.app?.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Version</span>
                      <span className="text-white">{infoData.app?.version}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Build Time</span>
                      <span className="text-white">{new Date(infoData.build?.time || '').toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-primary font-medium">Git Information</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Branch</span>
                      <span className="text-white">{infoData.git?.branch}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Commit</span>
                      <span className="text-white font-mono">{infoData.git?.commit?.id?.substring(0, 8)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-400 py-8">
                Loading application info...
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle className="text-white">Service Health Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {healthData?.components ? (
                Object.entries(healthData.components).map(([name, component]: [string, any]) => (
                  <div key={name} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${component.status === 'UP' ? 'bg-success' : 'bg-destructive'}`}></div>
                      <span className="text-white capitalize">{name.replace('-', ' ')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getHealthBadge(component.status)}
                      <span className="text-slate-400 text-sm">
                        {component.details?.springBootVersion || 'N/A'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-slate-400 py-8">
                  Loading health status...
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle className="text-white">Spring Boot Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {springBootServices.map((service: any) => (
              <div key={service.id} className="spring-service border border-spring/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium">{service.name}</h4>
                  <Badge className={service.status === 'running' ? 'bg-success text-white' : 'bg-destructive text-white'}>
                    {service.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Spring Boot</span>
                    <span className="text-spring">{service.springBootVersion}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Java</span>
                    <span className="text-amber-400">{service.javaVersion}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Port</span>
                    <span className="text-white">{service.port}</span>
                  </div>
                  {service.actuatorPort && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Actuator</span>
                      <span className="text-cyan-400">{service.actuatorPort}</span>
                    </div>
                  )}
                </div>

                <div className="mt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">CPU Usage</span>
                    <span className="text-white">{service.cpu || 0}%</span>
                  </div>
                  <Progress value={service.cpu || 0} className="h-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Memory Usage</span>
                    <span className="text-white">{service.memory || 0}%</span>
                  </div>
                  <Progress value={service.memory || 0} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}