import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../../redux/reducers/products";
import {
  deleteCategory,
  fetchCategories,
} from "../../../redux/reducers/categories";
import FormAdminCategories from "./form-admin-categories";

const CategoriesAdmin = () => {
  const Swal = require("sweetalert2");
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categories);

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres eliminar esta categoria?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategory(id));
        Swal.fire(
          "¡Eliminación exitosa!",
          "La categoria ah sido eliminada",
          "success"
        );
      }
    });
  };

  return (
    <section className="text-center">
      <h2 style={{ color: "#61218cff" }} className="pb-20">
        Categorías
      </h2>
      <div>
        {categories?.map((c) => (
          <div className={`order container mb-20`} key={c.id}>
            <div className="row justify-content-around align-items-center">
              <h6>{c.name} </h6>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(c.id)}
              >
                <i className="fa fa-trash" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesAdmin;
