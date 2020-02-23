const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, dropUps: true },
    password: { type: String, required: true, select: false },
    nick: { type: String, dropUps: true },
    last_login: { type: Date, default: Date.now },
    permission: { type: Number, min: 0, max: 255 }
},
{
    bufferCommands: false,
});

userSchema.virtual("canWrite").get(function() {
    return this.permission >= 4;
});
userSchema.virtual("canManage").get(function() {
    return this.permission >= 64;
});
userSchema.virtual('canModerate').get(function() {
    return this.permission >= 128;
});
userSchema.virtual("isAdmin").get(function() {
    return this.permission === 255;
});

userSchema.pre('save', function(next) {
    if (!this.nick) {
        this.nick = this.get('username');
    }
    next();
});

module.exports = mongoose.model('User', userSchema);