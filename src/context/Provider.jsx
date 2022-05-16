import { createContext, useState } from "react";




export const MainContext = createContext({
    locations: [],
    setLocations: () => { },
    showDialog: false,
    setShowDialog: () => { }
})

const Provider = ({ children }) => {

    const [locations, setLocations] = useState([])
    const [showDialog, setShowDialog] = useState(false)

    return (
        <MainContext.Provider value={{ locations, setLocations, showDialog, setShowDialog }}>
            {children}
        </MainContext.Provider>
    );
}

export default Provider;