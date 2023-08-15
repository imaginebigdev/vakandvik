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
import IntegrationEsp from "../Stack-admin/Stack-admin";

const Admin = () => {
  const [show, setShow] = useState("orders");
  const [modal, setModal] = useState(false);

  const MainContent = React.useRef(null);
  const navbarRef = React.useRef(null);
  const logoRef = React.useRef(null);
  /*   const abrirModal = (e) => {
    e.preventDefault();
    setModal(true);
  }; */

  React.useEffect(() => {
    var navbar = navbarRef.current;
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
  }, [MainContent, navbarRef]);

  return (
    <LightTheme mobileappstyle>
      <NavbarAdmin nr={navbarRef} lr={logoRef} theme="themeL" />
      <div ref={MainContent} className="main-content">
        {/*   <div className="welcome-section">
          <h1 className="title-admin pt-80">Bienvenid@ Admin</h1>
        </div> */}
        <section className="shop section-padding">
          <div className="container pb-80">
            <div className="row">
              <div className="col-lg-3">
                <AdminSidebar setShow={setShow} show={show} />
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
        <IntegrationEsp />
        <Footer2 />
      </div>
    </LightTheme>
  );
};

export default Admin;
