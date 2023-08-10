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
      <h2>Categorias</h2>

      <table
        className="table table-bordered text-center"
        style={{ margin: "100px 5%", maxWidth: "90%" }}
      >
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {categories
            ?.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>{item.name}</td>

                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    <i className="fa fa-trash" />
                  </button>
                </td>
              </tr>
            ))
            .reverse()}
        </tbody>
      </table>
    </section>
  );
};

export default CategoriesAdmin;
