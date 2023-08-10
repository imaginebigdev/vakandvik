/* eslint-disable @next/next/no-sync-scripts */
import React, { useState, useRef, useEffect } from "react";
import LightTheme from "../../layouts/Light";
import Footer2 from "../Footer2/footer2";
import OrdersComponent from "../Orders";
import ProductsAdmin from "../Products-admin";
import AdminSidebar from "../Amin-sidebar/admin-sidebar";
import NavbarAdmin from "../Navbar/navbar-admin";
import FormAdmin from "../Form-admin/form-admin";
import CategoriesAdmin from "../Categories-component/categories-component";
import FormAdminCategories from "../Categories-component/form-admin-categories";
import Modal from "react-modal";

const Admin = () => {
  const navbarRef = React.useRef(null);
  const logoRef = React.useRef(null);

  const [show, setShow] = React.useState("orders");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    var navbar = navbarRef.current,
      logo = logoRef.current;
    if (window.pageYOffset > 300) {
      navbar.classList.add("nav-scroll");
    } else {
      navbar.classList.remove("nav-scroll");
    }
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        navbar.classList.add("nav-scroll");
      } else {
        navbar.classList.remove("nav-scroll");
      }
    });
  }, [navbarRef]);

  const customModalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "800px", // Ajusta el ancho máximo del modal según tus preferencias
      maxHeight: "400px",
      padding: "20px",
      border: "none", // Elimina el borde si lo deseas
      borderRadius: "10px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      backgroundColor: "white", // Ajusta el color de fondo
    },
  };

  return (
    <LightTheme mobileappstyle>
      <NavbarAdmin nr={navbarRef} lr={logoRef} theme="themeL" />
      <section className="shop section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <AdminSidebar setShow={setShow} show={show} />
              {show === "products" && (
                <button className="btn btn-primary" onClick={openModal}>
                  Agregar Producto
                </button>
              )}
              {show === "categories" && (
                <button className="btn btn-primary" onClick={openModal}>
                  Crear Nueva Categoría
                </button>
              )}
            </div>
            <div className="col-lg-9">
              {show === "orders" && <OrdersComponent />}
              {show === "products" && (
                <>
                  <ProductsAdmin />
                  <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Agregar Producto"
                    style={customModalStyles}
                  >
                    <button className="btn btn-danger" onClick={closeModal}>
                      X
                    </button>
                    <FormAdmin closeModal={closeModal} />
                  </Modal>
                </>
              )}
              {show === "categories" && (
                <>
                  <CategoriesAdmin />
                  <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Agregar Producto"
                    style={customModalStyles}
                  >
                    <button className="btn btn-danger" onClick={closeModal}>
                      X
                    </button>
                    <FormAdminCategories closeModal={closeModal} />
                  </Modal>
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
