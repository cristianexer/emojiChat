import { Injectable } from '@nestjs/common';
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

@Injectable()
export class ChatService {
    private client: any;
    private params: any = {
        'text': 'www.ibm.com',
        'features': {
            //'sentiment': {},
            //'keywords': {},
            'emotion': {}
        }
      };

    constructor() {
        this.client = new NaturalLanguageUnderstandingV1({
            version: process.env.API_VERSION,
            iam_apikey: process.env.API_KEY,
            url: process.env.API_URL
            });
      }
    
       ofSentence(sentance: string): Promise<object> {
          this.params.text = sentance;
          
          return new Promise((resolve, reject) => {
            this.client.analyze(
                this.params, (err, res) => {
              if (err) {
                reject(err);
              } else {
                resolve(res);
              }
            });
          });
        }
      
}
