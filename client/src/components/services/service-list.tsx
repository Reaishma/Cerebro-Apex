
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Square, RotateCcw, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Service } from "@shared/schema";

export default function ServicesList() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['/api/services'],
    refetchInterval: 3000
  });

  const startServiceMutation = useMutation({
    mutationFn: (serviceId: number) => apiRequest('POST', `/api/services/${serviceId}/start`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
      toast({
        title: "Service Started",
        description: "Service has been started successfully"
      });
    }
  });

  const stopServiceMutation = useMutation({
    mutationFn: (serviceId: number) => apiRequest('POST', `/api/services/${serviceId}/stop`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
      toast({
        title: "Service Stopped",
        description: "Service has been stopped successfully"
      });
    }
  });

  const restartServiceMutation = useMutation({
    mutationFn: (serviceId: number) => apiRequest('POST', `/api/services/${serviceId}/restart`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
      toast({
        title: "Service Restarting",
        description: "Service restart initiated"
      });
    }
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'running':
        return <Badge className="bg-success text-white">Running</Badge>;
      case 'stopped':
        return <Badge className="bg-destructive text-white">Stopped</Badge>;
      case 'pending':
        return <Badge className="bg-warning text-white">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getServiceTypeClass = (type: string) => {
    switch (type) {
      case 'microservice':
        return 'spring-service';
      case 'gateway':
        return 'gateway-service';
      case 'database':
        return 'database-service';
      case 'queue':
        return 'queue-service';
      case 'monitoring':
        return 'monitoring-service';
      default:
        return '';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-slate-400">Loading services...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Microservices</h2>
        <Button className="bg-primary hover:bg-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service: Service) => (
          <Card 
            key={service.id} 
            className={`glassmorphism service-node cursor-pointer ${getServiceTypeClass(service.type)}`}
            onClick={() => setSelectedService(service)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">{service.name}</CardTitle>
                {getStatusBadge(service.status)}
              </div>
              <p className="text-slate-400 text-sm capitalize">{service.type}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Version</span>
                  <span className="text-white">{service.version}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Port</span>
                  <span className="text-white">{service.port || 'N/A'}</span>
                </div>
                {service.springBootVersion && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Spring Boot</span>
                    <span className="text-spring">{service.springBootVersion}</span>
                  </div>
                )}
                {service.javaVersion && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Java</span>
                    <span className="text-amber-400">{service.javaVersion}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Instances</span>
                  <span className="text-white">{service.instances}</span>
                </div>
                {service.profiles && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Profile</span>
                    <span className="text-primary">{service.profiles}</span>
                  </div>
                )}
                {service.actuatorPort && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Actuator</span>
                    <span className="text-cyan-400">{service.actuatorPort}</span>
                  </div>
                )}
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">CPU</span>
                    <span className="text-white">{service.cpu}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${service.cpu}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Memory</span>
                    <span className="text-white">{service.memory}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-warning h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${service.memory}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex space-x-2 pt-3">
                  {service.status !== 'running' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        startServiceMutation.mutate(service.id);
                      }}
                      disabled={startServiceMutation.isPending}
                      className="bg-success/20 text-success border-success/30 hover:bg-success/30"
                    >
                      <Play className="w-3 h-3 mr-1" />
                      Start
                    </Button>
                  )}
                  
                  {service.status === 'running' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        stopServiceMutation.mutate(service.id);
                      }}
                      disabled={stopServiceMutation.isPending}
                      className="bg-destructive/20 text-destructive border-destructive/30 hover:bg-destructive/30"
                    >
                      <Square className="w-3 h-3 mr-1" />
                      Stop
                    </Button>
                  )}
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      restartServiceMutation.mutate(service.id);
                    }}
                    disabled={restartServiceMutation.isPending}
                    className="bg-warning/20 text-warning border-warning/30 hover:bg-warning/30"
                  >
                    <RotateCcw className="w-3 h-3 mr-1" />
                    Restart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
