import React from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../redux/reducers/categories";

const FormAdmin = () => {
  const messageRef = React.useRef(null);
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categories);
  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const sendMessage = (ms) => console.log(ms);
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
                  description: "",
                  image: "",
                  price: 0,
                  stock: 0,
                  categoryId: null,
                  image_galery: null,
                  design: "",
                  selled: 0,
                  is_relevant: false,
                  is_offer: false,
                  offer_price: 0,
                }}
                onSubmit={async (values) => {
                  console.log(values);
                  // show message

                  //   messageRef.current.innerText =
                  //     "Your Message has been successfully sent. I will contact you soon.";
                  //   // Reset the values
                  //   values.name = "";
                  //   values.email = "";
                  //   values.message = "";
                  //   // clear message
                  //   setTimeout(() => {
                  //     messageRef.current.innerText = "";
                  //   }, 2000);
                }}
              >
                {({ errors, touched }) => (
                  <Form id="contact-form">
                    <div className="messages" ref={messageRef}></div>
                    <br />

                    <div className="controls">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <Field
                              id="form_name"
                              type="text"
                              name="name"
                              placeholder="Nombre *"
                              required="required"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label> Imagen principal</label>
                            <Field
                              id="form_image"
                              type="file"
                              name="image"
                              placeholder="Imagen"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>Galeria</label>
                            <Field
                              id="form_image"
                              type="file"
                              name="image"
                              placeholder="Imagen"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <Field
                              id="form_price"
                              type="number"
                              name="price"
                              placeholder="Precio *"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <Field
                              id="form_desing"
                              type="text"
                              name="desing"
                              placeholder="Diseño *"
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
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
                            <Field as="select" name="categoryId">
                              {categories?.map((c) => (
                                <option key={c.id} value={c.id}>
                                  {c.name}
                                </option>
                              ))}
                            </Field>
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
                        <div className="col-lg-12">
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
                              required="required"
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="text-center">
                            <button
                              type="submit"
                              className="nb butn light mt-30 full-width"
                            >
                              <span className="ls3 text-u">
                                Cargar producto
                              </span>
                            </button>
                          </div>
                        </div>
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

export default FormAdmin;
