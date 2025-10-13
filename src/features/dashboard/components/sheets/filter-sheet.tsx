import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FilterIcon } from "lucide-react";
import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import type { DashboardRootState } from "@/stores/dashboard-store";
import { Sort, type SortForm } from "../car-list/car-list-filter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import isEqual from "lodash/isEqual";
import { useStableLocation } from "@/hooks/use-stable-location";
import { DashboardFilter, type FilterRef, type FormData } from "../dashboard-filter";
import useDialogState from "@/hooks/use-dialog-state";

type DashboardFilterSheetProps = {
    onSortChange?: (sort: SortForm) => void,
    onFilterChange?: (formData: Partial<FormData>) => void
}

export function DashboardFilterSheet({ onSortChange, onFilterChange }: DashboardFilterSheetProps  ) {
    const dashboardFilterRef = useRef<FilterRef>(null);

    const [open, setOpen] = useDialogState()


    const { search } = useStableLocation();

    const defaultValues: SortForm = useMemo(() => {
        if (!search || !search.sort) {
            return { sort: 'relevance' };
        }
        return {
            sort: search.sort
        };
    }, [search])


    const handlerFilterChange = async (formData: Partial<FormData>) => {
        onFilterChange?.(formData)
    };

    const onChange = async (value: SortForm) => {
        onSortChange?.(value)
    };  

    const onResetFilters =() => dashboardFilterRef.current?.reset();

    return (
        <Sheet open={open === true} onOpenChange={setOpen}>
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
                    <div className="flex flex-col items-center space-y-4 pb-4  mb-20">
                        <YourSearch onResetFilters={onResetFilters}/>
                        <Sort
                            className="min-w-[17rem]"
                            defaultValues={defaultValues}
                            onChange={onChange} />
                            
                        <DashboardFilter
                            className="block w-full min-w-[17rem]"
                            onFilterChange={handlerFilterChange}
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