package com.microservices.simulator.controller;

import com.microservices.simulator.entity.ApiRoute;
import com.microservices.simulator.service.ApiRouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/routes")
@CrossOrigin(origins = "*")
public class ApiRouteController {
    
    @Autowired
    private ApiRouteService apiRouteService;
    
    @GetMapping
    public ResponseEntity<List<ApiRoute>> getAllRoutes() {
        List<ApiRoute> routes = apiRouteService.getAllRoutes();
        return ResponseEntity.ok(routes);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiRoute> getRouteById(@PathVariable Long id) {
        Optional<ApiRoute> route = apiRouteService.getRouteById(id);
        return route.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<ApiRoute> createRoute(@Valid @RequestBody ApiRoute route) {
        ApiRoute createdRoute = apiRouteService.createRoute(route);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRoute);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApiRoute> updateRoute(@PathVariable Long id, @Valid @RequestBody ApiRoute routeDetails) {
        try {
            ApiRoute updatedRoute = apiRouteService.updateRoute(id, routeDetails);
            return ResponseEntity.ok(updatedRoute);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoute(@PathVariable Long id) {
        apiRouteService.deleteRoute(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/gateway/{gatewayId}")
    public ResponseEntity<List<ApiRoute>> getRoutesByGatewayId(@PathVariable Long gatewayId) {
        List<ApiRoute> routes = apiRouteService.getRoutesByGatewayId(gatewayId);
        return ResponseEntity.ok(routes);
    }
    
    @GetMapping("/service/{targetService}")
    public ResponseEntity<List<ApiRoute>> getRoutesByTargetService(@PathVariable String targetService) {
        List<ApiRoute> routes = apiRouteService.getRoutesByTargetService(targetService);
        return ResponseEntity.ok(routes);
    }
    
    @GetMapping("/active")
    public ResponseEntity<List<ApiRoute>> getActiveRoutes() {
        List<ApiRoute> routes = apiRouteService.getActiveRoutes();
        return ResponseEntity.ok(routes);
    }
    
    @GetMapping("/stats")
    public ResponseEntity<RouteStats> getRouteStats() {
        long activeRoutes = apiRouteService.getActiveRouteCount();
        long totalRoutes = apiRouteService.getAllRoutes().size();
        
        RouteStats stats = new RouteStats(activeRoutes, totalRoutes);
        return ResponseEntity.ok(stats);
    }
    
    // Inner class for route statistics
    public static class RouteStats {
        private long activeRoutes;
        private long totalRoutes;
        
        public RouteStats(long activeRoutes, long totalRoutes) {
            this.activeRoutes = activeRoutes;
            this.totalRoutes = totalRoutes;
        }
        
        public long getActiveRoutes() { return activeRoutes; }
        public void setActiveRoutes(long activeRoutes) { this.activeRoutes = activeRoutes; }
        
        public long getTotalRoutes() { return totalRoutes; }
        public void setTotalRoutes(long totalRoutes) { this.totalRoutes = totalRoutes; }
    }
}
