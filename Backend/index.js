const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const { createApp } = require('./src/app');

dotenv.config();

const PORT = process.env.PORT || 3000;

// Connect to DB and start server
connectDB().then(() => {
    const app = createApp();
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
});

