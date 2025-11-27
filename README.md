# Banking Microservices System

## Overview
This project consists of 3 microservices (Customer, Account, Loan) and infrastructure services (Config Server, Eureka, API Gateway) with a React Frontend.

## Architecture
- **Customer Service**: MySQL (Port 3307). Handles AuthN/AuthZ (Token generation).
- **Account Service**: MySQL (Port 3307). Handles Accounts and Transactions.
- **Loan Service**: MongoDB (Port 27018). Handles Loans.
- **API Gateway**: Port 8080. Entry point, handles JWT Validation.
- **Eureka Server**: Port 8761. Service Discovery.
- **Config Server**: Port 8888. Centralized Configuration.
- **Frontend**: React + Vite (Port 5173).

## Prerequisites
- Java 21
- Maven
- Docker
- Node.js

## Setup & Run

### 1. Infrastructure (Databases)
```bash
docker-compose up -d
```
This starts MySQL (Port 3307) and MongoDB (Port 27018).

### 2. Backend Services
Run the following services in order (separate terminals):

1. **Config Server**
   ```bash
   cd config-server
   mvn spring-boot:run
   ```

2. **Discovery Server**
   ```bash
   cd discovery-server
   mvn spring-boot:run
   ```

3. **API Gateway**
   ```bash
   cd api-gateway
   mvn spring-boot:run
   ```

4. **Microservices**
   ```bash
   cd customer-service && mvn spring-boot:run
   cd account-service && mvn spring-boot:run
   cd loan-service && mvn spring-boot:run
   ```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
Access the app at `http://localhost:5173`.

## API Documentation
- Swagger Aggregated (Not fully implemented in this demo, but individual endpoints are exposed).
- **Customer**: `/api/customers`
- **Account**: `/api/accounts`
- **Loan**: `/api/loans`

## Testing
Unit and Integration tests are included in the `src/test` directories of each service.
Run tests with:
```bash
mvn test
```
