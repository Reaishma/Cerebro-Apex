
package com.microservices.simulator.service;

import com.microservices.simulator.entity.Service;
import com.microservices.simulator.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class MicroserviceService {
    
    @Autowired
    private ServiceRepository serviceRepository;
    
    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }
    
    public Optional<Service> getServiceById(Long id) {
        return serviceRepository.findById(id);
    }
    
    public Service createService(Service service) {
        return serviceRepository.save(service);
    }
    
    public Service updateService(Long id, Service serviceDetails) {
        Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found with id: " + id));
        
        service.setName(serviceDetails.getName());
        service.setType(serviceDetails.getType());
        service.setStatus(serviceDetails.getStatus());
        service.setPort(serviceDetails.getPort());
        service.setCpu(serviceDetails.getCpu());
        service.setMemory(serviceDetails.getMemory());
        service.setInstances(serviceDetails.getInstances());
        service.setVersion(serviceDetails.getVersion());
        service.setSpringBootVersion(serviceDetails.getSpringBootVersion());
        service.setJavaVersion(serviceDetails.getJavaVersion());
        service.setFramework(serviceDetails.getFramework());
        service.setProfiles(serviceDetails.getProfiles());
        service.setActuatorPort(serviceDetails.getActuatorPort());
        service.setConfig(serviceDetails.getConfig());
        
        return serviceRepository.save(service);
    }
    
    public void deleteService(Long id) {
        serviceRepository.deleteById(id);
    }
    
    public List<Service> getServicesByType(String type) {
        return serviceRepository.findByType(type);
    }
    
    public List<Service> getServicesByStatus(String status) {
        return serviceRepository.findByStatus(status);
    }
    
    public List<Service> getSpringBootServices() {
        return serviceRepository.findSpringBootServices();
    }
    
    public long getActiveServiceCount() {
        return serviceRepository.countByStatus("running");
    }
    
    public List<Service> searchServicesByName(String name) {
        return serviceRepository.findByNameContaining(name);
    }
}