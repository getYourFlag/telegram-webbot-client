const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT);