import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductStart, fetchProductsStart } from './../../redux/Product/product.actions';
import './styles.scss';
import { BsFillPlusCircleFill } from "react-icons/bs";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Modal from './../../components/Modal';
import AdminProductCard from './../../components/AdminProductCard';
import Pagination from './../../components/Pagination';

const mapState = ({ productsData }) => ({
    products: productsData.products
});

const AdminProducts = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(mapState);

    const { data, queryDoc, isLastPage } = products;

    const [hideModal, setHideModal] = useState(true);
    const [productCategory, setProductCategory] = useState('');
    const [productName, setProductName] = useState('');
    const [productThumbnail, setProductThumbnail] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productDesc, setProductDesc] = useState('');

    const toggleModal = () => setHideModal(!hideModal);

    const configModal = {
        hideModal,
        toggleModal
    };

    useEffect(() => {
        dispatch(
            fetchProductsStart()
        );
    }, []);

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(
            addProductStart({
                productCategory,
                productName,
                productThumbnail,
                productPrice,
                productDesc
            })
        );
        resetForm();
    };

    const resetForm = () => {
        setHideModal(true);
        setProductCategory('');
        setProductDesc('');
        setProductName('');
        setProductPrice(0);
        setProductThumbnail('');
    };

    const handleLoadMore = () => {
        dispatch(
            fetchProductsStart({
                startAfterDoc: queryDoc,
                persistProducts: data
            })
        );
    }

    const configLoadMore = {
        onLoadMoreEvent: handleLoadMore
    };

    return (
        <div className="container">
            <div className="manageProducts">
                <h1>Manage Products</h1>
                <div className="row">
                    <div className="col-md-10"></div>
                    <div className="col-md-2">
                        <button onClick={() => toggleModal()} className="btn btn-success">
                            <BsFillPlusCircleFill /> Add Product
                        </button>
                    </div>
                </div>
                <div className="row pt-5">
                    {(Array.isArray(data) && data.length > 0) && data.map((product, index) => {
                        return (
                            <div key={index} className="col-4 mt-2">
                                <AdminProductCard product={product} />
                            </div>
                        )
                    })}
                </div>
                {!isLastPage && (
                    <Pagination  {...configLoadMore} />
                )}
            </div>

            <Modal {...configModal}>
                <div className="addProductForm">
                    <h2>
                        Add New Product
                    </h2>
                    <form style={{ paddingTop: "20px" }} onSubmit={handleSubmit}>
                        <div className="main-body">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="card" style={{ height: "100%" }}>
                                        <div className="card-body">
                                            <img src={productThumbnail} id="img" alt="" />
                                            <div className="m-2">
                                                <input
                                                    className="inputFile"
                                                    type="file"
                                                    onChange={e => setProductThumbnail(e.target.value)}
                                                    value={productThumbnail}
                                                    name="productThumbnail"
                                                    accept="image/png, image/gif, image/jpeg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="card mb-3" style={{ height: "100%" }}>
                                        <div className="card-body">
                                            <label htmlFor="nameProduct" className="font-weight-bold">
                                                Product Category
                                            </label>
                                            <select
                                                className="form-select"
                                                name="productCategory"
                                                onChange={e => setProductCategory(e.target.value)}
                                            >
                                                <option value="Category1">Cat 1</option>
                                                <option value="Category2">Cat 2</option>
                                                <option value="Category3">Cat 3</option>
                                            </select>

                                            <hr />
                                            <label htmlFor="nameProduct" className="font-weight-bold">
                                                Product Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="productName"
                                                onChange={e => setProductName(e.target.value)}
                                                value={productName}
                                            />

                                            <hr />
                                            <label htmlFor="nameProduct" className="font-weight-bold">
                                                Product Price
                                            </label>
                                            <input
                                                type="number"
                                                min="0.00"
                                                max="99999.99"
                                                step="0.01"
                                                className="form-control"
                                                name="productPrice"
                                                onChange={e => setProductPrice(e.target.value)}
                                                value={productPrice}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="card" style={{ height: "100%" }}>
                                    <div className="card-body">
                                        <label
                                            htmlFor="descriptionProduct"
                                            className="font-weight-bold"
                                        >
                                            Product Description
                                        </label>
                                        <hr />
                                        <CKEditor style={{ height: "200px" }} editor={ClassicEditor} onChange={(event, editor) => setProductDesc(editor.getData())} />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <button className="btn btn-warning">Ajouter</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
};

export default AdminProducts;