const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const { createApp } = require('./src/app');
const express = require('express');
const productRouter = require('./src/modules/product/product_router');

const app = express()
app.use(express.json())

dotenv.config();

const PORT = process.env.PORT || 3000;

// Connect to DB and start server
connectDB().then(() => {
    const app = createApp();
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
});

app.use('/products',productRouter)
port = process.env.PORT || 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


