import React from "react";
import ShopSidebar from "../Shop-sidebar/shop-sidebar";
import ShopStore from "../Shop-store/shop-store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchProductsByCategory,
} from "../../../redux/reducers/products";
import { useRouter } from "next/router";

const Shop = () => {
  const router = useRouter();
  const query = router.query.categoria;
  console.log(query);
  // REDUX
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  React.useEffect(() => {
    if (query !== undefined) {
      dispatch(fetchProductsByCategory(query));
    } else {
      dispatch(fetchProducts());
    }
  }, [dispatch, query]);
  // REDUX

  return (
    <section className="shop section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <ShopSidebar />
          </div>
          <div className="col-lg-9">
            <ShopStore products={products} category={query} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
