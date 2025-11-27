# Banking Microservices Testing Guide

## Current Issue Resolution

The 500 Internal Server Error during registration was caused by missing database tables. This has been resolved by:

1. ✅ Created database tables manually using `init-db.sql`
2. ✅ Added error handling to backend services
3. ✅ Added CORS configuration
4. ✅ Improved frontend error handling

## Step-by-Step Testing Process

### 1. Verify Infrastructure
```bash
# Check Docker containers
docker ps

# Verify databases
docker exec banking-mysql mysql -uroot -proot -e "USE banking_customer_db; SHOW TABLES;"
```

### 2. Verify Backend Services
Check all services are running on correct ports:
- Config Server: http://localhost:8888
- Discovery Server: http://localhost:8761
- API Gateway: http://localhost:8080
- Customer Service: http://localhost:8081
- Account Service: http://localhost:8082
- Loan Service: http://localhost:8083

### 3. Test API Endpoints

#### Registration Test
```bash
curl -X POST http://localhost:8080/api/customers/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

#### Login Test
```bash
curl -X POST http://localhost:8080/api/customers/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### 4. Test Frontend Integration

1. **Access Frontend**: http://localhost:5173
2. **Register New User**:
   - Click "Register"
   - Fill: Name, Email, Password
   - Submit form
3. **Login**:
   - Use registered credentials
   - Should redirect to dashboard
4. **Dashboard Functions**:
   - Create Savings/Current Account
   - Deposit money
   - Withdraw money
   - Apply for loan
   - Pay EMI

## Troubleshooting Common Issues

### Issue 1: 500 Internal Server Error
**Solution**: Restart services to pick up database changes
```bash
# Run the restart script
restart-services.bat
```

### Issue 2: CORS Errors
**Solution**: API Gateway has CORS configured for localhost:5173

### Issue 3: JWT Token Issues
**Solution**: Both Customer Service and API Gateway use the same JWT secret

### Issue 4: Database Connection
**Solution**: Verify MySQL is running and tables exist
```bash
docker exec banking-mysql mysql -uroot -proot -e "USE banking_customer_db; DESCRIBE customers;"
```

## Expected Test Flow

1. **Registration** → Success message → Redirect to login
2. **Login** → JWT token stored → Redirect to dashboard
3. **Dashboard** → Shows user info, accounts, loans
4. **Create Account** → New account appears with $1000 initial deposit
5. **Deposit** → Account balance increases
6. **Withdraw** → Account balance decreases (if sufficient funds)
7. **Apply Loan** → New loan appears with calculated EMI
8. **Pay EMI** → Success message

## Service Dependencies

```
Frontend (5173) → API Gateway (8080) → Microservices (8081-8083)
                                    ↓
                              Discovery Server (8761)
                                    ↓
                              Config Server (8888)
                                    ↓
                              Databases (MySQL:3307, MongoDB:27018)
```

## Quick Health Check
```bash
# Check all ports
netstat -ano | findstr "8080 8081 8082 8083 8761 8888 5173"

# Test API Gateway
curl http://localhost:8080/actuator/health

# Test Customer Service directly
curl http://localhost:8081/api/test/health
```