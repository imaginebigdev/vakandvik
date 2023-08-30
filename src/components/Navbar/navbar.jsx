/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import appData from "../../data/app.json";
import { handleDropdown, handleMobileDropdown } from "../../common/navbar";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../../redux/reducers/cart";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Swal from "sweetalert2";

const Navbar = ({ lr, nr, theme }) => {
  const dispatch = useDispatch();
  const [itemCart, setItemCart] = useLocalStorage("cart", []);
  const { itemsCart } = useSelector((state) => state.cart);

  let totalPrice = itemsCart?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  let totalProductsInCart = itemsCart?.reduce(
    (total, item) => total + item.quantity,
    0
  );
  React.useEffect(() => {
    dispatch(setItems(JSON.parse(window.localStorage.getItem("cart"))));
  }, [dispatch]);

  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quiere eliminar el producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    }).then((response) => {
      if (response.isConfirmed) {
        const updateArray = itemsCart.filter((item) => item.id !== id);
        setItemCart(updateArray);
        dispatch(setItems(updateArray));
      }
    });
  };
  const handleUpdateQuantity = (id, amount) => {
    const updatedCart = itemsCart
      .map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + amount;
          if (newQuantity <= 0) return null;
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
      .filter(Boolean);
    setItemCart(updatedCart);
    dispatch(setItems(updatedCart));
  };

  const handleCleanCart = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Esta seguro que quiere limpiar el carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    }).then((response) => {
      if (response.isConfirmed) {
        setItemCart([]);
        dispatch(setItems([]));
      }
    });
  };

  return (
    <nav
      ref={nr}
      className={`navbar navbar-expand-lg change bg-gray ${
        theme === "themeL" ? "light" : ""
      }`}
    >
      <div className="container">
        <Link href="/">
          <a className="logo">
            {theme ? (
              theme === "themeL" ? (
                <img ref={lr} src={appData.darkLogo} alt="logo" />
              ) : (
                <img ref={lr} src={appData.lightLogo} alt="logo" />
              )
            ) : (
              <img ref={lr} src={appData.lightLogo} alt="logo" />
            )}
          </a>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={handleMobileDropdown}
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="icon-bar">
            <i className="fas fa-bars"></i>
          </span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown" onClick={handleDropdown}>
              <span
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                role="button"
              >
                <i
                  className="fa fa-shopping-cart"
                  style={{ marginRight: "5px" }}
                ></i>
                {totalProductsInCart >= 0 && (
                  <span
                    className="badge badge-secondary"
                    style={{ background: "#ef8152ff" }}
                  >
                    {totalProductsInCart}
                  </span>
                )}
              </span>
              <div className="dropdown-menu table-container">
                <table className="table table-bordered table-cart">
                  <tbody className="text-center">
                    {itemsCart?.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <img
                            style={{ width: "100px" }}
                            src={item.image}
                            alt="itemImage"
                          />
                        </td>
                        {/*  <td>{item.name}</td> */}
                        <td id="cantidad">
                          <div className="quantity-container">
                            <button
                              type="button"
                              className="btn btn-sm btn-secondary"
                              onClick={() => handleUpdateQuantity(item.id, -1)}
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              type="button"
                              className="btn btn-sm btn-secondary"
                              onClick={() => handleUpdateQuantity(item.id, 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>${item.price * item.quantity}</td>
                        <td id="cantidad">
                          <button
                            type="button"
                            className="btn btn-dark"
                            onClick={() => handleDeleteProduct(item.id)}
                          >
                            <i className="fa fa-trash" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tr key="sadasdas">
                    <td id="cantidad">Total:</td>
                    <td id="cantidad"> $ {0 || totalPrice?.toFixed(2)}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-dark"
                        onClick={() => handleCleanCart()}
                      >
                        Vaciar
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-success"
                        style={{
                          background: "#ef8152ff",
                          border: "1px solid #ef8152ff",
                        }}
                      >
                        <Link href="/carrito">Ver Carrito</Link>
                      </button>
                    </td>
                  </tr>
                </table>
              </div>
            </li>

            <li className="nav-item">
              <h3
                className="nav-link nav-responsive"
                style={{ cursor: "none" }}
              >
                |
              </h3>
            </li>
            <li className="nav-item ">
              <Link href="/">
                <a className="nav-link">Inicio</a>
              </Link>
            </li>
            <li className="nav-item dropdown" onClick={handleDropdown}>
              <Link href="/shop">
                <a className="nav-link">Shop</a>
              </Link>
            </li>
            <li className="nav-item ">
              <Link href="/informacion">
                <a className="nav-link">Información</a>
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/contacto">
                <a className="nav-link">Contacto</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
