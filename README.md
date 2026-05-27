# Auth API ด้วย Express, JWT, MySQL และ Prisma version 7

## Required

* MySQL
* Node.js
* Express
* Prisma (latest)
* JWT & bcryptjs
* Vscode
    * Thunder Client (For API Testing)

## Develop

### First time

```bash
npm init -y
npm install express jsonwebtoken bcryptjs body-parser dotenv
npm install prisma@latest @prisma/client@latest @prisma/adapter-mariadb mariadb
npm install -D @types/node tsx
npx prisma init
```
*(อย่าลืมตั้งค่า `DATABASE_URL` ในไฟล์ `.env` ให้เรียบร้อย)*

### Update schema

1. Run this command `npx prisma migrate dev --name init`
2. ล้างฐานข้อมูลเก่า `npx prisma migrate reset `

### Create Folder
```bash
touch server.js config.js routes.js
mkdir controllers models middlewares
touch controllers/authController.js middlewares/middleware.js models/userModel.js
```

## Running

### Schema

```bash
npx prisma generate
```

### Server

```bash
node server.js
```

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