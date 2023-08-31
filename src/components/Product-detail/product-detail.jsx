import React from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { setItems } from "../../../redux/reducers/cart";

const ProductDetail = ({ product }) => {
  const dispatch = useDispatch();
  const [itemCart, setItemCart] = useLocalStorage("cart", []);

  const { itemsCart } = useSelector((state) => state.cart);

  const handleAddToCart = (product) => {
    const existingProduct = itemsCart?.find((p) => p.id === product.id);

    if (existingProduct) {
      const updatedCart = itemsCart.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
      setItemCart(updatedCart);
      dispatch(setItems(updatedCart));
      Swal.fire({
        icon: "success",
        title: "Producto agregado correctamente",
        text: "",
      });
    } else {
      setItemCart([...itemsCart, { ...product, quantity: 1 }]);
      dispatch(setItems([...itemsCart, { ...product, quantity: 1 }]));
      Swal.fire({
        icon: "success",
        title: "Producto agregado correctamente",
        text: "",
      });
    }
  };
  return (
    <section className="section-padding">
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6">
            <img
              className="img-responsive-detail"
              src={product.image}
              alt={product.name}
            />
          </div>
          <div className="col-md-6">
            <h2 className="mb-3">{product.name}</h2>
            <p className="text-muted">{product.description}</p>
            <p className="font-weight-bold">${product.price}</p>
            <button
              className="btn btn-primary"
              onClick={() => handleAddToCart(product)}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
