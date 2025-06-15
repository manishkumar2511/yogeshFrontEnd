import { showDialog } from '../redux/productSlice';
import AddProduct from './products/AddProduct';
import { useDispatch } from 'react-redux';
import ProductList from './products/ProductList';
import { useState } from 'react';

export default function Dashboard() {
    const dispatch = useDispatch();
    const [refreshList, setRefreshList] = useState(false);

    const triggerRefresh = () => {
        setRefreshList(prev => !prev);
    };


    return (
        <div className="mt-20 ms-20 w-11/12">
            <button className='btn btn-dark' onClick={() => dispatch(showDialog())}>Add Product</button>
            <AddProduct onProductAdded={triggerRefresh} />
            <ProductList refreshTrigger={refreshList} onProductDeleted={triggerRefresh} />
        </div>
    )
}
