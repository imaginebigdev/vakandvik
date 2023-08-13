import React, { useState } from "react";
import ProductsAdmin from "../Products-admin";
import FormAdmin from "../Form-admin/form-admin";
import CategoriesAdmin from "../Categories-component/categories-component";
import FormAdminCategories from "../Categories-component/form-admin-categories";

const AdminSidebar = ({ setShow, show }) => {
  const [modal, setModal] = useState(false);
  const abrirModal = (e) => {
    e.preventDefault();
    setModal(true);
  };
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
              <li>
                <a
                  onClick={() => setShow("categories")}
                  style={{ cursor: "pointer" }}
                  className={
                    show === "categories" ? "font-weight-bold fz-18" : ""
                  }
                >
                  Categorias
                </a>
              </li>
              {show === "products" && (
                <button
                  className="btn btn-primary mt-3"
                  onClick={(e) => abrirModal(e)}
                >
                  Agregar Producto
                </button>
              )}
              {show === "categories" && (
                <button
                  className="btn btn-primary mt-3"
                  onClick={(e) => abrirModal(e)}
                >
                  Crear Nueva Categoría
                </button>
              )}
              {show === "products" && (
                <>
                  {/*     <ProductsAdmin /> */}

                  <FormAdmin setModal={setModal} modal={modal} />
                </>
              )}
              {show === "categories" && (
                <>
                  {/*  <CategoriesAdmin /> */}

                  <FormAdminCategories setModal={setModal} modal={modal} />
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
