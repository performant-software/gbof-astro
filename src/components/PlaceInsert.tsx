import { isModalOpen, currentPlace } from "../modalStore";
import { CoreDataPlace } from "./CoreDataPlace";



const PlaceInsert = (props: any) => {
    return (
        <div className="flex flex-col gap-y-2 place-content-center mx-auto my-8 w-full" data-uuid={props.place.uuid} onClick={() => { isModalOpen.set(true); currentPlace.set(props.place.uuid) }}>
            <div className="h-[400px] w-3/4 flex mx-auto">
                <CoreDataPlace
                    mapStyle={`https://api.maptiler.com/maps/dataviz/style.json?key=${import.meta.env.PUBLIC_REACT_APP_MAP_TILER_KEY}`}
                    placeURI={`${import.meta.env.PUBLIC_CORE_DATA_API_URL}/${props.place.uuid}?project_ids=${import.meta.env.PUBLIC_CORE_DATA_PROJECT_ID}`}
                />
            </div>
            <div className="text-center text-lg place-tile">{props.title}</div>
            <p className="text-center italic text-sm">{props.caption}</p>
        </div>
    )
}

export default PlaceInsert;
