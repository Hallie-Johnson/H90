const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { expressjwt: jwtMW } = require('express-jwt');

const app = express();
const PORT = 3000;


// User
const JWT_SECRET = 'Hallie';
const SAMPLE_USER = {
  username: 'Hallie',
  password: 'Hallie'
};


// JWT Middleware
const jwtMWInstance = jwtMW({
  secret: JWT_SECRET,
  algorithms: ['HS256']
});


// Summary Data set up
const summaryDataSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: Number, required: true },
});
const SummaryData = mongoose.model('SummaryData', summaryDataSchema);

// Report Data set up
const reportDataSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: Number, required: true },
});
const ReportData = mongoose.model('ReportData', reportDataSchema);


// Connect to MongoDB
const MONGO_URI = 'mongodb://localhost:27017/healthcareApp';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((error) => console.error('MongoDB connection error:', error));


// Middleware
app.use(cors());
app.use(express.json());


// Root route to confirm server is running
app.get('/', (req, res) => {
  res.send('Backend is working!');
});


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


// Protected Routes (only accessible with a valid JWT)
app.get('/dashboard', jwtMWInstance, (req, res) => {
  res.json({
    success: true,
    message: 'Access granted to the dashboard!',
  });
});

app.get('/reports', jwtMWInstance, (req, res) => {
  res.json({
    success: true,
    message: 'Access granted to reports!',
  });
});

app.get('/summary', jwtMWInstance, (req, res) => {
  res.json({
    success: true,
    message: 'Access granted to the summary!',
  });
});


// Summary Chart Data
// https://www.inpart.io/blog/17-top-healthcare-innovations-2023
app.get('/api/summary-data', async (req, res) => {
  try {
    const summaryData = await SummaryData.find({});
    res.json(summaryData);
  } catch (error) {
    console.error('Error fetching summary data:', error);
    res.status(500).json({ message: 'Failed to retrieve summary data' });
  }
  console.log(summaryData);
});


// Reports Chart Data
// https://www.inpart.io/blog/17-top-healthcare-innovations-2023
app.get('/api/reports-data', async (req, res) => {
  try {
    const reportData = await ReportData.find({});
    res.json(reportData);
  } catch (error) {
    console.error('Error fetching report data:', error);
    res.status(500).json({ message: 'Failed to retrieve report data' });
  }
});


// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
