
package com.microservices.simulator.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;

@Entity
@Table(name = "services")
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Service name is required")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "Service type is required")
    @Column(nullable = false)
    private String type;

    @NotBlank(message = "Service status is required")
    @Column(nullable = false)
    private String status;

    @Column
    private Integer port;

    @Column
    private Double cpu;

    @Column
    private Double memory;

    @Column
    private Integer instances;

    @Column
    private String version;

    @Column(name = "spring_boot_version")
    @JsonProperty("springBootVersion")
    private String springBootVersion;

    @Column(name = "java_version")
    @JsonProperty("javaVersion")
    private String javaVersion;

    @Column
    private String framework;

    @Column
    private String profiles;

    @Column(name = "actuator_port")
    @JsonProperty("actuatorPort")
    private Integer actuatorPort;

    @Column(columnDefinition = "TEXT")
    private String config;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    @JsonProperty("createdAt")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    @JsonProperty("updatedAt")
    private LocalDateTime updatedAt;

    // Constructors
    public Service() {}

    public Service(String name, String type, String status) {
        this.name = name;
        this.type = type;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getPort() { return port; }
    public void setPort(Integer port) { this.port = port; }

    public Double getCpu() { return cpu; }
    public void setCpu(Double cpu) { this.cpu = cpu; }

    public Double getMemory() { return memory; }
    public void setMemory(Double memory) { this.memory = memory; }

    public Integer getInstances() { return instances; }
    public void setInstances(Integer instances) { this.instances = instances; }

    public String getVersion() { return version; }
    public void setVersion(String version) { this.version = version; }

    public String getSpringBootVersion() { return springBootVersion; }
    public void setSpringBootVersion(String springBootVersion) { this.springBootVersion = springBootVersion; }

    public String getJavaVersion() { return javaVersion; }
    public void setJavaVersion(String javaVersion) { this.javaVersion = javaVersion; }

    public String getFramework() { return framework; }
    public void setFramework(String framework) { this.framework = framework; }

    public String getProfiles() { return profiles; }
    public void setProfiles(String profiles) { this.profiles = profiles; }

    public Integer getActuatorPort() { return actuatorPort; }
    public void setActuatorPort(Integer actuatorPort) { this.actuatorPort = actuatorPort; }

    public String getConfig() { return config; }
    public void setConfig(String config) { this.config = config; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}