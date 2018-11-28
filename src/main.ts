import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { WsAdapter } from '@nestjs/websockets';
import { join } from 'path';
import * as sassMiddleware from 'node-sass-middleware';

// env
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useWebSocketAdapter(new WsAdapter(app.getHttpServer()));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'templates'));
  app.setViewEngine('pug');
  
  //run
  app.use(
    sassMiddleware({
        src: join(__dirname, '.', 'scss'),
        dest: join(__dirname, '..', 'public/css'),
        debug: true,
        outputStyle: 'compressed',
        sourceMap: true,
        prefix: '/middleware',
        force:true
    }),
  );
  

  if(process.env.HOST)
    await app.listen(process.env.PORT || 3000, process.env.HOST);
  else
    await app.listen(process.env.PORT || 3000 );
    
}
bootstrap();
