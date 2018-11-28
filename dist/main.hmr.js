"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./modules/app.module");
const path_1 = require("path");
const sassMiddleware = require("node-sass-middleware");
const websockets_1 = require("@nestjs/websockets");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.useStaticAssets(path_1.join(__dirname, '..', 'public'));
        app.setBaseViewsDir(path_1.join(__dirname, '.', 'templates'));
        app.setViewEngine('pug');
        app.use(sassMiddleware({
            src: path_1.join(__dirname, '..', 'public/assets/scss'),
            dest: path_1.join(__dirname, '..', 'public/assets/css'),
            debug: true,
            outputStyle: 'compressed'
        }));
        app.useWebSocketAdapter(new websockets_1.WsAdapter(app.getHttpServer()));
        yield app.listen(3000);
        if (module.hot) {
            module.hot.accept();
            module.hot.dispose(() => app.close());
        }
    });
}
bootstrap();
//# sourceMappingURL=main.hmr.js.map