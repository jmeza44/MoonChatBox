import { Injectable } from '@angular/core';
import { ToastAlert, ToastAlertType } from '../models/toast-alert.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastAlertsService {
  private static DEFAULT_DURATION = 3000; // Default duration in milliseconds

  private toastSubject = new Subject<ToastAlert>();
  private currentId = 0;

  // Observable for components to subscribe to
  toast$ = this.toastSubject.asObservable();

  show(message: string, type: ToastAlertType, duration: number = ToastAlertsService.DEFAULT_DURATION): void {
    const toast: ToastAlert = {
      id: this.currentId++,
      type,
      message,
      duration
    };

    this.toastSubject.next(toast);

    // Automatically hide toast after its duration
    setTimeout(() => this.toastSubject.next({ ...toast, message: '' }), duration);
  }

  information(message: string, duration?: number): void {
    this.show(message, 'information', duration);
  }

  success(message: string, duration?: number): void {
    this.show(message, 'success', duration);
  }

  warning(message: string, duration?: number): void {
    this.show(message, 'warning', duration);
  }

  error(message: string, duration?: number): void {
    this.show(message, 'error', duration);
  }
}
