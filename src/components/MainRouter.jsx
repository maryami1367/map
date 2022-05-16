import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from 'react-router'
import Home from "../pages/Add";
import Map from "../pages/Map";
import Add from '../pages/Add';

const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Map />} />
                <Route path="/add" element={<Add />} />
            </Routes>
        </BrowserRouter>
    );
}

export default MainRouter;