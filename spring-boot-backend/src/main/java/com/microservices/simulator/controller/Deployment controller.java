package com.microservices.simulator.controller;

import com.microservices.simulator.entity.Deployment;
import com.microservices.simulator.service.DeploymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/deployments")
@CrossOrigin(origins = "*")
public class DeploymentController {
    
    @Autowired
    private DeploymentService deploymentService;
    
    @GetMapping
    public ResponseEntity<List<Deployment>> getAllDeployments() {
        List<Deployment> deployments = deploymentService.getAllDeployments();
        return ResponseEntity.ok(deployments);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Deployment> getDeploymentById(@PathVariable Long id) {
        Optional<Deployment> deployment = deploymentService.getDeploymentById(id);
        return deployment.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Deployment> createDeployment(@Valid @RequestBody Deployment deployment) {
        Deployment createdDeployment = deploymentService.createDeployment(deployment);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDeployment);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Deployment> updateDeployment(@PathVariable Long id, @Valid @RequestBody Deployment deploymentDetails) {
        try {
            Deployment updatedDeployment = deploymentService.updateDeployment(id, deploymentDetails);
            return ResponseEntity.ok(updatedDeployment);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDeployment(@PathVariable Long id) {
        deploymentService.deleteDeployment(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/service/{serviceId}")
    public ResponseEntity<List<Deployment>> getDeploymentsByServiceId(@PathVariable Long serviceId) {
        List<Deployment> deployments = deploymentService.getDeploymentsByServiceId(serviceId);
        return ResponseEntity.ok(deployments);
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Deployment>> getDeploymentsByStatus(@PathVariable String status) {
        List<Deployment> deployments = deploymentService.getDeploymentsByStatus(status);
        return ResponseEntity.ok(deployments);
    }
    
    @GetMapping("/stats")
    public ResponseEntity<DeploymentStats> getDeploymentStats() {
        long successCount = deploymentService.getDeploymentCountByStatus("success");
        long failedCount = deploymentService.getDeploymentCountByStatus("failed");
        long inProgressCount = deploymentService.getDeploymentCountByStatus("in-progress");
        
        DeploymentStats stats = new DeploymentStats(successCount, failedCount, inProgressCount);
        return ResponseEntity.ok(stats);
    }
    
    // Inner class for deployment statistics
    public static class DeploymentStats {
        private long successCount;
        private long failedCount;
        private long inProgressCount;
        
        public DeploymentStats(long successCount, long failedCount, long inProgressCount) {
            this.successCount = successCount;
            this.failedCount = failedCount;
            this.inProgressCount = inProgressCount;
        }
        
        public long getSuccessCount() { return successCount; }
        public void setSuccessCount(long successCount) { this.successCount = successCount; }
        
        public long getFailedCount() { return failedCount; }
        public void setFailedCount(long failedCount) { this.failedCount = failedCount; }
        
        public long getInProgressCount() { return inProgressCount; }
        public void setInProgressCount(long inProgressCount) { this.inProgressCount = inProgressCount; }
    }
}
