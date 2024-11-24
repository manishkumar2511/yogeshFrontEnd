import { IoMailOutline } from "react-icons/io5";
import Heading from "../common/Heading";
import PageHeading from "../common/PageHeading";
import { LuPhone } from "react-icons/lu";
import { useState } from "react";
import axiosInstance from "../axios";
import { toast } from "react-toastify";

const initialData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
}

const ContactUs = () => {
    const [formData, setFormData] = useState(initialData);
    const [error, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName?.trim()) newErrors.firstName = "First Name is required";
        if (!formData.phone?.trim()) {
            newErrors.phone = "Phone is required";
        } else if (!/^\d{10,}$/.test(formData.phone)) {
            newErrors.phone = "Invalid phone number. Must be at least 10 digits.";
        }
        if (!formData.message?.trim()) newErrors.message = "Message is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInput = (e) => {
        const { id, value } = e.target;

        setFormData({ ...formData, [id]: value });
        if (error[id]) {
            setErrors({ ...error, [id]: "" });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const data = {
            ...formData,
            to: formData.email,
            body: formData.message,
            subject: "Query from " + formData.firstName,
        }
        try {
            const response = await axiosInstance.post("/Notification/SendQuery", data);
            if (response.status === 200) {
                setFormData(initialData);
                setErrors({});
                toast.success("Email sent successfully.");
            }
        }
        catch (error) {
            toast.error(error?.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <div className="">
            <PageHeading home={"home"} pagename={"Contact Us"} />
            <div className="w-10/12 m-auto mt-4">
                <div className="flex flex-col lg:flex-row mb-4">
                    <div className="w-full lg:w-1/2 p-3">
                        <h3 className="text-2xl font-extrabold uppercase text-amber-400">Have a query?</h3>
                        <p className="text-lg leading-relaxed mt-4 mb-6">If you have any questions or need assistance, we’re here to help! Feel free to reach out to us through our Contact Us page. Whether it’s about a product, an order, or general inquiries, our team is ready to provide the support you need. Don’t hesitate—contact us today!</p>
                        <a href="mailto:yogeshfurniture@gmail.com" className="inline-flex gap-3 mb-4 items-center"><IoMailOutline className="text-amber-400 text-2xl" /> yogeshfurniture@gmail.com</a>
                        <br />
                        <a href="tel:+91-9800000000" className="inline-flex gap-3 items-center"> <LuPhone className="text-amber-400 text-2xl" /> +91-9800000000</a>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <div className="card mt-6 shadow ">
                            <Heading heading={"Get In Touch"} />
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="">
                                        <div className="flex flex-col sm:flex-row gap-2">
                                            <div className="w-full lg:w-1/2">
                                                <div className="form-group">
                                                    <label htmlFor="firstName">First Name</label>
                                                    <input type="text"
                                                        className={`form-control ${error.firstName ? "is-invalid" : ""}`}
                                                        id="firstName"
                                                        value={formData.firstName}
                                                        onChange={handleInput}
                                                    />
                                                    {error.firstName && <p className="text-red-500">{error.name}</p>}
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-1/2">
                                                <div className="form-group">
                                                    <label htmlFor="lastName">Last Name</label>
                                                    <input type="text" className="form-control " id="lastName"
                                                        value={formData.lastName}
                                                        onChange={handleInput}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-2 mt-2">
                                            <div className="w-full lg:w-1/2">
                                                <div className="form-group ">
                                                    <label htmlFor="email">Email</label>
                                                    <input type="email" className="form-control " id="email"
                                                        value={formData.email}
                                                        onChange={handleInput}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-1/2">
                                                <div className="form-group ">
                                                    <label htmlFor="phone">Phone</label>
                                                    <input type="tel" id="phone"
                                                        className={`form-control ${error.phone ? "is-invalid" : ""}`}
                                                        value={formData.phone}
                                                        onChange={handleInput}
                                                    />
                                                    {error.phone && <p className="text-red-500">{error.phone}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group mt-2">
                                        <label htmlFor="message">Message</label>
                                        <textarea id="message" rows="3"
                                            className={`form-control ${error.message ? "is-invalid" : ""}`}
                                            value={formData.message}
                                            onChange={handleInput}
                                        ></textarea>
                                        {error.message && <p className="text-red-500">{error.message}</p>}
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-3">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;