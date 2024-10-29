const express = require('express');
const app = express();
const PORT = 3000;

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Hallie';

const SAMPLE_USER = {
  username: 'Hallie',
  password: 'Hallie'
};



app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is working!');
});


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // No token provided

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token

    req.user = user;
    next();
  });
}

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === SAMPLE_USER.username && password === SAMPLE_USER.password) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

app.get('/dashboard', authenticateToken, (req, res) => {
  res.send('Access granted to the dashboard!');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});