import { Component, OnInit } from '@angular/core';
import { ToastAlert } from '../shared/models/toast-alert.model';
import { Subscription } from 'rxjs';
import { ToastAlertsService } from '../shared/services/toast-alerts.service';

@Component({
  selector: 'moon-toasts-alerts',
  standalone: true,
  imports: [],
  templateUrl: './toasts-alerts.component.html'
})
export class ToastsAlertsComponent implements OnInit {
  toasts: ToastAlert[] = [];
  private toastAlertSubscription: Subscription | undefined = undefined;

  isInformation(toast: ToastAlert): boolean { return toast.type === 'information'; }
  isSuccess(toast: ToastAlert): boolean { return toast.type === 'success'; }
  isWarning(toast: ToastAlert): boolean { return toast.type === 'warning'; }
  isError(toast: ToastAlert): boolean { return toast.type === 'error'; }

  constructor(private toastAlertService: ToastAlertsService) {}

  ngOnInit(): void {
    this.toastAlertSubscription = this.toastAlertService.toast$.subscribe({
      next: (toast) => {
        if (toast.message) {
          this.toasts = [...this.toasts, toast];
        } else {
          this.toasts = this.toasts.filter(t => t.id !== toast.id);
        }
      }
    });
  }

  onClose(toastId: number) {
    this.toasts = this.toasts.filter(t => t.id !== toastId);
  }

  ngOnDestroy(): void {
    if (this.toastAlertSubscription) {
      this.toastAlertSubscription.unsubscribe();
    }
  }
}
