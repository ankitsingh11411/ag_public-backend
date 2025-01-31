const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const carRoutes = require('./routes/carRoutes');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

app.use('/api/cars', carRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
