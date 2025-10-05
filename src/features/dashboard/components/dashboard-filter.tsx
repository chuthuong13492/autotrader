import { useImperativeHandle, forwardRef} from 'react'
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
import { type DashboardRootState } from '@/stores/dashboard-store'
import { useSelector } from 'react-redux'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'


interface DashboardFilterProps {
    onFilterChange?: (formData: Partial<FormData>) => void
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
})

export type FormData = z.infer<typeof filterFormSchema>

export interface DashboardFilterRef {
    reset: () => void
    setValue: <K extends keyof FormData>(name: K, value: FormData[K]) => void
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
    ({ onFilterChange }, ref) => {
        const states = useSelector((state: DashboardRootState) => state.dashboard.values)

        const form = useForm<FormData>({
            resolver: zodResolver(filterFormSchema),
            defaultValues: states,
        })

        useImperativeHandle(ref, () => ({
            reset: () => {
                form.reset(initialValues, { keepDirty: false })
                debouncedFilterChange(initialValues)

            },
            setValue: <K extends keyof FormData>(name: K, value: FormData[K]) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                form.setValue(name, value as any, { shouldDirty: true })
            },

            // eslint-disable-next-line react-hooks/exhaustive-deps
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
            debouncedFilterChange(values)
        }, [values, debouncedFilterChange])

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

