const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message_id: Number,
    update_id: Number,
    ref_chat_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Chat'},
    text: String,
    media_link: String,
    date: Date,
    fromUs: Boolean,
    success: Boolean
});

module.exports = mongoose.model('Message', messageSchema);