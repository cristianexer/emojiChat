import { Get, Controller, Render } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index.pug')
  root(){
    return this.appService.root();
  }
}
