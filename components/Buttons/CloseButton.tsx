
import React from "react";

type CloseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onClose: () => void;
};

export default function CloseButton({ onClose, className = "", ...rest }: CloseButtonProps) {
  return (
    <button
      type="button"
      aria-label="Close"
      onClick={onClose}
      className={`absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100 ${className}`}
      {...rest}>
      <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 8.586 3.757 2.343 2.343 3.757 8.586 10l-6.243 6.243 1.414 1.414L10 11.414l6.243 6.243 1.414-1.414L11.414 10l6.243-6.243-1.414-1.414L10 8.586z" />
      </svg>
    </button>
  );
}
