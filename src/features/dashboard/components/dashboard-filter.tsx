import { useEffect, useImperativeHandle, forwardRef } from 'react'
import { useRouter, useSearch as useRouteSearch } from '@tanstack/react-router'
import { useForm, useWatch, type FormState } from 'react-hook-form'
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
import { useSearch } from '@/context/search-provider'
import { useUpdateEffect } from '@/hooks/use-update-effect'


interface DashboardFilterProps {
    onFilterChange?: (formData: Partial<FormData>, formState: FormState<FormData>) => void
    defaultValues?: Partial<FormData>,
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
    formData: () => FormData
}

export const DashboardFilter = forwardRef<DashboardFilterRef, DashboardFilterProps>(
    ({ onFilterChange, defaultValues }, ref) => {
        const router = useRouter()
        const routeSearch = useRouteSearch({ from: '/_dashboard/search-result-page/' })
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

        const { state, setQuery } = useSearch()

        useUpdateEffect(() => {
            const value = form.getValues('searchQuery');
            if (state.query !== value) {
                form.setValue('searchQuery', state.query ?? '', {
                    shouldDirty: true
                })
            }
        }, [state.query])

        useEffect(() => {
            const s = routeSearch ?? {}

            if (s.value !== undefined) {
                const v = String(s.value ?? '')
                form.setValue("searchQuery", v, { shouldDirty: true })
                setQuery(v)
            }
            if (s.minPrice !== undefined) form.setValue("minPrice", String(s.minPrice), { shouldDirty: true })

            if (s.maxPrice !== undefined) form.setValue("maxPrice", String(s.maxPrice), { shouldDirty: true })

            if (s.selectedMakes?.length) form.setValue("selectedMakes", s.selectedMakes as string[], { shouldDirty: true })

            if (s.selectedModels?.length) form.setValue("selectedModels", s.selectedModels as string[], { shouldDirty: true })

            if (s.selectedTrims?.length) form.setValue("selectedTrims", s.selectedTrims as string[], { shouldDirty: true })

            if (s.selectedBodyTypes?.length) form.setValue("selectedBodyTypes", s.selectedBodyTypes as BodyType[], { shouldDirty: true })

            if (s.selectedTransmission !== undefined) form.setValue(
                "selectedTransmission",
                (s.selectedTransmission as FilterTransmissionType) ?? "All",
                { shouldDirty: true }
            )
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])



        useImperativeHandle(ref, () => ({
            reset: (values?: Partial<FormData>) => {
                setQuery('');
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
                }, { keepDirty: false })

            },
            setValue: <K extends keyof FormData>(name: K, value: FormData[K]) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                form.setValue(name, value as any, { shouldDirty: true })
            },
            formData: () => form.getValues(),

        }), [form, setQuery])

        const debouncedFilterChange = useDebouncedCallback(
            (values: Partial<FormData>) => {
                onFilterChange?.(values, form.formState)

                const nextSearch: Partial<{
                    value: string
                    minPrice: number
                    maxPrice: number
                    selectedMakes: string[]
                    selectedModels: string[]
                    selectedTrims: string[]
                    selectedBodyTypes: BodyType[]
                    selectedTransmission: FilterTransmissionType
                }> = {}
                if (values.searchQuery) nextSearch.value = values.searchQuery
                if (values.minPrice) nextSearch.minPrice = Number(values.minPrice)
                if (values.maxPrice) nextSearch.maxPrice = Number(values.maxPrice)
                if (values.selectedMakes?.length) nextSearch.selectedMakes = values.selectedMakes
                if (values.selectedModels?.length) nextSearch.selectedModels = values.selectedModels
                if (values.selectedTrims?.length) nextSearch.selectedTrims = values.selectedTrims
                if (values.selectedBodyTypes?.length) nextSearch.selectedBodyTypes = values.selectedBodyTypes
                if (values.selectedTransmission && values.selectedTransmission !== 'All') {
                    nextSearch.selectedTransmission = values.selectedTransmission
                }

                const nextLocation = router.buildLocation({
                    from: '/search-result-page',
                    to: '.',
                    search: nextSearch,
                })
                router.history.replace(nextLocation.href)
            },
            300
        )

        const values = useWatch<FormData>({
            control: form.control,
            defaultValue: form.getValues(),
        })

        useUpdateEffect(() => {
            debouncedFilterChange(values)
        }, [values, debouncedFilterChange, form.formState.isDirty])


        return (
            <Form {...form}>
                <form className="space-y-2">
                    {/* Search Filter */}
                    <SearchFilter className="hidden lg:block w-full max-w-xs min-w-[16rem]" control={form.control} />

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

