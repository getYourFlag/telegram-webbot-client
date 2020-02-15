const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require('cors');

const webhook = require('./routers/webhook');

app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello Express!");
});
app.use('/webhook', webhook);

app.listen(PORT);