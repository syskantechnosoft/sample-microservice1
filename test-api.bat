@echo off
echo Testing Banking Microservices APIs...
echo.

echo 1. Testing Config Server...
curl -s http://localhost:8888/health || echo Config Server not responding
echo.

echo 2. Testing Discovery Server...
curl -s http://localhost:8761/actuator/health || echo Discovery Server not responding
echo.

echo 3. Testing API Gateway...
curl -s http://localhost:8080/actuator/health || echo API Gateway not responding
echo.

echo 4. Testing Customer Service Registration...
curl -X POST http://localhost:8080/api/customers/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"password123\"}"
echo.

echo 5. Testing Customer Service Login...
curl -X POST http://localhost:8080/api/customers/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
echo.

echo API Tests completed.
pause