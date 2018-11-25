import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbackController } from '../controllers/feedback.controller';
import { FeedbackService } from '../services/feedback.service';
import { FeedbackSchema } from '../schemas/feedback.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Feedback', schema: FeedbackSchema }])],
    controllers: [FeedbackController],
    providers: [FeedbackService],
})
export class FeedBackModule {}