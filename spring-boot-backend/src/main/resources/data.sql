-- Initialize default services for microservices simulator
INSERT INTO services (name, type, status, port, cpu, memory, instances, version, spring_boot_version, java_version, framework, profiles, actuator_port, config, created_at, updated_at) VALUES
('API Gateway', 'gateway', 'running', 8080, 15.5, 512.0, 1, '1.0.0', '3.2.0', '17', 'spring-cloud-gateway', 'production', 8081, '{"type":"gateway","routes":[{"path":"/api/users/**","service":"user-service"},{"path":"/api/orders/**","service":"order-service"}]}', NOW(), NOW()),
('User Service', 'microservice', 'running', 8082, 25.3, 768.0, 2, '1.2.1', '3.2.0', '17', 'spring-boot', 'production', 8083, '{"type":"microservice","database":"postgresql","cache":"redis"}', NOW(), NOW()),
('Order Service', 'microservice', 'running', 8084, 18.7, 1024.0, 3, '1.1.5', '3.2.0', '17', 'spring-boot', 'production', 8085, '{"type":"microservice","database":"postgresql","messaging":"rabbitmq"}', NOW(), NOW()),
('Payment Service', 'microservice', 'running', 8086, 12.4, 512.0, 1, '1.0.8', '3.2.0', '17', 'spring-boot', 'production', 8087, '{"type":"microservice","database":"postgresql","external_apis":["stripe","paypal"]}', NOW(), NOW()),
('Notification Service', 'microservice', 'running', 8088, 8.9, 256.0, 2, '1.0.3', '3.2.0', '17', 'spring-boot', 'production', 8089, '{"type":"microservice","messaging":"rabbitmq","email":"smtp"}', NOW(), NOW()),
('Config Server', 'infrastructure', 'running', 8888, 5.2, 256.0, 1, '1.0.0', '3.2.0', '17', 'spring-cloud-config', 'production', 8889, '{"type":"config-server","git_repo":"https://github.com/config-repo"}', NOW(), NOW()),
('Service Registry', 'infrastructure', 'running', 8761, 8.1, 512.0, 1, '1.0.0', '3.2.0', '17', 'eureka-server', 'production', 8762, '{"type":"eureka","self_preservation":false}', NOW(), NOW());

-- Initialize metrics data
INSERT INTO metrics (service_id, cpu, memory, request_count, response_time, error_rate, timestamp) VALUES
(1, 15.5, 512.0, 1250, 145.2, 0.02, NOW()),
(2, 25.3, 768.0, 890, 89.5, 0.01, NOW()),
(3, 18.7, 1024.0, 1450, 112.8, 0.03, NOW()),
(4, 12.4, 512.0, 456, 203.4, 0.01, NOW()),
(5, 8.9, 256.0, 234, 67.3, 0.00, NOW()),
(6, 5.2, 256.0, 45, 12.1, 0.00, NOW()),
(7, 8.1, 512.0, 78, 34.7, 0.00, NOW());

-- Initialize deployments
INSERT INTO deployments (service_id, version, status, strategy, progress, created_at, completed_at) VALUES
(1, '1.0.1', 'success', 'rolling', 100, NOW() - INTERVAL '2 hours', NOW() - INTERVAL '1 hour'),
(2, '1.2.2', 'in-progress', 'blue-green', 75, NOW() - INTERVAL '30 minutes', NULL),
(3, '1.1.6', 'failed', 'canary', 45, NOW() - INTERVAL '1 hour', NOW() - INTERVAL '45 minutes'),
(4, '1.0.9', 'success', 'rolling', 100, NOW() - INTERVAL '3 hours', NOW() - INTERVAL '2 hours');

-- Initialize API routes
INSERT INTO api_routes (path, method, gateway_id, target_service, is_active, rate_limit, timeout) VALUES
('/api/users/**', 'GET', 1, 'user-service', TRUE, 1000, 30000),
('/api/users/**', 'POST', 1, 'user-service', TRUE, 100, 30000),
('/api/orders/**', 'GET', 1, 'order-service', TRUE, 500, 30000),
('/api/orders/**', 'POST', 1, 'order-service', TRUE, 200, 30000),
('/api/payments/**', 'POST', 1, 'payment-service', TRUE, 50, 60000),
('/api/notifications/**', 'POST', 1, 'notification-service', TRUE, 1000, 10000);

-- Initialize test results
INSERT INTO test_results (service_id, framework, test_type, passed, failed, coverage, duration, created_at) VALUES
(1, 'JUnit 5', 'unit', 145, 3, 87.5, 2340, NOW()),
(2, 'JUnit 5', 'unit', 298, 8, 92.1, 4560, NOW()),
(2, 'Testcontainers', 'integration', 45, 2, 78.3, 8900, NOW()),
(3, 'JUnit 5', 'unit', 234, 12, 89.7, 3200, NOW()),
(4, 'JUnit 5', 'unit', 156, 4, 85.2, 2100, NOW()),
(5, 'JUnit 5', 'unit', 89, 1, 94.8, 1800, NOW());

-- Initialize activities
INSERT INTO activities (service_id, type, message, severity, created_at) VALUES
(1, 'deployment', 'Successfully deployed version 1.0.1', 'info', NOW()),
(2, 'scaling', 'Scaled up to 3 instances due to high load', 'info', NOW()),
(3, 'error', 'Database connection timeout detected', 'warning', NOW()),
(4, 'deployment', 'Deployment failed: health check timeout', 'error', NOW()),
(5, 'monitoring', 'High memory usage detected (95%)', 'warning', NOW()),
(6, 'startup', 'Service started successfully', 'info', NOW()),
(7, 'registration', 'Service registered with Eureka', 'info', NOW());
