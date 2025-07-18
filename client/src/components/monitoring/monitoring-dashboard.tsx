
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { createMetricsChart } from "@/lib/chart-config";

export default function MonitoringDashboard() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);

  const { data: services = [] } = useQuery({
    queryKey: ['/api/services']
  });

  const { data: metrics = [] } = useQuery({
    queryKey: ['/api/metrics/latest'],
    refetchInterval: 5000
  });

  useEffect(() => {
    if (chartRef.current && metrics.length > 0) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      chartInstance.current = createMetricsChart(chartRef.current, metrics);
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [metrics]);

  const getHealthStatus = (cpu: number, memory: number) => {
    if (cpu > 80 || memory > 80) return { status: 'unhealthy', color: 'bg-destructive' };
    if (cpu > 60 || memory > 60) return { status: 'degraded', color: 'bg-warning' };
    return { status: 'healthy', color: 'bg-success' };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Monitoring Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle className="text-white">System Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-64">
              <canvas ref={chartRef}></canvas>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle className="text-white">Service Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {services.map((service: any) => {
                const health = getHealthStatus(service.cpu || 0, service.memory || 0);
                return (
                  <div key={service.id} className="service-registry-item border-l-4 border-info bg-slate-700/30 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`service-status w-3 h-3 ${health.color} rounded-full status-pulse`}></div>
                        <span className="text-white">{service.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-slate-400">CPU: {service.cpu || 0}%</span>
                        <span className="text-sm text-slate-400">Memory: {service.memory || 0}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glassmorphism">
          <CardContent className="p-6">
            <div className="metric-card text-center">
              <div className="metric-value text-primary">99.9%</div>
              <div className="metric-label">System Uptime</div>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism">
          <CardContent className="p-6">
            <div className="metric-card text-center">
              <div className="metric-value text-warning">127ms</div>
              <div className="metric-label">Avg Response Time</div>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism">
          <CardContent className="p-6">
            <div className="metric-card text-center">
              <div className="metric-value text-success">0.3%</div>
              <div className="metric-label">Error Rate</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle className="text-white">System Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="alert-item border-l-4 border-warning bg-slate-700/30 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-warning font-medium">High Memory Usage</h4>
                  <p className="text-slate-400 text-sm">Payment Service memory usage is at 89%</p>
                </div>
                <span className="text-xs text-slate-500">5 min ago</span>
              </div>
            </div>

            <div className="alert-item border-l-4 border-info bg-slate-700/30 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-primary font-medium">Service Deployed</h4>
                  <p className="text-slate-400 text-sm">User Service v1.1.0 deployed successfully</p>
                </div>
                <span className="text-xs text-slate-500">15 min ago</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
