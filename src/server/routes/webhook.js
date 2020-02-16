const express = require('express');
const webhook = express.Router();

webhook.get('/', (req, res) => {
    res.send("Webhook is functioning");
});

module.exports = webhook;