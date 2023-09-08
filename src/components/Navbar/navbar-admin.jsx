/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import appData from "../../data/app.json";
import { handleDropdown, handleMobileDropdown } from "../../common/navbar";
import firebaseVakandvik from "../../fb";
import { getAuth, signOut } from "firebase/auth";

const NavbarAdmin = ({ lr, nr, theme }) => {
  const auth = getAuth(firebaseVakandvik);
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
            {/*  <li className="nav-link text-center">
              <h6>Bienvenido Admin</h6>
            </li> */}
            <li className="nav-link">
              <button
                className="btn btn-info"
                onClick={() => signOut(auth)}
                style={{
                  backgroundColor: "#8068f0ff",
                  borderColor: "#8068f0ff",
                }}
              >
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
