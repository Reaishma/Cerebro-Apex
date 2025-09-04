# Cerebro-Apex 

A comprehensive web-based simulator for Spring Boot microservices architecture featuring integrated testing frameworks, backend architecture visualization, and frontend development tools. This educational tool provides real-time visualization of microservices patterns, infrastructure components, testing scenarios, and full-stack development architecture in a single interactive application.

![Microservices Simulator](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.0-purple)



## 🚀 Live Demo 

 **Click here to view live on** https://reaishma.github.io/Cerebro-Apex/

## 🚀 Features Overview

### Core Microservices Simulation
- **Service Management**: Create, deploy, and manage virtual microservices
- **Load Balancing**: Round-robin and weighted load balancing algorithms
- **Service Discovery**: Dynamic service registration and health monitoring
- **Circuit Breaker Pattern**: Fault tolerance with fallback mechanisms
- **API Gateway**: Request routing and authentication handling
- **Inter-Service Communication**: Synchronous and asynchronous messaging

### Testing Framework Integration

![Testing framework](https://github.com/Reaishma/Cerebro-Apex/blob/main/Screenshot_20250903-183120_1.jpg)

- **Jest Integration**: Unit testing framework with real-time execution
- **Mocha/Chai Support**: Behavior-driven development testing
- **Cypress Integration**: End-to-end testing simulation
- **Test Execution Engine**: In-browser test runner with live results
- **Code Coverage**: Real-time coverage metrics and reporting
- **Test Scenarios**: Unit, integration, and E2E testing patterns

### Backend Architecture Visualization
- **Spring Boot Layers**: Controllers, Services, Repositories, and Models
- **Database Integration**: PostgreSQL, Redis Cache, and Elasticsearch simulation
- **API Documentation**: Interactive REST endpoint explorer
- **Technology Stack**: Spring ecosystem visualization
- **Performance Metrics**: Real-time backend monitoring dashboard
- **CI/CD Pipeline**: Deployment pipeline with status tracking

### Frontend Architecture Management
- **Component Architecture**: React/Vue/Angular component simulation
- **Build Tools**: Webpack/Vite build process visualization
- **State Management**: Redux/Vuex state flow demonstration
- **Code Editor**: Live code examples with syntax highlighting
- **Performance Tracking**: Bundle size, load time, and optimization metrics
- **Frontend Pipeline**: Build, test, and deployment stages

### Infrastructure Components
- **Docker Simulation**: Container orchestration and management
- **Kubernetes**: Pod deployment, scaling, and service mesh
- **Message Queues**: RabbitMQ and Kafka messaging patterns
- **Monitoring Stack**: Prometheus, Grafana, and ELK stack simulation
- **Cloud Services**: AWS service integration patterns
- **Data Pipeline**: ETL processes and data flow visualization

## 🛠️ Technology Stack

### Frontend
- **Framework**: Vanilla JavaScript (ES6+)
- **UI Library**: Bootstrap 5.3.0
- **Charts**: Chart.js for real-time visualizations
- **Icons**: Bootstrap Icons 1.10.0
- **Theme**: Custom dark theme optimized for technical content

### Backend Simulation
- **Spring Boot**: Framework simulation with all layers
- **Spring Security**: Authentication and authorization patterns
- **Spring Data JPA**: ORM and database access patterns
- **Spring Cloud**: Microservices ecosystem simulation

### Testing Frameworks
- **Jest 29.7.0**: JavaScript unit testing
- **Mocha 10.2.0**: JavaScript test framework
- **Chai 4.3.10**: Assertion library
- **Cypress**: End-to-end testing simulation

### Infrastructure
- **Docker**: Containerization concepts
- **Kubernetes**: Orchestration patterns
- **Monitoring**: Prometheus/Grafana simulation
- **Logging**: ELK stack (Elasticsearch, Logstash, Kibana)
- **Message Brokers**: RabbitMQ and Apache Kafka

## 📋 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### Installation
1. Clone or download the project
2. Open `index.html` in your web browser
3. The simulator loads automatically with all features enabled

### Running with HTTP Server
```bash
# Python 3
python3 -m http.server 5000

# Python 2
python -m SimpleHTTPServer 5000

# Node.js (with http-server)
npx http-server -p 5000

# PHP
php -S localhost:5000
```

Access the simulator at `http://localhost:5000`

## 🎯 Usage Guide

### Microservices Tab
1. **Create Services**: Click "Create Service" to add new microservices
2. **Deploy Services**: Use the deployment controls to manage service instances
3. **Monitor Health**: View real-time health status and metrics
4. **Load Testing**: Simulate traffic with configurable load patterns
5. **Service Discovery**: Watch automatic service registration and discovery

### Testing Frameworks Tab
1. **Select Framework**: Choose between Jest, Mocha, or Cypress
2. **Create Tests**: Write test cases using the provided templates
3. **Execute Tests**: Run tests and view real-time results
4. **Coverage Analysis**: Monitor code coverage metrics
5. **Test Reports**: Export detailed test reports

### Backend Architecture Tab
1. **Explore Layers**: Click on Spring Boot components for detailed information
2. **API Documentation**: Browse and test REST endpoints
3. **Database Simulation**: Interact with PostgreSQL, Redis, and Elasticsearch
4. **Performance Monitoring**: View real-time backend metrics
5. **Pipeline Status**: Monitor CI/CD deployment pipeline

### Frontend Architecture Tab
1. **Component Library**: Explore React/Vue/Angular components
2. **Build Tools**: Visualize Webpack/Vite build processes
3. **State Management**: Understand Redux/Vuex data flow
4. **Code Examples**: View live component code samples
5. **Performance Metrics**: Track bundle size and optimization

### Docker Simulation Tab
1. **Container Management**: Create and manage Docker containers
2. **Image Building**: Simulate Docker image build processes
3. **Network Configuration**: Set up container networking
4. **Volume Management**: Handle persistent storage
5. **Registry Operations**: Push/pull from container registries

### Kubernetes Tab
1. **Pod Deployment**: Create and manage Kubernetes pods
2. **Service Mesh**: Configure service-to-service communication
3. **Scaling**: Horizontal and vertical pod autoscaling
4. **Ingress**: Configure external traffic routing
5. **Resource Monitoring**: Track CPU, memory, and network usage

### Monitoring Stack Tab

![Monitoring](https://github.com/Reaishma/Cerebro-Apex/blob/main/Screenshot_20250729-162944_1.jpg)

1. **Metrics Collection**: Configure Prometheus-style metrics
2. **Visualization**: Create Grafana-inspired dashboards
3. **Alerting**: Set up threshold-based notifications
4. **Log Aggregation**: Centralized logging with ELK stack
5. **Performance Analysis**: Deep-dive into system performance

## 🔧 Configuration

### Customization Options
- **Service Templates**: Modify default microservice configurations
- **Load Patterns**: Customize traffic simulation scenarios
- **Monitoring Metrics**: Configure custom performance indicators
- **Test Scenarios**: Create custom testing templates
- **Theme Settings**: Adjust color schemes and layouts

### Environment Variables
```javascript
// Configurable simulation parameters
const CONFIG = {
    maxServices: 20,
    defaultPort: 8080,
    healthCheckInterval: 5000,
    metricsUpdateInterval: 2000,
    loadTestDuration: 60000
};
```

## 📊 Architecture Patterns Demonstrated

### Microservices Patterns
- **Service Decomposition**: Breaking monoliths into microservices
- **Database per Service**: Isolated data management
- **API Gateway**: Centralized request routing
- **Service Discovery**: Dynamic service location
- **Circuit Breaker**: Fault tolerance and resilience
- **Saga Pattern**: Distributed transaction management

### Testing Patterns
- **Test Pyramid**: Unit, integration, and E2E testing strategy
- **Test Doubles**: Mocks, stubs, and fakes
- **Contract Testing**: API contract verification
- **Performance Testing**: Load and stress testing
- **Security Testing**: Authentication and authorization testing

### DevOps Patterns
- **CI/CD Pipeline**: Continuous integration and deployment
- **Infrastructure as Code**: Automated infrastructure management
- **Blue-Green Deployment**: Zero-downtime deployments
- **Canary Releases**: Gradual feature rollouts
- **Monitoring and Observability**: Comprehensive system visibility

## 🎓 Educational Value

### Learning Objectives
- Understand microservices architecture principles
- Learn Spring Boot ecosystem components
- Master testing strategies and frameworks
- Explore container orchestration with Kubernetes
- Practice monitoring and observability patterns
- Experience full-stack development workflows

### Use Cases
- **Software Architecture Training**: Visualize complex system designs
- **Team Onboarding**: Introduce new developers to microservices
- **Technical Interviews**: Demonstrate architecture knowledge
- **Proof of Concepts**: Validate architectural decisions
- **Academic Projects**: Support computer science coursework

## 🔍 Monitoring and Metrics

### Performance Indicators
- **Service Health**: Real-time availability monitoring
- **Response Times**: Average and percentile response metrics
- **Throughput**: Requests per second tracking
- **Error Rates**: 4xx and 5xx error monitoring
- **Resource Usage**: CPU, memory, and network utilization

### Testing Metrics
- **Test Coverage**: Line, branch, and function coverage
- **Test Execution Time**: Performance of test suites
- **Test Success Rate**: Pass/fail ratio tracking
- **Code Quality**: Linting and static analysis results

### Frontend Metrics
- **Bundle Size**: JavaScript and CSS asset sizes
- **Load Times**: Page and component loading performance
- **Lighthouse Scores**: Performance, accessibility, and SEO metrics
- **Component Count**: Architecture complexity tracking

## 🚀 Features 


Containerization and Orchestration
1. *Docker*: Containerization platform for packaging applications.
2. *Kubernetes*: Container orchestration platform for managing containerized applications.
3. *Cluster Visualization*: Visualizing Kubernetes clusters for better management.

Data Pipeline and Processing
1. *Apache Spark*: Big data processing engine for large-scale data processing.
2. *AWS Glue*: Fully managed extract, transform, and load (ETL) service for data preparation.
3. *Apache Beam*: Unified programming model for both batch and streaming data processing.

Machine Learning Interpretability
1. *SHAP (SHapley Additive exPlanations)*: Technique for explaining machine learning model predictions.
2. *LIME (Local Interpretable Model-agnostic Explanations)*: Technique for explaining machine learning model predictions.

Testing Frameworks
1. *Jest*: JavaScript testing framework for React applications.
2. *Cypress*: End-to-end testing framework for web applications.
3. *Mocha*: JavaScript testing framework for Node.js applications.

Microservices Architecture
1. *Spring Boot*: Framework for building microservices-based applications.
2. *Eureka*: Service discovery platform for managing microservices.
3. *API Gateway*: Entry point for API requests, using AWS or NGINX.
4. *Load Balancer*: Distributing traffic across multiple instances, using NGINX.
5. *Message Queues*: RabbitMQ or Apache Kafka for message passing between microservices.

![Messaging](https://github.com/Reaishma/Cerebro-Apex/blob/main/Screenshot_20250903-183113_1.jpg)

Monitoring and Logging
1. *Prometheus*: Monitoring system for collecting metrics.
2. *Grafana*: Visualization platform for monitoring metrics.
3. *ELK Stack (Elasticsearch, Logstash, Kibana)*: Logging and monitoring platform.

Frontend and Backend
1. *React*: Frontend framework for building user interfaces.
2. *Spring Boot*: Backend framework for building RESTful APIs.

## 🚀 Advanced Features

### Real-time Simulation
- **Live Metrics**: Continuously updated performance data
- **Dynamic Scaling**: Automatic service scaling simulation
- **Traffic Patterns**: Realistic load distribution
- **Failure Scenarios**: Chaos engineering simulation
- **Recovery Procedures**: Automatic failure recovery

### Interactive Learning
- **Guided Tours**: Step-by-step feature exploration
- **Best Practices**: Inline architecture recommendations
- **Code Examples**: Working implementation samples
- **Documentation**: Comprehensive feature explanations
- **Troubleshooting**: Common issue resolution guides

## 🛡️ Security Considerations

### Authentication Simulation
- **JWT Tokens**: JSON Web Token implementation
- **OAuth 2.0**: Authorization code flow simulation
- **Role-Based Access**: Permission management
- **API Security**: Endpoint protection strategies
- **HTTPS Simulation**: Secure communication patterns

## 📈 Performance Optimization

### Frontend Optimization
- **Lazy Loading**: Component-based code splitting
- **Caching**: Browser and CDN caching strategies
- **Minification**: Asset compression techniques
- **Bundle Analysis**: Dependency size optimization
- **Progressive Enhancement**: Core functionality fallbacks

### Backend Optimization
- **Database Indexing**: Query performance optimization
- **Caching Layers**: Redis and in-memory caching
- **Connection Pooling**: Database connection management
- **Async Processing**: Non-blocking operation patterns
- **Load Balancing**: Traffic distribution strategies


## Features

- **Service Management**: Full CRUD operations for microservices
- **Real-time Monitoring**: Metrics collection and health monitoring
- **API Gateway**: Route management and configuration
- **Deployment Pipeline**: Deployment tracking and management
- **Testing Framework**: Test result aggregation and reporting
- **Activity Logging**: System event tracking
- **Spring Boot Actuator**: Health checks, metrics, and application info

## Technology Stack

- **Spring Boot 3.2.0**: Main framework
- **Spring Cloud**: Service discovery and configuration
- **Spring Data JPA**: Database access layer
- **Spring Boot Actuator**: Production-ready features
- **H2 Database**: In-memory database for development
- **PostgreSQL**: Production database
- **Maven**: Build tool
- **Java 17**: Programming language

## Quick Start

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- PostgreSQL (for production)

### Running the Application

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd spring-boot-backend
   ```

2. **Build the application**
   ```bash
   mvn clean install
   ```

3. **Run with H2 (Development)**
   ```bash
   mvn spring-boot:run
   ```

4. **Run with PostgreSQL (Production)**
   ```bash
   # Set environment variables
   export DB_USERNAME=your_db_username
   export DB_PASSWORD=your_db_password
   
   # Run with production profile
   mvn spring-boot:run -Dspring-boot.run.profiles=production
   ```

## API Endpoints

### Services
- `GET /api/services` - Get all services
- `GET /api/services/{id}` - Get service by ID
- `POST /api/services` - Create new service
- `PUT /api/services/{id}` - Update service
- `DELETE /api/services/{id}` - Delete service
- `GET /api/services/spring-boot` - Get Spring Boot services
- `GET /api/services/stats` - Get service statistics

### Metrics
- `GET /api/metrics` - Get all metrics
- `GET /api/metrics/latest` - Get latest metrics
- `GET /api/metrics/service/{serviceId}` - Get metrics for specific service
- `POST /api/metrics` - Create new metric

### Deployments
- `GET /api/deployments` - Get all deployments
- `GET /api/deployments/{id}` - Get deployment by ID
- `POST /api/deployments` - Create new deployment
- `PUT /api/deployments/{id}` - Update deployment
- `GET /api/deployments/stats` - Get deployment statistics

### API Routes
- `GET /api/routes` - Get all API routes
- `GET /api/routes/active` - Get active routes
- `POST /api/routes` - Create new route
- `PUT /api/routes/{id}` - Update route

### Test Results
- `GET /api/test-results` - Get all test results
- `GET /api/test-results/service/{serviceId}` - Get test results for service
- `POST /api/test-results` - Create new test result

### Activities
- `GET /api/activities` - Get all activities
- `GET /api/activities/service/{serviceId}` - Get activities for service
- `POST /api/activities` - Create new activity

## Spring Boot Actuator Endpoints

- `GET /actuator/health` - Application health status
- `GET /actuator/info` - Application information
- `GET /actuator/metrics` - Application metrics
- `GET /actuator/env` - Environment properties
- `GET /actuator/beans` - Spring beans information
- `GET /actuator/configprops` - Configuration properties

## Configuration

### Application Properties

The application uses `application.properties` for configuration:

```properties
# Basic Configuration
spring.application.name=microservices-simulator
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:h2:mem:testdb
spring.jpa.hibernate.ddl-auto=create-drop

# Actuator Configuration
management.endpoints.web.exposure.include=*
management.endpoint.health.show-details=always
```

### Production Configuration

For production, use `application-production.properties`:

```properties
# Production Database
spring.datasource.url=jdbc:postgresql://localhost:5432/microservices_db
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

# Security
management.endpoints.web.exposure.include=health,info,metrics,prometheus
management.endpoint.health.show-details=when-authorized
```

## Database Schema

The application automatically creates the following tables:
- `services` - Microservice configurations
- `metrics` - Performance metrics
- `deployments` - Deployment records
- `api_routes` - API gateway routes
- `test_results` - Test execution results
- `activities` - System activities

## Sample Data

The application includes sample data initialization through `data.sql`:
- 7 preconfigured services (API Gateway, User Service, Order Service, etc.)
- Sample metrics and performance data
- Deployment history
- API route configurations
- Test results and activitie


## 🔧 Troubleshooting

### Common Issues
1. **Charts Not Displaying**: Ensure Chart.js loads properly
2. **Responsive Layout**: Check Bootstrap CSS integration
3. **Performance Issues**: Monitor browser console for errors
4. **Feature Loading**: Verify all dependencies are accessible
5. **Browser Compatibility**: Use modern browser features

### Debug Mode
Enable debug logging by opening browser console:
```javascript
// Enable verbose logging
localStorage.setItem('debugMode', 'true');
location.reload();
```

## Author 🧑‍💻 

**Reaishma N**

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Make changes to `index.html`
4. Test in multiple browsers
5. Submit pull request with detailed description

### Coding Standards
- Use ES6+ JavaScript features
- Follow Bootstrap component patterns
- Maintain responsive design principles
- Add comprehensive comments
- Ensure accessibility compliance

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Spring Boot Team**: For the excellent microservices framework
- **Bootstrap Team**: For the responsive UI framework
- **Chart.js**: For beautiful data visualizations
- **Testing Community**: For Jest, Mocha, and Cypress frameworks
- **Open Source Community**: For continuous inspiration and support

## 📞 Support

For questions, issues, or contributions:
- Open an issue on GitHub
- Review the documentation
- Check browser console for errors
- Ensure all dependencies are loading correctly

---

**Built with ❤️ for the microservices community**

