import { Field, Formik, Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Swal from "sweetalert2";
import { useRouter } from "next/dist/client/router";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

const FormCheckout = ({ setModal, modal }) => {
  const messageRef = React.useRef(null);
  const [dataUser, setDataUser] = useLocalStorage("user", []);
  console.log(dataUser);
  const { itemsCart } = useSelector((state) => state.cart);
  const [readyToPay, setReadyToPay] = useState(false);
  const [urlCheckout, setUrlCheckout] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

  React.useEffect(() => {
    // Realizar la redirección una vez que urlCheckout esté actualizado
    if (readyToPay && urlCheckout) {
      window.location.href = urlCheckout;
    }
  }, [readyToPay, urlCheckout]);

  const handleSubmitForm = async (values) => {
    setLoading(true);
    const newValues = {
      ...values,
      total_price: totalPrice,
      key_admin: process.env.NEXT_APP_KEY_ADMIN,
      products: itemsCart.map((p) => {
        return { id: p.id, quantity: p.quantity, name: p.name };
      }),
    };

    await axios
      .post(`${process.env.NEXT_APP_URL_BACK}orders/create-order-uala`, {
        total_price: newValues.total_price,
      })
      .then((res) => {
        setDataUser([{ ...newValues, paymentId: res.data.uuid }]);
        setUrlCheckout(res.data.links.checkoutLink);

        Swal.fire({
          icon: "success",
          title: "Los datos han sido cargados correctamente",
          text: "Presione okay para continuar con su pago",
        }).then((response) => {
          if (response.isConfirmed) {
            setReadyToPay(true);
          }
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Ocurrio un error",
          text: "Ha ocurrido un error al cargar los datos",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleClose = () => {
    setModal(false);
  };

  return (
    <Modal
      show={modal}
      size="lg"
      aria-labelledby="contained-modal-title-center"
      centered
      className="form-containerp"
    >
      <Modal.Header className="modal-headerp">
        <Modal.Title id="contained-modal-title-vcenter">
          <img
            src="/img/admin/logo-vk.png"
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
                <div className="row align-items-center justify-content-center">
                  <div className="col-lg-6">
                    <div className="contenedorInpputs">
                      <label className="tituloInput">Nombre:</label>
                      <Field
                        id="form_ClientName"
                        type="text"
                        name="clientName"
                        placeholder="Nombre *"
                        required
                        className="formEmailp"
                      />
                      {formProps.errors.clientName &&
                      formProps.touched.clientName ? (
                        <div className="text-danger">
                          {formProps.errors.clientName}
                        </div>
                      ) : null}
                    </div>
                    <div className="contenedorInpputs">
                      <label className="tituloInput">Telefono:</label>
                      <Field
                        id="form_phone"
                        type="number"
                        name="phone"
                        placeholder="Telefono *"
                        required
                        className="formEmailp"
                      />
                      {formProps.errors.phone && formProps.touched.phone ? (
                        <div className="text-danger">
                          {formProps.errors.phone}
                        </div>
                      ) : null}
                    </div>

                    <div className="contenedorInpputs">
                      <label className="tituloInput">Email:</label>
                      <Field
                        id="form_email"
                        type="email"
                        name="email"
                        placeholder="Email *"
                        required
                        className="formEmailp"
                      />
                      {formProps.errors.email && formProps.touched.email ? (
                        <div className="text-danger">
                          {formProps.errors.email}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="contenedorInpputs">
                      <label className="tituloInput">Direccion:</label>
                      <Field
                        id="form_address"
                        type="text"
                        name="address"
                        placeholder="Dirección *"
                        required
                        className="formEmailp"
                      />
                      {formProps.errors.address && formProps.touched.address ? (
                        <div className="text-danger">
                          {formProps.errors.address}
                        </div>
                      ) : null}
                    </div>

                    <div className="contenedorInpputs">
                      <label className="tituloInput">Codigo Postal:</label>
                      <Field
                        id="form_postalCode"
                        type="number"
                        name="postalCode"
                        placeholder="Codigo postal"
                        required
                        className="formEmailp"
                      />
                      {formProps.errors.postalCode &&
                      formProps.touched.postalCode ? (
                        <div className="text-danger">
                          {formProps.errors.postalCode}
                        </div>
                      ) : null}
                    </div>
                    <div className="contenedorInpputs">
                      <label className="tituloInput">Provincia</label>
                      <Field
                        id="form_province"
                        type="text"
                        name="province"
                        placeholder="Provincia"
                        required
                        className="formEmailp"
                      />
                      {formProps.errors.province &&
                      formProps.touched.province ? (
                        <div className="text-danger">
                          {formProps.errors.province}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="text-center">
                      {!readyToPay ? (
                        <button
                          type="submit"
                          className="btn btn-dark mt-30 full-width"
                          disabled={loading}
                        >
                          {loading
                            ? "Cargando datos, por favor espere"
                            : "Cargar datos / pagar"}
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="messages" ref={messageRef}></div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default FormCheckout;

{
  /*  */
}
