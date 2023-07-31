import React from "react";

const AdminSidebar = ({ setShow, show }) => {
  return (
    <div className="sidebar md-mb50">
      <div className="row">
        <div className="col-lg-12 col-md-6">
          <div className="box gat mb-30">
            <h6 className="title mb-30">Mostrar</h6>
            <ul>
              <li>
                <a
                  onClick={() => setShow("orders")}
                  style={{ cursor: "pointer" }}
                  className={show === "orders" ? "font-weight-bold fz-18" : ""}
                >
                  Ordenes
                </a>
              </li>
              <li>
                <a
                  onClick={() => setShow("products")}
                  style={{ cursor: "pointer" }}
                  className={
                    show === "products" ? "font-weight-bold fz-18" : ""
                  }
                >
                  Productos
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
