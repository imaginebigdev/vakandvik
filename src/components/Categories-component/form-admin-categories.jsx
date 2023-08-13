import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createCategories } from "../../../redux/reducers/categories";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

const FormAdminCategories = ({ setModal, modal }) => {
  const messageRef = React.useRef(null);
  const dispatch = useDispatch();

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Ingrese un nombre"),
  });

  const handleSubmitForm = async (values) => {
    dispatch(createCategories(values))
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "¡Categoria creada!",
          text: "La categoria se creo de manera exitosa",
        });
      })
      .catch((error) => {
        console.log("Error al crear el producto:", error);
      });
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
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="form wow fadeInUp" data-wow-delay=".5s">
                <Formik
                  initialValues={{
                    name: "",
                  }}
                  validationSchema={SignupSchema}
                  onSubmit={handleSubmitForm}
                >
                  {(formProps) => (
                    <Form id="contact-form">
                      <div className="controls">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="contenedorInpputs">
                              <label className="tituloInput">
                                Categoría:{" "}
                                <span style={{ color: "red" }}> *</span>
                              </label>
                              <Field
                                id="form_name"
                                type="text"
                                name="name"
                                placeholder="Colocar nombre de la categoría..."
                                required="Obligatorio"
                                className="formEmail"
                              />
                              {formProps.errors.name &&
                              formProps.touched.name ? (
                                <div className="text-danger">
                                  {formProps.errors.name}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="text-center">
                              <button
                                type="submit"
                                className="btn btn-success mt-30 full-width"
                              >
                                Cargar Categoría
                              </button>
                            </div>
                          </div>
                          <br />
                          <div className="messages" ref={messageRef}></div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

{
  /* <Modal
show={modal}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
className="form-container"
>


  <div className="form">
    <Formik
      initialValues={{
        name: "",
        description: "",
        image: "",
        price: 0,
        stock: 0,
        categoryId: null,
        image_galery: [],
        design: "",
        selled: 0,
        is_relevant: false,
        is_offer: false,
        offer_price: 0,
      }}
      validationSchema={SignupSchema}
      onSubmit={handleSubmitForm}
    >
      {(formProps) => (
        <Form id="contact-form">
          <div className="controls">
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-6">
                <div className="contenedorInpputs">
                  <label className="tituloInput">
                    Nombre: <span style={{ color: "red" }}> *</span>
                  </label>
                  <Field
                    id="form_name"
                    type="text"
                    name="name"
                    placeholder="Nombre del producto"
                    required="Obligatorio"
                    className="formEmail"
                  />
                  {formProps.errors.name && formProps.touched.name ? (
                    <div className="text-danger">
                      {formProps.errors.name}
                    </div>
                  ) : null}
                </div>

                <div className="contenedorInpputs">
                  <label className="tituloInput">
                    {" "}
                    Imagen Principal{" "}
                    <span style={{ color: "red" }}> *</span>
                  </label>
                  <input
                    id="form_image"
                    type="file"
                    name="image"
                    placeholder="Imagen"
                    className="formEmail"
                    onChange={(e) =>
                      formProps.setFieldValue("image", e.target.files[0])
                    }
                  />
                </div>

                <div className="contenedorInpputs">
                  <label className="tituloInput">
                    Galería <span style={{ color: "red" }}> *</span>
                  </label>
                  <input
                    id="form_image_galery"
                    type="file"
                    name="image_galery"
                    placeholder="Imagenes"
                    className="formEmail"
                    multiple
                    onChange={(e) =>
                      formProps.setFieldValue(
                        "image_galery",
                        e.target.files
                      )
                    }
                  />
                </div>

                <div className="contenedorInpputs">
                  <label className="tituloInput">
                    Precio <span style={{ color: "red" }}> *</span>
                  </label>
                  <Field
                    id="form_price"
                    type="number"
                    name="price"
                    required="Obligatorio"
                    className="formEmail"
                  />
                  {formProps.errors.price && formProps.touched.price ? (
                    <div className="text-danger">
                      {formProps.errors.price}
                    </div>
                  ) : null}
                </div>

                <div className="contenedorInpputs">
                  <label className="tituloInput">
                    Stock <span style={{ color: "red" }}> *</span>
                  </label>
                  <Field
                    id="form_sotck"
                    type="number"
                    name="stock"
                    className="formEmail"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="contenedorInpputs">
                  <label className="tituloInput">
                    Diseño <span style={{ color: "red" }}> *</span>
                  </label>
                  <Field
                    id="form_desing"
                    type="text"
                    name="desing"
                    placeholder="Colocar diseño del producto..."
                    className="formEmail"
                  />
                  {formProps.errors.desing && formProps.touched.desing ? (
                    <div className="text-danger">
                      {formProps.errors.desing}
                    </div>
                  ) : null}
                </div>

                <div className="contenedorInpputs">
                  <label className="tituloInput">
                    {" "}
                    Categoria <span style={{ color: "red" }}> *</span>
                  </label>
                  <Field
                    as="select"
                    name="categoryId"
                    required="Obligatorio"
                    className="formEmail"
                  >
                    <option defaultChecked disabled selected hidden>
                      Seleccionar una categoria
                    </option>
                    {categories?.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </Field>
                  {formProps.errors.categoryId &&
                  formProps.touched.categoryId ? (
                    <div>{formProps.errors.categoryId}</div>
                  ) : null}
                </div>

                <div className="contenedorInpputs">
                  <div>
                    <label className="tituloInput d-flex align-items-center">
                      ¿Es un producto destacado?
                      <Field
                        type="checkbox"
                        id="form_relevant"
                        name="is_relevant"
                        className="form-checkbox ml-5"
                        style={{ transform: "scale(1.2)" }}
                      />
                    </label>
                  </div>
                </div>

                <div className="contenedorInpputs">
                  <label className="tituloInput d-flex align-items-center">
                    ¿Es un producto en oferta?
                    <Field
                      type="checkbox"
                      id="form_offer_price_check"
                      name="is_offer"
                      className="form-checkbox ml-5"
                      style={{ transform: "scale(1.2)" }}
                    />
                  </label>
                </div>

                <div className="contenedorInpputs">
                  <label className="tituloInput">
                    Descripción <span style={{ color: "red" }}> *</span>
                  </label>
                  <Field
                    as="textarea"
                    id="form_description"
                    name="description"
                    placeholder="Colocar descripción del producto..."
                    rows="3"
                    className="formEmail"
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-success mt-30 full-width"
                    disabled={loading}
                  >
                    {loading
                      ? "Cargando producto, por favor espere"
                      : "Cargar Producto"}
                  </button>
                </div>
              </div>
              <br />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  </div>
</Modal.Body>
</Modal>
 */
}
export default FormAdminCategories;
