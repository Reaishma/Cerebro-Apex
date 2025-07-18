
package com.microservices.simulator.service;

import com.microservices.simulator.entity.ApiRoute;
import com.microservices.simulator.repository.ApiRouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class ApiRouteService {
    
    @Autowired
    private ApiRouteRepository apiRouteRepository;
    
    public List<ApiRoute> getAllRoutes() {
        return apiRouteRepository.findAll();
    }
    
    public List<ApiRoute> getRoutesByGatewayId(Long gatewayId) {
        return apiRouteRepository.findByGatewayId(gatewayId);
    }
    
    public List<ApiRoute> getRoutesByTargetService(String targetService) {
        return apiRouteRepository.findByTargetService(targetService);
    }
    
    public List<ApiRoute> getActiveRoutes() {
        return apiRouteRepository.findByIsActive(true);
    }
    
    public Optional<ApiRoute> getRouteById(Long id) {
        return apiRouteRepository.findById(id);
    }
    
    public ApiRoute createRoute(ApiRoute route) {
        return apiRouteRepository.save(route);
    }
    
    public ApiRoute updateRoute(Long id, ApiRoute routeDetails) {
        ApiRoute route = apiRouteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("API Route not found with id: " + id));
        
        route.setPath(routeDetails.getPath());
        route.setMethod(routeDetails.getMethod());
        route.setGatewayId(routeDetails.getGatewayId());
        route.setTargetService(routeDetails.getTargetService());
        route.setIsActive(routeDetails.getIsActive());
        route.setRateLimit(routeDetails.getRateLimit());
        route.setTimeout(routeDetails.getTimeout());
        
        return apiRouteRepository.save(route);
    }
    
    public void deleteRoute(Long id) {
        apiRouteRepository.deleteById(id);
    }
    
    public long getActiveRouteCount() {
        return apiRouteRepository.countActiveRoutes();
    }
    
    public List<ApiRoute> findRoutesByMethodAndPath(String method, String path) {
        return apiRouteRepository.findByMethodAndPath(method, path);
    }
}