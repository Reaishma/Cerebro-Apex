package com.microservices.simulator.controller;

import com.microservices.simulator.entity.Metric;
import com.microservices.simulator.service.MetricService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/metrics")
@CrossOrigin(origins = "*")
public class MetricController {
    
    @Autowired
    private MetricService metricService;
    
    @GetMapping
    public ResponseEntity<List<Metric>> getAllMetrics() {
        List<Metric> metrics = metricService.getAllMetrics();
        return ResponseEntity.ok(metrics);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Metric> getMetricById(@PathVariable Long id) {
        Optional<Metric> metric = metricService.getMetricById(id);
        return metric.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Metric> createMetric(@Valid @RequestBody Metric metric) {
        Metric createdMetric = metricService.createMetric(metric);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMetric);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMetric(@PathVariable Long id) {
        metricService.deleteMetric(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/service/{serviceId}")
    public ResponseEntity<List<Metric>> getMetricsByServiceId(@PathVariable Long serviceId) {
        List<Metric> metrics = metricService.getMetricsByServiceId(serviceId);
        return ResponseEntity.ok(metrics);
    }
    
    @GetMapping("/recent")
    public ResponseEntity<List<Metric>> getRecentMetrics(@RequestParam(defaultValue = "24") int hours) {
        List<Metric> metrics = metricService.getRecentMetrics(hours);
        return ResponseEntity.ok(metrics);
    }
    
    @GetMapping("/latest")
    public ResponseEntity<List<Metric>> getLatestMetrics() {
        List<Metric> metrics = metricService.getRecentMetrics(1);
        return ResponseEntity.ok(metrics);
    }
    
    @GetMapping("/service/{serviceId}/recent")
    public ResponseEntity<List<Metric>> getServiceRecentMetrics(
            @PathVariable Long serviceId,
            @RequestParam(defaultValue = "24") int hours) {
        List<Metric> metrics = metricService.getServiceMetricsSince(serviceId, hours);
        return ResponseEntity.ok(metrics);
    }
    
    @GetMapping("/service/{serviceId}/average")
    public ResponseEntity<MetricAverage> getServiceAverageMetrics(@PathVariable Long serviceId) {
        Double avgCpu = metricService.getAverageCpuForService(serviceId);
        Double avgMemory = metricService.getAverageMemoryForService(serviceId);
        
        MetricAverage average = new MetricAverage(avgCpu, avgMemory);
        return ResponseEntity.ok(average);
    }
    
    // Inner class for metric averages
    public static class MetricAverage {
        private Double averageCpu;
        private Double averageMemory;
        
        public MetricAverage(Double averageCpu, Double averageMemory) {
            this.averageCpu = averageCpu;
            this.averageMemory = averageMemory;
        }
        
        public Double getAverageCpu() { return averageCpu; }
        public void setAverageCpu(Double averageCpu) { this.averageCpu = averageCpu; }
        
        public Double getAverageMemory() { return averageMemory; }
        public void setAverageMemory(Double averageMemory) { this.averageMemory = averageMemory; }
    }
}
