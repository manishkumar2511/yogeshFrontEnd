import { IoMailOutline } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";


const Footer = () => {
    return (
        <div className="bg-gray-900 text-white py-2 fixed bottom-0 w-full">
            <div className="flex flex-col sm:flex-row gap-2 justify-between items-center px-5">
                <div className="logo ms-3 ">Yogesh Furniture</div>
                <div className="flex items-center gap-2">
                    <a href="mailto:yogeshfurniture@gmail.com" className="flex gap-1 items-center"><IoMailOutline /> Mail Us</a>
                    <a href="tel:+91-9800000000" className="flex gap-1 items-center"> <LuPhone /> Call Us</a>

                </div>
            </div>
        </div>
    );
};

export default Footer;
