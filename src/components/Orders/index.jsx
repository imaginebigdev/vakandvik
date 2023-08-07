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
      <h2>Ordenes</h2>
      <table
        className="table table-bordered text-center"
        style={{ margin: "100px 5%", maxWidth: "90%" }}
      >
        <thead>
          <tr>
            <th>Id de pago</th>
            <th>Productos</th>
            <th>Datos del cliente</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {orders?.map((orden) => (
            <React.Fragment key={orden.id}>
              <tr>
                <td>{orden.paymentId}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => toggleProductDetails(orden.id)}
                  >
                    {showProductDetails[orden.id] ? "Cerrar" : "Mostrar"}
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => toggleClient(orden.id)}
                  >
                    {showClient[orden.id] ? "Cerrar" : "Mostrar"}
                  </button>
                </td>
                <td>
                  <h6
                    className={orden.pending ? "text-danger" : "text-success"}
                  >
                    {orden.pending ? "Pendiente" : "Finalizada"}
                  </h6>
                  <select
                    onChange={(e) =>
                      setModifyOrder(
                        e.target.value === "Pendiente"
                          ? { pending: true, succesfull: false }
                          : { pending: false, succesfull: true }
                      )
                    }
                  >
                    <option defaultChecked disabled selected hidden>
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
                </td>
              </tr>
              {showProductDetails[orden.id] && (
                <tr>
                  <td colSpan={4}>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Producto Id</th>
                          <th>Nombre</th>
                          <th>Cantidad</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orden.products.map((product) => (
                          <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>
                              {product.quantity || "No se especifico cantidad"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
              {showClient[orden.id] && (
                <tr>
                  <td colSpan={4}>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>email</th>
                          <th>direccion</th>
                          <th>provincia</th>
                          <th>Codigo Postal</th>
                          <th>telefono</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{orden.clientName}</td>
                          <td>{orden.email}</td>
                          <td>{orden.address}</td>

                          <td>{orden.province}</td>
                          <td>{orden.cp}</td>
                          <td>{orden.phone}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default OrdersComponent;
