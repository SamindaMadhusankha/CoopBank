# Capital Cooperative Bank - System Guide

## How to Start the System

### 1. Install Dependencies (first time only)
```
npm install
```

### 2. Seed the Database (first time only)
This creates the initial admin and member accounts in MongoDB.
```
npm run seed
```

### 3. Start the Server
```
npm start
```
The website will be available at: **http://localhost:3000**

---

## Important Links

| Page               | URL                                          |
|--------------------|----------------------------------------------|
| Home               | http://localhost:3000                         |
| Member Login       | http://localhost:3000/member-login.html       |
| Admin Login        | http://localhost:3000/admin-login.html        |
| Member Dashboard   | http://localhost:3000/member-dashboard.html   |
| Admin Panel        | http://localhost:3000/admin-panel.html        |

---

## Login Credentials

### Admin Account
| Field    | Value        |
|----------|--------------|
| Username | `admin01`    |
| Password | `Admin@123`  |

### Member Accounts
| Username  | Password      | Branch               | Status    |
|-----------|---------------|----------------------|-----------|
| savindi   | Member@123    | Kurunegala City      | Active    |
| nuwan     | Member@123    | Matara Coastal       | Pending   |
| priya     | Member@123    | Jaffna Hub           | Active    |
| kasun     | Member@123    | Anuradhapura Central | Suspended |

---

## Notes
- Admin users are redirected to the **Admin Panel** after login.
- Regular members are redirected to the **Member Dashboard** after login.
- New users can register from the login page; their accounts start as **Pending** until an admin approves them.
- The database is MongoDB Atlas (cloud-hosted). Internet connection is required.
