import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse
} from '@nestjs/websockets';
import { Observable, of } from 'rxjs';

@WebSocketGateway(8080)
export class EventsGateway{
  @WebSocketServer() 
  private server: any;

  @SubscribeMessage('message')
  async onEvent(cl, data:any){
    
    this.server.clients.forEach(function each(client) {
      
      client.send(JSON.stringify(data));
    });
    
  }
}