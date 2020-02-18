require('dotenv').config();
const config = require('config');
const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Bot = require('../models/bot');
const axios = require('axios');

router.get('/list', authMiddleware(), (req, res) => {
    Bot.find().select('name')
        .then(resData => res.status(200).send(resData))
        .catch(err => res.status(500).send(err));
});

router.post('/addBot', authMiddleware(128), async (req, res) => {
    const {name, token, description} = req.body;
    Bot.create({name, token, description})
        .then(bot => res.status(200).send(bot))
        .catch(err => res.status(500).send(err));
});

router.get('/removeBot/:id', authMiddleware(128), (req, res) => {
    Bot.findOneAndDelete(req.params.id)
        .then(data => res.status(200).send(data.data))
        .catch(err => res.status(500).send(err));
});

router.get('/setWebhook/:id', authMiddleware(128), async (req, res) => {
    const bot = await Bot.findById(req.params.id);
    const token = bot.token;
    axios.post(config.get('telegram.baseUrl') + token + '/setWebhook', {
        'url': config.get('backend-url') + '/receive/' + token
    })
        .then(resData => res.status(200).send(resData.data))
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
});

router.get('/removeWebhook/:id', authMiddleware(128), async (req, res) => {
    const bot = await Bot.findById(req.params.id);
    const token = bot.token;
    axios.get(config.get('telegram.baseUrl') + token + '/removeWebhook')
        .then(resData => res.status(200).send(resData.data))
        .catch(err => res.status(500).send(err));
});

module.exports = router;