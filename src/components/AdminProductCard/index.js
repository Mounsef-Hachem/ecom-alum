import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsFillTrashFill, BsPencilSquare, BsFillEyeFill } from "react-icons/bs";
import DeleteProduct from './../../components/DeleteProduct';

const AdminProductCard = ({ product }) => {
  const [deleteAlert, setDeleteAlert] = useState(false);

  const { productCategory,
    productName,
    productThumbnail,
    productPrice,
    productDesc,
    documentID
  } = product;

  const showAlertDelete = () => {
    setDeleteAlert(true);
  }

  return (
    <div className="card">
      {deleteAlert && <DeleteProduct setDeleteAlert={setDeleteAlert} idProduct={documentID} />}
      <img
        style={{ height: "250px" }}
        src="https://image.made-in-china.com/2f0j10IYRfDTvPoEou/-Fen-tre-d-039-aluminium-bande-m-t-o-.jpg"
        alt=" "
      />
      <div className="m-2">
        <h2>{productName}</h2>
        <div className="row">
          <div className="col-9">
            <h4>Prix : {productPrice} DH</h4>
          </div>
          <div className="col-3">
            {/* <Link
                className="btn btn-warning mr-1 mb-1"
                to={`/editProduit/${idCategorie}/${prod.id}`}
              >
                <BsPencilSquare />
              </Link> */}
            <button
              className="btn btn-danger mr-1 mb-1"
              onClick={() => showAlertDelete()}
            >
              <BsFillTrashFill />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductCard;
