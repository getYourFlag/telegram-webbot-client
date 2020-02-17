const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const channelSchema = new Schema({
    token: {type: String, required: true},
    name: String,
    description: String
});

module.exports = mongoose.model('Channel', channelSchema);