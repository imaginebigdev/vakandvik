import React, { useState, useEffect, useRef } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { setItems } from "../../../redux/reducers/cart";
import Works2 from "../Works2/works2";
import Link from "next/dist/client/link";

const ProductDetail = ({ product }) => {
  const dispatch = useDispatch();
  const [itemCart, setItemCart] = useLocalStorage("cart", []);
  const [currentImage, setCurrentImage] = useState(product.image);
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
        confirmButtonColor: "#ef8152ff",
        color: "#6c757dff",
        iconColor: "#ef8152ff",
      });
    } else {
      setItemCart([...itemsCart, { ...product, quantity: 1 }]);
      dispatch(setItems([...itemsCart, { ...product, quantity: 1 }]));
      Swal.fire({
        icon: "success",
        title: "Producto agregado correctamente",
        text: "",
        confirmButtonColor: "#ef8152ff",
        color: "#6c757dff",
        iconColor: "#ef8152ff",
      });
    }
  };

  const handleImageClick = (newImage) => {
    /* console.log(newImage); */
    setCurrentImage(newImage);
  };

  useEffect(() => {
    // Este efecto se encarga de actualizar el estado de currentImage
    // cada vez que cambia product.image.
    setCurrentImage(product.image);
  }, [product.image]);

  const imageRef = useRef(null);
  const [isCursorInside, setIsCursorInside] = useState(false);
  /* const [zoomed, setZoomed] = useState(false); */

  const handleMouseMoveInside = (e) => {
    const img = imageRef.current;
    const boundingBox = img.getBoundingClientRect();
    const x = (e.clientX - boundingBox.left) / boundingBox.width;
    const y = (e.clientY - boundingBox.top) / boundingBox.height;

    if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
      img.style.transformOrigin = `${x * 100}% ${y * 100}%`;
      img.style.transform = "scale(1.5)"; // Puedes ajustar el valor de escala según tu preferencia
      setIsCursorInside(true);
    } else {
      img.style.transformOrigin = "center";
      img.style.transform = "scale(1)";
      setIsCursorInside(false);
    }
  };

  return (
    <section className="section-padding">
      <div className="section-head text-center pb-50 style-5 pt-80">
        <div className="text-muted">
          <Link href="/" className="me-2">
            Vakandvik
          </Link>{" "}
          <span className="me-2"> / </span>{" "}
          <Link href="/" className="me-2">
            Inicio
          </Link>{" "}
          <span className="me-2"> / </span>{" "}
          <Link href="/shop" className="me-2">
            Shop
          </Link>{" "}
          <span className="me-2"> / </span>{" "}
          <a href="#" className="color-000" style={{ color: "#ef8152ff" }}>
            {product.name}
          </a>
        </div>
      </div>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6">
            <div
              className="img-container"
              onMouseEnter={() => setIsCursorInside(true)}
              onMouseLeave={() => setIsCursorInside(false)}
              onMouseMove={(e) => {
                if (isCursorInside) {
                  handleMouseMoveInside(e);
                }
              }}
            >
              <img
                ref={imageRef}
                className="img-responsive-detail"
                src={currentImage}
                alt={product.name}
              />
            </div>
            <div className="image-gallery">
              <div className="thumbnail-container">
                <img
                  ref={imageRef}
                  className="thumbnail"
                  style={{ objectFit: "cover" }}
                  src={product.image}
                  alt={product.name}
                  onClick={() => handleImageClick(product.image)}
                />
                {product.image_galery?.map((image, index) => (
                  <img
                    key={index}
                    className="thumbnail"
                    style={{ objectFit: "cover" }}
                    src={image}
                    alt={`Thumbnail ${index}`}
                    onClick={() => handleImageClick(image)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-details">
              <img
                src="/img/admin/logo-vk.png"
                style={{ width: "100px", float: "right" }}
              />
              <h1 className="product-title pt-30">{product.name}</h1>
              <p className="product-description pt-20">{product.description}</p>

              {product.offer_price ? (
                <div>
                  <h5 className="product-price pt-10 product-price">
                    <del>${product.price}</del>
                  </h5>
                  <h4 className="product-ofer pb-50 offer-price">
                    ${product.offer_price}
                  </h4>
                </div>
              ) : (
                <h5 className="product-price pt-10">${product.price}</h5>
              )}

              <div style={{ textAlign: "center" }}>
                <hr
                  style={{ borderTop: "1px solid #ddd", marginBottom: "20px" }}
                />
                <button
                  className="btn btn-dark btn-add-to-cart"
                  onClick={() => handleAddToCart(product)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Works2 />
    </section>
  );
};

export default ProductDetail;
