import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "../../../redux/reducers/products";
import Swal from "sweetalert2";
import FormEditProduct from "../FormEditProduct/formEditProduct";

const ProductsAdmin = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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

  const handleEdit = (productId) => {
    setSelectedProductId(productId);
  };

  return (
    <section className="text-center">
      <h2 style={{ color: "#61218cff" }}>Productos</h2>

      <div className="store pt-50">
        <div className="row justify-content-center">
          {products?.map((p) => (
            <div className="col-md-4 col-sm-6 col-xs-12 mr-5 " key={p.id}>
              <div className="card">
                <div className="card-header-delete">
                  <button
                    className="btn btn-danger delete-button float-right"
                    onClick={() => handleDelete(p.id)}
                  >
                    <i className="fa fa-trash" />
                  </button>
                </div>
                <div className="card-body">
                  <div className="image-container">
                    <img src={p.image} alt="" />
                  </div>
                  <h4>{p.name}</h4>
                  <h6 style={{ color: p.stock < 10 ? "red" : null }}>
                    stock: {p.stock}
                  </h6>
                  <span className="price">$ {p.price}</span>
                </div>

                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(p.id)}
                  style={{
                    backgroundColor: "#8068f0ff",
                    borderColor: "#8068f0ff",
                  }}
                >
                  Editar
                </button>
              </div>
            </div>
          ))}
          {selectedProductId !== null && (
            <FormEditProduct
              setModal={() => setSelectedProductId(null)}
              modal={selectedProductId !== null}
              selectedProductId={selectedProductId}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsAdmin;
