import { FilterIcon, SearchIcon } from 'lucide-react'
import { useSearch } from '@/context/search-provider'
import { Separator } from '@/components/ui/separator'
import isEqual from 'lodash/isEqual'
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


interface CarListFilterProps {
    onResetFilters?: () => void
}

export function CarListFilter({ onResetFilters }: CarListFilterProps) {
    const states = useSelector((state: DashboardRootState) => state.dashboard)

    const {sort, pagination} = states;

    const dispatch = useDispatch<DashboardDispatch>()

    const onChange = (value: SortForm) => dispatch(setSort(value.sort as SortKey))

    const total = useMemo(() => {
        const formatted = pagination.total.toLocaleString('en-US')
        return `${formatted} Matches`
      }, [pagination.total])

    return (
        <div className='lg:pl-4 pr-2 space-y-2'>
            <Filter onResetFilters={onResetFilters} />
            <div className='flex items-center justify-between'>
                <div className='text-xl font-bold text-black whitespace-nowrap'>{total}</div>
                <Sort defaultValues={{ sort: sort }} onChange={onChange} />
            </div>
        </div>
    )
}

function Filter({ onResetFilters }: { onResetFilters?: () => void }) {
    const values = useSelector((state: DashboardRootState) => state.dashboard.values)

    const { setOpen } = useSearch();

    const isClear = useMemo(() => {
        const initialValues = {
            minPrice: '',
            maxPrice: '',
            selectedMakes: '',
            selectedModels: '',
            selectedTrims: '',
            selectedBodyTypes: [],
            selectedTransmission: 'All'
        }
        return !isEqual(values, initialValues)
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

                <button
                    className="flex items-center gap-1"
                >
                    <FilterIcon color="#ff821c" aria-hidden="true" size={18} />
                    <br />
                    <span className="text-lg text-muted-foreground hover:underline transition-all duration-200">Filter</span>
                </button>

                <Separator
                    className="bg-border h-full mr-4"
                    orientation="vertical"
                />
            </div>

            {isClear && (
                <button
                    className="text-lg text-blue-400 hover:underline transition-all duration-200"
                    onClick={() => onResetFilters?.()}
                >
                    Clear Filters
                </button>
            )}
        </div>
    );
}


const formSchema = z.object({
    sort: z.enum(['relevance', 'price-asc', 'price-desc', 'year-desc', 'year-asc', 'mileage-asc', 'mileage-desc']),
})

type SortForm = z.infer<typeof formSchema>

function Sort({ defaultValues = { sort: 'relevance' }, onChange }: { defaultValues?: Partial<SortForm>, onChange: (values: SortForm) => void }) {
    const form = useForm<SortForm>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    })

    const values = useWatch<SortForm>({
        control: form.control,
    })

    const sortOptions = [
        { label: 'Relevance', value: 'relevance' },
        { label: 'Price - Lowest', value: 'price-asc' },
        { label: 'Price - Highest', value: 'price-desc' },
        { label: 'Year - Newest', value: 'year-desc' },
        { label: 'Year - Oldest', value: 'year-asc' },
        { label: 'Mileage - Lowest', value: 'mileage-asc' },
        { label: 'Mileage - Highest', value: 'mileage-desc' },
    ]

    useUpdateEffect(() => {
        onChange(form.getValues())
    }, [values])


    return (
        <Form {...form}>
            <form
                className='flex w-full justify-end items-center'
            >
                <FormField
                    control={form.control}
                    name='sort'
                    render={({ field }) => (
                        <FormItem className='gap-0'>
                            <FormControl>
                                <SelectDropdown
                                    defaultValue={field.value}
                                    onValueChange={field.onChange}
                                    items={sortOptions}
                                    className='text-sm'
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