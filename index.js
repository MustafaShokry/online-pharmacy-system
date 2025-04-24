const dotenv = require('dotenv');
const { createApp } = require('./src/app');

dotenv.config();

const PORT = process.env.PORT || 3000;


const app = createApp();
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});

