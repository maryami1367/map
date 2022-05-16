import { useContext, useState } from "react";
import { MainContext } from './../context/Provider';
import { MapContainer, TileLayer } from "react-leaflet";
import DraggableMarker from '../components/DraggableMarker'
import { useNavigate } from "react-router";

const center = {
    lat: 35.69,
    lng: 51.29,
}

const Map = () => {

    const { locations, showDialog } = useContext(MainContext)
    const naviage = useNavigate()

    return (
        <div >
            <button onClick={() => naviage("/add", { state: undefined })}>Save Location</button>
            <MapContainer center={center} zoom={13} scrollWheelZoom={true} style={{ height: 1024 }}>
                {locations.map((item, key) =>
                    <DraggableMarker
                        key={key}
                        draggable={false}
                        popUp={true}
                        {...item}
                    />
                )}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer >

        </div>
    );
}

export default Map;