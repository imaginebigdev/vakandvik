/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import appData from "../../data/app.json";
import { handleDropdown, handleMobileDropdown } from "../../common/navbar";

const Navbar = ({ lr, nr, theme }) => {
  const categorias = [
    { id: 1, name: "mochilas" },
    { id: 2, name: "bikinis" },
    { id: 3, name: "sofas" },
    { id: 4, name: "empapelados" },
    { id: 5, name: "cuadros" },
  ];
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
            <li className="nav-item ">
              <Link href="/">
                <a className="nav-link">Inicio</a>
              </Link>
            </li>
            <li className="nav-item dropdown" onClick={handleDropdown}>
              <span
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                role="button"
              >
                Shop
              </span>
              <div className="dropdown-menu">
                {categorias.map((category) => (
                  <Link
                    href={`/shop/?categoria=${category.name}`}
                    as="/shop"
                    key={category.id}
                  >
                    <a className="dropdown-item">{category.name}</a>
                  </Link>
                ))}
              </div>
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
            <li className="nav-item">
              <h3
                className="nav-link nav-responsive"
                style={{ cursor: "none" }}
              >
                |
              </h3>
            </li>
            <li className="nav-item dropdown" onClick={handleDropdown}>
              <span
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                role="button"
              >
                <i className="fa fa-user" style={{ marginLeft: "5px" }}></i>
              </span>
              <div className="dropdown-menu">
                <Link href="#0">
                  <a className="dropdown-item">
                    <i
                      className="fa fa-shopping-bag"
                      style={{ marginRight: "5px" }}
                    ></i>
                    Mis compras
                  </a>
                </Link>
                <Link href="#0">
                  <a className="dropdown-item">
                    <i
                      className="fa fa-heart"
                      style={{ marginRight: "5px" }}
                    ></i>
                    Mis favoritos
                  </a>
                </Link>
                <Link href="#0">
                  <a className="dropdown-item">
                    <i
                      className="ion-gear-b"
                      style={{ marginRight: "5px", fontSize: "15px" }}
                    ></i>
                    Configuración
                  </a>
                </Link>
              </div>
            </li>

            <li className="nav-item">
              <Link href="/carrito">
                <a className="nav-link">
                  <i className="fa fa-shopping-cart"></i>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
