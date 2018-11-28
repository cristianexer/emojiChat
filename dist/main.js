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
const websockets_1 = require("@nestjs/websockets");
const path_1 = require("path");
const sassMiddleware = require("node-sass-middleware");
require('dotenv').config();
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.useWebSocketAdapter(new websockets_1.WsAdapter(app.getHttpServer()));
        app.useStaticAssets(path_1.join(__dirname, '..', 'public'));
        app.setBaseViewsDir(path_1.join(__dirname, '..', 'templates'));
        app.setViewEngine('pug');
        app.use(sassMiddleware({
            src: path_1.join(__dirname, '.', 'scss'),
            dest: path_1.join(__dirname, '..', 'public/css'),
            debug: true,
            outputStyle: 'compressed',
            sourceMap: true,
            prefix: '/middleware',
            force: true
        }));
        if (process.env.HOST)
            yield app.listen(process.env.PORT || 3000, process.env.HOST);
        else
            yield app.listen(process.env.PORT || 3000);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map