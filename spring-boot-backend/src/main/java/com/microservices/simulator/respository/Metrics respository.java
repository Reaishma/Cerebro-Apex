package com.microservices.simulator.repository;

import com.microservices.simulator.entity.Metric;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MetricRepository extends JpaRepository<Metric, Long> {
    
    List<Metric> findByServiceIdOrderByTimestampDesc(Long serviceId);
    
    @Query("SELECT m FROM Metric m WHERE m.serviceId = :serviceId AND m.timestamp >= :since ORDER BY m.timestamp DESC")
    List<Metric> findByServiceIdAndTimestampAfter(@Param("serviceId") Long serviceId, @Param("since") LocalDateTime since);
    
    @Query("SELECT m FROM Metric m ORDER BY m.timestamp DESC")
    List<Metric> findAllOrderByTimestampDesc();
    
    @Query("SELECT m FROM Metric m WHERE m.timestamp >= :since ORDER BY m.timestamp DESC")
    List<Metric> findByTimestampAfter(@Param("since") LocalDateTime since);
    
    @Query("SELECT AVG(m.cpu) FROM Metric m WHERE m.serviceId = :serviceId")
    Double findAverageCpuByServiceId(@Param("serviceId") Long serviceId);
    
    @Query("SELECT AVG(m.memory) FROM Metric m WHERE m.serviceId = :serviceId")
    Double findAverageMemoryByServiceId(@Param("serviceId") Long serviceId);
}
