import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  orderByPriceASC,
  orderByPriceDESC,
} from "../../../redux/reducers/products";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { setItems } from "../../../redux/reducers/cart";

const ShopStore = ({
  products,
  nextHandler,
  prevHandler,
  currentPage,
  totalProducts,
}) => {
  const dispatch = useDispatch();

  const handleSort = (type) => {
    if (type === "asc") return dispatch(orderByPriceASC());
    if (type === "desc") return dispatch(orderByPriceDESC());
  };

  const [itemCart, setItemCart] = useLocalStorage("cart", []);

  const { itemsCart } = useSelector((state) => state.cart);

  const handleAddToCart = (product) => {
    const existingProduct = itemsCart?.find((p) => p.id === product.id);

    if (existingProduct) {
      // If the product already exists in the cart, update its quantity
      const updatedCart = itemsCart.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
      setItemCart(updatedCart);
      dispatch(setItems(updatedCart));
    } else {
      // If the product is not in the cart, add it with quantity 1
      setItemCart([...itemsCart, { ...product, quantity: 1 }]);
      dispatch(setItems([...itemsCart, { ...product, quantity: 1 }]));
    }
  };
  return (
    <div className="store">
      <div className="top-area">
        <div className="row">
          <div className="col-lg-4 valign">
            <div className="result-text">
              <span>
                Mostrando {products?.length} productos de {totalProducts}{" "}
              </span>
            </div>
          </div>
          <div className="col-lg-8 d-flex justify-content-end">
            <div className="filter-select">
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  handleSort(e.target.value);
                }}
              >
                <option defaultChecked disabled selected hidden>
                  Ordenar por...
                </option>
                <option value="asc">Precio mayor a menor</option>
                <option value="desc">Precio menor a mayor</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {products?.map((p) => (
          <div className="col-lg-4 col-md-6" key={p.id}>
            <div className="item">
              <div className="img">
                <img src={p.image} alt="" />
                <span className="tag">{p.desing}</span>
                <div className="add">
                  <a
                    onClick={(e) => handleAddToCart(p)}
                    style={{ cursor: "pointer" }}
                  >
                    Agregar al carrito
                    <span className="pe-7s-angle-right"></span>
                  </a>
                </div>
              </div>
              <div className="info">
                <h6>{p.name}</h6>
                <span>$ {p.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-30">
        <div className="pagination">
          <span onClick={prevHandler} style={{ cursor: "pointer" }}>
            <a>
              <i className="fas fa-angle-left"></i>
            </a>
          </span>
          <span className="active">
            <a>{currentPage + 1}</a>
          </span>
          <span onClick={nextHandler} style={{ cursor: "pointer" }}>
            <a>
              <i className="fas fa-angle-right"></i>
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShopStore;
