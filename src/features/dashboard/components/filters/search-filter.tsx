import type { Control } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import type { FormData } from '../dashboard-filter'
import { cn } from '@/lib/utils'

interface SearchFilterProps {
    control: Control<FormData>,
    className?: string
}

export function SearchFilter({ control, className }: SearchFilterProps) {
    return (
        <div className={cn(
            "space-y-3",
            className
        )}>
            <FormField
                control={control}
                name="searchQuery"
                render={({ field }) => (
                    <FormItem >
                        <FormControl>
                            <Input
                                placeholder="Search cars..."
                                {...field}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
        </div>
    )
}