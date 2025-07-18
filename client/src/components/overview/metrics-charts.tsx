
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createRequestChart } from "@/lib/chart-config";

export default function MetricsCharts() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);

  const { data: metrics } = useQuery({
    queryKey: ['/api/metrics/latest'],
    refetchInterval: 5000
  });

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      chartInstance.current = createRequestChart(chartRef.current);
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <Card className="glassmorphism">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">Request Volume</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-64">
          <canvas ref={chartRef}></canvas>
        </div>
      </CardContent>
    </Card>
  );
}
