const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    msg_id: {type: Number, required: true},
    chat_id: {type: Number, required: true},
    recipient: {
        user_id: {type: Number},
        shown_name: {type: String},
        type: {type: String},
        username: {type: String}
    },
    channel_id: {type: mongoose.Schema.Types.ObjectId, ref: 'channel'},
    text: String,
    title: String,
    media_link: String,
    date: Date,
    fromUs: Boolean
});

module.exports = mongoose.model('Message', messageSchema);