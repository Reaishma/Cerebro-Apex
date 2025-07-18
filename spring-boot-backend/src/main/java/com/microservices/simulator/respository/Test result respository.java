
package com.microservices.simulator.repository;

import com.microservices.simulator.entity.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestResultRepository extends JpaRepository<TestResult, Long> {
    
    List<TestResult> findByServiceIdOrderByCreatedAtDesc(Long serviceId);
    
    List<TestResult> findByFrameworkOrderByCreatedAtDesc(String framework);
    
    List<TestResult> findByTestTypeOrderByCreatedAtDesc(String testType);
    
    @Query("SELECT t FROM TestResult t ORDER BY t.createdAt DESC")
    List<TestResult> findAllOrderByCreatedAtDesc();
    
    @Query("SELECT AVG(t.coverage) FROM TestResult t WHERE t.serviceId = :serviceId")
    Double findAverageCoverageByServiceId(@Param("serviceId") Long serviceId);
    
    @Query("SELECT SUM(t.passed) FROM TestResult t WHERE t.serviceId = :serviceId")
    Integer getTotalPassedByServiceId(@Param("serviceId") Long serviceId);
    
    @Query("SELECT SUM(t.failed) FROM TestResult t WHERE t.serviceId = :serviceId")
    Integer getTotalFailedByServiceId(@Param("serviceId") Long serviceId);
}