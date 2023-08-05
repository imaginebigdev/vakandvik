import { Field, Formik, Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const FormCheckout = ({ show }) => {
  const messageRef = React.useRef(null);

  const { itemsCart } = useSelector((state) => state.cart);
  const [readyToPay, setReadyToPay] = useState(false);
  const [urlCheckout, setUrlCheckout] = useState("");
  let loading = false;

  const SignupSchema = Yup.object().shape({
    clientName: Yup.string().required("Ingrese un nombre"),
    address: Yup.string().required("Ingrese una dirección"),
    postalCode: Yup.number().required("Ingrese un codigo postal"),
    province: Yup.string().required("Ingrese una provincia"),
    phone: Yup.number().required("Ingrese un numero de telefono"),
    email: Yup.string().email().required("Ingrese un email"),
  });
  const totalPrice = itemsCart?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleSubmitForm = async (values) => {
    loading = true;
    const newValues = {
      ...values,
      total_price: totalPrice,
      key_admin: process.env.NEXT_APP_KEY_ADMIN,
      products: itemsCart.map((p) => {
        return { id: p.id, quantity: p.quantity, name: p.name };
      }),
    };

    const response = await axios.post(
      `${process.env.NEXT_APP_URL_BACK}orders`,
      newValues
    );
    setUrlCheckout(response.data.checkoutLink);
    setReadyToPay(true);
    // Setea el item paymentUser para despues cuando regrese a la pagina buscarlo desde el localstorage //
    window.localStorage.setItem("paymentUser", response.data.paymentId);
    // console.log(window.localStorage.getItem("paymentUser"));

    loading = false;
  };

  return (
    <section
      id="contact-arch"
      style={{ display: show ? "" : "none" }}
      className="contact-sec style2 section-padding position-re bg-img"
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="form wow fadeInUp" data-wow-delay=".5s">
              <Formik
                initialValues={{
                  clientName: "",
                  address: "",
                  province: "",
                  phone: 0,
                  postalCode: 0,
                  email: "",
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
                              id="form_ClientName"
                              type="text"
                              name="clientName"
                              placeholder="Nombre *"
                              required="Obligatorio"
                            />
                            {formProps.errors.clientName &&
                            formProps.touched.clientName ? (
                              <div className="text-danger">
                                {formProps.errors.clientName}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <Field
                              id="form_address"
                              type="text"
                              name="address"
                              placeholder="Dirección *"
                              required="Obligatorio"
                            />
                            {formProps.errors.address &&
                            formProps.touched.address ? (
                              <div className="text-danger">
                                {formProps.errors.address}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <Field
                              id="form_address"
                              type="number"
                              name="postalCode"
                              placeholder="Codigo postal"
                              required="Obligatorio"
                            />
                            {formProps.errors.postalCode &&
                            formProps.touched.postalCode ? (
                              <div className="text-danger">
                                {formProps.errors.postalCode}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <Field
                              id="form_province"
                              type="text"
                              name="province"
                              placeholder="Provincia"
                              required="Obligatorio"
                            />
                            {formProps.errors.province &&
                            formProps.touched.province ? (
                              <div className="text-danger">
                                {formProps.errors.province}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <Field
                              id="form_phone"
                              type="number"
                              name="phone"
                              placeholder="Telefono *"
                              required="Obligatorio"
                            />
                            {formProps.errors.phone &&
                            formProps.touched.phone ? (
                              <div className="text-danger">
                                {formProps.errors.phone}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <Field
                              id="form_email"
                              type="text"
                              name="email"
                              placeholder="Email *"
                              required="Obligatorio"
                            />
                            {formProps.errors.email &&
                            formProps.touched.email ? (
                              <div className="text-danger">
                                {formProps.errors.email}
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="text-center">
                            {!readyToPay && (
                              <button
                                type="submit"
                                className="btn btn-success mt-30 full-width"
                              >
                                Cargar datos
                              </button>
                            )}
                          </div>
                        </div>
                        <br />
                        <div className="messages" ref={messageRef}></div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
              {readyToPay && (
                <a href={urlCheckout} className="btn btn-info mt-30 full-width">
                  Pagar
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormCheckout;
