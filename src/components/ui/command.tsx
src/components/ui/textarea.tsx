const CommandContext = React.createContext<CommandContextValue | undefined>(undefined);

interface CommandProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Root>

const Command = React.forwardRef< React.ElementRef<typeof CommandPrimitive.Root>, CommandProps >(({ className, ...props }, ref) => (
  // ...
));
Command.displayName = CommandPrimitive.Root.displayName;

// ... rest of Command components (Dialog, Input, List, Empty, Group, Item, Separator, Shortcut) 