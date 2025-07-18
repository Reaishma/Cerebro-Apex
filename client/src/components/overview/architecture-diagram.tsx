import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export default function ArchitectureDiagram() {
  const handleRefresh = () => {
    // TODO: Implement refresh logic
    console.log("Refreshing topology...");
  };

  return (
    <Card className="glassmorphism">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-white">Microservices Architecture</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <svg className="w-full h-96" viewBox="0 0 800 400">
            {/* Background Grid */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(148, 163, 184, 0.1)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
            
            {/* API Gateway */}
            <g transform="translate(50, 180)">
              <rect width="120" height="60" rx="8" fill="hsl(14, 100%, 57%)" fillOpacity="0.2" stroke="hsl(14, 100%, 57%)" strokeWidth="2"/>
              <text x="60" y="35" textAnchor="middle" fill="hsl(14, 100%, 57%)" fontSize="12" fontWeight="bold">API Gateway</text>
            </g>
            
            {/* User Service */}
            <g transform="translate(250, 100)">
              <rect width="100" height="50" rx="8" fill="hsl(83, 45%, 49%)" fillOpacity="0.2" stroke="hsl(83, 45%, 49%)" strokeWidth="2"/>
              <text x="50" y="30" textAnchor="middle" fill="hsl(83, 45%, 49%)" fontSize="11" fontWeight="bold">User Service</text>
            </g>
            
            {/* Order Service */}
            <g transform="translate(250, 180)">
              <rect width="100" height="50" rx="8" fill="hsl(83, 45%, 49%)" fillOpacity="0.2" stroke="hsl(83, 45%, 49%)" strokeWidth="2"/>
              <text x="50" y="30" textAnchor="middle" fill="hsl(83, 45%, 49%)" fontSize="11" fontWeight="bold">Order Service</text>
            </g>
            
            {/* Payment Service */}
            <g transform="translate(250, 260)">
              <rect width="100" height="50" rx="8" fill="hsl(83, 45%, 49%)" fillOpacity="0.2" stroke="hsl(83, 45%, 49%)" strokeWidth="2"/>
              <text x="50" y="30" textAnchor="middle" fill="hsl(83, 45%, 49%)" fontSize="11" fontWeight="bold">Payment Service</text>
            </g>
            
            {/* Database */}
            <g transform="translate(450, 150)">
              <ellipse cx="50" cy="40" rx="60" ry="30" fill="hsl(207, 90%, 54%)" fillOpacity="0.2" stroke="hsl(207, 90%, 54%)" strokeWidth="2"/>
              <text x="50" y="45" textAnchor="middle" fill="hsl(207, 90%, 54%)" fontSize="11" fontWeight="bold">Database</text>
            </g>
            
            {/* Message Queue */}
            <g transform="translate(450, 250)">
              <rect width="100" height="50" rx="8" fill="hsl(35, 91%, 52%)" fillOpacity="0.2" stroke="hsl(35, 91%, 52%)" strokeWidth="2"/>
              <text x="50" y="30" textAnchor="middle" fill="hsl(35, 91%, 52%)" fontSize="11" fontWeight="bold">Message Queue</text>
            </g>
            
            {/* Monitoring */}
            <g transform="translate(650, 180)">
              <rect width="100" height="50" rx="8" fill="hsl(14, 83%, 53%)" fillOpacity="0.2" stroke="hsl(14, 83%, 53%)" strokeWidth="2"/>
              <text x="50" y="30" textAnchor="middle" fill="hsl(14, 83%, 53%)" fontSize="11" fontWeight="bold">Monitoring</text>
            </g>
            
            {/* Connection Lines */}
            <line x1="170" y1="210" x2="250" y2="125" stroke="hsl(142, 71%, 45%)" strokeWidth="2" className="connection-line"/>
            <line x1="170" y1="210" x2="250" y2="205" stroke="hsl(142, 71%, 45%)" strokeWidth="2" className="connection-line"/>
            <line x1="170" y1="210" x2="250" y2="285" stroke="hsl(142, 71%, 45%)" strokeWidth="2" className="connection-line"/>
            
            <line x1="350" y1="125" x2="450" y2="175" stroke="hsl(207, 90%, 54%)" strokeWidth="2" className="connection-line"/>
            <line x1="350" y1="205" x2="450" y2="185" stroke="hsl(207, 90%, 54%)" strokeWidth="2" className="connection-line"/>
            <line x1="350" y1="285" x2="450" y2="275" stroke="hsl(35, 91%, 52%)" strokeWidth="2" className="connection-line"/>
            
            <line x1="550" y1="205" x2="650" y2="205" stroke="hsl(14, 83%, 53%)" strokeWidth="2" className="connection-line"/>
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}

