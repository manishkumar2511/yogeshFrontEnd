import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from '../redux/authSlice';

function clearCookie() {
    const path = "/";
    const domain = "";
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; domain=${domain}`;
}

const useLogout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        clearCookie();
        dispatch(logout());
        toast.success("Logout Successfully");
        navigate("/login");
    };

    return { handleLogout };
};

export default useLogout;