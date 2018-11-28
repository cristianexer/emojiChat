"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
let ChatService = class ChatService {
    constructor() {
        this.params = {
            'text': 'www.ibm.com',
            'features': {
                'emotion': {}
            }
        };
        this.client = new NaturalLanguageUnderstandingV1({
            version: process.env.API_VERSION,
            iam_apikey: process.env.API_KEY,
            url: process.env.API_URL
        });
    }
    ofSentence(sentance) {
        this.params.text = sentance;
        return new Promise((resolve, reject) => {
            this.client.analyze(this.params, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
    }
};
ChatService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map