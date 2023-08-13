import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { modifyProduct } from "../../../redux/reducers/products";
import Swal from "sweetalert2";
import { Formik, Form, Field } from "formik";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

const FormEditProduct = ({ setModal, modal, selectedProductId }) => {
  const dispatch = useDispatch();

  const handleModify = (values) => {
    const { price, stock } = values;

    if (!price && !stock) {
      Swal.fire("Sin cambios", "No se han realizado modificaciones.", "info");
    } else {
      const modifications = {};

      if (price) {
        modifications.price = parseFloat(price);
      }

      if (stock) {
        modifications.stock = parseInt(stock);
      }

      Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Quieres realizar la modificación?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(modifyProduct(selectedProductId, modifications));
          Swal.fire(
            "¡Modificación exitosa!",
            "El producto ha sido modificado.",
            "success"
          );
        }
      });
    }

    setModal(false); // Cerrar el modal
  };

  const handleClose = () => {
    setModal(false);
  };

  return (
    <Modal
      show={modal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="form-container"
    >
      <Modal.Header className="modal-header">
        <Modal.Title id="contained-modal-title-vcenter">
          <img
            src="/img/admin/logo-ib.png"
            alt="logo imagine big"
            className="logo-modal"
          />
        </Modal.Title>
        <Button variant="secondary" onClick={handleClose}>
          x
        </Button>
      </Modal.Header>
      <Modal.Body>
        <div className="form">
          <Formik
            initialValues={{ price: "", stock: "" }}
            onSubmit={handleModify}
          >
            {({ values, setFieldValue }) => (
              <Form id="contact-form">
                <div className="controls">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-lg-6">
                      <div className="contenedorInpputs">
                        <label className="tituloInput" htmlFor="price">
                          Editar Precio
                        </label>
                        <Field
                          id="price"
                          type="number"
                          name="price"
                          className="formEmail"
                          value={values.price}
                          onChange={(e) =>
                            setFieldValue("price", e.target.value)
                          }
                        />
                      </div>
                      <div className="contenedorInpputs">
                        <label className="tituloInput" htmlFor="stock">
                          Editar Stock
                        </label>
                        <Field
                          id="stock"
                          type="number"
                          name="stock"
                          className="formEmail"
                          value={values.stock}
                          onChange={(e) =>
                            setFieldValue("stock", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-success mt-30 full-width"
                        >
                          Editar Producto
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default FormEditProduct;
