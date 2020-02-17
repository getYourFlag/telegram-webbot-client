const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message_id: {type: Number, required: true},
    chat_id: {type: mongoose.Schema.Types.ObjectId, ref: 'chat'},
    text: String,
    media_link: String,
    date: Date,
    fromUs: Boolean,
    archived: Boolean
});

module.exports = mongoose.model('Message', messageSchema);