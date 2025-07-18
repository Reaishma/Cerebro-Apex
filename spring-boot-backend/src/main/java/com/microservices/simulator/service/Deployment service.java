
package com.microservices.simulator.service;

import com.microservices.simulator.entity.Deployment;
import com.microservices.simulator.repository.DeploymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
public class DeploymentService {
    
    @Autowired
    private DeploymentRepository deploymentRepository;
    
    public List<Deployment> getAllDeployments() {
        return deploymentRepository.findAllOrderByCreatedAtDesc();
    }
    
    public List<Deployment> getDeploymentsByServiceId(Long serviceId) {
        return deploymentRepository.findByServiceIdOrderByCreatedAtDesc(serviceId);
    }
    
    public List<Deployment> getDeploymentsByStatus(String status) {
        return deploymentRepository.findByStatusOrderByCreatedAtDesc(status);
    }
    
    public Optional<Deployment> getDeploymentById(Long id) {
        return deploymentRepository.findById(id);
    }
    
    public Deployment createDeployment(Deployment deployment) {
        return deploymentRepository.save(deployment);
    }
    
    public Deployment updateDeployment(Long id, Deployment deploymentDetails) {
        Deployment deployment = deploymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Deployment not found with id: " + id));
        
        deployment.setVersion(deploymentDetails.getVersion());
        deployment.setStatus(deploymentDetails.getStatus());
        deployment.setServiceId(deploymentDetails.getServiceId());
        deployment.setStrategy(deploymentDetails.getStrategy());
        deployment.setProgress(deploymentDetails.getProgress());
        
        // Set completion time if deployment is finished
        if ("success".equals(deploymentDetails.getStatus()) || "failed".equals(deploymentDetails.getStatus())) {
            deployment.setCompletedAt(LocalDateTime.now());
        }
        
        return deploymentRepository.save(deployment);
    }
    
    public void deleteDeployment(Long id) {
        deploymentRepository.deleteById(id);
    }
    
    public long getDeploymentCountByStatus(String status) {
        return deploymentRepository.countByStatus(status);
    }
    
    public List<Deployment> getServiceDeploymentsByStatus(Long serviceId, String status) {
        return deploymentRepository.findByServiceIdAndStatus(serviceId, status);
    }
}