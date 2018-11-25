import { Controller, Param, Post, Body } from '@nestjs/common';
import { ChatService } from '../services/chat.service';


@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('/message')
  async root(@Body() body: string): Promise<object> {

    // @ts-ignore

    let response = await this.chatService.ofSentence(body.item);

    // @ts-ignore
    response = response.emotion.document.emotion;

    let Feedback = {
      // @ts-ignore
      nickname: body.nickname,    
      // @ts-ignore
      text: body.item,
      emotions: response
    }
    
    console.log(Feedback);


    return response;
  }
  
}
