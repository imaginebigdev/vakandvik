import Link from "next/dist/client/link";
import React from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../../redux/reducers/cart";

const CartComponent = ({ showForm, setShowForm }) => {
  const dispatch = useDispatch();
  const [itemCart, setItemCart] = useLocalStorage("cart", []);
  React.useEffect(() => {
    dispatch(setItems(JSON.parse(window.localStorage.getItem("cart"))));
  }, [dispatch]);

  const handleDeleteProduct = (id) => {
    const updateArray = itemsCart.filter((item) => item.id !== id);
    setItemCart(updateArray);
    dispatch(setItems(updateArray));
  };
  const handleUpdateQuantity = (id, amount) => {
    const updatedCart = itemsCart
      .map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + amount;
          if (newQuantity <= 0) return null;
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
      .filter(Boolean);
    setItemCart(updatedCart);
    dispatch(setItems(updatedCart));
  };

  const handleCleanCart = () => {
    setItemCart([]);
    dispatch(setItems([]));
  };

  const { itemsCart } = useSelector((state) => state.cart);

  const totalPrice = itemsCart?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <section className="text-center">
      <table
        className="table table-bordered text-center"
        style={{ margin: "100px 5%", maxWidth: "90%" }}
      >
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {itemsCart?.map((item) => (
            <tr key={item.id}>
              <td style={{ width: "30px" }}>
                <img src={item.image} alt="itemImage" />
              </td>
              <td>{item.name}</td>
              <td>
                <div className="quantity-container">
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleUpdateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleUpdateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td>${item.price * item.quantity}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDeleteProduct(item.id)}
                >
                  <i className="fa fa-trash" />
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td>Total:</td>
            <td> $ {totalPrice.toFixed(2)}</td>
            <td>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => setShowForm(!showForm)}
              >
                Continuar compra
              </button>
            </td>
            <td>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleCleanCart()}
              >
                Limpiar carrito
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default CartComponent;
