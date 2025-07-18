import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, CheckCircle, Clock, AlertTriangle } from "lucide-react";

export default function StatusCards() {
  const { data: stats } = useQuery({
    queryKey: ['/api/stats'],
    refetchInterval: 5000
  });

  const cards = [
    {
      title: "Active Services",
      value: stats?.activeServices || 0,
      icon: CheckCircle,
      color: "text-success",
      bgColor: "bg-success/20",
      trend: "+8.2%",
      trendColor: "text-success"
    },
    {
      title: "API Requests",
      value: stats?.apiRequests || 0,
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/20",
      trend: "+15.3%",
      trendColor: "text-primary"
    },
    {
      title: "Response Time",
      value: stats?.responseTime || "0ms",
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning/20",
      trend: "-12.1%",
      trendColor: "text-success"
    },
    {
      title: "Error Rate",
      value: stats?.errorRate || "0.0%",
      icon: AlertTriangle,
      color: "text-destructive",
      bgColor: "bg-destructive/20",
      trend: "+2.1%",
      trendColor: "text-destructive"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className="glassmorphism service-node">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{card.title}</p>
                  <p className="text-2xl font-bold text-white">{card.value}</p>
                </div>
                <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className={`text-sm ${card.trendColor}`}>{card.trend}</span>
                <span className="text-slate-400 text-sm ml-2">vs last hour</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

