package com.microservices.simulator.repository;

import com.microservices.simulator.entity.ApiRoute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApiRouteRepository extends JpaRepository<ApiRoute, Long> {
    
    List<ApiRoute> findByGatewayId(Long gatewayId);
    
    List<ApiRoute> findByTargetService(String targetService);
    
    List<ApiRoute> findByIsActive(Boolean isActive);
    
    @Query("SELECT r FROM ApiRoute r WHERE r.method = :method AND r.path = :path")
    List<ApiRoute> findByMethodAndPath(@Param("method") String method, @Param("path") String path);
    
    @Query("SELECT COUNT(r) FROM ApiRoute r WHERE r.isActive = true")
    long countActiveRoutes();
}
