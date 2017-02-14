import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {Message} from 'primeng/primeng';

import {NotificationService} from './notification.service';

@Component({
  selector: 'app-notification',
  template: `<p-growl [value]="messages" life="5000"></p-growl>`,
})
export class NotificationComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  public messages: Message[] = [];

  constructor(private notificationService: NotificationService) {
    this.subscription = notificationService.messageStream$.subscribe(
      (message: Message) => {
        this.messages.push(message);
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }
}