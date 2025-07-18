
package com.microservices.simulator.controller;

import com.microservices.simulator.service.MicroserviceService;
import com.microservices.simulator.service.MetricService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.boot.actuate.info.Info;
import org.springframework.boot.actuate.info.InfoContributor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/actuator")
@CrossOrigin(origins = "*")
public class ActuatorController implements HealthIndicator, InfoContributor {
    
    @Autowired
    private MicroserviceService microserviceService;
    
    @Autowired
    private MetricService metricService;
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> healthData = new HashMap<>();
        healthData.put("status", "UP");
        healthData.put("timestamp", LocalDateTime.now());
        
        Map<String, Object> components = new HashMap<>();
        
        // Database health
        Map<String, Object> database = new HashMap<>();
        database.put("status", "UP");
        database.put("details", Map.of("database", "H2", "validationQuery", "SELECT 1"));
        components.put("db", database);
        
        // Disk space health
        Map<String, Object> diskSpace = new HashMap<>();
        diskSpace.put("status", "UP");
        diskSpace.put("details", Map.of("total", 1000000000, "free", 800000000, "threshold", 10485760));
        components.put("diskSpace", diskSpace);
        
        // Services health
        Map<String, Object> services = new HashMap<>();
        long activeServices = microserviceService.getActiveServiceCount();
        services.put("status", activeServices > 0 ? "UP" : "DOWN");
        services.put("details", Map.of("activeServices", activeServices));
        components.put("services", services);
        
        healthData.put("components", components);
        
        return ResponseEntity.ok(healthData);
    }
    
    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> info() {
        Map<String, Object> infoData = new HashMap<>();
        
        // Application info
        Map<String, Object> app = new HashMap<>();
        app.put("name", "Microservices Simulator");
        app.put("version", "1.0.0");
        app.put("description", "Spring Boot Microservices Architecture Simulator");
        app.put("encoding", "UTF-8");
        app.put("java", Map.of("version", "17", "vendor", "Eclipse Adoptium"));
        infoData.put("app", app);
        
        // Build info
        Map<String, Object> build = new HashMap<>();
        build.put("artifact", "microservices-simulator");
        build.put("group", "com.microservices");
        build.put("name", "microservices-simulator");
        build.put("version", "1.0.0");
        build.put("time", LocalDateTime.now().toString());
        infoData.put("build", build);
        
        // Git info (simulated)
        Map<String, Object> git = new HashMap<>();
        git.put("branch", "main");
        git.put("commit", Map.of("id", "abc123def456", "time", LocalDateTime.now().toString()));
        infoData.put("git", git);
        
        return ResponseEntity.ok(infoData);
    }
    
    @GetMapping("/metrics")
    public ResponseEntity<Map<String, Object>> metrics() {
        Map<String, Object> metricsData = new HashMap<>();
        
        // JVM metrics
        Runtime runtime = Runtime.getRuntime();
        Map<String, Object> jvm = new HashMap<>();
        jvm.put("memory.used", runtime.totalMemory() - runtime.freeMemory());
        jvm.put("memory.free", runtime.freeMemory());
        jvm.put("memory.total", runtime.totalMemory());
        jvm.put("memory.max", runtime.maxMemory());
        jvm.put("threads.peak", Thread.activeCount());
        jvm.put("threads.daemon", Thread.activeCount());
        metricsData.put("jvm", jvm);
        
        // HTTP metrics
        Map<String, Object> http = new HashMap<>();
        http.put("server.requests", 1000);
        http.put("server.requests.active", 5);
        metricsData.put("http", http);
        
        // Application metrics
        Map<String, Object> application = new HashMap<>();
        application.put("services.active", microserviceService.getActiveServiceCount());
        application.put("services.total", microserviceService.getAllServices().size());
        application.put("metrics.count", metricService.getAllMetrics().size());
        metricsData.put("application", application);
        
        return ResponseEntity.ok(metricsData);
    }
    
    @GetMapping("/env")
    public ResponseEntity<Map<String, Object>> env() {
        Map<String, Object> envData = new HashMap<>();
        
        // Active profiles
        envData.put("activeProfiles", new String[]{"production"});
        
        // Application properties
        Map<String, Object> applicationProperties = new HashMap<>();
        applicationProperties.put("server.port", 8080);
        applicationProperties.put("spring.application.name", "microservices-simulator");
        applicationProperties.put("spring.profiles.active", "production");
        applicationProperties.put("management.endpoints.web.exposure.include", "*");
        applicationProperties.put("management.endpoint.health.show-details", "always");
        envData.put("applicationConfig", applicationProperties);
        
        // System properties
        Map<String, Object> systemProperties = new HashMap<>();
        systemProperties.put("java.version", System.getProperty("java.version"));
        systemProperties.put("java.vendor", System.getProperty("java.vendor"));
        systemProperties.put("os.name", System.getProperty("os.name"));
        systemProperties.put("os.version", System.getProperty("os.version"));
        envData.put("systemProperties", systemProperties);
        
        return ResponseEntity.ok(envData);
    }
    
    @GetMapping("/beans")
    public ResponseEntity<Map<String, Object>> beans() {
        Map<String, Object> beansData = new HashMap<>();
        
        // Spring Boot configuration beans
        Map<String, Object> contexts = new HashMap<>();
        Map<String, Object> application = new HashMap<>();
        Map<String, Object> beans = new HashMap<>();
        
        // Service beans
        beans.put("microserviceService", Map.of(
            "aliases", new String[]{},
            "scope", "singleton",
            "type", "com.microservices.simulator.service.MicroserviceService",
            "resource", "class path resource [com/microservices/simulator/service/MicroserviceService.class]"
        ));
        
        beans.put("metricService", Map.of(
            "aliases", new String[]{},
            "scope", "singleton",
            "type", "com.microservices.simulator.service.MetricService",
            "resource", "class path resource [com/microservices/simulator/service/MetricService.class]"
        ));
        
        // Repository beans
        beans.put("serviceRepository", Map.of(
            "aliases", new String[]{},
            "scope", "singleton",
            "type", "com.microservices.simulator.repository.ServiceRepository",
            "resource", "JPA repository interface"
        ));
        
        application.put("beans", beans);
        contexts.put("application", application);
        beansData.put("contexts", contexts);
        
        return ResponseEntity.ok(beansData);
    }
    
    @GetMapping("/configprops")
    public ResponseEntity<Map<String, Object>> configprops() {
        Map<String, Object> configData = new HashMap<>();
        
        // Server configuration
        Map<String, Object> server = new HashMap<>();
        server.put("prefix", "server");
        server.put("properties", Map.of(
            "port", 8080,
            "servlet.context-path", "/",
            "servlet.application-display-name", "microservices-simulator"
        ));
        configData.put("server", server);
        
        // Spring configuration
        Map<String, Object> spring = new HashMap<>();
        spring.put("prefix", "spring");
        spring.put("properties", Map.of(
            "application.name", "microservices-simulator",
            "profiles.active", "production",
            "jpa.hibernate.ddl-auto", "update",
            "datasource.url", "jdbc:h2:mem:testdb"
        ));
        configData.put("spring", spring);
        
        // Management configuration
        Map<String, Object> management = new HashMap<>();
        management.put("prefix", "management");
        management.put("properties", Map.of(
            "endpoints.web.exposure.include", "*",
            "endpoint.health.show-details", "always",
            "metrics.export.prometheus.enabled", true
        ));
        configData.put("management", management);
        
        return ResponseEntity.ok(configData);
    }
    
    @Override
    public Health health() {
        return Health.up()
                .withDetail("services", microserviceService.getActiveServiceCount())
                .withDetail("status", "All systems operational")
                .build();
    }
    
    @Override
    public void contribute(Info.Builder builder) {
        builder.withDetail("app", Map.of(
            "name", "Microservices Simulator",
            "version", "1.0.0",
            "description", "Spring Boot Microservices Architecture Simulator"
        ));
    }
}