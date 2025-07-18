
import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { insertServiceSchema, insertMetricSchema, insertDeploymentSchema, insertApiRouteSchema, insertTestResultSchema, insertActivitySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Services endpoints
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const service = await storage.getService(id);
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch service" });
    }
  });

  app.post("/api/services", async (req, res) => {
    try {
      const validatedData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(validatedData);
      
      // Create activity
      await storage.createActivity({
        type: "service_start",
        serviceId: service.id,
        message: `Service ${service.name} created successfully`,
        severity: "success"
      });
      
      res.status(201).json(service);
    } catch (error) {
      res.status(400).json({ error: "Invalid service data" });
    }
  });

  app.put("/api/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const service = await storage.updateService(id, updates);
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ error: "Failed to update service" });
    }
  });

  app.delete("/api/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteService(id);
      if (!deleted) {
        return res.status(404).json({ error: "Service not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete service" });
    }
  });

  // Metrics endpoints
  app.get("/api/metrics", async (req, res) => {
    try {
      const serviceId = req.query.serviceId ? parseInt(req.query.serviceId as string) : undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const metrics = await storage.getMetrics(serviceId, limit);
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch metrics" });
    }
  });

  app.get("/api/metrics/latest", async (req, res) => {
    try {
      const metrics = await storage.getLatestMetrics();
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch latest metrics" });
    }
  });

  app.post("/api/metrics", async (req, res) => {
    try {
      const validatedData = insertMetricSchema.parse(req.body);
      const metric = await storage.createMetric(validatedData);
      res.status(201).json(metric);
    } catch (error) {
      res.status(400).json({ error: "Invalid metric data" });
    }
  });

  // Deployments endpoints
  app.get("/api/deployments", async (req, res) => {
    try {
      const serviceId = req.query.serviceId ? parseInt(req.query.serviceId as string) : undefined;
      const deployments = await storage.getDeployments(serviceId);
      res.json(deployments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch deployments" });
    }
  });

  app.post("/api/deployments", async (req, res) => {
    try {
      const validatedData = insertDeploymentSchema.parse(req.body);
      const deployment = await storage.createDeployment(validatedData);
      
      // Create activity
      await storage.createActivity({
        type: "deployment",
        serviceId: deployment.serviceId || undefined,
        message: `Deployment started for version ${deployment.version}`,
        severity: "info"
      });
      
      res.status(201).json(deployment);
    } catch (error) {
      res.status(400).json({ error: "Invalid deployment data" });
    }
  });

  app.put("/api/deployments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const deployment = await storage.updateDeployment(id, updates);
      if (!deployment) {
        return res.status(404).json({ error: "Deployment not found" });
      }
      res.json(deployment);
    } catch (error) {
      res.status(500).json({ error: "Failed to update deployment" });
    }
  });

  // API Routes endpoints
  app.get("/api/routes", async (req, res) => {
    try {
      const gatewayId = req.query.gatewayId ? parseInt(req.query.gatewayId as string) : undefined;
      const routes = await storage.getApiRoutes(gatewayId);
      res.json(routes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch API routes" });
    }
  });

  app.post("/api/routes", async (req, res) => {
    try {
      const validatedData = insertApiRouteSchema.parse(req.body);
      const route = await storage.createApiRoute(validatedData);
      res.status(201).json(route);
    } catch (error) {
      res.status(400).json({ error: "Invalid API route data" });
    }
  });

  app.put("/api/routes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const route = await storage.updateApiRoute(id, updates);
      if (!route) {
        return res.status(404).json({ error: "API route not found" });
      }
      res.json(route);
    } catch (error) {
      res.status(500).json({ error: "Failed to update API route" });
    }
  });

  app.delete("/api/routes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteApiRoute(id);
      if (!deleted) {
        return res.status(404).json({ error: "API route not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete API route" });
    }
  });

  // Test Results endpoints
  app.get("/api/test-results", async (req, res) => {
    try {
      const serviceId = req.query.serviceId ? parseInt(req.query.serviceId as string) : undefined;
      const results = await storage.getTestResults(serviceId);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch test results" });
    }
  });

  app.get("/api/test-results/latest", async (req, res) => {
    try {
      const results = await storage.getLatestTestResults();
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch latest test results" });
    }
  });

  app.post("/api/test-results", async (req, res) => {
    try {
      const validatedData = insertTestResultSchema.parse(req.body);
      const result = await storage.createTestResult(validatedData);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: "Invalid test result data" });
    }
  });

  // Activities endpoints
  app.get("/api/activities", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const activities = await storage.getActivities(limit);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch activities" });
    }
  });

  app.post("/api/activities", async (req, res) => {
    try {
      const validatedData = insertActivitySchema.parse(req.body);
      const activity = await storage.createActivity(validatedData);
      res.status(201).json(activity);
    } catch (error) {
      res.status(400).json({ error: "Invalid activity data" });
    }
  });

  // Service control endpoints
  app.post("/api/services/:id/start", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const service = await storage.updateService(id, { status: "running" });
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }
      
      await storage.createActivity({
        type: "service_start",
        serviceId: id,
        message: `Service ${service.name} started`,
        severity: "success"
      });
      
      res.json(service);
    } catch (error) {
      res.status(500).json({ error: "Failed to start service" });
    }
  });

  app.post("/api/services/:id/stop", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const service = await storage.updateService(id, { status: "stopped" });
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }
      
      await storage.createActivity({
        type: "service_stop",
        serviceId: id,
        message: `Service ${service.name} stopped`,
        severity: "warning"
      });
      
      res.json(service);
    } catch (error) {
      res.status(500).json({ error: "Failed to stop service" });
    }
  });

  app.post("/api/services/:id/restart", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const service = await storage.updateService(id, { status: "pending" });
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }
      
      // Simulate restart process
      setTimeout(async () => {
        await storage.updateService(id, { status: "running" });
      }, 2000);
      
      await storage.createActivity({
        type: "service_start",
        serviceId: id,
        message: `Service ${service.name} restarting`,
        severity: "info"
      });
      
      res.json(service);
    } catch (error) {
      res.status(500).json({ error: "Failed to restart service" });
    }
  });

  // Statistics endpoint
  app.get("/api/stats", async (req, res) => {
    try {
      const services = await storage.getServices();
      const metrics = await storage.getLatestMetrics();
      const activities = await storage.getActivities(100);
      
      const activeServices = services.filter(s => s.status === "running").length;
      const totalRequests = metrics.reduce((sum, m) => sum + (m.requestCount || 0), 0);
      const avgResponseTime = metrics.length > 0 
        ? Math.round(metrics.reduce((sum, m) => sum + (m.responseTime || 0), 0) / metrics.length)
        : 0;
      const avgErrorRate = metrics.length > 0
        ? (metrics.reduce((sum, m) => sum + (m.errorRate || 0), 0) / metrics.length / 100).toFixed(1)
        : "0.0";
      
      const errorCount = activities.filter(a => a.severity === "error").length;
      
      res.json({
        activeServices,
        apiRequests: totalRequests,
        responseTime: `${avgResponseTime}ms`,
        errorRate: `${avgErrorRate}%`,
        errorCount
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch statistics" });
    }
  });

  // Spring Boot Actuator endpoints simulation
  app.get("/api/actuator/health", async (req, res) => {
    try {
      const services = await storage.getServices();
      const springBootServices = services.filter(s => s.framework === "spring-boot" || s.framework === "spring-cloud");
      
      const healthStatus = springBootServices.every(s => s.status === "running") ? "UP" : "DOWN";
      const components = springBootServices.reduce((acc, service) => {
        acc[service.name.toLowerCase().replace(/\s+/g, '-')] = {
          status: service.status === "running" ? "UP" : "DOWN",
          details: {
            port: service.port,
            instances: service.instances,
            version: service.version,
            springBootVersion: service.springBootVersion,
            javaVersion: service.javaVersion,
            profiles: service.profiles
          }
        };
        return acc;
      }, {} as any);

      res.json({
        status: healthStatus,
        components,
        groups: ["liveness", "readiness"]
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch health status" });
    }
  });

  app.get("/api/actuator/info", async (req, res) => {
    try {
      const services = await storage.getServices();
      const springBootServices = services.filter(s => s.framework === "spring-boot" || s.framework === "spring-cloud");
      
      res.json({
        app: {
          name: "Spring Boot Microservices Architecture",
          version: "1.0.0",
          description: "Microservices architecture built with Spring Boot"
        },
        build: {
          version: "1.0.0",
          artifact: "microservices-architecture",
          name: "Spring Boot Microservices",
          time: "2024-01-15T10:30:00Z",
          group: "com.example"
        },
        git: {
          branch: "main",
          commit: {
            id: "abc123def456",
            time: "2024-01-15T10:00:00Z"
          }
        },
        services: springBootServices.map(s => ({
          name: s.name,
          version: s.version,
          springBootVersion: s.springBootVersion,
          javaVersion: s.javaVersion,
          status: s.status,
          port: s.port,
          actuatorPort: s.actuatorPort
        }))
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch application info" });
    }
  });

  app.get("/api/actuator/metrics", async (req, res) => {
    try {
      const metrics = await storage.getLatestMetrics();
      
      res.json({
        names: [
          "jvm.memory.used",
          "jvm.memory.max", 
          "jvm.gc.memory.allocated",
          "process.cpu.usage",
          "system.cpu.usage",
          "http.server.requests",
          "spring.data.repository.invocations",
          "cache.gets",
          "cache.puts",
          "datasource.active.connections"
        ]
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch metrics" });
    }
  });

  app.get("/api/actuator/env", async (req, res) => {
    try {
      const services = await storage.getServices();
      const springBootServices = services.filter(s => s.framework === "spring-boot" || s.framework === "spring-cloud");
      
      const propertySources = springBootServices.map(service => ({
        name: `${service.name.toLowerCase().replace(/\s+/g, '-')}-application.properties`,
        properties: {
          "server.port": { value: service.port },
          "spring.profiles.active": { value: service.profiles },
          "management.endpoints.web.exposure.include": { value: "*" },
          "management.endpoint.health.show-details": { value: "always" },
          "spring.application.name": { value: service.name },
          "spring.boot.version": { value: service.springBootVersion },
          "java.version": { value: service.javaVersion }
        }
      }));

      res.json({
        activeProfiles: ["production"],
        propertySources
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch environment" });
    }
  });

  app.get("/api/actuator/beans", async (req, res) => {
    try {
      const services = await storage.getServices();
      const springBootServices = services.filter(s => s.framework === "spring-boot" || s.framework === "spring-cloud");
      
      const contexts = springBootServices.reduce((acc, service) => {
        const contextName = service.name.toLowerCase().replace(/\s+/g, '-');
        acc[contextName] = {
          beans: {
            [`${contextName}Controller`]: {
              aliases: [],
              scope: "singleton",
              type: `com.example.${contextName}.controller.${service.name.replace(/\s+/g, '')}Controller`,
              resource: `file [/app/target/classes/com/example/${contextName}/controller/${service.name.replace(/\s+/g, '')}Controller.class]`,
              dependencies: [`${contextName}Service`]
            },
            [`${contextName}Service`]: {
              aliases: [],
              scope: "singleton", 
              type: `com.example.${contextName}.service.${service.name.replace(/\s+/g, '')}Service`,
              resource: `file [/app/target/classes/com/example/${contextName}/service/${service.name.replace(/\s+/g, '')}Service.class]`,
              dependencies: [`${contextName}Repository`]
            },
            [`${contextName}Repository`]: {
              aliases: [],
              scope: "singleton",
              type: `com.example.${contextName}.repository.${service.name.replace(/\s+/g, '')}Repository`,
              resource: `file [/app/target/classes/com/example/${contextName}/repository/${service.name.replace(/\s+/g, '')}Repository.class]`,
              dependencies: []
            }
          }
        };
        return acc;
      }, {} as any);

      res.json({ contexts });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch beans" });
    }
  });

  app.get("/api/actuator/configprops", async (req, res) => {
    try {
      const services = await storage.getServices();
      const springBootServices = services.filter(s => s.framework === "spring-boot" || s.framework === "spring-cloud");
      
      const contexts = springBootServices.reduce((acc, service) => {
        const contextName = service.name.toLowerCase().replace(/\s+/g, '-');
        acc[contextName] = {
          beans: {
            "serverProperties": {
              prefix: "server",
              properties: {
                port: service.port,
                servlet: {
                  contextPath: "/"
                }
              }
            },
            "springDataSourceProperties": {
              prefix: "spring.datasource",
              properties: (service.config as any)?.spring?.datasource || {}
            },
            "managementServerProperties": {
              prefix: "management.server",
              properties: {
                port: service.actuatorPort
              }
            }
          }
        };
        return acc;
      }, {} as any);

      res.json({ contexts });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch configuration properties" });
    }
  });

  const httpServer = createServer(app);

  // WebSocket server setup
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  wss.on('connection', (ws: WebSocket) => {
    console.log('Client connected to WebSocket');

    // Send initial data
    ws.send(JSON.stringify({ type: 'connected', message: 'WebSocket connected' }));

    // Simulate real-time metrics
    const metricsInterval = setInterval(async () => {
      if (ws.readyState === WebSocket.OPEN) {
        try {
          const services = await storage.getServices();
          const stats = await generateRandomStats();
          
          // Generate random metrics for each service
          for (const service of services.filter(s => s.status === "running")) {
            const metric = {
              serviceId: service.id,
              requestCount: Math.floor(Math.random() * 100) + 50,
              responseTime: Math.floor(Math.random() * 200) + 50,
              errorRate: Math.floor(Math.random() * 500), // percentage * 100
              cpu: Math.floor(Math.random() * 50) + 20,
              memory: Math.floor(Math.random() * 40) + 30
            };
            
            await storage.createMetric(metric);
          }
          
          ws.send(JSON.stringify({
            type: 'metrics_update',
            data: stats
          }));
        } catch (error) {
          console.error('Error generating metrics:', error);
        }
      }
    }, 5000);

    // Send service status updates
    const statusInterval = setInterval(async () => {
      if (ws.readyState === WebSocket.OPEN) {
        try {
          const services = await storage.getServices();
          ws.send(JSON.stringify({
            type: 'services_update',
            data: services
          }));
        } catch (error) {
          console.error('Error sending service updates:', error);
        }
      }
    }, 3000);

    ws.on('close', () => {
      console.log('Client disconnected from WebSocket');
      clearInterval(metricsInterval);
      clearInterval(statusInterval);
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      clearInterval(metricsInterval);
      clearInterval(statusInterval);
    });
  });

  async function generateRandomStats() {
    const services = await storage.getServices();
    const metrics = await storage.getLatestMetrics();
    
    const activeServices = services.filter(s => s.status === "running").length;
    const totalRequests = Math.floor(Math.random() * 500) + 1000;
    const responseTime = Math.floor(Math.random() * 50) + 100;
    const errorRate = (Math.random() * 0.5).toFixed(1);
    
    return {
      activeServices,
      apiRequests: totalRequests,
      responseTime: `${responseTime}ms`,
      errorRate: `${errorRate}%`
    };
  }

  return httpServer;
}
