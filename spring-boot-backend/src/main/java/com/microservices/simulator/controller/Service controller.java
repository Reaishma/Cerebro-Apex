package com.microservices.simulator.controller;

import com.microservices.simulator.entity.Service;
import com.microservices.simulator.service.MicroserviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "*")
public class ServiceController {
    
    @Autowired
    private MicroserviceService microserviceService;
    
    @GetMapping
    public ResponseEntity<List<Service>> getAllServices() {
        List<Service> services = microserviceService.getAllServices();
        return ResponseEntity.ok(services);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Service> getServiceById(@PathVariable Long id) {
        Optional<Service> service = microserviceService.getServiceById(id);
        return service.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Service> createService(@Valid @RequestBody Service service) {
        Service createdService = microserviceService.createService(service);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdService);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Service> updateService(@PathVariable Long id, @Valid @RequestBody Service serviceDetails) {
        try {
            Service updatedService = microserviceService.updateService(id, serviceDetails);
            return ResponseEntity.ok(updatedService);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        microserviceService.deleteService(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Service>> getServicesByType(@PathVariable String type) {
        List<Service> services = microserviceService.getServicesByType(type);
        return ResponseEntity.ok(services);
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Service>> getServicesByStatus(@PathVariable String status) {
        List<Service> services = microserviceService.getServicesByStatus(status);
        return ResponseEntity.ok(services);
    }
    
    @GetMapping("/spring-boot")
    public ResponseEntity<List<Service>> getSpringBootServices() {
        List<Service> services = microserviceService.getSpringBootServices();
        return ResponseEntity.ok(services);
    }
    
    @GetMapping("/stats")
    public ResponseEntity<ServiceStats> getServiceStats() {
        long activeServices = microserviceService.getActiveServiceCount();
        long totalServices = microserviceService.getAllServices().size();
        
        ServiceStats stats = new ServiceStats(activeServices, totalServices);
        return ResponseEntity.ok(stats);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Service>> searchServices(@RequestParam String name) {
        List<Service> services = microserviceService.searchServicesByName(name);
        return ResponseEntity.ok(services);
    }
    
    // Inner class for service statistics
    public static class ServiceStats {
        private long activeServices;
        private long totalServices;
        
        public ServiceStats(long activeServices, long totalServices) {
            this.activeServices = activeServices;
            this.totalServices = totalServices;
        }
        
        public long getActiveServices() { return activeServices; }
        public void setActiveServices(long activeServices) { this.activeServices = activeServices; }
        
        public long getTotalServices() { return totalServices; }
        public void setTotalServices(long totalServices) { this.totalServices = totalServices; }
    }
}
