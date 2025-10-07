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
import { setSort, type SortKey } from '@/stores/dashboard-slice'
import { DashboardFilterSheet } from '../sheets/filter-sheet'
import { cn } from '@/lib/utils'


interface CarListFilterProps {
    onResetFilters?: () => void
}

export function CarListFilter({ onResetFilters }: CarListFilterProps) {
    const states = useSelector((state: DashboardRootState) => state.dashboard);

    const { sort, pagination } = states;

    const dispatch = useDispatch<DashboardDispatch>();

    const onSorted = (value: SortForm) => dispatch(setSort(value.sort as SortKey));

    const total = useMemo(() => {
        const formatted = pagination.total.toLocaleString('en-US')
        return `${formatted} Matches`
    }, [pagination.total]);

    return (
        <div className='lg:pl-4 pr-2 space-y-2'>
            <Filter onResetFilters={onResetFilters} />
            <div className='flex items-center justify-between'>
                <div className='text-xl font-bold text-black whitespace-nowrap'>{total}</div>
                <Sort defaultValues={{ sort: sort }} onChange={onSorted} />
            </div>
        </div>
    )
}

function Filter({ onResetFilters }: { onResetFilters?: () => void }) {
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
            <div className="flex lg:hidden space-x-4 h-full items-center gap-1 transition-all duration-200">
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

                <DashboardFilterSheet />


            </div>

            {isClear && (
                <>
                    <Separator
                        className="bg-border h-full mx-4 lg:hidden items-center transition-all duration-200"
                        orientation="vertical"
                    />
                    <button
                        className="text-lg text-blue-400 hover:underline transition-all duration-200"
                        onClick={onResetFilters}
                    >
                        Clear Filters
                    </button>
                </>
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