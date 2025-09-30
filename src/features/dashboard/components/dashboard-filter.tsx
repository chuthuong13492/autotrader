import { useEffect, useImperativeHandle, forwardRef } from 'react'
import { useForm } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'
import { Form } from '@/components/ui/form'
import { SearchFilter } from './filters/search-filter' 
import { PriceFilter } from './filters/price-filter'
import { BrandFilter } from './filters/brand-filter'
import { BodyTypeFilter } from './filters/body-type-filter'
import { TransmissionFilter } from './filters/transmission-filter'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { BodyType, TransmissionType } from '../data/mock-data'

interface DashboardFilterProps {
    onFilterChange?: (formData: FormData) => void
    defaultValues?: Partial<FormData>
}

type FilterTransmissionType = TransmissionType | 'All'

export interface FormData {
    searchQuery: string
    minPrice: string
    maxPrice: string
    selectedMakes: string[]
    selectedModels: string[]
    selectedTrims: string[]
    selectedBodyTypes: BodyType[]
    selectedTransmission: FilterTransmissionType
}

export interface DashboardFilterRef {
    reset: (values?: Partial<FormData>) => void
    setValue: <K extends keyof FormData>(name: K, value: FormData[K]) => void
    getValues: () => FormData
}

export const DashboardFilter = forwardRef<DashboardFilterRef, DashboardFilterProps>(
    ({ onFilterChange, defaultValues }, ref) => {
    const form = useForm<FormData>({
        defaultValues: {
            searchQuery: '',
            minPrice: '',
            maxPrice: '',
            selectedMakes: [],
            selectedModels: [],
            selectedTrims: [],
            selectedBodyTypes: [],
            selectedTransmission: 'All',
            ...defaultValues
        }
    })

    const watchedValues = form.watch()

    // Expose form methods to parent component
    useImperativeHandle(ref, () => ({
        reset: (values?: Partial<FormData>) => {
            form.reset({
                searchQuery: '',
                minPrice: '',
                maxPrice: '',
                selectedMakes: [],
                selectedModels: [],
                selectedTrims: [],
                selectedBodyTypes: [],
                selectedTransmission: 'All',
                ...values
            })
        },
        setValue: <K extends keyof FormData>(name: K, value: FormData[K]) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            form.setValue(name, value as any)
        },
        getValues: () => form.getValues()
    }), [form])

    const debouncedFilterChange = useDebouncedCallback(
        (values: FormData) => {
            onFilterChange?.(values)
            // eslint-disable-next-line no-console
            console.log('Form changed:', watchedValues);
        },
        1000 // 1 second delay
    )

    useEffect(() => {
        debouncedFilterChange(watchedValues)
    }, [watchedValues, debouncedFilterChange])


    function onSubmit(data: FormData) {
        // Form submission logic if needed
        // eslint-disable-next-line no-console
        console.log('Form submitted:', data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                {/* Search Filter */}
                <SearchFilter    className="hidden lg:block w-full max-w-xs min-w-0" control={form.control} />

                <Card className="hidden w-full max-w-xs shrink-0 self-start lg:block p-0">
                    {/* Price Filter */}
                    <PriceFilter className='p-4' control={form.control} />
                    <Separator orientation='horizontal'/>
                    {/* Brand Filter */}
                    <BrandFilter className='p-4'  control={form.control} />
                    <Separator orientation='horizontal'/>
                
                    {/* Body Type Filter */}
                    <BodyTypeFilter className='p-4'  control={form.control} />
                    <Separator orientation='horizontal'/>

                    {/* Transmission Filter */}
                    <TransmissionFilter className='p-4'  control={form.control} />
                </Card>
            </form>
        </Form>
    )
})

