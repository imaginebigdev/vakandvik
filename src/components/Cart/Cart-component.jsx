import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { setItems } from "../../../redux/reducers/cart";

const CartComponent = ({ setModal, modal }) => {
  const dispatch = useDispatch();

  const { itemsCart } = useSelector((state) => state.cart);
  const totalPrice = itemsCart?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  React.useEffect(() => {
    dispatch(setItems(JSON.parse(window.localStorage.getItem("cart"))));
  }, [dispatch]);

  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "Estás por quitar el producto del carrito",
      text: "¿Estas seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    }).then((response) => {
      if (response.isConfirmed) {
        const updatedCart = itemsCart.filter((item) => item.id !== id);
        dispatch(setItems(updatedCart));
      }
    });
  };

  const handleUpdateQuantity = (id, amount) => {
    const updatedCart = itemsCart.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(item.quantity + amount, 1);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    dispatch(setItems(updatedCart));
  };

  const handleCleanCart = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Estás seguro de que quieres vaciar el carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    }).then((response) => {
      if (response.isConfirmed) {
        dispatch(setItems([]));
      }
    });
  };

  return (
    <section className="blog-pg blog-list section-padding pt-0">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="posts mt-80">
              {itemsCart?.map((item) => (
                <div
                  className="item mb-80 wow fadeInUp"
                  key={item.id}
                  data-wow-delay=".3s"
                >
                  <div className="row">
                    <div className="col-lg-6 valign">
                      <div className="img md-mb50">
                        <img
                          src={item.image}
                          alt=""
                          style={{ maxWidth: "350px" }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 valign">
                      <div className="cont">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h2
                            style={{
                              marginRight: "100px",
                              fontWeight: "lighter",
                            }}
                          >
                            {item.name}
                          </h2>
                          <button
                            type="button"
                            className="btn btn-dark order-deletec"
                            onClick={() => handleDeleteProduct(item.id)}
                          >
                            <i className="fa fa-trash" />
                          </button>
                        </div>
                        <h4
                          className="order-pricec"
                          style={{ color: "#5b6b7c9c" }}
                        >
                          $ {item.price * item.quantity}
                        </h4>
                        <div className="mt-30">
                          <button
                            type="button"
                            className="btn btn-sm "
                            style={{ background: "#ef8152ff", color: "#fff" }}
                            onClick={() => handleUpdateQuantity(item.id, -1)}
                          >
                            -
                          </button>
                          <span
                            className="quantityc"
                            style={{ margin: "10px" }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="btn btn-sm "
                            style={{ background: "#ef8152ff", color: "#fff" }}
                            onClick={() => handleUpdateQuantity(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 d-flex justify-content-around">
        <h5 className="total-pricec fs-5 mb-3">
          Total: $ {totalPrice?.toFixed(2)}
        </h5>
        <button
          type="button"
          className={`btn btn-infoc ${totalPrice === 0 && "disabled"}`}
          onClick={() => {
            setModal(true);
          }}
          style={{ background: "#ef8152ff", color: "#fff" }}
        >
          Continuar compra <i className="fa fa-shopping-cart" />
        </button>
        {/*  <div className="mt-4 d-flex justify-content-around">
          <button
            type="button"
            className={`btn btn-dangerc ${totalPrice === 0 && "disabled"}`}
            onClick={() => handleCleanCart()}
            /* style={{ marginRight: "10px" }} 
          >
            Limpiar carrito <i className="fa fa-trash" />
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default CartComponent;
