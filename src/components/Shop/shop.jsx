import React from "react";
import ShopSidebar from "../Shop-sidebar/shop-sidebar";
import ShopStore from "../Shop-store/shop-store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../redux/reducers/products";
import { useState } from "react";

const Shop = () => {
  // REDUX
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [productsState, setProductsState] = useState([]);
  React.useEffect(() => {
    dispatch(fetchProducts());
    setProductsState(products);
  }, [dispatch, products]);
  // REDUX
  return (
    <section className="shop section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <ShopSidebar />
          </div>
          <div className="col-lg-9">
            <ShopStore products={productsState} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
