import { 
  LayoutDashboard, 
  Server, 
  Terminal, 
  Activity, 
  Upload, 
  CheckCircle,
  ArrowDown,
  RotateCcw,
  Coffee,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "services", label: "Microservices", icon: Server },
  { id: "spring-boot", label: "Spring Boot", icon: Coffee },
  { id: "gateway", label: "API Gateway", icon: Shield },
  { id: "monitoring", label: "Monitoring", icon: Activity },
  { id: "deployment", label: "Deployment", icon: Upload },
  { id: "testing", label: "Testing", icon: CheckCircle },
  { id: "terminal", label: "Terminal", icon: Terminal }
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="w-64 glassmorphism border-r border-slate-700/50 min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <li key={tab.id}>
                <button
                  onClick={() => onTabChange(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
        
        <div className="mt-8 pt-4 border-t border-slate-700">
          <h3 className="text-sm font-medium text-slate-400 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start bg-success/20 text-success border-success/30 hover:bg-success/30"
            >
              <ArrowDown className="w-4 h-4 mr-2" />
              Deploy All
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start bg-warning/20 text-warning border-warning/30 hover:bg-warning/30"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Restart All
            </Button>
          </div>
        </div>
      </nav>
    </aside>
  );
}

