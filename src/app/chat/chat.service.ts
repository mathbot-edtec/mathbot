import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { ApiAiClient } from 'api-ai-javascript';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class Message {
  constructor(public content: string, public sentBy: string) {this.content = this.content.replace(new RegExp('\n', 'g'), "<br />");}
}

class Describer {
  static describe(instance): Array<string> {
      return Object.getOwnPropertyNames(instance);
  }
}

@Injectable()
export class ChatService {

  readonly token = environment.dialogflow.angularBot;
  readonly client = new ApiAiClient({ accessToken: this.token });

  conversation = new BehaviorSubject<Message[]>([]);

  constructor() {
  }

  // Sends and receives messages via DialogFlow
  converse(msg: string) {
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);

    return this.client.textRequest(msg)
               .then(res => {
                  console.log(res);
                  //const speech = res.result.fulfillment.speech;
                  //let x = Describer.describe(res.result.fulfillment);
                  let x = Object.values(Object.values(res.result.fulfillment)[1][0])[1]
                  console.log(x);
                  //const speech = res.result.fulfillment.speech;
                  const speech = x;
                  const botMessage = new Message(speech, 'bot');
                  this.update(botMessage);
               });
  }


  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }


}
