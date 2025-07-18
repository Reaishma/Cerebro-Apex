
package com.microservices.simulator.controller;

import com.microservices.simulator.entity.TestResult;
import com.microservices.simulator.service.TestResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/test-results")
@CrossOrigin(origins = "*")
public class TestResultController {
    
    @Autowired
    private TestResultService testResultService;
    
    @GetMapping
    public ResponseEntity<List<TestResult>> getAllTestResults() {
        List<TestResult> results = testResultService.getAllTestResults();
        return ResponseEntity.ok(results);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TestResult> getTestResultById(@PathVariable Long id) {
        Optional<TestResult> result = testResultService.getTestResultById(id);
        return result.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<TestResult> createTestResult(@Valid @RequestBody TestResult testResult) {
        TestResult createdResult = testResultService.createTestResult(testResult);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdResult);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<TestResult> updateTestResult(@PathVariable Long id, @Valid @RequestBody TestResult testResultDetails) {
        try {
            TestResult updatedResult = testResultService.updateTestResult(id, testResultDetails);
            return ResponseEntity.ok(updatedResult);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTestResult(@PathVariable Long id) {
        testResultService.deleteTestResult(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/service/{serviceId}")
    public ResponseEntity<List<TestResult>> getTestResultsByServiceId(@PathVariable Long serviceId) {
        List<TestResult> results = testResultService.getTestResultsByServiceId(serviceId);
        return ResponseEntity.ok(results);
    }
    
    @GetMapping("/framework/{framework}")
    public ResponseEntity<List<TestResult>> getTestResultsByFramework(@PathVariable String framework) {
        List<TestResult> results = testResultService.getTestResultsByFramework(framework);
        return ResponseEntity.ok(results);
    }
    
    @GetMapping("/type/{testType}")
    public ResponseEntity<List<TestResult>> getTestResultsByType(@PathVariable String testType) {
        List<TestResult> results = testResultService.getTestResultsByType(testType);
        return ResponseEntity.ok(results);
    }
    
    @GetMapping("/service/{serviceId}/stats")
    public ResponseEntity<TestStats> getTestStatsForService(@PathVariable Long serviceId) {
        Double averageCoverage = testResultService.getAverageCoverageForService(serviceId);
        Integer totalPassed = testResultService.getTotalPassedTestsForService(serviceId);
        Integer totalFailed = testResultService.getTotalFailedTestsForService(serviceId);
        
        TestStats stats = new TestStats(averageCoverage, totalPassed, totalFailed);
        return ResponseEntity.ok(stats);
    }
    
    // Inner class for test statistics
    public static class TestStats {
        private Double averageCoverage;
        private Integer totalPassed;
        private Integer totalFailed;
        
        public TestStats(Double averageCoverage, Integer totalPassed, Integer totalFailed) {
            this.averageCoverage = averageCoverage;
            this.totalPassed = totalPassed;
            this.totalFailed = totalFailed;
        }
        
        public Double getAverageCoverage() { return averageCoverage; }
        public void setAverageCoverage(Double averageCoverage) { this.averageCoverage = averageCoverage; }
        
        public Integer getTotalPassed() { return totalPassed; }
        public void setTotalPassed(Integer totalPassed) { this.totalPassed = totalPassed; }
        
        public Integer getTotalFailed() { return totalFailed; }
        public void setTotalFailed(Integer totalFailed) { this.totalFailed = totalFailed; }
    }
}