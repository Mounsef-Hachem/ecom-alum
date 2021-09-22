import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './../../components/Modal';
import moment from 'moment';
import { storage } from './../../firebase/utils';
import { addProductStart } from '../../redux/Product/product.actions';

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    marginBottom: 20
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

const mapState = ({ categoriesData }) => ({
    categories: categoriesData.categories.data
});

const AddProduct = ({ configModal, setHideModal }) => {
    const dispatch = useDispatch();
    const { categories } = useSelector(mapState);

    const [productCategory, setProductCategory] = useState('');
    const [productName, setProductName] = useState('');
    const [productImages, setProductImages] = useState([]);
    const [productPrice, setProductPrice] = useState(0);
    const [productQuantity, setProductQuantity] = useState(0);
    const [productDesc, setProductDesc] = useState('');
    const [productAbout, setProductAbout] = useState('');
    const [progress, setProgress] = useState(0);

    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        },
        maxFiles: 5
    });

    const thumbs = files.map(file => (
        <div className="col-xs-4" style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                />
            </div>
        </div>
    ));

    const handleSubmit = e => {
        e.preventDefault();
        if (productCategory && productName && productImages.length > 0 && productPrice && productQuantity && productDesc && productAbout) {
            dispatch(
                addProductStart({
                    productCategory,
                    productName,
                    productQuantity,
                    productImages,
                    productPrice,
                    productDesc,
                    productAbout
                })
            );
            resetForm();
        } else {
            console.log("Please enter all fields")
        }
    };

    const handleUpload = (e) => {
        e.preventDefault();
        if (productCategory && productName && files.length > 0) {
            const promises = [];
            files.map((image, index) => {
                const imageName = `${productName}_${index}_${moment().format("DD-MM-YYYY")}`;
                const uploadTask = storage.ref(`products/${productCategory}/${productName}/${imageName}`).put(image);
                promises.push(uploadTask);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        setProgress(progress);
                    },
                    (error) => {
                        console.log(error);
                    },
                    async () => {
                        await storage
                            .ref(`products/${productCategory}/${productName}/`)
                            .child(imageName)
                            .getDownloadURL()
                            .then((urls) => {
                                setProductImages((prevState) => [...prevState, urls]);
                            });
                    }
                );
            });

            Promise.all(promises)
                .then(() => alert("All images uploaded"))
                .catch((err) => console.log(err));
        }
    };

    const resetForm = () => {
        setHideModal(true);
        setProductCategory('');
        setProductDesc('');
        setProductName('');
        setProductPrice(0);
        setProductImages([]);
        setProgress(0);
        setProductQuantity(0);
        setProductAbout('');
        setFiles([]);
    };

    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (

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
                                        <section className="container">
                                            <div style={{ cursor: "pointer" }} {...getRootProps({ className: 'dropzone row text-center' })}>
                                                <input {...getInputProps()} />
                                                <p>Drag 'n' drop some files here, or click to select files</p>
                                            </div>
                                            <aside className="row" style={thumbsContainer}>
                                                <div className="thumbs">
                                                    <div class="row text-center">
                                                        {thumbs}
                                                    </div>
                                                </div>

                                                <progress value={progress} max="100" />
                                            </aside>
                                            <div className="row">
                                                <button disabled={files.length < 1} className="btn btn-warning" onClick={handleUpload}>Upload</button>
                                            </div>
                                        </section>

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
                                            <option value="" disabled hidden selected>Select Category</option>
                                            {(Array.isArray(categories) && categories.length > 0) && categories.map((category, index) => {
                                                return (
                                                    <option key={index} value={category.categoryName}>{category.categoryName}</option>
                                                )
                                            })}
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
                                        <label htmlFor="productPrice" className="font-weight-bold">
                                            Product Price
                                        </label>
                                        <input
                                            id="productPrice"
                                            type="number"
                                            min="0.00"
                                            max="99999.99"
                                            step="0.01"
                                            className="form-control"
                                            name="productPrice"
                                            onChange={e => setProductPrice(e.target.value)}
                                            value={productPrice}
                                        />
                                        <hr />
                                        <label htmlFor="productQuantity" className="font-weight-bold">
                                            Product Quantity
                                        </label>
                                        <input
                                            id="productQuantity"
                                            type="number"
                                            min="0"
                                            max="99999.99"
                                            step="1"
                                            className="form-control"
                                            name="productQuantity"
                                            onChange={e => setProductQuantity(e.target.value)}
                                            value={productQuantity}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col">
                                <div className="card" style={{ height: "100%" }}>
                                    <div className="card-body">
                                        <label
                                            htmlFor="descriptionProduct"
                                            className="font-weight-bold"
                                        >
                                            About this Product
                                        </label>
                                        <CKEditor style={{ height: "200px" }} editor={ClassicEditor} onChange={(event, editor) => setProductAbout(editor.getData())} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col">
                                <div className="card" style={{ height: "100%" }}>
                                    <div className="card-body">
                                        <label
                                            htmlFor="descriptionProduct"
                                            className="font-weight-bold"
                                        >
                                            Product Description
                                        </label>
                                        <CKEditor style={{ height: "200px" }} editor={ClassicEditor} onChange={(event, editor) => setProductDesc(editor.getData())} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <button className="btn btn-warning">Add Product</button>
                    </div>
                </form>
            </div>
        </Modal>
    )
};

export default AddProduct;