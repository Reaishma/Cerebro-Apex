
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

export default function ActivityFeed() {
  const { data: activities = [] } = useQuery({
    queryKey: ['/api/activities'],
    refetchInterval: 10000
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'success':
        return 'bg-success';
      case 'warning':
        return 'bg-warning';
      case 'error':
        return 'bg-destructive';
      default:
        return 'bg-primary';
    }
  };

  return (
    <Card className="glassmorphism">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.length === 0 ? (
            <div className="text-center text-slate-400 py-8">
              No recent activities
            </div>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 bg-slate-700/30 rounded-lg">
                <div className={`w-2 h-2 ${getSeverityColor(activity.severity)} rounded-full mt-2 flex-shrink-0`}></div>
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.message}</p>
                  <p className="text-slate-400 text-xs">
                    {activity.createdAt ? formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true }) : 'Just now'}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
