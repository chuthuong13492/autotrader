import { useMemo } from 'react'
import { type Control, useWatch, useController } from 'react-hook-form'
import { brandFilterData } from '../../data/filter-data'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import type { FormData } from '../dashboard-filter'
import { cn } from '@/lib/utils'

interface BrandFilterProps {
    control: Control<FormData>
    className?: string
}

export function BrandFilter({ control, className }: BrandFilterProps) {
    const selectedMakes = useWatch({ control, name: 'selectedMakes' })
    const selectedModels = useWatch({ control, name: 'selectedModels' })

    const selectedMake = useMemo(
        () => (selectedMakes?.length > 0 ? selectedMakes[0] : null),
        [selectedMakes]
    )
    const selectedModel = useMemo(
        () => (selectedModels?.length > 0 ? selectedModels[0] : null),
        [selectedModels]
    )

    return (
        <div className={cn("space-y-4", className)}>
            <FormLabel className="text-sm font-medium">Brand</FormLabel>
            <div className="space-y-4">
                <MakeSelect control={control} />
                {selectedMake && <ModelSelect control={control} selectedMake={selectedMake} />}
                {selectedModel && <TrimSelect control={control} selectedModel={selectedModel} />}
            </div>
        </div>
    )
}



function MakeSelect({ control }: { control: Control<FormData> }) {
    const { field } = useController({ name: 'selectedMakes', control })
    const { field: modelsField } = useController({ name: 'selectedModels', control })
    const { field: trimsField } = useController({ name: 'selectedTrims', control })

    const selected = Array.isArray(field.value) && field.value.length > 0 ? field.value[0] : ""

    return (
        <FormField
            control={control}
            name="selectedMakes"
            render={() => (
                <FormItem>
                    <div className="flex items-center justify-between">
                        <FormLabel className="text-xs text-muted-foreground">Make</FormLabel>
                        {(selected || modelsField.value?.length > 0 || trimsField.value?.length > 0) && (
                            <ClearButton
                                text='Clear All'
                                onClick={() => {
                                    field.onChange([])
                                    modelsField.onChange([])
                                    trimsField.onChange([])
                                }}
                            />
                        )}
                    </div>
                    <FormControl>
                        <Select
                            value={selected}
                            onValueChange={(value) => {
                                field.onChange(value ? [value] : [])
                                modelsField.onChange([])
                                trimsField.onChange([])
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select make" />
                            </SelectTrigger>
                            <SelectContent>
                                {brandFilterData.makes.map((make) => (
                                    <SelectItem key={make} value={make}>
                                        {make}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

function ModelSelect({ control, selectedMake }: { control: Control<FormData>, selectedMake: string }) {
    const { field } = useController({ name: 'selectedModels', control })
    const { field: trimsField } = useController({ name: 'selectedTrims', control })

    const selected = Array.isArray(field.value) && field.value.length > 0 ? field.value[0] : ""

    return (
        <FormField
            control={control}
            name="selectedModels"
            render={() => (
                <FormItem>
                    <div className="flex items-center justify-between">
                        <FormLabel className="text-xs text-muted-foreground">Model</FormLabel>
                        {selected && <ClearButton onClick={() => {
                            field.onChange([])
                            trimsField.onChange([])
                        }} />}
                    </div>
                    <FormControl>
                        <Select
                            value={selected}
                            onValueChange={(value) => {
                                field.onChange(value ? [value] : [])
                                trimsField.onChange([])
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select model" />
                            </SelectTrigger>
                            <SelectContent>
                                {brandFilterData.models[selectedMake as keyof typeof brandFilterData.models]?.map(
                                    (model) => (
                                        <SelectItem key={model} value={model}>
                                            {model}
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

function TrimSelect({ control, selectedModel }: { control: Control<FormData>, selectedModel: string }) {
    const { field } = useController({ name: 'selectedTrims', control })
    const selected = Array.isArray(field.value) && field.value.length > 0 ? field.value[0] : ""

    return (
        <FormField
            control={control}
            name="selectedTrims"
            render={() => (
                <FormItem>
                    <div className="flex items-center justify-between">
                        <FormLabel className="text-xs text-muted-foreground">Trim</FormLabel>
                        {selected && <ClearButton onClick={() => field.onChange([])} />}
                    </div>
                    <FormControl>
                        <Select
                            value={selected}
                            onValueChange={(value) => {
                                field.onChange(value ? [value] : [])
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select trim" />
                            </SelectTrigger>
                            <SelectContent>
                                {brandFilterData.trims[selectedModel as keyof typeof brandFilterData.trims]?.map(
                                    (trim) => (
                                        <SelectItem key={trim} value={trim}>
                                            {trim}
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>
                    </FormControl>
                </FormItem>
            )}
        />
    )
}



function ClearButton({ onClick, text = "Clear" }: { onClick: () => void; text?: string }) {
    return (
        <span
            role="button"
            tabIndex={0}
            className="text-xs text-black hover:underline cursor-pointer"
            onClick={(e) => {
                e.preventDefault()
                onClick()
            }}
        >
            {text}
        </span>
    )
}