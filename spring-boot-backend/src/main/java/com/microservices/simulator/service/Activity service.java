
package com.microservices.simulator.service;

import com.microservices.simulator.entity.Activity;
import com.microservices.simulator.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class ActivityService {
    
    @Autowired
    private ActivityRepository activityRepository;
    
    public List<Activity> getAllActivities() {
        return activityRepository.findAllOrderByCreatedAtDesc();
    }
    
    public List<Activity> getActivitiesByServiceId(Long serviceId) {
        return activityRepository.findByServiceIdOrderByCreatedAtDesc(serviceId);
    }
    
    public List<Activity> getActivitiesByType(String type) {
        return activityRepository.findByTypeOrderByCreatedAtDesc(type);
    }
    
    public List<Activity> getActivitiesBySeverity(String severity) {
        return activityRepository.findBySeverityOrderByCreatedAtDesc(severity);
    }
    
    public Optional<Activity> getActivityById(Long id) {
        return activityRepository.findById(id);
    }
    
    public Activity createActivity(Activity activity) {
        return activityRepository.save(activity);
    }
    
    public Activity updateActivity(Long id, Activity activityDetails) {
        Activity activity = activityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Activity not found with id: " + id));
        
        activity.setType(activityDetails.getType());
        activity.setMessage(activityDetails.getMessage());
        activity.setServiceId(activityDetails.getServiceId());
        activity.setSeverity(activityDetails.getSeverity());
        
        return activityRepository.save(activity);
    }
    
    public void deleteActivity(Long id) {
        activityRepository.deleteById(id);
    }
    
    public List<Activity> getActivitiesByTypeAndService(String type, Long serviceId) {
        return activityRepository.findByTypeAndServiceId(type, serviceId);
    }
}