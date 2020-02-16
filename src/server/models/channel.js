const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const channelSchema = new Schema({
    token: {type: String, required: true},
    name: String,
    route: {type: String, required: true}
});

channelSchema.pre('save', function(next) {
    if (!this.route) {
        this.route = this.get('name');
    }
    next();
});

module.exports = mongoose.model('Channel', channelSchema);