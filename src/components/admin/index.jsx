/* eslint-disable @next/next/no-sync-scripts */
import React from "react";
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
  const navbarRef = React.useRef(null);
  const logoRef = React.useRef(null);

  const [show, setShow] = React.useState("orders");

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

  return (
    <LightTheme mobileappstyle>
      <NavbarAdmin nr={navbarRef} lr={logoRef} theme="themeL" />
      <section className="shop section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <AdminSidebar setShow={setShow} show={show} />
            </div>
            <div className="col-lg-9">
              {show === "orders" && <OrdersComponent />}
              {show === "products" && (
                <>
                  <ProductsAdmin />
                  <FormAdmin />
                </>
              )}
              {show === "categories" && (
                <>
                  <CategoriesAdmin />
                  <FormAdminCategories />
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
