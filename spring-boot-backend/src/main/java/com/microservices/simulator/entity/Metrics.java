package com.microservices.simulator.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;

@Entity
@Table(name = "metrics")
public class Metric {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Double cpu;

    @Column
    private Double memory;

    @Column(name = "service_id")
    @JsonProperty("serviceId")
    private Long serviceId;

    @Column(name = "request_count")
    @JsonProperty("requestCount")
    private Integer requestCount;

    @Column(name = "response_time")
    @JsonProperty("responseTime")
    private Double responseTime;

    @Column(name = "error_rate")
    @JsonProperty("errorRate")
    private Double errorRate;

    @CreationTimestamp
    @Column(name = "timestamp", updatable = false)
    private LocalDateTime timestamp;

    // Constructors
    public Metric() {}

    public Metric(Long serviceId, Double cpu, Double memory) {
        this.serviceId = serviceId;
        this.cpu = cpu;
        this.memory = memory;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Double getCpu() { return cpu; }
    public void setCpu(Double cpu) { this.cpu = cpu; }

    public Double getMemory() { return memory; }
    public void setMemory(Double memory) { this.memory = memory; }

    public Long getServiceId() { return serviceId; }
    public void setServiceId(Long serviceId) { this.serviceId = serviceId; }

    public Integer getRequestCount() { return requestCount; }
    public void setRequestCount(Integer requestCount) { this.requestCount = requestCount; }

    public Double getResponseTime() { return responseTime; }
    public void setResponseTime(Double responseTime) { this.responseTime = responseTime; }

    public Double getErrorRate() { return errorRate; }
    public void setErrorRate(Double errorRate) { this.errorRate = errorRate; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
