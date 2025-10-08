import { VehicleHeader } from "./components/vehicle-header";
import { Footer } from "@/components/layout/footer";
import { VehicleMain } from "./components/vehicle-main";

export function VehicleDetailPage() {
    return (
        <>
            <VehicleHeader />
            <VehicleMain />
            <Footer />
        </>
    )
}