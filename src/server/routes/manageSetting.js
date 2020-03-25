const router = require("express").Router();
const Setting = require("../models/Setting");
const authMiddleware = require("../middleware/auth");

router.use(authMiddleware(255));

router.get('/', async (req, res) => {
    const settings = Setting.find();
    return res.status(200).send(settings);
});

module.exports = router;