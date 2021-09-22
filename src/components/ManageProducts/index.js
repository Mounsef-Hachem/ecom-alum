import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { deleteProductStart } from '../../redux/Product/product.actions';
import { fetchCategoriesStart } from '../../redux/Categories/categories.actions';
import AddProduct from '../AddProduct';

const ManageProducts = ({ products }) => {
    const dispatch = useDispatch();

    const [hideModal, setHideModal] = useState(true);
    const [columns, setColumns] = useState([
        {
            title: '', field: 'productImages',
            render: rowData => <img src={rowData.productImages[0]} style={{ width: 50 }} />
        },
        { title: 'Product', field: 'productName' },
        { title: 'Price', field: 'productPrice' },
        { title: 'Quantity', field: 'productQuantity' }
    ]);

    const handleDeleteCategory = (oldData) => {
        return new Promise((resolve, reject) => {
            dispatch(deleteProductStart(oldData.documentID));
            resolve();
        });
    }
    const toggleModal = () => {
        setHideModal(!hideModal);
        dispatch(
            fetchCategoriesStart()
        );
    }


    const configModal = {
        hideModal,
        toggleModal
    };

    return (
        <>
            <MaterialTable
                title="Products"
                columns={columns}
                data={products}
                actions={[
                    {
                        icon: 'add',
                        tooltip: 'Add Product',
                        isFreeAction: true,
                        onClick: (event) => toggleModal()
                    }
                ]}
                editable={{
                    onRowDelete: oldData => handleDeleteCategory(oldData)
                }}
                options={{
                    detailPanelType: 'single',
                }}
            />
            <AddProduct configModal={configModal} setHideModal={setHideModal} />
        </>
    )
}

export default ManageProducts;