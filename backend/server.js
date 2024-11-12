const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Hallie';

const mongoose = require('mongoose');
const User = require('./models/User');

const SAMPLE_USER = {
  username: 'Hallie',
  password: 'Hallie'
};


// Connect to MongoDB
const MONGO_URI = 'mongodb://localhost:27017/healthcareApp';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((error) => console.error('MongoDB connection error:', error));


// Add a test user to the database
const addTestUser = async () => {
  try {
    const testUser = new User({ username: 'Hallie', password: 'Hallie' });
    await testUser.save();
    console.log('Test user created');
  } catch (error) {
    console.error('Error creating test user:', error);
  }
};

mongoose.connection.once('open', () => {
  addTestUser();
});


// Middleware CORS allow requests from frontend
app.use(cors());
// Middleware to parse JSON
app.use(express.json());


// Root route to confirm server is running
app.get('/', (req, res) => {
  res.send('Backend is working!');
});


// JWT authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access Denied: No token provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Access Denied: Invalid token' });

    req.user = user; // Add the decoded user info to the request object
    next();
  });
}


// Login route to authenticate user and return a JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === SAMPLE_USER.username && password === SAMPLE_USER.password) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});


// Protected dashboard
app.get('/dashboard', authenticateToken, (req, res) => {
  res.send('Access granted to the dashboard!');
});


// Summary Chart Data
// https://www.inpart.io/blog/17-top-healthcare-innovations-2023
app.get('/api/summary-data', (req, res) => {
  res.json([
    { label: "AI/Machine Learning", value: 24 },
    { label: "Anti-Microbials", value: 18 },
    { label: "Robotics", value: 18 },
    { label: "Wearable Devices", value: 12 },
    { label: "Other (nanomedicine, telemedicine, etc.)", value: 28 }
  ]);
});


// Reports Chart Data
// https://www.inpart.io/blog/17-top-healthcare-innovations-2023
app.get('/api/reports-data', (req, res) => {
  res.json([
    { label: "USA", value: 34 },
    { label: "UK", value: 24 },
    { label: "Canada", value: 30 },
    { label: "Colombia", value: 6 },
    { label: "Japan", value: 6 }
  ]);
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
