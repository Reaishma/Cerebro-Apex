package com.microservices.simulator.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.annotations.CreationTimestamp;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;

@Entity
@Table(name = "activities")
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Type is required")
    @Column(nullable = false)
    private String type;

    @NotBlank(message = "Message is required")
    @Column(nullable = false)
    private String message;

    @Column(name = "service_id")
    @JsonProperty("serviceId")
    private Long serviceId;

    @Column
    private String severity;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    @JsonProperty("createdAt")
    private LocalDateTime createdAt;

    // Constructors
    public Activity() {}

    public Activity(String type, String message) {
        this.type = type;
        this.message = message;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Long getServiceId() { return serviceId; }
    public void setServiceId(Long serviceId) { this.serviceId = serviceId; }

    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
