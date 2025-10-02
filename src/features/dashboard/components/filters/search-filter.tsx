import type { Control } from 'react-hook-form'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import type { FormData } from '../dashboard-filter'
import { cn } from '@/lib/utils'
import { Search } from '@/components/search'
// import { useSearch } from '@/context/search-provider'

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
                render={() => (
                    <FormItem >
                        <FormControl>
                            <Search  className="!w-full" placeholder="Search cars..." />
                        </FormControl>
                    </FormItem>
                )}
            />
        </div>
    )
}