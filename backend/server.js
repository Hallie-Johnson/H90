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
//app.use(cors());
app.use(cors({ origin: 'http://165.227.191.18' }));
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


// Middleware should return a 401 error if JWT is invalid or missing
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'Unauthorized access, please log in.' });
  } else {
    next(err);
  }
});

/*
// Insert summary data into MongoDB
const insertSummaryData = async () => {
  const sampleData = [
    { label: 'AI/Machine Learning', value: 24 },
    { label: 'Anti-Microbials', value: 18 },
    { label: 'Robotics', value: 18 },
    { label: 'Wearable Devices', value: 12 },
    { label: 'Other (nanomedicine, telemedicine, etc.)', value: 28 }
  ];

  const existingData = await SummaryData.countDocuments({});
  if (existingData === 0) {
    try {
      await SummaryData.insertMany(sampleData);
      console.log('Sample summary data inserted!');
    } catch (error) {
      console.error('Error inserting sample data:', error);
    }
  } else {
    console.log('Summary data already exists in the database.');
  }
};

insertSummaryData();


// Insert report data into MongoDB
const insertReportData = async () => {
  const sampleData = [
    { label: 'USA', value: 34 },
    { label: 'UK', value: 24 },
    { label: 'Canada', value: 30 },
    { label: 'Colombia', value: 6 },
    { label: 'Japan', value: 6 }
  ];

  const existingData = await ReportData.countDocuments({});
  if (existingData === 0) {
    try {
      await ReportData.insertMany(sampleData);
      console.log('Sample report data inserted!');
    } catch (error) {
      console.error('Error inserting sample data:', error);
    }
  } else {
    console.log('Report data already exists in the database.');
  }
};

insertReportData();

*/


// Summary Chart Data
// https://www.inpart.io/blog/17-top-healthcare-innovations-2023
app.get('/api/summary-data', async (req, res) => {
  try {
    const summaryData = await SummaryData.find({});
    console.log("Fetched summary data:", summaryData);  // Log the data fetched from MongoDB
    res.json(summaryData);
  } catch (error) {
    console.error('Error fetching summary data:', error);
    res.status(500).json({ message: 'Failed to retrieve summary data' });
  }
});

// Reports Chart Data
// https://www.inpart.io/blog/17-top-healthcare-innovations-2023
app.get('/api/reports-data', async (req, res) => {
  try {
    const reportData = await ReportData.find({});
    console.log("Fetched reports data:", reportData);  // Log the data fetched from MongoDB
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
