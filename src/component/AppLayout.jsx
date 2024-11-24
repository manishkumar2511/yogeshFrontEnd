import Footer from "../common/Footer";
import Header from "../common/Header";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}
