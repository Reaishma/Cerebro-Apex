package com.microservices.simulator.controller;

import com.microservices.simulator.entity.Activity;
import com.microservices.simulator.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin(origins = "*")
public class ActivityController {
    
    @Autowired
    private ActivityService activityService;
    
    @GetMapping
    public ResponseEntity<List<Activity>> getAllActivities() {
        List<Activity> activities = activityService.getAllActivities();
        return ResponseEntity.ok(activities);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Activity> getActivityById(@PathVariable Long id) {
        Optional<Activity> activity = activityService.getActivityById(id);
        return activity.map(ResponseEntity::ok)
                       .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Activity> createActivity(@Valid @RequestBody Activity activity) {
        Activity createdActivity = activityService.createActivity(activity);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdActivity);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Activity> updateActivity(@PathVariable Long id, @Valid @RequestBody Activity activityDetails) {
        try {
            Activity updatedActivity = activityService.updateActivity(id, activityDetails);
            return ResponseEntity.ok(updatedActivity);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteActivity(@PathVariable Long id) {
        activityService.deleteActivity(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/service/{serviceId}")
    public ResponseEntity<List<Activity>> getActivitiesByServiceId(@PathVariable Long serviceId) {
        List<Activity> activities = activityService.getActivitiesByServiceId(serviceId);
        return ResponseEntity.ok(activities);
    }
    
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Activity>> getActivitiesByType(@PathVariable String type) {
        List<Activity> activities = activityService.getActivitiesByType(type);
        return ResponseEntity.ok(activities);
    }
    
    @GetMapping("/severity/{severity}")
    public ResponseEntity<List<Activity>> getActivitiesBySeverity(@PathVariable String severity) {
        List<Activity> activities = activityService.getActivitiesBySeverity(severity);
        return ResponseEntity.ok(activities);
    }
    
    @GetMapping("/service/{serviceId}/type/{type}")
    public ResponseEntity<List<Activity>> getActivitiesByTypeAndService(@PathVariable Long serviceId, @PathVariable String type) {
        List<Activity> activities = activityService.getActivitiesByTypeAndService(type, serviceId);
        return ResponseEntity.ok(activities);
    }
}
