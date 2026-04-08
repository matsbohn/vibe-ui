import './Tag.css';

export interface TagProps {
  label: string;
  onRemove?: () => void;
}

export function Tag({ label, onRemove }: TagProps) {
  return (
    <span className="tag">
      {label}
      {onRemove && (
        <button className="tag__remove" onClick={onRemove} aria-label={`Remove ${label}`}>
          ✕
        </button>
      )}
    </span>
  );
}
