import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react"
import axiosInstance from "../../axios"
import { useDispatch } from "react-redux";
import { setProduct } from "../../redux/productSlice";
import Loader from "../../component/Loader/Loader";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ConfirmDialog } from 'primereact/confirmdialog';



const BASE_URL = import.meta.env.VITE_BASE_URL

export default function ProductList() {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [visible, setVisible] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/Product/GetProducts");
            setList(response.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const imageBodyTemplate = (product) => {
        return <img src={`${BASE_URL}/${product.imageUrl}`} alt={product.imageUrl} className="h-12 w-12 rounded" />;
    };

    const handleEdit = (id) => {
        const editProduct = list.find((product) => product.$id === id);
        dispatch(setProduct(editProduct));
    }

    const handleDelete = (id) => {
        console.log(id);

        setDeleteId(id);
        setVisible(true);
    }

    const handleHide = () => {
        setVisible(false);
        setDeleteId(null);
    }

    const deleteProduct = async () => {
        try {
            const response = await axiosInstance.delete(`/Product/${deleteId}`);
            console.log(response);

        } catch (error) {
            console.log(error);

        }
    }

    const footerContent = (
        <div>
            <button
                onClick={() => setVisible(false)}
                className="btn btn-outline-danger mx-3 px-4"
            >
                No
            </button>
            <button onClick={deleteProduct} className="btn btn-outline-success px-6">
                Yes
            </button>
        </div>
    )


    if (loading) return <Loader />


    return (
        <>
            <ConfirmDialog
                visible={visible}
                onHide={handleHide}
                message={`Are you sure you want to delete this product ?`}
                header="Confirmation"
                footer={footerContent}
            />
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Category</th>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col" className="text-end">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list?.length > 0 ? (
                            list.map((product) => (
                                <tr key={product.productId}>
                                    <td>{product.categoryId}</td>
                                    <td>{imageBodyTemplate(product)}</td>
                                    <td>{product.productName}</td>
                                    <td>{product.price}</td>
                                    <td className="flex items-center h-16 justify-end gap-2">
                                        <MdEdit onClick={() => handleEdit(product.productId)} className="cursor-pointer" size={20} />
                                        <RiDeleteBin6Line onClick={() => handleDelete(product.productId)} className="cursor-pointer text-red-500" size={20} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center">No Product Found</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    )
}
