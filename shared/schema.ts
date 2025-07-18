
import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'microservice', 'gateway', 'database', 'queue', 'monitoring'
  status: text("status").notNull(), // 'running', 'stopped', 'pending', 'error'
  port: integer("port"),
  cpu: integer("cpu").default(0), // percentage
  memory: integer("memory").default(0), // percentage
  instances: integer("instances").default(1),
  version: text("version").default("1.0.0"),
  springBootVersion: text("spring_boot_version").default("3.2.0"),
  javaVersion: text("java_version").default("17"),
  framework: text("framework").default("spring-boot"), // 'spring-boot', 'spring-cloud', 'express'
  profiles: text("profiles").default("production"), // 'dev', 'test', 'staging', 'production'
  actuatorPort: integer("actuator_port"),
  config: jsonb("config"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const metrics = pgTable("metrics", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").references(() => services.id),
  timestamp: timestamp("timestamp").defaultNow(),
  requestCount: integer("request_count").default(0),
  responseTime: integer("response_time").default(0), // in milliseconds
  errorRate: integer("error_rate").default(0), // percentage * 100
  cpu: integer("cpu").default(0),
  memory: integer("memory").default(0)
});

export const deployments = pgTable("deployments", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").references(() => services.id),
  version: text("version").notNull(),
  status: text("status").notNull(), // 'pending', 'running', 'success', 'failed'
  strategy: text("strategy").default("rolling"), // 'rolling', 'blue-green', 'canary'
  progress: integer("progress").default(0), // percentage
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at")
});

export const apiRoutes = pgTable("api_routes", {
  id: serial("id").primaryKey(),
  gatewayId: integer("gateway_id").references(() => services.id),
  path: text("path").notNull(),
  method: text("method").notNull(),
  targetService: text("target_service").notNull(),
  isActive: boolean("is_active").default(true),
  rateLimit: integer("rate_limit"),
  timeout: integer("timeout").default(30000)
});

export const testResults = pgTable("test_results", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id").references(() => services.id),
  framework: text("framework").notNull(), // 'jest', 'mocha', 'cypress'
  testType: text("test_type").notNull(), // 'unit', 'integration', 'e2e'
  passed: integer("passed").default(0),
  failed: integer("failed").default(0),
  coverage: integer("coverage").default(0), // percentage
  duration: integer("duration").default(0), // milliseconds
  createdAt: timestamp("created_at").defaultNow()
});

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'deployment', 'service_start', 'service_stop', 'alert'
  serviceId: integer("service_id").references(() => services.id),
  message: text("message").notNull(),
  severity: text("severity").default("info"), // 'info', 'warning', 'error', 'success'
  createdAt: timestamp("created_at").defaultNow()
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const insertMetricSchema = createInsertSchema(metrics).omit({
  id: true,
  timestamp: true
});

export const insertDeploymentSchema = createInsertSchema(deployments).omit({
  id: true,
  createdAt: true,
  completedAt: true
});

export const insertApiRouteSchema = createInsertSchema(apiRoutes).omit({
  id: true
});

export const insertTestResultSchema = createInsertSchema(testResults).omit({
  id: true,
  createdAt: true
});

export const insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
  createdAt: true
});

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Metric = typeof metrics.$inferSelect;
export type InsertMetric = z.infer<typeof insertMetricSchema>;
export type Deployment = typeof deployments.$inferSelect;
export type InsertDeployment = z.infer<typeof insertDeploymentSchema>;
export type ApiRoute = typeof apiRoutes.$inferSelect;
export type InsertApiRoute = z.infer<typeof insertApiRouteSchema>;
export type TestResult = typeof testResults.$inferSelect;
export type InsertTestResult = z.infer<typeof insertTestResultSchema>;
export type Activity = typeof activities.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;
