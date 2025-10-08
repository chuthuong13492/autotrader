import { Main } from "@/components/layout/main";
import { VehicleDetailGallery } from "./vehicle-detail-gallery";
import { VehicleDetailSummary } from "./vehicle-detail-summary";
import { VehicleBreadcrumb } from "./vehicle-breadcrumb";

export function VehicleMain() {
    return (
        <Main className="px-2">
            <VehicleBreadcrumb />
            <div className="pl-2 flex w-full">
                <div className="grid grid-cols-1 gap-4 w-full lg:grid-cols-12">
                    {/* Gallery */}
                    <VehicleDetailGallery />
                    {/* Summary */}
                    <VehicleDetailSummary />
                </div>
            </div>
        </Main>
    )
}

