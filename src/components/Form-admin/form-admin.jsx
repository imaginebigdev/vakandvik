import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../redux/reducers/categories";
import * as Yup from "yup";
import axios from "axios";
import { createProduct } from "../../../redux/reducers/products";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
const preset_key = process.env.NEXT_APP_PRESET_KEY;
const cloud_name = process.env.NEXT_APP_CLOUD_NAME;

const FormAdmin = ({ setModal, modal }) => {
  const messageRef = React.useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showOfferPrice, setShowOfferPrice] = useState(false);
  const { categories } = useSelector((state) => state.categories);
  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Ingrese un nombre"),
    price: Yup.number()
      .positive("El numero debe ser positivo")
      .required("Ingrese un precio"),
    desing: Yup.string().required("Diseño es obligatorio"),
    categoryId: Yup.string().required("Seleccione una categoria"),
  });

  const handleSubmitForm = async (values) => {
    setLoading(true);
    let submitValues = {
      ...values,
      categoryId: Number(values.categoryId),
    };

    const imageFormData = new FormData();
    imageFormData.append("file", values.image);
    imageFormData.append("upload_preset", preset_key);

    await axios
      .post(
        `
      https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        imageFormData
      )
      .then((res) => {
        submitValues = { ...submitValues, image: res.data.url };
      })
      .catch((err) => console.log(err));

    let newArr = [];
    for (let i = 0; i < submitValues.image_galery.length; i++) {
      const imageFormData = new FormData();
      imageFormData.append("file", submitValues.image_galery[i]);
      imageFormData.append("upload_preset", preset_key);

      await axios
        .post(
          `
        https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          imageFormData
        )
        .then((res) => {
          newArr.push(res.data.url);
        })
        .catch((err) => console.log(err));
    }
    submitValues = { ...submitValues, image_galery: newArr };

    dispatch(createProduct(submitValues))
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Producto creado exitosamente",
          text: "El producto se ha creado de manera exitosa.",
        });
      })
      .catch((error) => {
        console.log("Error al crear el producto:", error);
      });
    setLoading(false);
    setModal(false);
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
                            onClick={() => setShowOfferPrice(!showOfferPrice)}
                          />
                        </label>
                      </div>
                      {showOfferPrice && (
                        <div className="contenedorInpputs">
                          <div className="form-group">
                            <label className="tituloInput">
                              Precio Oferta
                              <span style={{ color: "red" }}> *</span>
                            </label>
                            <Field
                              id="form_offer_price"
                              type="number"
                              name="offer_price"
                              placeholder="Precio de oferta"
                              className="formEmail"
                            />
                            {formProps.errors.offer_price &&
                            formProps.touched.offer_price ? (
                              <div>{formProps.errors.offer_price}</div>
                            ) : null}
                          </div>
                        </div>
                      )}
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
  );
};

export default FormAdmin;
/*  <section
      id="contact-arch"
      className="contact-sec style2 position-re bg-img"
    >
      <div className="container">
        <div className="row justify-content-center">
          <h2 className="pb-50">Agregar Producto</h2>
          <div className="col-lg-10">
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
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <Field
                              id="form_name"
                              type="text"
                              name="name"
                              placeholder="Nombre *"
                              required="Obligatorio"
                            />
                            {formProps.errors.name && formProps.touched.name ? (
                              <div className="text-danger">
                                {formProps.errors.name}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label> Imagen principal</label>
                            <input
                              id="form_image"
                              type="file"
                              name="image"
                              placeholder="Imagen"
                              onChange={(e) =>
                                formProps.setFieldValue(
                                  "image",
                                  e.target.files[0]
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>Galeria</label>
                            <input
                              id="form_image_galery"
                              type="file"
                              name="image_galery"
                              placeholder="Imagenes"
                              multiple
                              onChange={(e) =>
                                formProps.setFieldValue(
                                  "image_galery",
                                  e.target.files
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>Precio</label>
                            <Field
                              id="form_price"
                              type="number"
                              name="price"
                              placeholder="Precio *"
                              required="Obligatorio"
                            />
                            {formProps.errors.price &&
                            formProps.touched.price ? (
                              <div className="text-danger">
                                {formProps.errors.price}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        {/*    <div className="col-lg-12">
                          <label>Diseño</label>
                          <div className="form-group">
                            <Field
                              id="form_desing"
                              type="text"
                              name="desing"
                              placeholder="Diseño *"
                            />
                            {formProps.errors.desing &&
                            formProps.touched.desing ? (
                              <div className="text-danger">
                                {formProps.errors.desing}
                              </div>
                            ) : null}
                          </div>
                        </div> 
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>Stock</label>
                            <Field
                              id="form_sotck"
                              type="number"
                              name="stock"
                              placeholder="Stock"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group text-center">
                            <h6> Categoria *</h6>
                            <Field
                              as="select"
                              name="categoryId"
                              required="Obligatorio"
                            >
                              <option defaultChecked disabled selected hidden>
                                Selecciona una categoria
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
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group text-center">
                            <label>¿Es un producto destacado?</label>
                            <Field
                              type="checkbox"
                              id="form_relevant"
                              name="is_relevant"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group text-center">
                            <label>¿Es un producto en oferta?</label>
                            <Field
                              type="checkbox"
                              id="form_offer_price_check"
                              name="is_offer"
                            />
                          </div>
                        </div>
                        {/*   <div className="col-lg-12">
                          <div className="form-group">
                            <Field
                              id="form_offer_price"
                              type="number"
                              name="offer_price"
                              placeholder="Precio de oferta"
                            />
                          </div>
                        </div> 

                        <div className="col-12">
                          <div className="form-group">
                            <Field
                              as="textarea"
                              id="form_description"
                              name="description"
                              placeholder="Descripción"
                              rows="4"
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
                                : "Cargar producto"}
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
          </div>
        </div>
      </div>
    </section> */
