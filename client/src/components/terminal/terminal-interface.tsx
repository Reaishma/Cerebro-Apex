import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Play } from "lucide-react";

interface TerminalLine {
  id: number;
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp: Date;
}

export default function TerminalInterface() {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 1,
      type: 'command',
      content: '$ docker ps',
      timestamp: new Date()
    },
    {
      id: 2,
      type: 'output',
      content: 'CONTAINER ID   IMAGE                    COMMAND                  CREATED         STATUS         PORTS                    NAMES',
      timestamp: new Date()
    },
    {
      id: 3,
      type: 'output',
      content: '8f2e1a3b4c5d   user-service:latest      "java -jar app.jar"      2 hours ago     Up 2 hours     0.0.0.0:8081->8080/tcp   user-service',
      timestamp: new Date()
    },
    {
      id: 4,
      type: 'output',
      content: '9g3f2a4c5e6f   order-service:latest     "java -jar app.jar"      2 hours ago     Up 2 hours     0.0.0.0:8082->8080/tcp   order-service',
      timestamp: new Date()
    },
    {
      id: 5,
      type: 'output',
      content: '1h4g3b5d6f7g   payment-service:latest   "java -jar app.jar"      2 hours ago     Up 2 hours     0.0.0.0:8083->8080/tcp   payment-service',
      timestamp: new Date()
    },
    {
      id: 6,
      type: 'output',
      content: '2i5h4c6e7g8h   api-gateway:latest       "java -jar app.jar"      2 hours ago     Up 2 hours     0.0.0.0:8080->8080/tcp   api-gateway',
      timestamp: new Date()
    },
    {
      id: 7,
      type: 'command',
      content: '$ kubectl get pods',
      timestamp: new Date()
    },
    {
      id: 8,
      type: 'output',
      content: 'NAME                               READY   STATUS    RESTARTS   AGE',
      timestamp: new Date()
    },
    {
      id: 9,
      type: 'output',
      content: 'user-service-7b8c9d1e2f           1/1     Running   0          2h',
      timestamp: new Date()
    },
    {
      id: 10,
      type: 'output',
      content: 'order-service-8c9d1e2f3g          1/1     Running   0          2h',
      timestamp: new Date()
    },
    {
      id: 11,
      type: 'output',
      content: 'payment-service-9d1e2f3g4h        1/1     Running   0          2h',
      timestamp: new Date()
    },
    {
      id: 12,
      type: 'output',
      content: 'api-gateway-1e2f3g4h5i            1/1     Running   0          2h',
      timestamp: new Date()
    },
    {
      id: 13,
      type: 'command',
      content: '$ curl http://localhost:8080/api/health',
      timestamp: new Date()
    },
    {
      id: 14,
      type: 'output',
      content: '{"status":"UP","services":{"user-service":"UP","order-service":"UP","payment-service":"UP"}}',
      timestamp: new Date()
    }
  ]);
  
  const [currentCommand, setCurrentCommand] = useState('');
  const [lineCounter, setLineCounter] = useState(15);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const executeCommand = (command: string) => {
    if (!command.trim()) return;

    const newLines: TerminalLine[] = [];
    
    // Add the command line
    newLines.push({
      id: lineCounter,
      type: 'command',
      content: `$ ${command}`,
      timestamp: new Date()
    });

    // Simulate command execution
    let output = '';
    let isError = false;

    switch (command.toLowerCase().trim()) {
      case 'docker ps':
        output = 'CONTAINER ID   IMAGE                    COMMAND                  CREATED         STATUS         PORTS                    NAMES\n' +
                '8f2e1a3b4c5d   user-service:latest      "java -jar app.jar"      2 hours ago     Up 2 hours     0.0.0.0:8081->8080/tcp   user-service\n' +
                '9g3f2a4c5e6f   order-service:latest     "java -jar app.jar"      2 hours ago     Up 2 hours     0.0.0.0:8082->8080/tcp   order-service';
        break;
      case 'kubectl get pods':
        output = 'NAME                               READY   STATUS    RESTARTS   AGE\n' +
                'user-service-7b8c9d1e2f           1/1     Running   0          2h\n' +
                'order-service-8c9d1e2f3g          1/1     Running   0          2h';
        break;
      case 'kubectl get services':
        output = 'NAME           TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE\n' +
                'user-service   ClusterIP   10.96.0.1      <none>        8080/TCP   2h\n' +
                'order-service  ClusterIP   10.96.0.2      <none>        8080/TCP   2h';
        break;
      case 'curl http://localhost:8080/api/health':
        output = '{"status":"UP","services":{"user-service":"UP","order-service":"UP","payment-service":"UP"}}';
        break;
      case 'help':
        output = 'Available commands:\n' +
                '  docker ps                           - List running containers\n' +
                '  kubectl get pods                    - List Kubernetes pods\n' +
                '  kubectl get services                - List Kubernetes services\n' +
                '  curl http://localhost:8080/api/health - Check service health\n' +
                '  clear                               - Clear terminal\n' +
                '  help                                - Show this help message';
        break;
      case 'clear':
        setLines([]);
        setLineCounter(1);
        return;
      default:
        output = `Command not found: ${command}\nType 'help' for available commands.`;
        isError = true;
    }

    // Add output lines
    if (output) {
      const outputLines = output.split('\n');
      outputLines.forEach((line, index) => {
        newLines.push({
          id: lineCounter + 1 + index,
          type: isError ? 'error' : 'output',
          content: line,
          timestamp: new Date()
        });
      });
    }

    setLines(prev => [...prev, ...newLines]);
    setLineCounter(prev => prev + newLines.length);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand);
      setCurrentCommand('');
    }
  };

  const clearTerminal = () => {
    setLines([]);
    setLineCounter(1);
  };

  const runCommand = () => {
    if (currentCommand.trim()) {
      executeCommand(currentCommand);
      setCurrentCommand('');
    }
  };

  const getLineClass = (type: string) => {
    switch (type) {
      case 'command':
        return 'text-success';
      case 'error':
        return 'text-destructive';
      default:
        return 'text-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Terminal</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={clearTerminal}
            className="bg-destructive/20 text-destructive border-destructive/30 hover:bg-destructive/30"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={runCommand}
            className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30"
          >
            <Play className="w-4 h-4 mr-2" />
            Run Command
          </Button>
        </div>
      </div>

      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle className="text-white">Interactive Terminal</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            ref={terminalRef}
            className="terminal bg-slate-900 rounded-lg p-4 font-mono text-sm h-96 overflow-y-auto border border-slate-700"
          >
            <div className="space-y-1">
              {lines.map((line) => (
                <div key={line.id} className={getLineClass(line.type)}>
                  {line.content}
                </div>
              ))}
              <div className="flex items-center text-success">
                <span>$ </span>
                <span className="terminal-cursor ml-1">|</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <span className="text-success">$</span>
              <Input
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter command..."
                className="flex-1 bg-slate-800 border-slate-600 text-white font-mono focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

