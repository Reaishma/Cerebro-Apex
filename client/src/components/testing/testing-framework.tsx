
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, CheckCircle, XCircle, Clock } from "lucide-react";

export default function TestingFramework() {
  const { data: testResults = [] } = useQuery({
    queryKey: ['/api/test-results/latest']
  });

  const frameworks = [
    {
      name: "Jest",
      type: "Unit Testing",
      status: "active",
      color: "jest-color",
      tests: { passed: 124, failed: 2, total: 126 },
      coverage: 85
    },
    {
      name: "Mocha",
      type: "Integration Testing", 
      status: "active",
      color: "mocha-color",
      tests: { passed: 45, failed: 1, total: 46 },
      coverage: 78
    },
    {
      name: "Cypress",
      type: "E2E Testing",
      status: "pending",
      color: "cypress-color", 
      tests: { passed: 23, failed: 0, total: 23 },
      coverage: 92
    }
  ];

  const getTestIcon = (type: string) => {
    switch (type) {
      case 'passed':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4 text-warning" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Testing Framework</h2>
        <Button className="bg-primary hover:bg-blue-600">
          <Play className="w-4 h-4 mr-2" />
          Run All Tests
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {frameworks.map((framework) => (
          <Card key={framework.name} className="glassmorphism test-framework">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">{framework.name}</CardTitle>
                <Badge className={framework.status === 'active' ? 'bg-success text-white' : 'bg-warning text-white'}>
                  {framework.status}
                </Badge>
              </div>
              <p className="text-slate-400 text-sm">{framework.type}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Tests</span>
                  <span className="text-white">{framework.tests.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Passed</span>
                  <span className="text-success">{framework.tests.passed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Failed</span>
                  <span className="text-destructive">{framework.tests.failed}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Coverage</span>
                  <span className="text-white">{framework.coverage}%</span>
                </div>
                <div className="coverage-bar">
                  <div 
                    className="coverage-fill" 
                    style={{ width: `${framework.coverage}%` }}
                  ></div>
                </div>
              </div>

              <Button 
                size="sm" 
                variant="outline" 
                className="w-full bg-primary/20 text-primary border-primary/30 hover:bg-primary/30"
              >
                <Play className="w-3 h-3 mr-2" />
                Run {framework.name} Tests
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle className="text-white">Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="test-console">
            <div className="space-y-2">
              <div className="test-result test-pass">
                ✓ User Service - Authentication tests passed (125ms)
              </div>
              <div className="test-result test-pass">
                ✓ Order Service - Order creation tests passed (89ms)
              </div>
              <div className="test-result test-fail">
                ✗ Payment Service - Payment processing test failed (245ms)
              </div>
              <div className="test-result test-pending">
                ⋯ Gateway Service - Load balancing tests running...
              </div>
              <div className="test-result test-pass">
                ✓ Database - Connection pool tests passed (67ms)
              </div>
              <div className="test-result test-pass">
                ✓ Message Queue - Message delivery tests passed (134ms)
              </div>
              <div className="text-slate-400 mt-4">
                Test run completed: 5 passed, 1 failed, 1 pending
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle className="text-white">Test Coverage Report</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Overall Coverage</span>
                <span className="text-white font-bold">85.2%</span>
              </div>
              <Progress value={85.2} className="h-3" />
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">192</div>
                  <div className="text-sm text-slate-400">Lines Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-destructive">34</div>
                  <div className="text-sm text-slate-400">Lines Uncovered</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle className="text-white">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Test Time</span>
                <span className="text-white">2.34s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Avg Test Duration</span>
                <span className="text-white">125ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Slowest Test</span>
                <span className="text-warning">245ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Test Success Rate</span>
                <span className="text-success">96.7%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
