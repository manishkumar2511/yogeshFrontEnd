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

function AddProduct() {
    const [productDetails, setProductDetails] = useState(initialState);
    const [description, setDescription] = useState("");
    const isVisible = useSelector((state) => state.product.isVisible);
    const productToEdit = useSelector((state) => state.product.data);

    const dispatch = useDispatch();


    useEffect(() => {
        if (productToEdit && isVisible) {
            setProductDetails({
                ProductName: productToEdit.productName,
                Price: productToEdit.price,
                CategoryId: productToEdit.productId
            })
            setDescription(productToEdit.description);
        }

    }, [isVisible, productToEdit])

    const handleClose = () => {
        dispatch(reset());
        setProductDetails(initialState);
        setDescription("");
    }


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
        e.preventDefault();
        let formData = new FormData();
        formData.append("ProductName", productDetails.ProductName);
        formData.append("Description", description);
        formData.append("Price", productDetails.Price);
        formData.append("CategoryId", productDetails.CategoryId);
        if (productDetails.ProductImage) {
            formData.append("ProductImage", productDetails.ProductImage);
        }

        try {
            const response = await axiosInstance.post("/Product/AddProduct", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success(response.data.message);

        } catch (error) {
            console.log(error);

        }
    }


    return (
        <Dialog header="Add Product" visible={isVisible}
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
                        <select className='form-select' id='CategoryId' onChange={handleInput} value={productDetails.CategoryId}>
                            <option value="">Category</option>
                            <option value="1">Category 1</option>
                            <option value="2">Category 2</option>
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