
package com.microservices.simulator.service;

import com.microservices.simulator.entity.Metric;
import com.microservices.simulator.repository.MetricRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
public class MetricService {
    
    @Autowired
    private MetricRepository metricRepository;
    
    public List<Metric> getAllMetrics() {
        return metricRepository.findAllOrderByTimestampDesc();
    }
    
    public List<Metric> getMetricsByServiceId(Long serviceId) {
        return metricRepository.findByServiceIdOrderByTimestampDesc(serviceId);
    }
    
    public List<Metric> getRecentMetrics(int hours) {
        LocalDateTime since = LocalDateTime.now().minusHours(hours);
        return metricRepository.findByTimestampAfter(since);
    }
    
    public List<Metric> getServiceMetricsSince(Long serviceId, int hours) {
        LocalDateTime since = LocalDateTime.now().minusHours(hours);
        return metricRepository.findByServiceIdAndTimestampAfter(serviceId, since);
    }
    
    public Metric createMetric(Metric metric) {
        return metricRepository.save(metric);
    }
    
    public Optional<Metric> getMetricById(Long id) {
        return metricRepository.findById(id);
    }
    
    public Double getAverageCpuForService(Long serviceId) {
        return metricRepository.findAverageCpuByServiceId(serviceId);
    }
    
    public Double getAverageMemoryForService(Long serviceId) {
        return metricRepository.findAverageMemoryByServiceId(serviceId);
    }
    
    public void deleteMetric(Long id) {
        metricRepository.deleteById(id);
    }
}