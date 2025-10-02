import { useImperativeHandle, forwardRef, useEffect } from 'react'
import { useForm, useWatch, type FormState } from 'react-hook-form'
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
import isEqual from 'lodash/isEqual'

interface DashboardFilterProps {
    onFilterChange?: (formData: Partial<FormData>, formState: FormState<FormData>) => void
}

export type FilterTransmissionType = TransmissionType | 'All'

export interface FormData {
    minPrice: string
    maxPrice: string
    selectedMakes: string[]
    selectedModels: string[]
    selectedTrims: string[]
    selectedBodyTypes: string[]
    selectedTransmission: FilterTransmissionType
}

export interface DashboardFilterRef {
    reset: () => void
    setValue: <K extends keyof FormData>(name: K, value: FormData[K]) => void
}

export const DashboardFilter = forwardRef<DashboardFilterRef, DashboardFilterProps>(
    ({ onFilterChange }, ref) => {
        const form = useForm<FormData>({
            defaultValues: {
                minPrice: '',
                maxPrice: '',
                selectedMakes: [],
                selectedModels: [],
                selectedTrims: [],
                selectedBodyTypes: [],
                selectedTransmission: 'All',
            }
        })

        const states = useSelector((state: DashboardRootState) => state.dashboard.values)

        useEffect(() => {
            const { isDirty, ...storeValues } = states
            const currentValues = form.getValues()

            const isReset = !isEqual(currentValues, storeValues)

            if (isReset) {
                form.reset({ ...storeValues}, { keepDirty: false })
            }
        }, [states, form])

        useImperativeHandle(ref, () => ({
            reset: () => {
                form.reset({
                    minPrice: '',
                    maxPrice: '',
                    selectedMakes: [],
                    selectedModels: [],
                    selectedTrims: [],
                    selectedBodyTypes: [],
                    selectedTransmission: 'All',
                    ...values
                }, { keepDirty: false })
                debouncedFilterChange({
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
                form.setValue(name, value as any, { shouldDirty: true })
            },

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }), [form])

        const debouncedFilterChange = useDebouncedCallback(
            (values: Partial<FormData>) => {
                onFilterChange?.(values, form.formState)
            },
            300
        )

        const values = useWatch<FormData>({
            control: form.control,
        })

        useUpdateEffect(() => {
            if (form.formState.isDirty) {
                debouncedFilterChange(form.getValues())
            }
        }, [values, debouncedFilterChange, form.formState.isDirty])


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

