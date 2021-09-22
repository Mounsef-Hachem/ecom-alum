import React, { Fragment, useEffect } from "react";
import Swal from 'sweetalert2';
import { deleteProductStart } from './../../redux/Product/product.actions';
import { useDispatch } from 'react-redux';

const DeleteProduct = ({ setDeleteAlert, idProduct }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    Swal.fire({
      title: 'Do you want remove this product ?',
      showCancelButton: false,
      confirmButtonText: `Yes`,
      allowEscapeKey: false,
      allowOutsideClick: false,
      denyButtonText: `Cancel`,
      showDenyButton: true,
      heightAuto: false
    })
      .then((result) => {
        if (result.isConfirmed) {
          setDeleteAlert(false);
          dispatch(deleteProductStart(idProduct));
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Product deleted',
            showConfirmButton: false,
            timer: 900,
            heightAuto: false
          })
        } else if (result.isDenied) {
          setDeleteAlert(false);
        }
      })
      .catch((err) => console.log(err));
  }, [setDeleteAlert, idProduct]);

  return <Fragment></Fragment>;
};

export default DeleteProduct;
