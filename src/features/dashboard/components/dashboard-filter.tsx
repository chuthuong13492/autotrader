import { useImperativeHandle, forwardRef } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'
import { Form } from '@/components/ui/form'
import { PriceFilter } from './filters/price-filter'
import { BrandFilter } from './filters/brand-filter'
import { BodyTypeFilter } from './filters/body-type-filter'
import { TransmissionFilter } from './filters/transmission-filter'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { TransmissionType } from '../data/mock-data'
import { useUpdateEffect } from '@/hooks/use-update-effect'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'


interface DashboardFilterProps {
    onFilterChange?: (formData: Partial<FormData>) => void
    defaultValues?: Partial<FormData>
}

export type FilterTransmissionType = TransmissionType | 'All'

const filterFormSchema = z.object({
    minPrice: z.string(),
    maxPrice: z.string(),
    selectedMakes: z.string(),
    selectedModels: z.string(),
    selectedTrims: z.string(),
    selectedBodyTypes: z.array(z.string()),
    selectedTransmission: z.enum(['All', 'Automatic', 'Manual'] as const),
}).refine((data) => {
    if (!data.minPrice || !data.maxPrice) return true
    
    const minPrice = Number(data.minPrice)
    const maxPrice = Number(data.maxPrice)
    
    if (isNaN(minPrice) || isNaN(maxPrice)) return true
    
    return maxPrice > minPrice
}, {
    message: "Max price must be greater than min price",
    path: ["maxPrice"], // Lỗi sẽ hiển thị ở field maxPrice
})

export type FormData = z.infer<typeof filterFormSchema>

export interface DashboardFilterRef {
    reset: () => void
}

const initialValues: FormData = {
    minPrice: '',
    maxPrice: '',
    selectedMakes: '',
    selectedModels: '',
    selectedTrims: '',
    selectedBodyTypes: [],
    selectedTransmission: 'All',
}

// schema defined above for typing

export const DashboardFilter = forwardRef<DashboardFilterRef, DashboardFilterProps>(
    ({ onFilterChange, defaultValues = initialValues }, ref) => {

        const form = useForm<FormData>({
            resolver: zodResolver(filterFormSchema),
            defaultValues: defaultValues,
            mode: "onChange", // Validate ngay khi user nhập liệu
        })

        useImperativeHandle(ref, () => ({
            reset: () => {
                form.reset(initialValues)
            },
       
        }), [form])

        const debouncedFilterChange = useDebouncedCallback(
            (values: Partial<FormData>) => {
                onFilterChange?.(values)
            },
            300
        )

        const values = useWatch<FormData>({
            control: form.control,
        })

        useUpdateEffect(() => {
            // Trigger validation khi values thay đổi
            form.trigger(['minPrice', 'maxPrice'])
            debouncedFilterChange(values)
        }, [values, debouncedFilterChange, form])

        return (
            <Form {...form}>
                <form >
                    <Card className="hidden w-full max-w-[16rem] shrink-0 self-start lg:block p-0">
                        {/* Price Filter */}
                        <PriceFilter className='p-4' control={form.control} />
                        <Separator orientation='horizontal' />
                        {/* Brand Filter */}
                        <BrandFilter className='p-4' control={form.control} />
                        <Separator orientation='horizontal' />

                        {/* Body Type Filter */}
                        <BodyTypeFilter className='p-4' control={form.control} />
                        <Separator orientation='horizontal' />

                        {/* Transmission Filter */}
                        <TransmissionFilter className='p-4' control={form.control} />
                    </Card>
                </form>
            </Form>
        )
    })

