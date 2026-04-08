import './Dropdown.css';
import { useState } from 'react';

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function Dropdown({ options, placeholder = 'Select…', value, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className={`dropdown ${open ? 'dropdown--open' : ''}`}>
      <button
        className="dropdown__trigger"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={selected ? '' : 'dropdown__placeholder'}>
          {selected ? selected.label : placeholder}
        </span>
        <span className="dropdown__chevron">▾</span>
      </button>

      {open && (
        <ul className="dropdown__menu" role="listbox">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`dropdown__option ${opt.value === value ? 'dropdown__option--selected' : ''}`}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => {
                onChange?.(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
              {opt.value === value && <span className="dropdown__check">✓</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
