
package com.microservices.simulator.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "api_routes")
public class ApiRoute {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Path is required")
    @Column(nullable = false)
    private String path;

    @NotBlank(message = "Method is required")
    @Column(nullable = false)
    private String method;

    @Column(name = "gateway_id")
    @JsonProperty("gatewayId")
    private Long gatewayId;

    @NotBlank(message = "Target service is required")
    @Column(name = "target_service", nullable = false)
    @JsonProperty("targetService")
    private String targetService;

    @Column(name = "is_active")
    @JsonProperty("isActive")
    private Boolean isActive = true;

    @Column(name = "rate_limit")
    @JsonProperty("rateLimit")
    private Integer rateLimit;

    @Column
    private Integer timeout;

    // Constructors
    public ApiRoute() {}

    public ApiRoute(String path, String method, String targetService) {
        this.path = path;
        this.method = method;
        this.targetService = targetService;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPath() { return path; }
    public void setPath(String path) { this.path = path; }

    public String getMethod() { return method; }
    public void setMethod(String method) { this.method = method; }

    public Long getGatewayId() { return gatewayId; }
    public void setGatewayId(Long gatewayId) { this.gatewayId = gatewayId; }

    public String getTargetService() { return targetService; }
    public void setTargetService(String targetService) { this.targetService = targetService; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public Integer getRateLimit() { return rateLimit; }
    public void setRateLimit(Integer rateLimit) { this.rateLimit = rateLimit; }

    public Integer getTimeout() { return timeout; }
    public void setTimeout(Integer timeout) { this.timeout = timeout; }
}