import React from "react";
import ShopSidebar from "../Shop-sidebar/shop-sidebar";
import ShopStore from "../Shop-store/shop-store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../redux/reducers/products";
import Link from "next/link";

const Shop = () => {
  /* ====================== [ Start REDUX ] ====================== */
  const dispatch = useDispatch();
  const { products, loading, error, filterProducts } = useSelector(
    (state) => state.products
  );
  const totalProducts = filterProducts?.length;
  const [productsArray, setProductsArray] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  React.useEffect(() => {
    if (Array.isArray(filterProducts)) {
      setProductsArray(filterProducts);
      setItems([...filterProducts].splice(0, itemPerPage));
      setCurrentPage(0);
    }
  }, [filterProducts]);
  /* ====================== [ End REDUX  ] ====================== */

  /* ====================== [ Start paginated  ] ====================== */
  const itemPerPage = 9;

  const nextHandler = () => {
    const totalItems = productsArray.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * itemPerPage;
    if (firstIndex >= totalItems) return;
    setItems([...productsArray]?.splice(firstIndex, itemPerPage));
    setCurrentPage(nextPage);
  };

  const prevHandler = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;
    const firstIndex = prevPage * itemPerPage;
    setItems([...productsArray]?.splice(firstIndex, itemPerPage));
    setCurrentPage(prevPage);
  };
  /* ====================== [ End paginated  ] ====================== */

  return (
    <section className="shop section-padding">
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
          <Link href="/shop" className="me-2" style={{ color: "#ef8152ff" }}>
            Shop
          </Link>{" "}
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <ShopSidebar setCurrentPage={setCurrentPage} />
          </div>
          <div className="col-lg-9">
            <ShopStore
              totalProducts={totalProducts}
              products={items}
              nextHandler={nextHandler}
              prevHandler={prevHandler}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
