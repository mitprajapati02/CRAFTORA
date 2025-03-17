const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Allow CORS for frontend
app.use(cors());

// ✅ Allow JSON requests
app.use(express.json());

// ✅ Example Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
