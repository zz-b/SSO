const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const port = 3002;
const secretKey = 'your-secret-key';
app.use(cors({
  origin: ['http://project1.com:8082', 'http://project2.com:8081'], // 允许的前端项目域名
  credentials: true, // 允许携带凭证
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的方法
  allowedHeaders: ['Authorization', 'Content-Type'], // 允许的请求头
}));
// 受保护资源
app.get('/protected', (req, res) => {
  const authorizationHeader = req.headers.authorization;
  const token = authorizationHeader && authorizationHeader.split(' ')[1];

  if (token) {
    try {
      const payload = jwt.verify(token, secretKey);
      res.json({ success: true, data: `Hello ${payload.username}` });
    } catch (err) {
      res.status(401).json({ success: false, message: 'Invalid token' });
    }
  } else {
    res.status(401).json({ success: false, message: 'No token provided' });
  }
});

// 启动服务
app.listen(port, () => {
  console.log(`Resource service running on http://localhost:${port}`);
});
