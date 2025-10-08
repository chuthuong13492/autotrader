import { PagedList } from "@/components/layout/pagination/paged-list";
import type { Car } from "@/features/dashboard/data/mock-data";
import { VehicleCard } from "../card/vehicle-card";
import { getSimilarCars } from "@/stores/dashboard-slice";
import type { DashboardDispatch, DashboardRootState } from "@/stores/dashboard-store";
import { useDispatch, useSelector } from "react-redux";
import { VehicleCardLoading } from "../card/vehicle-card-loading";
import { useParams } from "@tanstack/react-router";


export function VehicleSimilarList() {
    const { id } = useParams({ from: '/_dashboard/vehicle/$id' })

    const dispatch = useDispatch<DashboardDispatch>();

    const state = useSelector((state: DashboardRootState) => state.dashboard);

    const fetchPage = (page: number) => dispatch(getSimilarCars({ page, id })).unwrap();

    return (
        <PagedList<Car>
            className="pl-2 pb-2"
            orientation="horizontal"
            hasScrollBar={false}
            itemKey={(item) => item.id}
            pagination={state.pagination}
            onInitial={() => fetchPage(1)}
            onRefresh={() => fetchPage(1)}
            onLoadMore={(nextPage) => fetchPage(nextPage)}
            loadingFirstPageBuilder={() => (
                <>
                    {Array.from({ length: 5 }).map((_, idx) => (
                        <VehicleCardLoading key={idx} className="mr-4" />
                    ))}
                </>
            )}
            loadingMoreBuilder={() => (
                <VehicleCardLoading />
            )}
            separatorBuilder={() => <div className="w-4"></div>}
            itemBuilder={(index, car) => (
                <div className="animate-in fade-in-0 slide-in-from-bottom-4"
                    style={{
                        animationDelay: `${index * 20}ms`,
                        animationDuration: '150ms',
                        animationFillMode: 'both'
                    }}
                >
                    <VehicleCard car={car} />
                </div>
            )}
        />
    )
}