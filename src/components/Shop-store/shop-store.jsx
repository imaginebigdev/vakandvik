import React from "react";

const ShopStore = ({ products, category }) => {
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
              >
                <option defaultValue>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
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
                    Add To Cart <span className="pe-7s-angle-right"></span>
                  </a>
                </div>
              </div>
              <div className="info">
                <h6>{p.name}</h6>
                <span>$1253</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopStore;
