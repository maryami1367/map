import { useMemo, useRef, useState } from "react"
import { Marker, Popup } from "react-leaflet"
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from "leaflet"
import { useNavigate } from 'react-router';
import classes from "./draggable.module.css";


function DraggableMarker({ draggable, position, popUp, handleSetPosition, type, logo, name }) {

    const [pos, setPos] = useState(position)

    const markerRef = useRef(null)
    const navigate = useNavigate()

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                console.log("asdasd");
                const marker = markerRef.current
                if (marker != null) {
                    setPos(marker.getLatLng())
                    handleSetPosition(marker.getLatLng());

                }
            },
        }),
        [],
    )


    return (
        <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={pos}
            icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
            ref={markerRef}>
            {popUp &&
                <Popup minWidth={90} >
                    <div className={classes.mainDraggable}  >
                        <h3>Location Details</h3>
                        <p>{name}</p>
                        <div className={classes.buttonDraggable}>
                        <button className={classes.close}>close</button>
                        <button className={classes.edit} onClick={() => navigate(`edit/${name}`)}>edit</button>
                        </div>
                    </div>
                </Popup>}
        </Marker>
    )
}

export default DraggableMarker