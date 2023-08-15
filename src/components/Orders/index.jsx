import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, modifyOrder } from "../../../redux/reducers/orders";
import Swal from "sweetalert2";

const OrdersComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const { orders } = useSelector((state) => state.orders);

  const [modifyOrderState, setModifyOrder] = useState({
    pending: null,
    succesfull: null,
  });

  const handleModifyOrder = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres modificar el estado de esta orden?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(modifyOrder(id, modifyOrderState));
        Swal.fire(
          "¡Modificación exitosa!",
          "El estado de la orden ha sido modificado.",
          "success"
        );
      }
    });
    setModifyOrder();
  };
  const [showProductDetails, setShowProductDetails] = useState({});
  const [showClient, setShowClient] = useState({});

  const toggleProductDetails = (orderId) => {
    setShowProductDetails((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId],
    }));
  };
  const toggleClient = (orderId) => {
    setShowClient((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId],
    }));
  };
  return (
    <section className="text-center">
      <h2 style={{ color: "#61218cff" }} className="pb-80">
        Órdenes
      </h2>
      <div className="order-container">
        {orders?.map((orden) => (
          <div
            className={`order ${orden.pending ? "pending" : "completed"}`}
            key={orden.id}
          >
            <div className="order-header">
              <h6>Id de pago: {orden.paymentId}</h6>
              <h6
                className={`order-status ${
                  orden.pending ? "text-danger" : "text-success"
                }`}
              >
                {orden.pending ? "Pendiente" : "Finalizada"}
              </h6>
            </div>
            <div className="order-content">
              <div className="order-buttons">
                <div className="button-container">
                  <button
                    className="btn btn-secondary"
                    onClick={() => toggleProductDetails(orden.id)}
                  >
                    {showProductDetails[orden.id] ? "Cerrar" : "Mostrar"}{" "}
                    Productos
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => toggleClient(orden.id)}
                  >
                    {showClient[orden.id] ? "Cerrar" : "Mostrar"} Cliente
                  </button>
                </div>
                <div className="modify-container">
                  <select
                    onChange={(e) =>
                      setModifyOrder(
                        e.target.value === "Pendiente"
                          ? { pending: true, succesfull: false }
                          : { pending: false, succesfull: true }
                      )
                    }
                  >
                    <option disabled selected hidden>
                      Modificar estado...
                    </option>
                    <option>Pendiente</option>
                    <option>Finalizada</option>
                  </select>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleModifyOrder(orden.paymentId)}
                  >
                    Aplicar
                  </button>
                </div>
              </div>
              {showProductDetails[orden.id] && (
                <div className="order-details">
                  <div className="product-list">
                    <h6>Detalles de Productos</h6>
                    <ul className="text-justify">
                      {orden.products.map((product) => (
                        <li key={product.id}>
                          <strong>Producto Id:</strong> {product.id}
                          <br />
                          <strong>Nombre:</strong> {product.name}
                          <br />
                          <strong>Cantidad:</strong>{" "}
                          {product.quantity || "No se especifico cantidad"}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {showClient[orden.id] && (
                <div className="order-details">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Dirección</th>
                        <th>Provincia</th>
                        <th>Código Postal</th>
                        <th>Teléfono</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{orden.clientName}</td>
                        <td>{orden.email}</td>
                        <td>{orden.address}</td>
                        <td>{orden.province}</td>
                        <td>{orden.postalCode}</td>
                        <td>{orden.phone}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrdersComponent;
