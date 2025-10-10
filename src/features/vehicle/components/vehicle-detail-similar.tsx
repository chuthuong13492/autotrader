import { VehicleSimilarList } from "./vehicle-similar-list/vehicle-similar-list";


export function VehicleSimilar(){
    return (
        <div className="flex flex-col pl-2 space-y-6">
            <a className='font-bold text-3xl' style={{ color: "#012169" }}>
                You might also like these similar vehicles from this dealer
            </a>
            <VehicleSimilarList/>
        </div>
    )
}