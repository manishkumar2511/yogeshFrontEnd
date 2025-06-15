import { useSelector, useDispatch } from "react-redux"
import { reset } from "../../redux/productSlice";
import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from 'react';
import { Editor } from "primereact/editor";
import axiosInstance from '../../axios';
import { toast } from 'react-toastify';

const initialState = {
    ProductName: "",
    Price: "",
    CategoryId: "",
    ProductImage: null,
}

const editorModules = {
    toolbar: [["bold", "italic", "underline", "strike"], [{ list: "ordered" }, { list: "bullet" }]],
};


function AddProduct({ onProductAdded }) {
    const [categories, setCategories] = useState([]);
    const [categoryFetched, setCategoryFetched] = useState(false);
    const [productDetails, setProductDetails] = useState(initialState);
    const [description, setDescription] = useState("");
    const [existingImage, setExistingImage] = useState(null);
    const isVisible = useSelector((state) => state.product.isVisible);
    const productToEdit = useSelector((state) => state.product.data);  
    const isEditMode = productToEdit && productToEdit.productId;
    const dispatch = useDispatch();

    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get("/Product/GetProductCategory");
            setCategories(response.data.data || []);
            setCategoryFetched(true);
        } catch (error) {
            toast.error("Failed to load categories.");
        }
    };


    useEffect(() => {
        const loadModalData = async () => {
            if (!categoryFetched) {
                await fetchCategories();
            }

            if (productToEdit?.productId) {
                try {
                    const res = await axiosInstance.get(`/Product/GetProductsByProductId/${productToEdit.productId}`);
                    const product = res.data.data?.[0];

                    setProductDetails({
                        ProductName: product.productName,
                        Price: product.price,
                        CategoryId: product.categoryId,
                        ProductImage: null,
                    });
                    setDescription(product.description);
                } catch (error) {
                    toast.error("Failed to load product data.");
                }
            } else {
                setProductDetails(initialState);
                setDescription("");
            }
        };

        if (isVisible) {
            loadModalData();
        }
    }, [isVisible]);



    const handleClose = () => {
        dispatch(reset());
        setProductDetails(initialState);
        setDescription("");
        setCategoryFetched(false);
    };


    const handleInput = (e) => {
        const { id, value } = e.target;
        setProductDetails({ ...productDetails, [id]: value });
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProductDetails({ ...productDetails, ProductImage: file });
        }
    };

    const handleSubmit = async (e) => {
        debugger;
        e.preventDefault();

        const formData = new FormData();
        formData.append("ProductName", productDetails.ProductName);
        formData.append("Description", description);
        formData.append("Price", productDetails.Price);
        formData.append("CategoryId", productDetails.CategoryId);

        if (productDetails.ProductImage) {
            formData.append("ProductImage", productDetails.ProductImage);
        }

        const isEditMode = productToEdit && productToEdit.productId;

        try {
            const response = isEditMode
                ? await axiosInstance.put(`/Product/UpdateProduct/${productToEdit.productId}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                : await axiosInstance.post("/Product/AddProduct", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

            toast.success(response.data.message);

            if (onProductAdded) onProductAdded();
            handleClose();

        } catch (error) {
            console.error("Product Submit Error", error);
            if (error.response) {
                toast.error(`${isEditMode ? "Update" : "Add"} failed: ${error.response.data.message || "Server error"}`);
            } else {
                toast.error(`${isEditMode ? "Update" : "Add"} failed: Network or server issue`);
            }
        }
    };



    return (
        <Dialog header={isEditMode ? "Edit Product" : "Add Product"} visible={isVisible}
            style={{ width: '50vw' }}
            onHide={handleClose}>
            <form onSubmit={handleSubmit}>
                <div className="row g-3 mt-1">
                    <div className="col-6">
                        <input type="text" className="form-control" id='ProductName' placeholder="Name" value={productDetails.ProductName} onChange={handleInput} />
                    </div>
                    <div className="col-6">
                        <input type="text" id='Price' className="form-control" placeholder="Price" value={productDetails.Price} onChange={handleInput} />
                    </div>
                    <div className="col-6 ">
                        <select
                            className="form-select"
                            id="CategoryId"
                            onChange={handleInput}
                            value={productDetails.CategoryId}
                        >
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat.categoryId} value={cat.categoryId}>
                                    {cat.categoryName}
                                </option>
                            ))}
                        </select>


                    </div>
                    <div className="col-6">
                        <input className="form-control" type="file" id="ProductImage" accept="image/*"
                            onChange={handleFileChange} />
                    </div>
                    {/*  */}
                    <div className="col-12">
                        <Editor value={description} id="Description" modules={editorModules} style={{ height: '120px' }} onTextChange={(e) => setDescription(e.htmlValue)} />
                    </div>
                    <button type="submit" className="btn btn-dark col-2">Submit</button>
                </div>
            </form>
        </Dialog>

    )
}

export default AddProduct