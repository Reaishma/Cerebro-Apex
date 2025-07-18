
package com.microservices.simulator.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.annotations.CreationTimestamp;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;

@Entity
@Table(name = "test_results")
public class TestResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Framework is required")
    @Column(nullable = false)
    private String framework;

    @NotBlank(message = "Test type is required")
    @Column(name = "test_type", nullable = false)
    @JsonProperty("testType")
    private String testType;

    @Column(name = "service_id")
    @JsonProperty("serviceId")
    private Long serviceId;

    @Column
    private Integer passed;

    @Column
    private Integer failed;

    @Column
    private Double coverage;

    @Column
    private Integer duration;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    @JsonProperty("createdAt")
    private LocalDateTime createdAt;

    // Constructors
    public TestResult() {}

    public TestResult(String framework, String testType, Long serviceId) {
        this.framework = framework;
        this.testType = testType;
        this.serviceId = serviceId;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFramework() { return framework; }
    public void setFramework(String framework) { this.framework = framework; }

    public String getTestType() { return testType; }
    public void setTestType(String testType) { this.testType = testType; }

    public Long getServiceId() { return serviceId; }
    public void setServiceId(Long serviceId) { this.serviceId = serviceId; }

    public Integer getPassed() { return passed; }
    public void setPassed(Integer passed) { this.passed = passed; }

    public Integer getFailed() { return failed; }
    public void setFailed(Integer failed) { this.failed = failed; }

    public Double getCoverage() { return coverage; }
    public void setCoverage(Double coverage) { this.coverage = coverage; }

    public Integer getDuration() { return duration; }
    public void setDuration(Integer duration) { this.duration = duration; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}