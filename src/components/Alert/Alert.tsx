import './Alert.css';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  message: string;
  onClose?: () => void;
}

const icons: Record<AlertVariant, string> = {
  info: 'ℹ',
  success: '✓',
  warning: '⚠',
  error: '✕',
};

export function Alert({ variant = 'info', title, message, onClose }: AlertProps) {
  return (
    <div className={`alert alert--${variant}`} role="alert">
      <span className="alert__icon">{icons[variant]}</span>
      <div className="alert__body">
        {title && <p className="alert__title">{title}</p>}
        <p className="alert__message">{message}</p>
      </div>
      {onClose && (
        <button className="alert__close" onClick={onClose} aria-label="Dismiss">✕</button>
      )}
    </div>
  );
}
