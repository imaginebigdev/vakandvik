import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchProducts,
  modifyProduct,
} from "../../../redux/reducers/products";
import Swal from "sweetalert2";
import { fetchCategories } from "../../../redux/reducers/categories";

const ProductsAdmin = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const [changeStock, setChangeStock] = useState("");
  const [changePrice, setChangePrice] = useState("");

  const handleModify = (id) => {
    if (changePrice === "" && changeStock === "") {
      Swal.fire("Sin cambios", "No se han realizado modificaciones.", "info");
    } else {
      const modifications = {};

      if (changePrice !== "") {
        modifications.price = parseFloat(changePrice);
      }

      if (changeStock !== "") {
        modifications.stock = parseInt(changeStock);
      }

      Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Quieres realizar la modificación?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(modifyProduct(id, modifications));
          Swal.fire(
            "¡Modificación exitosa!",
            "El producto ha sido modificado.",
            "success"
          );
        }
      });
    }
    setChangePrice(""); // Vaciar el input de precio
    setChangeStock(""); // Vaciar el input de stock
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres eliminar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id));
        Swal.fire(
          "¡Eliminación exitosa!",
          "El producto ha sido eliminado.",
          "success"
        );
      }
    });
  };

  return (
    <section className="text-center">
      <h1>Productos</h1>
      {/* <button className="btn btn-primary">Agregar Producto</button> */}
      <div className="store">
        <div className="row">
          {products?.map((p) => (
            <div className="col-md-4 col-sm-6 col-xs-12" key={p.id}>
              <div className="card">
                <div
                  className="cover item-a"
                  style={{ backgroundImage: `url(${p.image})` }}
                >
                  <h4>{p.name}</h4>
                  <h6 className={p.stock < 10 ? "red-stock" : ""}>
                    stock: {p.stock}
                  </h6>
                  <span className="price">$ {p.price}</span>
                  <div className="card-back">
                    <button
                      className="btn btn-danger delete-button"
                      onClick={() => handleDelete(p.id)}
                    >
                      <i className="fa fa-trash" />
                    </button>
                    <div className="input-group">
                      <label htmlFor={`stock-${p.id}`}>Modificar Stock:</label>
                      <input
                        id={`stock-${p.id}`}
                        type="number"
                        onChange={(e) => setChangeStock(e.target.value)}
                        /*   placeholder="Stock" */
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor={`price-${p.id}`}>Modificar Precio:</label>
                      <input
                        id={`price-${p.id}`}
                        type="number"
                        onChange={(e) => setChangePrice(e.target.value)}
                        /* placeholder="Precio" */
                      />
                    </div>
                    <button
                      className="btn btn-info"
                      onClick={() => handleModify(p.id)}
                    >
                      Confirmar Cambios
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsAdmin;

{
  /* <table
        className="table table-bordered text-center"
        style={{ margin: "100px 5%", maxWidth: "90%" }}
      >
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Stock</th>
            <th>Diseño</th>
            <th>Precio</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {products
            ?.map((item) => (
              <tr key={item.id}>
                <td style={{ width: "30px" }}>
                  <img src={item.image} alt="itemImage" />
                </td>
                <td>{item.name}</td>
                <td>
                  {category?.find((c) => c.id === item.categoryId)?.name ||
                    "No se encontro categoria"}
                </td>
                <td>
                  <div>
                    <h6>{item.stock}</h6>
                    <input
                      id="stock"
                      type="number"
                      onChange={(e) => setChangeStock(e.target.value)}
                    />

                    <button
                      className="btn btn-info"
                      onClick={() =>
                        handleModify(item.id, {
                          stock: changeStock,
                        })
                      }
                    >
                      Modificar
                    </button>
                  </div>
                </td>
                <td>{item.desing}</td>
                <td>
                  <div>
                    <h6>${item.price}</h6>
                    <input
                      type="number"
                      id="price"
                      onChange={(e) => setChangePrice(e.target.value)}
                    />
                    <button
                      className="btn btn-info"
                      onClick={() =>
                        handleModify(item.id, {
                          price: changePrice,
                        })
                      }
                    >
                      Modificar
                    </button>
                  </div>
                </td>
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
      </table> */
}

{
  /*  <div className="store">
<div className="row">
          {products?.map((p) => (
            <div className="col-lg-4 col-md-6" key={p.id}>
              <div className="item">
                <h5>{p.name}</h5>
                <div className="img">
                  <img src={p.image} alt="" />
                  <span className="tag">{p.desing}</span>
                  <div className="add">
                    <div>
                      <h6>{p.stock}</h6>
                      <input
                        id="stock"
                        type="number"
                        onChange={(e) => setChangeStock(e.target.value)}
                      />

                      <button
                        className="btn btn-info"
                        onClick={() =>
                          handleModify(p.id, {
                            stock: changeStock,
                          })
                        }
                      >
                        Modificar
                      </button>
                    </div>
                  </div>
                </div>
                <div className="info">
                  <h6>stock: {p.stock}</h6>
                  <span> precio: ${p.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>  */
}
