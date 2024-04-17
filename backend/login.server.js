const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;
const secretKey = 'your-secret-key';

app.use(bodyParser.json());
app.use(cors({
  // origin: ['http://project1.com:8082', 'http://project2.com:8081'], // 允许的前端项目域名(端口必须写)
  origin: *, // 允许的前端项目域名(荣幸所有，此时可以不写端口)
  credentials: true, // 允许携带凭证
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的方法
  allowedHeaders: ['Authorization', 'Content-Type'], // 允许的请求头
}));

// 登录端点
app.post('/login', (req, res) => {
  
  const { username, password } = req.body;

  // 验证用户身份
  if (username === 'user' && password === 'password') {
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// 启动服务
app.listen(port, () => {
  console.log(`Authentication service running on http://localhost:${port}`);
});
