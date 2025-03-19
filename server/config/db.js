const mongoose = require('mongoose');
require('dotenv').config(); 

const connectDB = async () => {
  try {
    // eslint-disable-next-line no-undef
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected Successfully');
  } catch (err) {
    console.error('❌ Error connecting to MongoDB:', err.message);
    // eslint-disable-next-line no-undef
    process.exit(1);
  }
};

module.exports = connectDB;
