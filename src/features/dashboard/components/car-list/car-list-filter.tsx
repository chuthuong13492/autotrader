import { SearchIcon } from 'lucide-react'
import { useSearch } from '@/context/search-provider'
import { Separator } from '@/components/ui/separator'
import { type DashboardDispatch, type DashboardRootState } from '@/stores/dashboard-store'
import { useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'
import { SelectDropdown } from '@/components/select-dropdown'
import { z } from 'zod'
import { useForm, useWatch } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateEffect } from '@/hooks/use-update-effect'
import { setSortAsync, type SortKey } from '@/stores/dashboard-slice'
import { DashboardFilterSheet } from '../sheets/filter-sheet'
import { cn } from '@/lib/utils'
import type { Pagination } from '@/components/layout/data/pagination'
import type { Car } from '../../data/mock-data'
import { useStableLocation } from '@/hooks/use-stable-location'
import isEqual from 'lodash/isEqual'
import type { FormData } from '../dashboard-filter'


interface CarListFilterProps {
    onResetFilters?: () => void
    onSortChange?: (sort: SortKey, pagination: Pagination<Car>) => void
    onFilterChange?: (formData: Partial<FormData>) => void
}

export function CarListFilter({ onResetFilters, onSortChange, onFilterChange }: CarListFilterProps) {
    const states = useSelector((state: DashboardRootState) => state.dashboard);

    const { pagination } = states;

    const dispatch = useDispatch<DashboardDispatch>();

    const onSorted = async (value: SortForm) => {
        const result = await dispatch(setSortAsync(value.sort)).unwrap()
        onSortChange?.(value.sort, result.pagination)
    };

    const total = useMemo(() => {
        const formatted = pagination.total.toLocaleString('en-US')
        return `${formatted} Matches`
    }, [pagination.total]);

    const { search } = useStableLocation();

    const defaultValues: SortForm = useMemo(() => {
        if (!search || !search.sort) {
            return { sort: 'relevance' };
        }
        return {
            sort: search.sort as SortKey
        };
    }, [search])

    return (
        <div className='lg:pl-4 pr-2 flex flex-col lg:flex-row items-start lg:items-center justify-start gap-2 lg:gap-0'>
            <Filter onResetFilters={onResetFilters} onSortChange={onSorted} onFilterChange={onFilterChange}/>
            <div className='w-full flex items-center justify-between'>
                <div className="text-base md:text-lg lg:text-xl font-bold text-black whitespace-nowrap">
                    {total}
                </div>
                <Sort defaultValues={defaultValues} onChange={onSorted} />
            </div>
        </div>
    )
}

type FilterProps = {
    onResetFilters?: () => void,
    onSortChange?: (sort: SortForm) => void,
    onFilterChange?: (formData: Partial<FormData>) => void
}

function Filter({ onResetFilters, onSortChange, onFilterChange }: FilterProps) {
    const values = useSelector((state: DashboardRootState) => state.dashboard.values)

    const { setOpen } = useSearch();

    const isClear = useMemo(() => {
        const { minPrice, maxPrice, selectedMakes, selectedModels, selectedTrims, selectedBodyTypes, selectedTransmission } = values

        return (
            (minPrice && minPrice.trim() !== "") ||
            (maxPrice && maxPrice.trim() !== "") ||
            (selectedBodyTypes && selectedBodyTypes.length > 0) ||
            (selectedMakes && selectedMakes.trim() !== "") ||
            (selectedModels && selectedModels.trim() !== "") ||
            (selectedTrims && selectedTrims.trim() !== "") ||
            (selectedTransmission && selectedTransmission !== "All")
        )
    }, [values])

    return (
        <div className="h-9 flex items-center justify-start">
            <div className="flex lg:hidden space-x-4 h-full items-center gap-1 transition-all duration-200 pr-4">
                <SearchIcon
                    aria-hidden="true"
                    className="text-muted-foreground cursor-pointer"
                    color="#ff821c"
                    size={18}
                    onClick={() => setOpen(true)}
                />

                <Separator
                    className="bg-border h-full"
                    orientation="vertical"
                />

                <DashboardFilterSheet onSortChange={onSortChange} onFilterChange={onFilterChange} />
            </div>

            {isClear && (
                <div className='flex space-x-4 h-full pr-4'>
                    <Separator
                        className="bg-border h-full lg:hidden transition-all duration-200"
                        orientation="vertical"
                    />
                    <button
                        className="text-lg text-blue-400 hover:underline transition-all duration-200 whitespace-nowrap"
                        onClick={onResetFilters}
                    >
                        Clear Filters
                    </button>
                    <Separator
                        className="hidden lg:flex  bg-border h-full"
                        orientation="vertical"
                    />
                </div>
            )}
        </div>
    );
}


const formSchema = z.object({
    sort: z.enum(['relevance', 'price-asc', 'price-desc', 'year-desc', 'year-asc', 'mileage-asc', 'mileage-desc']),
})

export type SortForm = z.infer<typeof formSchema>

type SortProps = {
    defaultValues?: Partial<SortForm>,
    onChange: (values: SortForm) => void
    className?: string
}

export function Sort({ className, defaultValues = { sort: 'relevance' }, onChange }: SortProps) {
    const form = useForm<SortForm>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    useUpdateEffect(()=> {
        if (!isEqual(form.getValues(), defaultValues)) {
            form.reset(defaultValues)
        }
    }, [defaultValues])

    const values = useWatch<SortForm>({
        control: form.control,
    });

    const sortOptions = [
        { label: 'Relevance', value: 'relevance' },
        { label: 'Price - Lowest', value: 'price-asc' },
        { label: 'Price - Highest', value: 'price-desc' },
        { label: 'Year - Newest', value: 'year-desc' },
        { label: 'Year - Oldest', value: 'year-asc' },
        { label: 'Mileage - Lowest', value: 'mileage-asc' },
        { label: 'Mileage - Highest', value: 'mileage-desc' },
    ];

    useUpdateEffect(() => {
        onChange(form.getValues())
    }, [values]);

    return (
        <Form {...form}>
            <form
                className={cn(
                    'flex justify-end items-center',
                    className
                )}
            >
                <FormField
                    control={form.control}
                    name='sort'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <SelectDropdown
                                    defaultValue={field.value}
                                    onValueChange={field.onChange}
                                    items={sortOptions}
                                    className={cn(
                                        'text-sm',
                                        className
                                    )}
                                    prefix={
                                        <FormLabel className=''>Sort By:</FormLabel>
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}