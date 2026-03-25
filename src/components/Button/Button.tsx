import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'disabled';

export interface ButtonProps {
  variant?: ButtonVariant;
  label: string;
  onClick?: () => void;
}

export const Button = ({ variant = 'primary', label, onClick }: ButtonProps) => {
  return (
    <button
      className={`btn btn--${variant}`}
      onClick={onClick}
      disabled={variant === 'disabled'}
      type="button"
    >
      {label}
    </button>
  );
};
