import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getJWTToken, isValidEmail } from "../utils/utils";
import axiosInstance from "../axios";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../redux/authSlice";
import useLogout from '../hooks/useLogout'

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const [inputValue, setInputValue] = useState({ userName: "", password: "" });
    const { handleLogout } = useLogout();
    const user = useSelector((state) => state.auth.user);

    const loginAndVerifyLogin = async (inputValue) => {
        try {
            const response = await axiosInstance.post("/Account/Login", inputValue);
            const { exp } = jwtDecode(response.data.data.token);
            let tokenExpiryTime = new Date(exp * 1000);
            document.cookie = `token=${response.data.data.token}; expires=${tokenExpiryTime.toUTCString()}; path=/`;
            toast.success("Logged in successfully!");
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const checkToken = () => {
            const token = getJWTToken();

            if (token && user) {
                try {
                    const decoded = jwtDecode(token); // Decode the token
                    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

                    if (decoded.exp && decoded.exp < currentTime) {
                        console.log("Token has expired");
                        handleLogout();
                        navigate("/login");
                    } else {
                        console.log("Token is valid");
                        navigate("/");
                    }
                } catch (error) {
                    console.error("Error decoding token:", error);
                    navigate("/login");
                }
            }
        };

        checkToken();
    }, [navigate, handleLogout, user]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setInputValue({
            ...inputValue,
            [id]: value,
        });
        setError((old) => ({
            ...old,
            [id]: "",
        }));
    };

    const validateUserInput = (data) => {
        const errors = {};

        if (data.userName.trim() === "") {
            errors.userName = "Email Address is required";
        } else if (!isValidEmail(data.userName)) {
            errors.userName = "Invalid email address";
        }

        if (data.password.trim() === "") {
            errors.password = "Password is required";
        }
        return errors;
    };

    const handleSubmit = async () => {
        const errors = validateUserInput(inputValue);
        if (Object.keys(errors).length > 0) {
            toast.warning("Please fill all the fields");
            return setError(errors);
        }

        const res = await loginAndVerifyLogin(inputValue);
        if (res.data.isSuccessfull) {
            const { username, role, $id } = res.data.data;
            dispatch(setUser({ username, role, id: $id }));
            setInputValue({ userName: "", password: "" });
            navigate("/");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="container-fluid SignupContainer vh-100 d-flex justify-content-center align-items-center shadow-lg">
            <div className="flex formRow bg-white">
                <div className="w-full md:w-1/2 p-3">
                    <h4 className="signupText fs-4 text-center">Login</h4>
                    <div className="d-flex h-75 align-items-center">
                        <div className="signupDetails w-100 mt-5">
                            <form onKeyDown={handleKeyDown}>
                                <div className="ps-3">
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email Address:
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="userName"
                                            placeholder="name@example.com"
                                            value={inputValue.userName}
                                            onChange={handleInputChange}
                                        />
                                        {error.userName && (
                                            <span className="error">{error.userName}</span>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">
                                            Password:
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="********"
                                            value={inputValue.password}
                                            onChange={handleInputChange}
                                        />
                                        {error.password && (
                                            <span className="error">{error.password}</span>
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-primary submitBtn w-100"
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </button>
                                </div>
                                <p className="mt-2 text-end">
                                    <Link to="/forgotpassword" className="text-primary">
                                        Forgot Password
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 hidden md:block">
                    <img src="/images/login1.jpg" alt="Login" />
                </div>
            </div>
        </div>
    );
};

export default Login;
