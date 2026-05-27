const express = require('express');
const authController = require('./controllers/authController');
const middleware = require('./middlewares/middleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

// ✅ เส้นทางสำหรับขอ Token ใหม่ (ทุกคนเข้าได้ แค่ต้องส่ง Refresh Token มาใน Body)
router.post('/refresh', authController.refreshToken);

// ✅ เส้นทาง Logout (ต้องแนบ Access Token มาใน Header ถึงจะ Logout ได้)
router.post('/logout', middleware.verifyToken, authController.logout);

router.get('/protected', middleware.verifyToken, (req, res) => {
  res.json({ message: "This is a protected route", userId: req.userId });
});

module.exports = router;