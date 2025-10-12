import { type Control } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
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
            <FormField
                control={control}
                name="selectedBodyTypes"
                render={() => (
                    <FormItem>
                        <div className="grid grid-cols-1 gap-3">
                            {bodyTypeFilterData.map((item) => (
                                <FormField
                                    key={item.value}
                                    control={control}
                                    name='selectedBodyTypes'
                                    render={({ field }) => (
                                        <FormItem key={item.value}>
                                            <FormControl>
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={item.value}
                                                        checked={(field.value ?? []).includes(item.value)}
                                                        onCheckedChange={(checked) => {
                                                            const current: string[] = field.value ?? [];
                                                            const isChecked = Boolean(checked);
                                                            const exists = current.includes(item.value);
                                                            const next = isChecked
                                                                ? exists ? current : [...current, item.value]
                                                                : current.filter((type: string) => type !== item.value);
                                                            field.onChange(next);
                                                        }}
                                                    />
                                                    <Label htmlFor={item.value} className="flex items-center gap-2 text-sm">
                                                        <span className="text-lg">{item.icon}</span>
                                                        <span>{item.label}</span>
                                                    </Label>
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                >

                                </FormField>
                            ))}
                        </div>
                    </FormItem>
                )}
            />
        </div>
    )
}