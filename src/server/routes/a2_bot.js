require('dotenv').config();
const config = require('config');
const router = require("express").Router();
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
    axios.post(config.get('telegram.baseUrl') + bot.token + '/setWebhook', {
        'url': config.get('backend-url') + '/receive/' + bot._id
    })
        .then(resData => res.status(200).send(resData.data))
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
});

router.get('/removeWebhook/:id', authMiddleware(128), async (req, res) => {
    const bot = await Bot.findById(req.params.id);
    axios.get(config.get('telegram.baseUrl') + bot.token + '/removeWebhook')
        .then(resData => res.status(200).send(resData.data))
        .catch(err => res.status(500).send(err));
});

router.get('/resetWebhooks', authMiddleware(255), async (req, res) => {
    let backendUrl = config.get('backend-url');
    if (req.query.backendUrl) backendUrl = req.query.backendUrl;

    let bots = await Bot.find();
    let deleteWebhooks = bots.map(bot => axios.get(config.get('telegram.baseUrl') + bot.token + '/deleteWebhook'));

    Promise.all(deleteWebhooks).then(_ => {
        bots = bots.map(bot => axios.post(config.get('telegram.baseUrl') + bot.token + '/setWebhook', {
            'url': backendUrl + '/receive/' + bot._id
        }));
        return Promise.all(bots);
    }).then(values => {
        values = values.map(value => value.data);
        return res.status(200).send(values).end();
    }).catch(err => {
        console.log(`Error in reseting webhooks.`);
        console.log(err);
        return res.status(500).send("Error in reseting webhook, please refer to console for error log.").end();
    });
});

router.get('/webhookInfo', authMiddleware(255), async (req, res) => {
    let bots = await Bot.find();
    bots = bots.map(bot => axios.get(config.get('telegram.baseUrl') + bot.token + '/getWebhookInfo'));
    Promise.all(bots).then(values => {
        values = values.map(value => value.data.result);
        return res.status(200).send(values).end();
    });
});

module.exports = router;