require('dotenv').config();
const config = require('config');
const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Channel = require('../models/channel');
const axios = require('axios');

router.use(authMiddleware(128));

router.post('/addChannel', async (req, res) => {
    const {name, token, description} = req.params;
    const channel = await Channel.create({name, token, description});
    return res.status(200).send(channel);
});

router.get('/removeChannel/:id', async (req, res) => {
    const {name, token, description} = req.params;
    const channel = await Channel.create({name, token, description});
    return res.status(200).send(channel);
});

router.post('/setWebhook', async (req, res) => {
    const {token} = req.params;
    axios.post(config.get('telegram.baseUrl') + token + '/setWebhook', {
        'url': config.get('backend-url') + '/receive/' + token
    }).then(res => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

export default router;