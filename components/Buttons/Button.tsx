import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "primary" | "danger";
  size?: "sm" | "md" | "lg";
};

const base = "rounded-xl border font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default: "text-gray-700 hover:bg-gray-50",
  primary: "bg-blue-600 text-white border-blue-600 hover:bg-blue-700",
  danger: "bg-red-600 text-white border-red-600 hover:bg-red-700",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2",
  lg: "px-6 py-3 text-lg",
};

export default function Button({
  children,
  className = "",
  variant = "default",
  size = "md",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...rest}>
      {children}
    </button>
  );
}


