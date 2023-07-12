import React from "react";
import { fetchCategories } from "../../../redux/reducers/categories";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsByCategory,
  filterBySearchBar,
} from "../../../redux/reducers/products";
import { useState } from "react";

const ShopSidebar = () => {
  //REDUX
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );
  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoriesChange = (e) => {
    dispatch(fetchProductsByCategory(e));
  };

  const [searchParameter, setSearchParameter] = useState("");

  const handleSearchBar = (e) => {
    e.preventDefault();
    dispatch(filterBySearchBar(searchParameter));
  };

  //REDUX
  const tooltipRef = React.useRef(),
    setValue = (range) => {
      const newValue = Number(
          ((range.value - range.min) * 100) / (range.max - range.min)
        ),
        newPosition = 16 - newValue * 0.32;
      tooltipRef.current.innerHTML = `<span>${range.value}</span>`;
      tooltipRef.current.style.left = `calc(${newValue}% + (${newPosition}px))`;
      document.documentElement.style.setProperty(
        "--range-progress",
        `calc(${newValue}% + (${newPosition}px))`
      );
      let a = range.value;
      range.value = a;
    };
  React.useEffect(() => {
    setValue(document.querySelector("#range"));
  }, []);
  return (
    <div className="sidebar md-mb50">
      <div className="row">
        <div className="col-lg-12 col-md-6">
          <div className="search mb-30">
            <form action="">
              <div className="form-group">
                <input
                  type="text"
                  name="shop-search"
                  value={searchParameter}
                  placeholder="Search"
                  onChange={(e) => setSearchParameter(e.target.value)}
                />
                <button onClick={handleSearchBar} style={{ cursor: "pointer" }}>
                  <span className="icon pe-7s-search"></span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-lg-12 col-md-6">
          <div className="box gat mb-30">
            <h6 className="title mb-30">Categorias</h6>
            <ul>
              {categories?.map((c) => (
                <li key={c.id} style={{ cursor: "pointer" }}>
                  <a onClick={(e) => handleCategoriesChange(c.id)}>{c.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-lg-12 col-md-6">
          <div className="box filter-price mb-30">
            <h6 className="title mb-30">Filter By Price</h6>

            <div className="range-slider mb-30">
              <div id="tooltip" ref={tooltipRef}></div>
              <input
                onInput={(e) => setValue(e.currentTarget)}
                id="range"
                type="range"
                step="10"
                min="3000"
                max="100000"
              />
              <div className="start-pointe">$3000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopSidebar;
