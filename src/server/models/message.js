const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message_id: Number,
    update_id: Number,
    ref_chat_id: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    text: String,
    media_link: String,
    media_type: String,
    date: Number,
    fromUs: Boolean,
    success: Boolean,
    isSystemMessage: { type: Boolean, default: false },
});

messageSchema.virtual("update_time").get(function() {
    let date = new Date(this.date);

    if (date.setHours(0, 0, 0, 0) == Date.now().setHours(0, 0, 0, 0)) {
        return date.toLocaleTimeString("h24", {
            hour: "numeric",
            minute: "numeric",
        });
    }
    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });
});

module.exports = mongoose.model("Message", messageSchema);
