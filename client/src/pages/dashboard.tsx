import { useState } from "react";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import StatusCards from "@/components/overview/status-cards";
import ArchitectureDiagram from "@/components/overview/architecture-diagram";
import MetricsCharts from "@/components/overview/metrics-charts";
import ActivityFeed from "@/components/overview/activity-feed";
import ServicesList from "@/components/services/services-list";
import GatewayManagement from "@/components/gateway/gateway-management";
import MonitoringDashboard from "@/components/monitoring/monitoring-dashboard";
import DeploymentPipeline from "@/components/deployment/deployment-pipeline";
import TestingFramework from "@/components/testing/testing-framework";
import TerminalInterface from "@/components/terminal/terminal-interface";
import SpringBootDashboard from "@/components/spring-boot/spring-boot-dashboard";
import { useWebSocket } from "@/hooks/use-websocket";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { isConnected } = useWebSocket();

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <StatusCards />
            <ArchitectureDiagram />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MetricsCharts />
              <ActivityFeed />
            </div>
          </div>
        );
      case "services":
        return <ServicesList />;
      case "spring-boot":
        return <SpringBootDashboard />;
      case "gateway":
        return <GatewayManagement />;
      case "monitoring":
        return <MonitoringDashboard />;
      case "deployment":
        return <DeploymentPipeline />;
      case "testing":
        return <TestingFramework />;
      case "terminal":
        return <TerminalInterface />;
      default:
        return <div>Tab not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header isConnected={isConnected} />
      
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="flex-1 p-6">
          {renderTabContent()}
        </main>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 bg-primary hover:bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

