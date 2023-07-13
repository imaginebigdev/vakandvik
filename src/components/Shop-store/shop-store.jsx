import React from "react";
import { useDispatch } from "react-redux";
import {
  orderByPriceASC,
  orderByRelevant,
  orderByPriceDESC,
} from "../../../redux/reducers/products";

const ShopStore = ({ products, category }) => {
  const dispatch = useDispatch();

  const handleSort = (type) => {
    if (type === "relevant") return dispatch(orderByRelevant());
    if (type === "asc") return dispatch(orderByPriceASC());
    if (type === "desc") return dispatch(orderByPriceDESC());
  };
  return (
    <div className="store">
      <div className="top-area">
        <div className="row">
          <div className="col-lg-4 valign">
            <div className="result-text">
              <span>Mostrando {products?.length} productos</span>
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
                <option value="relevant">Relevantes</option>
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
                <span className="tag">{p.categories[0].name}</span>
                <div className="add">
                  <a href="#0">
                    Agregar al carrito{" "}
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
    </div>
  );
};

export default ShopStore;
