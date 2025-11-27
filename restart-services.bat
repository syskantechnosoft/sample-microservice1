@echo off
echo Restarting Banking Microservices...
echo.

echo Stopping existing Java processes...
taskkill /f /im java.exe 2>nul

echo Waiting for processes to stop...
timeout /t 5

echo Starting services in order...
echo.

echo 1. Starting Config Server...
start "Config Server" cmd /k "cd config-server && mvn spring-boot:run"
timeout /t 30

echo 2. Starting Discovery Server...
start "Discovery Server" cmd /k "cd discovery-server && mvn spring-boot:run"
timeout /t 30

echo 3. Starting API Gateway...
start "API Gateway" cmd /k "cd api-gateway && mvn spring-boot:run"
timeout /t 20

echo 4. Starting Customer Service...
start "Customer Service" cmd /k "cd customer-service && mvn spring-boot:run"
timeout /t 15

echo 5. Starting Account Service...
start "Account Service" cmd /k "cd account-service && mvn spring-boot:run"
timeout /t 15

echo 6. Starting Loan Service...
start "Loan Service" cmd /k "cd loan-service && mvn spring-boot:run"

echo.
echo All services are restarting...
echo Wait for all services to fully start before testing.
echo.
pause