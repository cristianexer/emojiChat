import { Get, Controller } from '@nestjs/common';
import { FeedbackService } from '../services/feedback.service';


@Controller()
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  
}
