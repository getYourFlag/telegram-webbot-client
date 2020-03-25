const router = require("express").Router();
const Chat = require("../models/chat");
const authMiddleware = require("../middleware/auth");

router.use(authMiddleware(4));

router.delete("/delete/:chatId", (req, res) => {
    Chat.findOneAndDelete(req.params.chatId)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

router.patch("/setarchive/:chatId", async (req, res) => {
    const chat = await Chat.findById(req.params.chatId);
    chat.archived = true;
    chat.save()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

module.exports = router;
