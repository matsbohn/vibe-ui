import './Toast.css';

export type ToastVariant = 'default' | 'success' | 'warning' | 'error';

export interface ToastProps {
  message: string;
  variant?: ToastVariant;
  onClose?: () => void;
}

const icons: Record<ToastVariant, string> = {
  default: '●',
  success: '✓',
  warning: '⚠',
  error: '✕',
};

export function Toast({ message, variant = 'default', onClose }: ToastProps) {
  return (
    <div className={`toast toast--${variant}`} role="status">
      <span className="toast__icon">{icons[variant]}</span>
      <span className="toast__message">{message}</span>
      {onClose && (
        <button className="toast__close" onClick={onClose} aria-label="Dismiss">✕</button>
      )}
    </div>
  );
}
