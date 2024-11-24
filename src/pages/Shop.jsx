import { useState } from "react";
import PageHeading from "../common/PageHeading";
import { products } from "../data/Data";
import Modal from "../common/Modal";
import "rc-slider/assets/index.css";

const Shop = () => {
    const [isModalOpen, setIsModalOpen] = useState(null);

    const handleOpen = (productId) => {
        setIsModalOpen(productId);
    };
    const handleClose = () => {
        setIsModalOpen(null);
    };

    const [filters, setFilters] = useState({
        categories: [],
        brands: [],
        priceRange: [0, 1500],
    });


    const filteredProducts = products.filter((product) => {
        if (
            filters.categories.length > 0 &&
            !filters.categories.includes(product.category)
        )
            return false;
        if (filters.brands.length > 0 && !filters.brands.includes(product.brand))
            return false;

        const price = parseFloat(product.price);

        if (price < filters.priceRange[0] || price > filters.priceRange[1])
            return false;

        return true;
    });

    return (
        <div>
            <PageHeading home={"home"} pagename={"Shop"} />
            <div>
                <div className="w-10/12 m-auto flex gap-3 justify-between mt-8 ">

                    <div className="w-full flex justify-center">
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 my-6">
                            {filteredProducts.map((item, index) => (
                                <div key={index}>
                                    <div className="overflow-hidden relative w-full">
                                        <div className="image-container relative cursor-pointer" onClick={() => handleOpen(item.id)}>
                                            <div className="rounded-3xl">
                                                <img src={item.img} alt="img" className="rounded-3xl" />
                                            </div>
                                            {/* <div className="opacity-0 absolute -bottom-3 right-0 bg-white p-4 rounded-s-2xl">
                                                <div className="bg-black text-white h-10 w-10 grid place-items-center rounded-3xl">
                                                    <button
                                                        className="text-2xl"
                                                        onClick={() => handleOpen(item.id)}
                                                    >
                                                        <BiCart />
                                                    </button>
                                                </div>
                                            </div> */}
                                        </div>

                                        <div className="product-details mt-2">
                                            <p className="mb-2">{item.title}</p>
                                            <p>${item.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Modal
                    data={products.find((item) => item.id === isModalOpen)}
                    isModalOpen={isModalOpen}
                    handleClose={handleClose}
                />
            </div>
        </div >
    );
};

export default Shop;
