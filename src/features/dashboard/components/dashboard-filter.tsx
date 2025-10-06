import React, { useImperativeHandle, forwardRef, useReducer, useEffect } from 'react'
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
import { useLoaderData } from '@tanstack/react-router'
import { FilterLoading } from './filters/filter-loading'
import isEqual from "lodash/isEqual"
import { type DashboardRootState } from '@/stores/dashboard-store'
import { useSelector } from 'react-redux'
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

const initialValues: FormData = {
    minPrice: '',
    maxPrice: '',
    selectedMakes: '',
    selectedModels: '',
    selectedTrims: '',
    selectedBodyTypes: [],
    selectedTransmission: 'All',
}
export interface FilterRef {
    reset: () => void
}

type LoaderState = {
    loading: boolean
    defaultValues: FormData
}

type LoaderAction =
    | { type: 'start' }
    | { type: 'success'; payload: Partial<FormData> }

function loaderReducer(state: LoaderState, action: LoaderAction): LoaderState {
    switch (action.type) {
        case 'start':
            return { ...state, loading: true }
        case 'success':
            return {
                loading: false,
                defaultValues: {
                    ...state.defaultValues,
                    ...action.payload,
                } as FormData,
            }
        default:
            return state
    }
}

export const DashboardFilter = forwardRef<FilterRef, DashboardFilterProps>((props, ref) => {
    const loader = useLoaderData({ from: '/_dashboard/search-result-page/' }) as {
        formData: {
            minPrice?: number | undefined
            maxPrice?: number | undefined
            selectedMakes?: string | undefined
            selectedModels?: string | undefined
            selectedTrims?: string | undefined
            selectedBodyTypes?: string[] | undefined
            selectedTransmission?: string | undefined
        }
        searchValue: string
    }

    const [state, dispatch] = useReducer(loaderReducer, {
        loading: true,
        defaultValues: {
            ...initialValues,
        },
    })

    useEffect(() => {
        dispatch({ type: 'start' })
        const nextDefaults: Partial<FormData> = {
            minPrice: loader.formData?.minPrice !== undefined ? String(loader.formData.minPrice) : '',
            maxPrice: loader.formData?.maxPrice !== undefined ? String(loader.formData.maxPrice) : '',
            selectedMakes: loader.formData?.selectedMakes ?? '',
            selectedModels: loader.formData?.selectedModels ?? '',
            selectedTrims: loader.formData?.selectedTrims ?? '',
            selectedBodyTypes: loader.formData?.selectedBodyTypes ?? [],
            selectedTransmission: (loader.formData?.selectedTransmission as FilterTransmissionType) ?? 'All',
        }
        const timer = setTimeout(() => {
            dispatch({ type: 'success', payload: nextDefaults })
        }, 300)
        return () => clearTimeout(timer)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return state.loading ? (
        <Card className="hidden w-full max-w-[16rem] shrink-0 self-start lg:block p-0">
            {Array.from({ length: 6 }).map((_, idx) => (
                <React.Fragment key={idx}>
                    <FilterLoading />
                    {idx < 5 && <Separator orientation="horizontal" />}
                </React.Fragment>
            ))}
        </Card>
    ) : (
        <Filter defaultValues={state.defaultValues} onFilterChange={props.onFilterChange} ref={ref} />
    )
})


type InnerFilterProps = {
    onFilterChange?: (formData: Partial<FormData>) => void
    defaultValues: FormData
}

const Filter = forwardRef<FilterRef, InnerFilterProps>(
    ({ onFilterChange, defaultValues }, ref) => {
        const form = useForm<FormData>({
            resolver: zodResolver(filterFormSchema),
            defaultValues,

            mode: "onChange",
        })

        const states = useSelector((state: DashboardRootState) => state.dashboard.values)

        useUpdateEffect(() => {
            if (!isEqual(form.getValues(), states)) {
                form.reset(states)
            }
        }, [states, form])

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