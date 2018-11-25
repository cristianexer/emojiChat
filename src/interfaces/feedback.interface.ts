import { Document } from 'mongoose';

export interface Feedback extends Document {
    readonly nickname: String,
    readonly text: String,
    readonly result: String,
    readonly feedback:String
}