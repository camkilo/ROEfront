import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  fullWidth = false,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        "px-4 py-2 rounded font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        {
          "bg-primary text-white hover:bg-primary/90 focus:ring-primary": variant === "primary",
          "bg-secondary text-primary hover:bg-secondary/90 focus:ring-secondary": variant === "secondary",
          "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600": variant === "danger",
          "w-full": fullWidth,
        },
        className
      )}
    >
      {children}
    </button>
  );
};
