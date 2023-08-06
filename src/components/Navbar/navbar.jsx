/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import appData from "../../data/app.json";
import { handleDropdown, handleMobileDropdown } from "../../common/navbar";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../../redux/reducers/cart";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const Navbar = ({ lr, nr, theme }) => {
  const dispatch = useDispatch();
  const [itemCart, setItemCart] = useLocalStorage("cart", []);

  React.useEffect(() => {
    dispatch(setItems(JSON.parse(window.localStorage.getItem("cart"))));
  }, [dispatch]);

  const handleDeleteProduct = (id) => {
    const updateArray = itemsCart.filter((item) => item.id !== id);
    setItemCart(updateArray);
    dispatch(setItems(updateArray));
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
    setItemCart([]);
    dispatch(setItems([]));
  };

  const { itemsCart } = useSelector((state) => state.cart);
  const totalProductsInCart = itemsCart?.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalPrice = itemsCart?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
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
                  <span className="badge badge-secondary">
                    {totalProductsInCart}
                  </span>
                )}
              </span>
              <div className="dropdown-menu table-container">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                      <th>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {itemsCart?.map((item) => (
                      <tr key={item.id}>
                        <td style={{ width: "30px" }}>
                          <img src={item.image} alt="itemImage" />
                        </td>
                        <td>{item.name}</td>
                        <td>
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
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleDeleteProduct(item.id)}
                          >
                            <i className="fa fa-trash" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr key="sadasdas">
                      <td>Total:</td>
                      <td> $ {totalPrice.toFixed(2)}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleCleanCart()}
                        >
                          Limpiar carrito
                        </button>
                      </td>
                      <td>
                        <button type="button" className="btn btn-success">
                          <Link href="/carrito">Detalles</Link>
                        </button>
                      </td>
                    </tr>
                  </tbody>
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
