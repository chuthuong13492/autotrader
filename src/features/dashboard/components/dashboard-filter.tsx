import { useEffect, useImperativeHandle, forwardRef } from 'react'
import { useRouter, useSearch as useRouteSearch } from '@tanstack/react-router'
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
import { useSearch } from '@/context/search-provider'

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
    const router = useRouter()
    const routeSearch = useRouteSearch({ from: '/_authenticated/search-result/' })
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

    const { state, setQuery } = useSearch()

    useEffect(() => {
        form.setValue('searchQuery', state.query ?? '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

    useEffect(() => {
        const s = routeSearch ?? {}
        if (s.value !== undefined) {
            const v = String(s.value ?? '')
            form.setValue('searchQuery', v)
            setQuery(v)
        }
        if (s.minPrice !== undefined) form.setValue('minPrice', String(s.minPrice ?? ''))
        if (s.maxPrice !== undefined) form.setValue('maxPrice', String(s.maxPrice ?? ''))
        if (Array.isArray(s.selectedMakes)) form.setValue('selectedMakes', s.selectedMakes as string[])
        if (Array.isArray(s.selectedModels)) form.setValue('selectedModels', s.selectedModels as string[])
        if (Array.isArray(s.selectedTrims)) form.setValue('selectedTrims', s.selectedTrims as string[])
        if (Array.isArray(s.selectedBodyTypes)) form.setValue('selectedBodyTypes', s.selectedBodyTypes as unknown as BodyType[])
        if (s.selectedTransmission !== undefined) form.setValue('selectedTransmission', (s.selectedTransmission as FilterTransmissionType) ?? 'All')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

            // Build flat query params (omit empty/nulls)
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
                from: '/search-result',
                to: '.',
                search: nextSearch,
            })
            router.history.replace(nextLocation.href)
        },
        600
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

