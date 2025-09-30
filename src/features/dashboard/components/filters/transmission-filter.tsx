import type { Control } from 'react-hook-form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { transmissionFilterData } from '../../data/filter-data'
import type { FormData } from '../dashboard-filter' 
import { cn } from '@/lib/utils'

interface TransmissionFilterProps {
    control: Control<FormData>,
    className?: string
}

export function TransmissionFilter({ control, className }: TransmissionFilterProps) {
    return (
        <div className={cn(
            "space-y-3",
            className
        )}>
            <FormLabel className="text-sm font-medium">Transmission</FormLabel>
            <FormField
                control={control}
                name="selectedTransmission"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <RadioGroup
                                value={field.value ?? 'All'}
                                onValueChange={(value) => {
                                    field.onChange(value);
                                }}
                            >
                                {transmissionFilterData.map((transmission) => (
                                    <div key={transmission.value} className="flex items-center space-x-2">
                                        <RadioGroupItem value={transmission.value} id={transmission.value} />
                                        <Label htmlFor={transmission.value} className="text-sm">
                                            {transmission.label}
                                        </Label>
                                    </div>
                                ))}
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="All" id="all-transmission" />
                                    <Label htmlFor="all-transmission" className="text-sm">
                                        All
                                    </Label>
                                </div>
                            </RadioGroup>
                        </FormControl>
                    </FormItem>
                )}
            />
        </div>
    )
}