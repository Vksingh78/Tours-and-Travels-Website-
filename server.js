
// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize app
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/travelDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Schema: User Registration
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = mongoose.model('User', UserSchema);

// Schema: Booking Form
const BookingSchema = new mongoose.Schema({
  destination: String,
  departDate: String,
  returnDate: String,
  duration: String,
});
const Booking = mongoose.model('Booking', BookingSchema);

// Route: Register
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});













// // server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// // ✅ Initialize
// const app = express();
// const PORT = 3000;

// // ✅ Log All Requests
// app.use((req, res, next) => {
//   console.log(`[${req.method}] ${req.url}`);
//   next();
// });

// // ✅ Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // ✅ Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/travelDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('✅ Connected to MongoDB');
// })
// .catch(err => {
//   console.error('❌ MongoDB connection error:', err);
// });

// // ✅ Define Schema and Model for User Registration
// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
// });
// const User = mongoose.model('User ', UserSchema);

// // ✅ Define Schema and Model for Booking
// const BookingSchema = new mongoose.Schema({
//   destination: String,
//   departDate: String,
//   returnDate: String,
//   duration: String,
// });
// const Booking = mongoose.model('Booking', BookingSchema);

// // ✅ User Registration Route
// app.post('/register', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const user = new User({ name, email, password });
//     await user.save();
//     res.status(201).json({ message: 'User  registered successfully!' });
//   } catch (err) {
//     res.status(500).json({ message: 'Registration failed', error: err });
//   }
// });

// // ✅ Booking Route
// app.post('/booking', async (req, res) => {
//   try {
//     console.log('🔽 Booking received:', req.body);
//     const { destination, departDate, returnDate, duration } = req.body;

//     const booking = new Booking({ destination, departDate, returnDate, duration });
//     await booking.save();

//     res.status(201).json({ message: 'Booking saved successfully!' });
//   } catch (err) {
//     console.error('❌ Booking failed:', err);
//     res.status(500).json({ message: 'Booking failed', error: err.message });
//   }
// });

// // ✅ Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });

