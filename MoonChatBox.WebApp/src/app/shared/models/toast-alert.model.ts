export type ToastAlertType = 'information' | 'success' | 'warning' | 'error';

export interface ToastAlert {
  id: number;
  type: ToastAlertType;
  message: string;
  duration: number;
}
