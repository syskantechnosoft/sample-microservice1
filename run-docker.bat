@echo off
echo Starting Banking Application with Docker...

echo Stopping any existing containers...
docker-compose -f docker-compose.full.yml down

echo Starting all services...
docker-compose -f docker-compose.full.yml up -d

echo Waiting for services to start...
timeout /t 60

echo Application started!
echo Frontend: http://localhost
echo API Gateway: http://localhost:8080
echo Swagger UI: http://localhost:8080/swagger-ui.html
echo Eureka Dashboard: http://localhost:8761

pause