import React from "react"

const Input = React.forwardRef(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={`flex h-12 w-full rounded-md border border-emerald-800 bg-black px-3 py-2 text-lg
                    text-emerald-300 placeholder:text-emerald-700
                    focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 focus:ring-offset-black
                    disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
                ref={ref}
                {...props}
            />
        )
    }
)

Input.displayName = "Input"

export { Input }
