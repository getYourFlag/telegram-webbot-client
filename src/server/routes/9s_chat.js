const router = require("express").Router();
const Chat = require('../models/chat');
const Message = require('../models/message');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware());

router.get('/bot/:botId', (req, res) => {
    Chat.find({bot_id: req.params.botId, archived: false})
        .populate('latest_message')
        .sort([['latest_update', -1]])
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

router.get('/archived/:botId', (req, res) => {
    Chat.find({bot_id: req.params.botId, archived: true})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

router.get('/update', (req, res) => {
    let {time, bot_id} = req.query;
    Chat.find({ bot_id, latest_update: { $gte: time }})
        .populate('latest_message')
        .then(data => {
            data = data.sort((a, b) => b.latest_update - a.latest_update);
            res.status(200).send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
});

module.exports = router;