import type { Control } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { FormField, FormItem, FormLabel } from '@/components/ui/form'
import { bodyTypeFilterData } from '../../data/filter-data'
import type { FormData } from '../dashboard-filter'
import { cn } from '@/lib/utils'

interface BodyTypeFilterProps {
    control: Control<FormData>,
    className?: string
}

export function BodyTypeFilter({ control, className }: BodyTypeFilterProps) {
    return (
        <div className={cn(
            "space-y-3",
            className
        )}>
            <FormLabel className="text-sm font-medium">Body Type</FormLabel>
            <FormField
                control={control}
                name="selectedBodyTypes"
                render={({ field }) => (
                    <FormItem>
                        <div className="grid grid-cols-2 gap-3">
                            {bodyTypeFilterData.map((bodyType) => (
                                <div key={bodyType.value} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={bodyType.value}
                                        checked={field.value.includes(bodyType.value)}
                                        onCheckedChange={(checked) => {
                                            const newBodyTypes = checked
                                                ? [...field.value, bodyType.value]
                                                : field.value.filter((type: string) => type !== bodyType.value);
                                            field.onChange(newBodyTypes);
                                        }}
                                    />
                                    <Label htmlFor={bodyType.value} className="flex items-center gap-2 text-sm">
                                        <span className="text-lg">{bodyType.icon}</span>
                                        <span>{bodyType.label}</span>
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </FormItem>
                )}
            />
        </div>
    )
}