package com.microservices.simulator.repository;

import com.microservices.simulator.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {
    
    List<Activity> findByServiceIdOrderByCreatedAtDesc(Long serviceId);
    
    List<Activity> findByTypeOrderByCreatedAtDesc(String type);
    
    List<Activity> findBySeverityOrderByCreatedAtDesc(String severity);
    
    @Query("SELECT a FROM Activity a ORDER BY a.createdAt DESC")
    List<Activity> findAllOrderByCreatedAtDesc();
    
    @Query("SELECT a FROM Activity a WHERE a.type = :type AND a.serviceId = :serviceId ORDER BY a.createdAt DESC")
    List<Activity> findByTypeAndServiceId(@Param("type") String type, @Param("serviceId") Long serviceId);
}
