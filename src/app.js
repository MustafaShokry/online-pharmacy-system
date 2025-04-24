const express = require('express');
const cors = require('cors');


function createApp() {
    const app = express();

    // Global Middlewares
    app.use(cors());
    app.use(express.json());


    app.get('/', (req, res) => {
        res.send("Hello World!");
    })

    return app;
}

module.exports = { createApp };
