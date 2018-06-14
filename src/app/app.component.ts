import { Component } from '@angular/core';
import { ChatService } from './chat/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  
  constructor(public chat: ChatService) { 
  }

  talk(text){ 
   this.chat.converse(text);
   //setTimeout(this.scrollToBottom, 500);
  }

  // scrollToBottom(){
  //   let body = document.body, html = document.documentElement;
  //   let height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
                       
  //   window.scrollTo({ top: height, behavior: 'smooth' });
  // }
}
