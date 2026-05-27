const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../models/userModel');

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists!" }); 
    }

    await User.createUser({ username, password });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register Error: ", error); 
    res.status(500).json({ message: "Error registering user!" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findUserByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    
    const accessToken = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id: user.id }, config.jwtRefreshSecret, { expiresIn: "7d" });
    
    await User.updateRefreshToken(user.id, refreshToken); // ตรงนี้โมเดลเราจัดการ Hash ให้แล้ว

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error("Login Error: ", error);
    res.status(500).json({ message: "Error logging in!" });
  }
};

// ฟังก์ชันขอ Token ใหม่ (ต้อง Compare แบบ Hash)
const refreshToken = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(403).json({ message: "Refresh Token is required!" });

  try {
    const decoded = jwt.verify(token, config.jwtRefreshSecret);
    const user = await User.findUserById(decoded.id);

    // เช็กว่ามี User ไหม และถ้ามี ให้เอา token ที่ส่งมาเทียบกับ refreshToken ที่โดน Hash ไว้ใน DB
    if (!user || !user.refreshToken) {
        return res.status(403).json({ message: "Invalid Refresh Token!" });
    }

    const isValidToken = await bcrypt.compare(token, user.refreshToken);
    if (!isValidToken) {
      return res.status(403).json({ message: "Invalid Refresh Token!" });
    }

    const newAccessToken = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: "15m" });
    res.json({ accessToken: newAccessToken });

  } catch (error) {
    console.error("Refresh Error: ", error);
    res.status(403).json({ message: "Invalid or expired Refresh Token!" });
  }
};

const logout = async (req, res) => {
  try {
    await User.updateRefreshToken(req.userId, null); 
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out" });
  }
};

module.exports = { register, login, refreshToken, logout };