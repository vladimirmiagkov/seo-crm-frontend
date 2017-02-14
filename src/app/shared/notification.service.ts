import {Injectable} from '@angular/core';
import {Subject}    from 'rxjs/Subject';
import {Message} from 'primeng/primeng';

@Injectable()
export class NotificationService {
  private messageSource = new Subject<Message>();// Observable string sources
  public messageStream$ = this.messageSource.asObservable();// Observable string streams

  addMessage(message: Message) {
    this.messageSource.next(message);
  }
}