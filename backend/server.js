const express = require('express');
const app = express();
const PORT = 3000;

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Hallie';

const mongoose = require('mongoose');
const User = require('./models/User');

const SAMPLE_USER = {
  username: 'Hallie',
  password: 'Hallie'
};


const addTestUser = async () => {
  try {
    const testUser = new User({ username: 'testuser', password: 'testpassword' });
    await testUser.save();
    console.log('Test user created');
  } catch (error) {
    console.error('Error creating test user:', error);
  }
};

mongoose.connection.once('open', () => {
  addTestUser();
});



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



const MONGO_URI = 'mongodb://localhost:27017/healthcareApp'; // Use your database name

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((error) => console.error('MongoDB connection error:', error));






app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});