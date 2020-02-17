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

router.get('/removeChannel/:id',  (req, res) => {
    Channel.findOneAndDelete(req.params.id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
});

router.post('/setWebhook/:id', async (req, res) => {
    const channel = await Channel.findById(req.params.id);
    const token = channel.token;
    axios.post(config.get('telegram.baseUrl') + token + '/setWebhook', {
        'url': config.get('backend-url') + '/receive/' + token
    })
        .then(res => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
});

router.post('/removeWebhook/:id', async (req, res) => {
    const channel = await Channel.findById(req.params.id);
    const token = channel.token;
    axios.get(config.get('telegram.baseUrl') + token + '/removeWebhook')
        .then(res => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
});

export default router;