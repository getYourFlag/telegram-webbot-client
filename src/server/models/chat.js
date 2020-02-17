const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    tg_id: {type: Number, required: true},
    type: String,
    user_id: {type: Number},
    shown_name: String,
    username: String,
    title: {type: String, required: true},
    bot_id: {type: mongoose.Schema.Types.ObjectId, ref: 'bot'},
});

module.exports = mongoose.model('Chat', chatSchema);