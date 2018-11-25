import * as mongoose from 'mongoose';

export const FeedbackSchema = new mongoose.Schema({
  nickname: String,
  text: String,
  result: String,
  feedback:String
});