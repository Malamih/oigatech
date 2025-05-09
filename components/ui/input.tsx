import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const [value, setValue] = React.useState<string>("");
  React.useEffect(() => {
    if (type && type == "phone") {
      setValue(value.replace(/\D/g, ""));
      if (value.startsWith("0")) {
        setValue(value.slice(1));
      }
    }
  }, [value]);
  return (
    <>
      {!props?.defaultValue ? (
        <input
          type={type}
          data-slot="input"
          value={props.defaultValue ? value : ""}
          onInput={(e) => setValue((e.target as HTMLInputElement).value)}
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-b-gray-300 flex h-9 w-full min-w-0 border-b-2 bg-transparent text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-b-gray-500",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className
          )}
          {...props}
        />
      ) : (
        <input
          type={type}
          data-slot="input"
          onInput={(e) => setValue((e.target as HTMLInputElement).value)}
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-b-gray-300 flex h-9 w-full min-w-0 border-b-2 bg-transparent text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-b-gray-500",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className
          )}
          {...props}
        />
      )}
    </>
  );
}

export { Input };
