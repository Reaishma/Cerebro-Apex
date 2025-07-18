package com.microservices.simulator.repository;

import com.microservices.simulator.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
    
    List<Service> findByType(String type);
    
    List<Service> findByStatus(String status);
    
    List<Service> findByTypeAndStatus(String type, String status);
    
    @Query("SELECT s FROM Service s WHERE s.springBootVersion IS NOT NULL")
    List<Service> findSpringBootServices();
    
    @Query("SELECT COUNT(s) FROM Service s WHERE s.status = :status")
    long countByStatus(@Param("status") String status);
    
    @Query("SELECT s FROM Service s WHERE s.name LIKE %:name%")
    List<Service> findByNameContaining(@Param("name") String name);
}
