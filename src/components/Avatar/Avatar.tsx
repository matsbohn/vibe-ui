import './Avatar.css';

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps {
  src?: string;
  initials?: string;
  size?: AvatarSize;
  alt?: string;
}

export function Avatar({ src, initials, size = 'md', alt = '' }: AvatarProps) {
  return (
    <span className={`avatar avatar--${size}`} aria-label={alt || initials}>
      {src ? (
        <img src={src} alt={alt} className="avatar__img" />
      ) : (
        <span className="avatar__initials">{initials?.slice(0, 2).toUpperCase()}</span>
      )}
    </span>
  );
}
