import React from 'react';

interface InputProps {value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;placeholder?: string;type?: string;
  className?: string;
}

export default function Input({
value, onChange, placeholder = '', type = 'text', className = '',
}: InputProps) {
  return (
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} className={`input input-bordered w-full ${className}`}/>
  );
}
