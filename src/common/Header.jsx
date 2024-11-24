import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { navbar } from "../data/Data"
import { FaUser } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { MdLogout } from "react-icons/md";
import useLogout from '../hooks/useLogout';


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const role = useSelector((state) => state.auth.role);
    const { handleLogout } = useLogout();

    const getLinks = useCallback(() => {
        if (role === "Admin") {
            return (<>
                <Link to="/dashboard" className="text-gray-700 hover:text-gray-900 py-2 rounded-md font-medium flex items-center">
                    Dashboard
                </Link>
                <Link onClick={() => handleLogout()} className="cursor-pointer text-gray-700 hover:text-gray-900 py-2 rounded-md font-medium flex items-center">
                    <MdLogout className="mr-2" /> Logout
                </Link>
            </>)
        } else {
            return (
                <Link to="/login" className="text-gray-700 hover:text-gray-900 py-2 rounded-md font-medium flex items-center">
                    <FaUser className="mr-2" /> Login
                </Link>
            )
        }
    }, [role, handleLogout])



    useEffect(() => {
        if (role === "Admin") {
            getLinks();
        }
    }, [role, getLinks])


    return (
        <nav className="bg-white fixed top-0 left-0 right-0 shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                <div className="flex justify-between items-center">
                    {/* Logo/Brand */}
                    <Link to="/" className="text-xl font-bold text-gray-800">
                        Yogesh Furniture
                    </Link>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Hamburger icon */}
                            <svg
                                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            {/* Close icon */}
                            <svg
                                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:flex md:items-center md:space-x-4">
                        {navbar.map((item) => {
                            return (
                                <Link to={item.path} key={item.id} className="text-gray-700 hover:text-gray-900 px-2 py-2 rounded-md font-medium">
                                    {item.name}
                                </Link>
                            )
                        })}
                        {getLinks()}
                    </div>
                </div>

                {/* Mobile menu */}
                <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navbar.map((item) => {
                            return (
                                <Link to={item.path} key={item.id} className="block text-gray-700 hover:text-gray-900 hover:bg-gray-100 py-2 rounded-md font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            )
                        })}
                        {getLinks()}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;