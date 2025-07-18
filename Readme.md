# Spring Boot Microservices Architecture Simulator

A comprehensive web-based simulator for Spring Boot microservices architecture featuring integrated testing frameworks, backend architecture visualization, and frontend development tools. This educational tool provides real-time visualization of microservices patterns, infrastructure components, testing scenarios, and full-stack development architecture in a single interactive application.

![Microservices Simulator](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.0-purple)

## 🚀 Features Overview

### Core Microservices Simulation
- **Service Management**: Create, deploy, and manage virtual microservices
- **Load Balancing**: Round-robin and weighted load balancing algorithms
- **Service Discovery**: Dynamic service registration and health monitoring
- **Circuit Breaker Pattern**: Fault tolerance with fallback mechanisms
- **API Gateway**: Request routing and authentication handling
- **Inter-Service Communication**: Synchronous and asynchronous messaging

### Testing Framework Integration
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

*This simulator is designed for educational purposes and demonstrations. It simulates microservices patterns without requiring actual infrastructure setup.*