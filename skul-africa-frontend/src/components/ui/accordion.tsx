import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

const Accordion = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { type?: "single" | "multiple"; collapsible?: boolean }
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
))
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, ...props }, ref) => (
    <div ref={ref} className={cn("border-b", className)} data-value={value} {...props} />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <div className="flex">
            <button
                ref={ref}
                className={cn(
                    "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
                    className
                )}
                onClick={() => setIsOpen(!isOpen)}
                data-state={isOpen ? "open" : "closed"}
                {...props}
            >
                {children}
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
            </button>
        </div>
    )
})
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
            className
        )}
        {...props}
    >
        <div className="pb-4 pt-0">{children}</div>
    </div>
))
AccordionContent.displayName = "AccordionContent"

// Simple context for Accordion state management (simplified for this task)
// In a real app, we'd need more robust state management for single/multiple modes
// For now, we'll just make the Trigger toggle its own state and Content respond to it via parent state or just simple CSS/JS if possible.
// Actually, let's make a simple Context-based implementation.

const AccordionContext = React.createContext<{ value: string | null; onValueChange: (value: string | null) => void } | null>(null)

const AccordionWrapper = ({ type, collapsible, children, ...props }: any) => {
    const [value, setValue] = React.useState<string | null>(null)
    return (
        <AccordionContext.Provider value={{ value, onValueChange: setValue }}>
            <Accordion {...props}>
                {children}
            </Accordion>
        </AccordionContext.Provider>
    )
}

const AccordionItemWrapper = ({ value, children, ...props }: any) => {
    const context = React.useContext(AccordionContext)
    const isOpen = context?.value === value

    return (
        <div className={cn("border-b", props.className)}>
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    // Pass state to children
                    if (child.type === AccordionTriggerWrapper) {
                        return React.cloneElement(child, {
                            onClick: () => context?.onValueChange(isOpen ? null : value),
                            isOpen
                        } as any)
                    }
                    if (child.type === AccordionContentWrapper) {
                        return isOpen ? child : null
                    }
                }
                return child
            })}
        </div>
    )
}

const AccordionTriggerWrapper = ({ className, children, isOpen, onClick, ...props }: any) => (
    <button
        className={cn(
            "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline w-full",
            className
        )}
        onClick={onClick}
        {...props}
    >
        {children}
        <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isOpen && "rotate-180")} />
    </button>
)

const AccordionContentWrapper = ({ className, children, ...props }: any) => (
    <div className={cn("overflow-hidden text-sm pb-4 pt-0", className)} {...props}>
        {children}
    </div>
)

export { AccordionWrapper as Accordion, AccordionItemWrapper as AccordionItem, AccordionTriggerWrapper as AccordionTrigger, AccordionContentWrapper as AccordionContent }
