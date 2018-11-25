import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { join } from 'path';
import * as sassMiddleware from 'node-sass-middleware';
import { WsAdapter } from '@nestjs/websockets';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '.', 'templates'));
  app.setViewEngine('pug');
  app.use(
    sassMiddleware({
        src: join(__dirname, '..', 'public/assets/scss'),
        dest: join(__dirname, '..', 'public/assets/css'),
        debug: true,
        outputStyle: 'compressed'
    }),
  );
  app.useWebSocketAdapter(new WsAdapter(app.getHttpServer()));

  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
