import React, { useState } from "react";
import LightTheme from "../../layouts/Light";
import Footer2 from "../Footer2/footer2";
import OrdersComponent from "../Orders";
import ProductsAdmin from "../Products-admin";
import AdminSidebar from "../Amin-sidebar/admin-sidebar";
import NavbarAdmin from "../Navbar/navbar-admin";
import FormAdmin from "../Form-admin/form-admin";
import CategoriesAdmin from "../Categories-component/categories-component";
import FormAdminCategories from "../Categories-component/form-admin-categories";

const Admin = () => {
  const [show, setShow] = useState("orders");
  const [modal, setModal] = useState(false);

  const abrirModal = (e) => {
    e.preventDefault();
    setModal(true);
  };

  return (
    <LightTheme mobileappstyle>
      <NavbarAdmin theme="themeL" />
      <section className="shop section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <AdminSidebar setShow={setShow} show={show} />
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
            </div>
            <div className="col-lg-9">
              {show === "orders" && <OrdersComponent />}
              {show === "products" && (
                <>
                  <ProductsAdmin />

                  <FormAdmin setModal={setModal} modal={modal} />
                </>
              )}
              {show === "categories" && (
                <>
                  <CategoriesAdmin />

                  <FormAdminCategories setModal={setModal} modal={modal} />
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer2 />
    </LightTheme>
  );
};

export default Admin;
