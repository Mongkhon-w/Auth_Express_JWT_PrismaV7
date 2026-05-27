# Auth API ด้วย Express, JWT, MySQL และ Prisma version 7

## Required

* MySQL
* Node.js
* Express
* Prisma (v6)
* JWT & bcryptjs
* Vscode
    * Thunder Client (For API Testing)

## Running

### Database

```sql
CREATE DATABASE mydb;
USE mydb;
```

### Schema

```bash
npx prisma generate
```

### Server

```bash
node server.js
```

## Develop

### First time

```bash
npm init -y
npm install express jsonwebtoken bcryptjs prisma@^6 @prisma/client@^6 body-parser dotenv
npm install -D @types/node tsx
npx prisma init
```
*(อย่าลืมตั้งค่า `DATABASE_URL` ในไฟล์ `.env` ให้เรียบร้อย)*

### Update schema

1. Update schema in `prisma/schema.prisma`
2. Run this command `npx prisma migrate dev --name init`

### API Endpoints

**1. Register** (`POST http://localhost:3000/api/register`)
```json
{
  "username": "testuser",
  "password": "password123"
}
```

**2. Login** (`POST http://localhost:3000/api/login`)
```json
{
  "username": "testuser",
  "password": "password123"
}
```

**3. Protected** (`GET http://localhost:3000/api/protected`)
* **Header:** `Authorization: <Token_Here>`