import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from 'react-router'
import Map from "../pages/Map";
import Add from '../pages/Add';
import Edit from "../pages/Edit";

const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Map />} />
                <Route path="/add" element={<Add />} />
                <Route path="/edit/:name" element={<Edit />} />
            </Routes>
        </BrowserRouter>
    );
}

export default MainRouter;