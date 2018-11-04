import { EventEmitter, Injectable } from '@angular/core';
import { Notification } from './notification.model';

@Injectable()
export class NotificationService {

    notifier = new EventEmitter<Notification>();

    notification: Notification;

    notify(type: string, message: string) {
        this.notification = {
            message: message,
            type: this.getTypeNotification(type),
        };

        this.notifier.emit(this.notification);
    }

    getTypeNotification(type: string): string {
        switch (type) {
            case 'primary':
                return 'alert-primary';

            case 'info':
                return 'alert-info';

            case 'danger':
                return 'alert-danger';

            case 'success':
                return 'alert-success';

            case 'warning':
                return 'alert-warning';

            case 'light':
                return 'alert-light';

            case 'dark':
                return 'alert-dark';

            case 'secondary':
                return 'alert-secondary';

            default:
                return 'alert-primary';
        }
    }

}

