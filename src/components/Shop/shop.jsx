import React from "react";
import ShopSidebar from "../Shop-sidebar/shop-sidebar";
import ShopStore from "../Shop-store/shop-store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../redux/reducers/products";

const Shop = () => {
  // REDUX
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  // REDUX

  return (
    <section className="shop section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <ShopSidebar />
          </div>
          <div className="col-lg-9">
            <ShopStore products={products} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
