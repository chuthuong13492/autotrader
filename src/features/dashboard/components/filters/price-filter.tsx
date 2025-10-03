import type { Control } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import type { FormData } from '../dashboard-filter'
import { cn } from '@/lib/utils'
interface PriceFilterProps {
    control: Control<FormData>,
    className?: string
}

export function PriceFilter({ control, className }: PriceFilterProps) {
    return (
        <div className={cn(
            "space-y-3",
            className
        )}>
            <FormLabel className="text-sm font-medium">Price Range</FormLabel>
            <div className="grid grid-cols-2 gap-3">
                <FormField
                    control={control}
                    name="minPrice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-xs text-muted-foreground">Min Price</FormLabel>
                            <FormControl>
                                <CurrencyInput
                                    placeholder="$0"
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="maxPrice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-xs text-muted-foreground">Max Price</FormLabel>
                            <FormControl>
                                <CurrencyInput
                                    placeholder="$100,000"
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}


interface CurrencyInputProps
    extends Omit<React.ComponentProps<typeof Input>, "onChange" | "value"> {
    value?: string
    onChange?: (raw: string) => void // raw: chỉ chứa số, ví dụ "2000"
}

function CurrencyInput({ value, onChange, ...props }: CurrencyInputProps) {
    // format lại giá trị khi render
    const formatted = value
        ? `$${Number(value.replace(/\D/g, "") || "0").toLocaleString()}`
        : ""

    return (
        <Input
            type="text"
            inputMode="numeric"
            value={formatted}
            onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, "")
                onChange?.(raw)
            }}
            {...props}
        />
    )
}