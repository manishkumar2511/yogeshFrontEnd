import { showDialog } from '../redux/productSlice';
import AddProduct from './products/AddProduct';
import { useDispatch } from 'react-redux';
import ProductList from './products/ProductList';

export default function Dashboard() {
    const dispatch = useDispatch();


    return (
        <div className="mt-20 ms-20 w-11/12">
            <button className='btn btn-dark' onClick={() => dispatch(showDialog())}>Add Product</button>
            <AddProduct />
            <ProductList />
        </div>
    )
}
