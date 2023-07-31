import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchProducts,
  modifyProduct,
} from "../../../redux/reducers/products";
import { fetchCategories } from "../../../redux/reducers/categories";

const ProductsAdmin = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const category = categories;

  React.useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const [changeStock, setChangeStock] = useState(0);
  const [changePrice, setChangePrice] = useState(0);

  const handleModify = (id, modify) => {
    if (modify.price > 0 || modify.stock > 0) {
      dispatch(modifyProduct(id, modify));
    } else {
      alert("Ingrese un numero positivo");
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <section className="text-center">
      <h2>Productos</h2>
      <button className="btn btn-primary">Crear un nuevo producto</button>
      <table
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
      </table>
    </section>
  );
};

export default ProductsAdmin;
