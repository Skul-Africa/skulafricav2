import * as React from "react"
import { cn } from "@/lib/utils"
import { Circle } from "lucide-react"

const RadioGroup = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { value: string; onValueChange: (value: string) => void }
>(({ className, value, onValueChange, ...props }, ref) => (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
        <div className={cn("grid gap-2", className)} ref={ref} {...props} />
    </RadioGroupContext.Provider>
))
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }
>(({ className, value, ...props }, ref) => {
    const context = React.useContext(RadioGroupContext)
    const isChecked = context?.value === value

    return (
        <button
            ref={ref}
            role="radio"
            aria-checked={isChecked}
            className={cn(
                "aspect-square h-4 w-4 rounded-full border border-neutral-900 text-neutral-900 ring-offset-white focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-50 dark:text-neutral-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300",
                className
            )}
            onClick={() => context?.onValueChange(value)}
            {...props}
        >
            {isChecked && (
                <Circle className="h-2.5 w-2.5 fill-current text-current mx-auto" />
            )}
        </button>
    )
})
RadioGroupItem.displayName = "RadioGroupItem"

const RadioGroupContext = React.createContext<{ value: string; onValueChange: (value: string) => void } | null>(null)

export { RadioGroup, RadioGroupItem }
