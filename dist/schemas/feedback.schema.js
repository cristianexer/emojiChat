"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.FeedbackSchema = new mongoose.Schema({
    nickname: String,
    text: String,
    result: String,
    feedback: String
});
//# sourceMappingURL=feedback.schema.js.map