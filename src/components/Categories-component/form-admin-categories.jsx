import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createCategories } from "../../../redux/reducers/categories";
import * as Yup from "yup";
import Swal from "sweetalert2";

const FormAdminCategories = () => {
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

  return (
    <section
      id="contact-arch"
      className="contact-sec style2 section-padding position-re bg-img"
    >
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

                        <div className="col-12">
                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-success mt-30 full-width"
                            >
                              Cargar Categoria
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
    </section>
  );
};

export default FormAdminCategories;
