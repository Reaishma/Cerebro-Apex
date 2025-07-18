
import { 
  services, metrics, deployments, apiRoutes, testResults, activities,
  type Service, type InsertService, type Metric, type InsertMetric,
  type Deployment, type InsertDeployment, type ApiRoute, type InsertApiRoute,
  type TestResult, type InsertTestResult, type Activity, type InsertActivity
} from "@shared/schema";

export interface IStorage {
  // Services
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, updates: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: number): Promise<boolean>;

  // Metrics
  getMetrics(serviceId?: number, limit?: number): Promise<Metric[]>;
  createMetric(metric: InsertMetric): Promise<Metric>;
  getLatestMetrics(): Promise<Metric[]>;

  // Deployments
  getDeployments(serviceId?: number): Promise<Deployment[]>;
  createDeployment(deployment: InsertDeployment): Promise<Deployment>;
  updateDeployment(id: number, updates: Partial<InsertDeployment>): Promise<Deployment | undefined>;

  // API Routes
  getApiRoutes(gatewayId?: number): Promise<ApiRoute[]>;
  createApiRoute(route: InsertApiRoute): Promise<ApiRoute>;
  updateApiRoute(id: number, updates: Partial<InsertApiRoute>): Promise<ApiRoute | undefined>;
  deleteApiRoute(id: number): Promise<boolean>;

  // Test Results
  getTestResults(serviceId?: number): Promise<TestResult[]>;
  createTestResult(result: InsertTestResult): Promise<TestResult>;
  getLatestTestResults(): Promise<TestResult[]>;

  // Activities
  getActivities(limit?: number): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
}

export class MemStorage implements IStorage {
  private services: Map<number, Service> = new Map();
  private metrics: Map<number, Metric> = new Map();
  private deployments: Map<number, Deployment> = new Map();
  private apiRoutes: Map<number, ApiRoute> = new Map();
  private testResults: Map<number, TestResult> = new Map();
  private activities: Map<number, Activity> = new Map();
  
  private currentServiceId = 1;
  private currentMetricId = 1;
  private currentDeploymentId = 1;
  private currentApiRouteId = 1;
  private currentTestResultId = 1;
  private currentActivityId = 1;

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize with Spring Boot microservices
    const defaultServices: InsertService[] = [
      {
        name: "API Gateway",
        type: "gateway",
        status: "running",
        port: 8080,
        cpu: 25,
        memory: 45,
        instances: 2,
        version: "1.2.0",
        springBootVersion: "3.2.0",
        javaVersion: "17",
        framework: "spring-cloud",
        profiles: "production",
        actuatorPort: 8081,
        config: { 
          rateLimit: 1000, 
          timeout: 30000,
          eureka: { client: { enabled: true } },
          management: { endpoints: { web: { exposure: { include: "*" } } } }
        }
      },
      {
        name: "User Service",
        type: "microservice",
        status: "running",
        port: 8082,
        cpu: 45,
        memory: 67,
        instances: 3,
        version: "1.1.0",
        springBootVersion: "3.2.0",
        javaVersion: "17",
        framework: "spring-boot",
        profiles: "production",
        actuatorPort: 8083,
        config: { 
          database: "users_db",
          spring: { 
            datasource: { url: "jdbc:postgresql://localhost:5432/users_db" },
            jpa: { hibernate: { ddl_auto: "validate" } }
          }
        }
      },
      {
        name: "Order Service",
        type: "microservice",
        status: "running",
        port: 8084,
        cpu: 23,
        memory: 45,
        instances: 2,
        version: "1.0.5",
        springBootVersion: "3.1.5",
        javaVersion: "17",
        framework: "spring-boot",
        profiles: "production",
        actuatorPort: 8085,
        config: { 
          database: "orders_db",
          spring: { 
            datasource: { url: "jdbc:postgresql://localhost:5432/orders_db" },
            kafka: { bootstrap_servers: "localhost:9092" }
          }
        }
      },
      {
        name: "Payment Service",
        type: "microservice",
        status: "running",
        port: 8086,
        cpu: 78,
        memory: 89,
        instances: 2,
        version: "1.0.3",
        springBootVersion: "3.2.0",
        javaVersion: "17",
        framework: "spring-boot",
        profiles: "production",
        actuatorPort: 8087,
        config: { 
          provider: "stripe",
          spring: { 
            datasource: { url: "jdbc:postgresql://localhost:5432/payments_db" },
            security: { oauth2: { enabled: true } }
          }
        }
      },
      {
        name: "Database",
        type: "database",
        status: "running",
        port: 5432,
        cpu: 35,
        memory: 60,
        instances: 1,
        version: "14.0",
        springBootVersion: null,
        javaVersion: null,
        framework: "postgresql",
        profiles: "production",
        actuatorPort: null,
        config: { type: "postgresql", max_connections: 200 }
      },
      {
        name: "Message Queue",
        type: "queue",
        status: "running",
        port: 9092,
        cpu: 15,
        memory: 30,
        instances: 1,
        version: "3.6.0",
        springBootVersion: null,
        javaVersion: null,
        framework: "kafka",
        profiles: "production",
        actuatorPort: null,
        config: { type: "kafka", partitions: 3, replication_factor: 1 }
      },
      {
        name: "Service Discovery",
        type: "monitoring",
        status: "running",
        port: 8761,
        cpu: 20,
        memory: 40,
        instances: 1,
        version: "2023.0.0",
        springBootVersion: "3.2.0",
        javaVersion: "17",
        framework: "spring-cloud",
        profiles: "production",
        actuatorPort: 8762,
        config: { 
          type: "eureka",
          eureka: { 
            client: { register_with_eureka: false, fetch_registry: false },
            server: { enable_self_preservation: false }
          }
        }
      }
    ];

    defaultServices.forEach(service => {
      this.createService(service);
    });
  }

  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = this.currentServiceId++;
    const service: Service = {
      id,
      name: insertService.name,
      type: insertService.type,
      status: insertService.status,
      port: insertService.port ?? null,
      cpu: insertService.cpu ?? null,
      memory: insertService.memory ?? null,
      instances: insertService.instances ?? null,
      version: insertService.version ?? null,
      springBootVersion: insertService.springBootVersion ?? null,
      javaVersion: insertService.javaVersion ?? null,
      framework: insertService.framework ?? null,
      profiles: insertService.profiles ?? null,
      actuatorPort: insertService.actuatorPort ?? null,
      config: insertService.config ?? null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.services.set(id, service);
    return service;
  }

  async updateService(id: number, updates: Partial<InsertService>): Promise<Service | undefined> {
    const service = this.services.get(id);
    if (!service) return undefined;

    const updatedService: Service = {
      ...service,
      ...updates,
      updatedAt: new Date()
    };
    this.services.set(id, updatedService);
    return updatedService;
  }

  async deleteService(id: number): Promise<boolean> {
    return this.services.delete(id);
  }

  async getMetrics(serviceId?: number, limit: number = 50): Promise<Metric[]> {
    let metrics = Array.from(this.metrics.values());
    if (serviceId) {
      metrics = metrics.filter(m => m.serviceId === serviceId);
    }
    return metrics.slice(-limit);
  }

  async createMetric(insertMetric: InsertMetric): Promise<Metric> {
    const id = this.currentMetricId++;
    const metric: Metric = {
      id,
      cpu: insertMetric.cpu ?? null,
      memory: insertMetric.memory ?? null,
      serviceId: insertMetric.serviceId ?? null,
      requestCount: insertMetric.requestCount ?? null,
      responseTime: insertMetric.responseTime ?? null,
      errorRate: insertMetric.errorRate ?? null,
      timestamp: new Date()
    };
    this.metrics.set(id, metric);
    return metric;
  }

  async getLatestMetrics(): Promise<Metric[]> {
    const serviceIds = Array.from(this.services.keys());
    const latestMetrics: Metric[] = [];

    for (const serviceId of serviceIds) {
      const serviceMetrics = Array.from(this.metrics.values())
        .filter(m => m.serviceId === serviceId)
        .sort((a, b) => b.timestamp!.getTime() - a.timestamp!.getTime());
      
      if (serviceMetrics.length > 0) {
        latestMetrics.push(serviceMetrics[0]);
      }
    }

    return latestMetrics;
  }

  async getDeployments(serviceId?: number): Promise<Deployment[]> {
    let deployments = Array.from(this.deployments.values());
    if (serviceId) {
      deployments = deployments.filter(d => d.serviceId === serviceId);
    }
    return deployments;
  }

  async createDeployment(insertDeployment: InsertDeployment): Promise<Deployment> {
    const id = this.currentDeploymentId++;
    const deployment: Deployment = {
      id,
      version: insertDeployment.version,
      status: insertDeployment.status,
      serviceId: insertDeployment.serviceId ?? null,
      strategy: insertDeployment.strategy ?? null,
      progress: insertDeployment.progress ?? null,
      createdAt: new Date(),
      completedAt: null
    };
    this.deployments.set(id, deployment);
    return deployment;
  }

  async updateDeployment(id: number, updates: Partial<InsertDeployment>): Promise<Deployment | undefined> {
    const deployment = this.deployments.get(id);
    if (!deployment) return undefined;

    const updatedDeployment: Deployment = {
      ...deployment,
      ...updates,
      completedAt: updates.status === 'success' || updates.status === 'failed' ? new Date() : deployment.completedAt
    };
    this.deployments.set(id, updatedDeployment);
    return updatedDeployment;
  }

  async getApiRoutes(gatewayId?: number): Promise<ApiRoute[]> {
    let routes = Array.from(this.apiRoutes.values());
    if (gatewayId) {
      routes = routes.filter(r => r.gatewayId === gatewayId);
    }
    return routes;
  }

  async createApiRoute(insertRoute: InsertApiRoute): Promise<ApiRoute> {
    const id = this.currentApiRouteId++;
    const route: ApiRoute = {
      id,
      path: insertRoute.path,
      method: insertRoute.method,
      targetService: insertRoute.targetService,
      gatewayId: insertRoute.gatewayId ?? null,
      isActive: insertRoute.isActive ?? null,
      rateLimit: insertRoute.rateLimit ?? null,
      timeout: insertRoute.timeout ?? null
    };
    this.apiRoutes.set(id, route);
    return route;
  }

  async updateApiRoute(id: number, updates: Partial<InsertApiRoute>): Promise<ApiRoute | undefined> {
    const route = this.apiRoutes.get(id);
    if (!route) return undefined;

    const updatedRoute: ApiRoute = {
      ...route,
      ...updates
    };
    this.apiRoutes.set(id, updatedRoute);
    return updatedRoute;
  }

  async deleteApiRoute(id: number): Promise<boolean> {
    return this.apiRoutes.delete(id);
  }

  async getTestResults(serviceId?: number): Promise<TestResult[]> {
    let results = Array.from(this.testResults.values());
    if (serviceId) {
      results = results.filter(r => r.serviceId === serviceId);
    }
    return results;
  }

  async createTestResult(insertResult: InsertTestResult): Promise<TestResult> {
    const id = this.currentTestResultId++;
    const result: TestResult = {
      id,
      framework: insertResult.framework,
      testType: insertResult.testType,
      serviceId: insertResult.serviceId ?? null,
      passed: insertResult.passed ?? null,
      failed: insertResult.failed ?? null,
      coverage: insertResult.coverage ?? null,
      duration: insertResult.duration ?? null,
      createdAt: new Date()
    };
    this.testResults.set(id, result);
    return result;
  }

  async getLatestTestResults(): Promise<TestResult[]> {
    const serviceIds = Array.from(this.services.keys());
    const latestResults: TestResult[] = [];

    for (const serviceId of serviceIds) {
      const serviceResults = Array.from(this.testResults.values())
        .filter(r => r.serviceId === serviceId)
        .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
      
      if (serviceResults.length > 0) {
        latestResults.push(serviceResults[0]);
      }
    }

    return latestResults;
  }

  async getActivities(limit: number = 20): Promise<Activity[]> {
    return Array.from(this.activities.values())
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime())
      .slice(0, limit);
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const id = this.currentActivityId++;
    const activity: Activity = {
      id,
      type: insertActivity.type,
      message: insertActivity.message,
      serviceId: insertActivity.serviceId ?? null,
      severity: insertActivity.severity ?? null,
      createdAt: new Date()
    };
    this.activities.set(id, activity);
    return activity;
  }
}

export const storage = new MemStorage();
