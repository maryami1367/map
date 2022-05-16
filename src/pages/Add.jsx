import { MapContainer, TileLayer } from "react-leaflet";
import DraggableMarker from '../components/DraggableMarker'
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { MainContext } from '../context/Provider';
import { useLocation, useNavigate } from 'react-router';
import { useRef } from 'react';

const center = {
    lat: 35.69,
    lng: 51.29,
}

const Add = () => {
    const { state } = useLocation()
    const form = useRef({
        position: state?.position ?? center,
        name: state?.name ?? "",
        type: state?.type ?? "",
        logo: state?.logo ?? null
    })



    const { locations, setLocations } = useContext(MainContext)
    const naviage = useNavigate()

    const handleSetPosition = (position) => {
        console.log(form.current);
        form.current = {
            ...form.current,
            position
        }
    }


    const handleChange = (e) => {
        if (e.target.type === "file") {
            form.current = {
                ...form.current,
                [e.target.name]: e.target.files[0]
            }
        } else {
            form.current = {
                ...form.current,
                [e.target.name]: e.target.value
            }
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        let copy = [...locations]

        if (state) {
            let location = copy.find(item => item.name === state.name)
            location.name = form.current.name
            location.type = form.current.type
            location.logo = state.logo
            location.position = form.current.position
            console.log(copy);
            setLocations(copy)
        } else {
            copy.push(form.current)
            setLocations(copy)
            console.log(copy);

        }
        naviage("/", { replace: true, state: undefined })

    }

    return (
        <div >
            <form onChange={handleChange} onSubmit={handleSubmit}>
                <label>Location Name:</label>
                <input name="name" defaultValue={state?.name}></input><br />
                <label>Location on Map:</label>
                <div style={{ width: 700, height: 700, overflow: "hidden" }}>
                    <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: 700 }}>
                        <DraggableMarker draggable={true} position={center} popUp={false} handleSetPosition={handleSetPosition} />
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </MapContainer>
                </div>
                <label>Location Type:</label>
                <select name="type" defaultValue={state?.type}>
                    <option value={"Business"}>Business</option>
                    <option value={"Home"}>Home</option>
                    <option value={"Shop"}>Shop</option>
                </select><br />
                <label>Logo</label>
                <input type={"file"} name="logo" /><br />
                <button>Save</button>
                <button onClick={() => naviage("/", { replace: true, state: undefined })}>Cancel</button>
            </form>
        </div>
    );
}

export default Add;