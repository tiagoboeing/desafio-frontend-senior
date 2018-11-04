import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { timer } from 'rxjs';
import { NotificationService } from '../notification.service';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],

  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0,
        right: '0px',
        'display': 'none'
      })),
      state('visible', style({
        opacity: 1,
        right: '10%',
        'display': 'inherit'
      })),
      transition('hidden => visible', animate('300ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  snackVisibility = 'hidden';

  // recebe tipo de notificação a ser emitida
  message = 'Central de notificações';
  type: string;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notifier.pipe(
      tap(message => {
        this.message = message.message;
        this.type = message.type;

        this.snackVisibility = 'visible';
      }),
      switchMap(() => timer(3000))
    ).subscribe(() => {
      this.snackVisibility = 'hidden';
    });
  }

  toggleSnack() {
    this.snackVisibility = this.snackVisibility === 'hidden' ? 'visible' : 'hidden';
  }

}
