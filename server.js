const express = require('express');
const {connectDB} = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());


// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder


}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
