@echo off
echo Quick Fix: Restarting Customer Service and API Gateway...

echo Killing existing processes...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8081') do taskkill /f /pid %%a 2>nul
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080') do taskkill /f /pid %%a 2>nul

echo Waiting...
timeout /t 5

echo Starting Customer Service...
start "Customer Service" cmd /k "cd customer-service && mvn spring-boot:run"
timeout /t 15

echo Starting API Gateway...
start "API Gateway" cmd /k "cd api-gateway && mvn spring-boot:run"

echo Services restarted. Wait 30 seconds before testing.
pause