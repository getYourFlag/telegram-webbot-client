require('dotenv').config();
const config = require('config');
const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Bot = require('../models/bot');
const axios = require('axios');

router.use(authMiddleware(128));

router.post('/addBot', async (req, res) => {
    const {name, token, description} = req.params;
    const bot = await Bot.create({name, token, description});
    return res.status(200).send(bot);
});

router.get('/removeBot/:id',  (req, res) => {
    Bot.findOneAndDelete(req.params.id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
});

router.post('/setWebhook/:id', async (req, res) => {
    const bot = await Bot.findById(req.params.id);
    const token = bot.token;
    axios.post(config.get('telegram.baseUrl') + token + '/setWebhook', {
        'url': config.get('backend-url') + '/receive/' + token
    })
        .then(res => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
});

router.post('/removeWebhook/:id', async (req, res) => {
    const bot = await Bot.findById(req.params.id);
    const token = bot.token;
    axios.get(config.get('telegram.baseUrl') + token + '/removeWebhook')
        .then(res => res.status(200).send(data))
        .catch(err => res.status(500).send(err));
});

export default router;