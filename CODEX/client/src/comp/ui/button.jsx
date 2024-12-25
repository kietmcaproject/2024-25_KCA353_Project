import React from "react";

const buttonVariants = {
  default: "bg-emerald-600 text-black hover:bg-emerald-700",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-emerald-800 bg-transparent hover:bg-emerald-800 text-emerald-300",
  secondary: "bg-emerald-800 text-emerald-300 hover:bg-emerald-700",
  ghost: "hover:bg-emerald-800 hover:text-emerald-300",
  link: "text-emerald-300 underline-offset-4 hover:underline",
};

const buttonSizes = {
  default: "h-12 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-14 rounded-md px-8",
  icon: "h-10 w-10",
};

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "button";
    const variantClass = buttonVariants[variant] || buttonVariants.default;
    const sizeClass = buttonSizes[size] || buttonSizes.default;
    const combinedClassName = `inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variantClass} ${sizeClass} ${className || ""}`;

    return (
      <Comp className={combinedClassName} ref={ref} {...props} />
    );
  }
);

Button.displayName = "Button";

export { Button };
