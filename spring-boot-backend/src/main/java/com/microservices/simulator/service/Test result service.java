
package com.microservices.simulator.service;

import com.microservices.simulator.entity.TestResult;
import com.microservices.simulator.repository.TestResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class TestResultService {
    
    @Autowired
    private TestResultRepository testResultRepository;
    
    public List<TestResult> getAllTestResults() {
        return testResultRepository.findAllOrderByCreatedAtDesc();
    }
    
    public List<TestResult> getTestResultsByServiceId(Long serviceId) {
        return testResultRepository.findByServiceIdOrderByCreatedAtDesc(serviceId);
    }
    
    public List<TestResult> getTestResultsByFramework(String framework) {
        return testResultRepository.findByFrameworkOrderByCreatedAtDesc(framework);
    }
    
    public List<TestResult> getTestResultsByType(String testType) {
        return testResultRepository.findByTestTypeOrderByCreatedAtDesc(testType);
    }
    
    public Optional<TestResult> getTestResultById(Long id) {
        return testResultRepository.findById(id);
    }
    
    public TestResult createTestResult(TestResult testResult) {
        return testResultRepository.save(testResult);
    }
    
    public TestResult updateTestResult(Long id, TestResult testResultDetails) {
        TestResult testResult = testResultRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Test Result not found with id: " + id));
        
        testResult.setFramework(testResultDetails.getFramework());
        testResult.setTestType(testResultDetails.getTestType());
        testResult.setServiceId(testResultDetails.getServiceId());
        testResult.setPassed(testResultDetails.getPassed());
        testResult.setFailed(testResultDetails.getFailed());
        testResult.setCoverage(testResultDetails.getCoverage());
        testResult.setDuration(testResultDetails.getDuration());
        
        return testResultRepository.save(testResult);
    }
    
    public void deleteTestResult(Long id) {
        testResultRepository.deleteById(id);
    }
    
    public Double getAverageCoverageForService(Long serviceId) {
        return testResultRepository.findAverageCoverageByServiceId(serviceId);
    }
    
    public Integer getTotalPassedTestsForService(Long serviceId) {
        return testResultRepository.getTotalPassedByServiceId(serviceId);
    }
    
    public Integer getTotalFailedTestsForService(Long serviceId) {
        return testResultRepository.getTotalFailedByServiceId(serviceId);
    }
}