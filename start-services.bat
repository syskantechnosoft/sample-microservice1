@echo off
echo Starting Banking Microservices...
echo.

echo Starting Discovery Server (Eureka)...
start "Discovery Server" cmd /k "cd discovery-server && mvn spring-boot:run"
timeout /t 30

echo Starting API Gateway...
start "API Gateway" cmd /k "cd api-gateway && mvn spring-boot:run"
timeout /t 20

echo Starting Customer Service...
start "Customer Service" cmd /k "cd customer-service && mvn spring-boot:run"
timeout /t 15

echo Starting Account Service...
start "Account Service" cmd /k "cd account-service && mvn spring-boot:run"
timeout /t 15

echo Starting Loan Service...
start "Loan Service" cmd /k "cd loan-service && mvn spring-boot:run"

echo.
echo All services are starting...
echo Check each terminal window for startup status.
echo.
echo Services will be available at:
echo - Config Server: http://localhost:8888
echo - Discovery Server: http://localhost:8761
echo - API Gateway: http://localhost:8080
echo - Customer Service: http://localhost:8081
echo - Account Service: http://localhost:8082
echo - Loan Service: http://localhost:8083
echo.
pause