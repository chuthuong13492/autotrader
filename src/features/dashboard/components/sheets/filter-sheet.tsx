import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FilterIcon } from "lucide-react";
import { DashboardFilter, type FilterRef, type FilterTransmissionType, type FormData } from "../dashboard-filter";
import { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { DashboardDispatch, DashboardRootState } from "@/stores/dashboard-store";
import { useRouter } from "@tanstack/react-router";
import { filterPage, setSort } from "@/stores/dashboard-slice";
import { Sort, type SortForm } from "../car-list/car-list-filter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import isEqual from "lodash/isEqual";

type SearchParams = {
    value?: string
    minPrice?: number
    maxPrice?: number
    selectedMakes?: string
    selectedModels?: string
    selectedTrims?: string
    selectedBodyTypes?: string[]
    selectedTransmission?: FilterTransmissionType
}

function buildSearchParams(
    formData: Partial<FormData>,
    search?: string
): SearchParams {
    const nextSearch: SearchParams = {}

    if (search) nextSearch.value = search
    if (formData.minPrice) nextSearch.minPrice = Number(formData.minPrice)
    if (formData.maxPrice) nextSearch.maxPrice = Number(formData.maxPrice)
    if (formData.selectedMakes) nextSearch.selectedMakes = formData.selectedMakes
    if (formData.selectedModels) nextSearch.selectedModels = formData.selectedModels
    if (formData.selectedTrims) nextSearch.selectedTrims = formData.selectedTrims
    if (formData.selectedBodyTypes?.length) nextSearch.selectedBodyTypes = formData.selectedBodyTypes
    if (formData.selectedTransmission && formData.selectedTransmission !== 'All') {
        nextSearch.selectedTransmission = formData.selectedTransmission
    }

    return nextSearch
}

export function DashboardFilterSheet() {
    const dashboardFilterRef = useRef<FilterRef>(null);


    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch<DashboardDispatch>();
    const state = useSelector((state: DashboardRootState) => state.dashboard);

    const { sort } = state;

    const router = useRouter();

    const onFilterChange = (formData: Partial<FormData>) => {
        const { search } = state;
        dispatch(filterPage(formData));

        const nextSearch = buildSearchParams(formData, search);
        const nextLocation = router.buildLocation({
            from: '/search-result-page',
            to: '.',
            search: nextSearch,
        });
        router.history.replace(nextLocation.href);
    };

    const onChange = (value: SortForm) => dispatch(setSort(value.sort));

    const onResetFilters =() => dashboardFilterRef.current?.reset();


    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <button className="flex items-center gap-1">
                    <FilterIcon color="#ff821c" aria-hidden="true" size={18} />
                    <br />
                    <span className="text-lg text-muted-foreground hover:underline transition-all duration-200">Filter</span>
                </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
                <SheetHeader className="px-6 pb-4">
                    <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <ScrollArea type="hover" className="h-full">
                    <div className="flex flex-col items-center space-y-4 pb-4">
                        <YourSearch onResetFilters={onResetFilters}/>
                        <Sort
                            className="min-w-[17rem]"
                            defaultValues={{ sort: sort }}
                            onChange={onChange} />
                        <DashboardFilter
                            className="block w-full min-w-[17rem]"
                            onFilterChange={onFilterChange}
                            ref={dashboardFilterRef}
                        />
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}

function YourSearch({ onResetFilters }: { onResetFilters?: () => void }) {
    const state = useSelector((state: DashboardRootState) => state.dashboard);

    const total = useMemo(() => {
        const formatted = state.pagination.total.toLocaleString('en-US')
        return `${formatted} Results`
    }, [state.pagination.total]);

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
        return !isEqual(state.values, initialValues)
    }, [state.values])

    return (
        <Card className="min-w-[17rem] p-4">
            <CardHeader className="p-0">
                <CardTitle className='text-lg tracking-tight'>
                    Your Search
                </CardTitle>

            </CardHeader>
            <CardContent className="p-0 flex items-center justify-between">
                <div className='text-md text-muted-foreground whitespace-nowrap'>{total}</div>
                {isClear && (
                    <button
                        className="text-lg text-blue-400 hover:underline transition-all duration-200"
                        onClick={onResetFilters}
                    >
                        Clear Filters
                    </button>
                )}

            </CardContent>
        </Card>
    )
}