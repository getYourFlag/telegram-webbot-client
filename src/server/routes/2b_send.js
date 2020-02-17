const config = require('config');
const express = require("express");
const router = express.Router();
const axios = require('axios');

router.post('/sendMessage', (req, res) => {
    const { user_id, text } = req.params;

});

module.exports = router;