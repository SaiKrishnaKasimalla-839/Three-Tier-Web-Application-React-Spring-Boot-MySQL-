

# 🚀 Three-Tier Web Application (React + Spring Boot + MySQL)

This project demonstrates a **Three-Tier Architecture** built and deployed using **Virtual Machines (VMs)**.

---

# 🧱 Architecture Overview

```
Frontend (React)  →  Backend (Spring Boot)  →  Database (MySQL)
```

* **Presentation Layer** → React.js
* **Application Layer** → Spring Boot (Java)
* **Data Layer** → MySQL

---

# 🖥️ Infrastructure Setup (VM-Based)

We use **separate Virtual Machines** for each layer:

| Layer    | VM Name      | Role             |
| -------- | ------------ | ---------------- |
| Frontend | Frontend VM  | Runs React App   |
| Backend  | AppServer VM | Runs Spring Boot |
| Database | DbServer VM  | Runs MySQL       |

---

# ⚙️ 1. Database Setup (DbServer VM)

## Install MySQL

```bash
sudo apt update
sudo apt install mysql-server -y
```

## Start MySQL

```bash
sudo systemctl start mysql
```

## Login to MySQL

```bash
mysql -u root -p
```

## Create Database & Table

```sql
CREATE DATABASE three_tier_db;
USE three_tier_db;

CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255)
);
```

## Create Application User

```sql
CREATE USER 'appuser'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON three_tier_db.* TO 'appuser'@'%';
FLUSH PRIVILEGES;
```

---

# ☕ 2. Backend Setup (AppServer VM)

## Install Java & Maven

```bash
sudo apt update
sudo apt install openjdk-17-jdk -y
sudo apt install maven -y
```

## Verify Installation

```bash
java -version
mvn -version
```

---

## Configure Backend (`application.properties`)

```properties
spring.datasource.url=jdbc:mysql://<DB_SERVER_IP>:3306/three_tier_db
spring.datasource.username=appuser
spring.datasource.password=password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=8080
server.address=0.0.0.0
```

👉 Replace `<DB_SERVER_IP>` with your DbServer IP (example: `10.1.0.4`)

---

## Run Backend

```bash
mvn spring-boot:run
```

Expected output:

```
Tomcat started on port 8080
```

---

## API Endpoints

| Method | Endpoint    | Description   |
| ------ | ----------- | ------------- |
| POST   | /api/signup | Register user |
| POST   | /api/login  | Login user    |

---

# 🎨 3. Frontend Setup (Frontend VM)

## Install Node.js

```bash
sudo apt install nodejs npm -y
```

## Run React App

```bash
npm install
npm start
```

---

## Connect Frontend to Backend

Update API URL in React:

```javascript
const BASE_URL = "http://<APP_SERVER_IP>:8080";
```

---

## Signup API Call

```javascript
fetch(`${BASE_URL}/api/signup`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    username: form.email,
    password: form.password
  })
});
```

---

## Login API Call

```javascript
fetch(`${BASE_URL}/api/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    username: form.email,
    password: form.password
  })
});
```

---

# 🔄 Data Flow (Signup)

```
User → React UI → POST /api/signup
↓
Spring Boot Controller
↓
Service Layer
↓
Repository (JPA)
↓
MySQL (INSERT)
↓
Response → React
```

---

# 🔄 Data Flow (Login)

```
User → React UI → POST /api/login
↓
Spring Boot Controller
↓
Service Layer
↓
Repository (SELECT)
↓
MySQL
↓
Password Match
↓
Response → React
```

---

# 🔓 Logout Flow

```
Frontend only → clear user state → redirect to login
```

---

# 🧪 Testing

## Test Backend from VM

```bash
curl -X POST http://localhost:8080/api/signup \
-H "Content-Type: application/json" \
-d '{"username":"sai","password":"1234"}'
```

---

## Verify Data in Database

```sql
SELECT * FROM users;
```

---

# ⚠️ Common Issues & Fixes

| Issue                | Solution                            |
| -------------------- | ----------------------------------- |
| 400 Bad Request      | Check JSON format                   |
| CORS Error           | Add `@CrossOrigin("*")`             |
| DB Connection Failed | Verify DB IP & credentials          |
| API not reachable    | Ensure backend running on port 8080 |

---

# 🚀 Features

* User Signup
* User Login
* API Integration (React ↔ Spring Boot)
* MySQL Database Storage
* Three-Tier Architecture (VM-based)

---

# 📈 Future Enhancements

* 🔐 Password Encryption (BCrypt)
* 🔑 JWT Authentication
* 📊 Dashboard APIs
* 🌐 Deployment on Cloud

---

# 👨‍💻 Author

**Sai Krishna Kasimalla**

---

# 🎯 Conclusion

This project successfully demonstrates a **complete three-tier system using virtual machines**:

```
Frontend → Backend → Database
```

It builds a strong foundation for real-world full-stack development.
