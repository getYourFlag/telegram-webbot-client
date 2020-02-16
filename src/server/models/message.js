const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    msg_id: {type: Number, required: true},
    chat_id: {type: Number, required: true},
    recipient_name: {type: String, required: true},
    channel_id: {type: mongoose.Schema.Types.ObjectId, ref: 'channel'},
    text: String,
    media_link: String
});

module.exports = mongoose.model('Message', messageSchema);