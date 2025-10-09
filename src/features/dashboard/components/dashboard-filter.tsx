import React, { useImperativeHandle, forwardRef, useEffect, useRef } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'
import { ChevronDown } from 'lucide-react'
import { Form } from '@/components/ui/form'
import { PriceFilter } from './filters/price-filter'
import { BrandFilter } from './filters/brand-filter'
import { BodyTypeFilter } from './filters/body-type-filter'
import { TransmissionFilter } from './filters/transmission-filter'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible'
import type { TransmissionType } from '../data/mock-data'
import { useUpdateEffect } from '@/hooks/use-update-effect'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLoaderData } from '@tanstack/react-router'
import isEqual from "lodash/isEqual"
import { type DashboardRootState } from '@/stores/dashboard-store'
import { useSelector } from 'react-redux'
import { cn } from '@/lib/utils'
import { FilterLoading } from './filters/filter-loading'
interface DashboardFilterProps {
    onFilterChange?: (formData: Partial<FormData>) => void
    className?: string
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

type LoaderStateRef = {
    loading: boolean
    defaultValues: FormData
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
    };

    const stateRef = useRef<LoaderStateRef>({
        loading: true,
        defaultValues: { ...initialValues },
    })

    useEffect(() => {
        stateRef.current.loading = true;
        const nextDefaults: Partial<FormData> = {
            minPrice: loader.formData?.minPrice !== undefined ? String(loader.formData.minPrice) : '',
            maxPrice: loader.formData?.maxPrice !== undefined ? String(loader.formData.maxPrice) : '',
            selectedMakes: loader.formData?.selectedMakes ?? '',
            selectedModels: loader.formData?.selectedModels ?? '',
            selectedTrims: loader.formData?.selectedTrims ?? '',
            selectedBodyTypes: loader.formData?.selectedBodyTypes ?? [],
            selectedTransmission: (loader.formData?.selectedTransmission as FilterTransmissionType) ?? 'All',
        }
        stateRef.current = { loading: false, defaultValues: { ...stateRef.current.defaultValues, ...nextDefaults } }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return stateRef.current.loading ? (
        <Card className={cn("hidden w-full max-w-[16rem] shrink-0 self-start lg:block p-0", props.className)}>
            {Array.from({ length: 6 }).map((_, idx) => (
                <React.Fragment key={idx}>
                    <FilterLoading />
                    {idx < 5 && <Separator orientation="horizontal" />}
                </React.Fragment>
            ))}
        </Card>
    ) : (
        <Filter
            className={props.className}
            defaultValues={stateRef.current.defaultValues}
            onFilterChange={props.onFilterChange}
            ref={ref} />
    )
})


type InnerFilterProps = {
    onFilterChange?: (formData: Partial<FormData>) => void
    defaultValues?: Partial<FormData>
    className?: string
}

const Filter = forwardRef<FilterRef, InnerFilterProps>(
    ({ onFilterChange, defaultValues, className }, ref) => {
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
                    <Card className={cn("hidden w-full max-w-[16rem] shrink-0 self-start lg:block p-0", className)}>
                        {/* Price Filter */}
                        <Collapsible defaultOpen={true}>
                            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors">
                                <span className="font-medium">Price Range</span>
                                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <PriceFilter className='p-4 pt-2' control={form.control} />
                            </CollapsibleContent>
                        </Collapsible>
                        <Separator orientation='horizontal' />

                        {/* Brand Filter */}
                        <Collapsible defaultOpen={true}>
                            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors">
                                <span className="font-medium">Brand</span>
                                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <BrandFilter className='p-4 pt-2' control={form.control} />
                            </CollapsibleContent>
                        </Collapsible>
                        <Separator orientation='horizontal' />

                        {/* Body Type Filter */}
                        <Collapsible defaultOpen={true}>
                            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors">
                                <span className="font-medium">Body Type</span>
                                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <BodyTypeFilter className='p-4 pt-2' control={form.control} />
                            </CollapsibleContent>
                        </Collapsible>
                        <Separator orientation='horizontal' />

                        {/* Transmission Filter */}
                        <Collapsible defaultOpen={true}>
                            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors">
                                <span className="font-medium">Transmission</span>
                                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <TransmissionFilter className='p-4 pt-2' control={form.control} />
                            </CollapsibleContent>
                        </Collapsible>
                    </Card>
                </form>
            </Form>
        )
    })