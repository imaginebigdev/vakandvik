import React, { useState } from "react";
import ContactFromDate from "../../data/sections/form-info.json";
import { Formik, Form, Field } from "formik";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const messageRef = React.useRef(null);
  const [errors, setErrors] = useState({
    email: "",
  });
  const [input, setInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const validador = (inputs) => {
    let validations = {};
    const emailExpresion =
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (!inputs.email) {
      validations.email = "Debe ingresar su email";
    } else if (!emailExpresion.test(inputs.email)) {
      validations.email = "Ingrese un email válido";
    }
    return validations;
  };

  const handleOnChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    const errores = validador({ ...input, [e.target.name]: e.target.value });
    setErrors(errores);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service", "template", e.target, "public_key")
      .then((res) => {
        console.log(res),
          (error) => {
            console.log(error);
          };
      });

    messageRef.current.innerText =
      "Su mensaje fue enviado correctamente. Nos estaremos contactando con usted a la brevedad.";

    setTimeout(() => {
      messageRef.current.innerText = "";
    }, 3000);

    setInput({
      name: "",
      email: "",
      message: "",
    });
  };
  return (
    <section className="contact section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="form md-mb50">
              <h4 className="fw-700 color-font mb-50">Asesorate Online</h4>
              <Formik>
                <Form onSubmit={sendEmail} autoComplete="off" id="contact-form">
                  <div className="messages" ref={messageRef}></div>
                  <div className="controls">
                    <div className="form-group">
                      <Field
                        id="form_name"
                        type="text"
                        name="name"
                        value={input.name}
                        placeholder="Nombre Completo"
                        required="required"
                        onChange={(e) => handleOnChange(e)}
                      />
                    </div>
                    <div className="form-group">
                      <Field
                        id="form_email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={(e) => handleOnChange(e)}
                        value={input.email}
                      />
                      {errors.email ? <div>{errors.email}</div> : null}
                    </div>
                  </div>
                  <div className="form-group">
                    <Field
                      as="textarea"
                      id="form_message"
                      name="message"
                      placeholder="Mensaje"
                      rows="4"
                      required="required"
                      onChange={(e) => handleOnChange(e)}
                      value={input.message}
                    />
                  </div>

                  <button type="submit" className="butn bord">
                    <span>Enviar Mensaje</span>
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
          <div className="col-lg-5 offset-lg-1">
            <div className="cont-info">
              <h4 className="fw-700 color-font mb-50">O Escribinos a...</h4>
              <h3 className="wow" data-splitting>
                {ContactFromDate.title}
              </h3>
              <div className="item mb-40">
                <h5>
                  <a href="#0">{ContactFromDate.email}</a>
                </h5>
                <h5>{ContactFromDate.phone}</h5>
              </div>
              <h3 className="wow" data-splitting>
                Visitanos!.
              </h3>
              <div className="item">
                <h6>
                  {ContactFromDate.location.first}
                  <br />
                  {ContactFromDate.location.second}
                </h6>
              </div>
              <div className="social mt-50">
                <a
                  href="https://www.instagram.com/vakandvik_/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-instagram fa-2x"></i>
                </a>
                <a
                  href="https://wa.me/5493513864255"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-whatsapp fa-2x"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
