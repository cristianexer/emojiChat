import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { DatabaseModule } from '../database/database.module';
import { EventsModule } from '../events/event.module';
import { ChatController } from '../controllers/chat.controller';
import { ChatService } from '../services/chat.service';
import { ChatModule } from './chat.module';
@Module({
  imports: [EventsModule, ChatModule],
  controllers: [AppController,ChatController],
  providers: [AppService,EventsModule, ChatService],
})
export class AppModule {}
