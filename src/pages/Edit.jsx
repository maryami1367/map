import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import DraggableMarker from '../components/DraggableMarker'
import { useContext } from 'react';
import { MainContext } from '../context/Provider';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useRef } from 'react';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from "leaflet"
import classes from "./pages.module.css";

const center = {
    lat: 35.69,
    lng: 51.29,
}

const Edit = () => {
    const { name } = useParams()
    const markerRef = useRef(null)
    const { locations, setLocations } = useContext(MainContext)

    const [formData, setFormData] = useState({
        position: center,
        name: "",
        type: "",
        logo: "",
    });

    useEffect(() => {
        const value = locations.find(item => item.name === name)
        console.log("value", value)
        setFormData({
            position: value.position,
            name: value.name,
            type: value.type,
            logo: value.logo,
        });
    }, []);

    const naviage = useNavigate()

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setFormData((formData) => ({ ...formData, position: marker.getLatLng() }))
                }
            },
        }),
        [],
    )

    const submitForm = (e) => {
        e.preventDefault()
        const valueIndex = locations.findIndex(item => item.name === name)
        locations[valueIndex] = formData
        naviage("/")
    }

    return (
        <div className={classes.mainContainer}>
            <form onSubmit={submitForm} className={classes.formContainer}>
                <div className={classes.formGroups}>
                    <h3>Share Location</h3> 
                    <div className={classes.formGroup}>
                        <label>Location Name:</label>
                        <input className={classes.input} name="name" value={formData.name} onChange={(e) => setFormData((formData) => ({ ...formData, name: e.target.value }))}></input>  
                    </div>

                    <div className={classes.formGroup}>
                        <label>Location on Map:</label>
                        <div className={classes.mapContainer} style={{ height: 200 }}>
                            <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: 200 }}>
                            <Marker
                                draggable={true}
                                eventHandlers={eventHandlers}
                                position={formData.position}
                                icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
                                ref={markerRef}>
                            </Marker>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                            </MapContainer>
                        </div>
                    </div>

                    <div className={classes.formGroup}>
                        <label>Location Type:</label>
                        <select className={classes.select} name="type" value={formData.type}  onChange={(e) => setFormData((formData) => ({ ...formData, type: e.target.value }))}>
                            <option value={"Business"}>Business</option>
                            <option value={"Home"}>Home</option>
                            <option value={"Shop"}>Shop</option>
                        </select>
                    </div>

                    <div className={classes.formGroup}>
                        <label>Logo</label>
                        <label className={classes.upload}>
                            <span>Upload</span>
                            <input type={"file"} name="logo" onChange={(e) => setFormData((formData) => ({ ...formData, logo: e.target.files[0] }))} />
                        </label>
                    </div>
                    </div>

                    
                    <div className={classes.actions}>
                        <button className={classes.cancel} onClick={() => naviage("/", { replace: true, state: undefined })}>Cancel</button>
                        <button className={classes.submit}>Save</button>
                    </div>
            </form>
        </div>
    );
}

export default Edit;