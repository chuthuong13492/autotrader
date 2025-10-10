import { PagedList } from "@/components/layout/pagination/paged-list";
import { type Car } from "@/features/dashboard/data/mock-data";
import { VehicleCard } from "../card/vehicle-card";
import { getSimilarCars } from "@/stores/dashboard-slice";
import type { DashboardDispatch } from "@/stores/dashboard-store";
import { useDispatch } from "react-redux";
import { VehicleCardLoading } from "../card/vehicle-card-loading";
import { useParams } from "@tanstack/react-router";
import {  useState } from "react";
import { emptyPagination, type Pagination } from "@/components/layout/data/pagination";
import { updatePage } from "@/lib/utils";

export function VehicleSimilarList() {
    const { id } = useParams({ from: '/_dashboard/vehicle/$id' });

    const [pagination, setPagination] = useState<Pagination<Car>>(emptyPagination());

    const dispatch = useDispatch<DashboardDispatch>();

    const fetchPage = async (page: number) => {
        const currentPagination = pagination

        const result = await dispatch(getSimilarCars({ page, id })).unwrap()

        const newPagination = updatePage(currentPagination, result)

        setPagination(newPagination)

        return newPagination;
    };


    return (
        <PagedList<Car>
            className="pl-2 pb-4"
            orientation="horizontal"
            hasScrollBar={true}
            itemKey={(item) => item.id}
            onInitial={() => fetchPage(1)}
            onRefresh={() => fetchPage(1)}
            onLoadMore={(nextPage) => fetchPage(nextPage)}
            loadingFirstPageBuilder={() => (
                <>
                    {Array.from({ length: 5 }).map((_, idx) => (
                        <VehicleCardLoading key={idx} />
                    ))}
                </>
            )}
            loadingMoreBuilder={() => (
                <VehicleCardLoading/>
            )}
            separatorBuilder={() => <div className="w-4"></div>}
            itemBuilder={(_, car) => (
                <VehicleCard key={car.id} car={car} />
            )}
        />
    )
}