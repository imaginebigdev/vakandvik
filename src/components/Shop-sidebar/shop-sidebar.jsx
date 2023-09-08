import React from "react";
import { fetchCategories } from "../../../redux/reducers/categories";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByCategory,
  filterBySearchBar,
  filterByPrice,
  cleanFilters,
} from "../../../redux/reducers/products";
import { useState } from "react";

const ShopSidebar = ({ setCurrentPage }) => {
  //REDUX
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );
  React.useEffect(() => {
    setCurrentPage(0);

    dispatch(fetchCategories());
  }, [dispatch]);
  // category //

  const [filterCategory, setFiltersCategory] = useState([]);
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      // Agregar la categoría seleccionada al array
      setFiltersCategory((prevCategories) => [...prevCategories, value]);
    } else {
      // Eliminar la categoría del array si se desmarca el checkbox
      setFiltersCategory((prevCategories) =>
        prevCategories.filter((category) => category !== value)
      );
    }
  };
  const handleSubmitCategory = () => {
    setCurrentPage(0);
    dispatch(filterByCategory(filterCategory));
    const range = document.querySelector("#range");
    range.value = range.min;
    setValue(range);
  };
  // Category //

  // Searchbar //
  const [searchParameter, setSearchParameter] = useState("");

  const handleSearchBar = (e) => {
    setCurrentPage(0);
    e.preventDefault();
    dispatch(filterBySearchBar(searchParameter));
    setSearchParameter("");
    const range = document.querySelector("#range");
    range.value = range.min;
    setValue(range);
  };

  const handleClean = () => {
    setCurrentPage(0);

    dispatch(cleanFilters());
    setFiltersCategory([]);
    setSearchParameter("");
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    const range = document.querySelector("#range");
    range.value = range.min;
    setValue(range);
  };
  // Searchbar //

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

  const orderByPrice = (number) => {
    setCurrentPage(0);

    dispatch(filterByPrice(number));
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
                <button
                  onClick={handleSearchBar}
                  style={{
                    cursor: "pointer",
                    background: "#ef8152ff",
                    color: "#000",
                  }}
                >
                  <span className="icon pe-7s-search"></span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-lg-12 col-md-6">
          <div className="box gat mb-30">
            <h5 className="title mb-30">Categorias</h5>
            <ul>
              {categories?.map((c) => (
                <li key={c.id}>
                  <input
                    className="custom-checkbox"
                    style={{
                      marginRight: "5px",
                    }}
                    type="checkbox"
                    name={c.name}
                    value={c.id}
                    checked={filterCategory?.find((f) => f.id === c.id)}
                    onChange={handleCheckboxChange}
                  />

                  <label className="fz-18">{c.name}</label>
                </li>
              ))}
            </ul>
            <div className="text-center">
              <button
                className="butn bord mt-20 fz-15 text-center"
                onClick={handleSubmitCategory}
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-12 col-md-6">
          <div className="box filter-price mb-30">
            <h6 className="title mb-30">Filtro por precio</h6>

            <div className="range-slider mb-30">
              <div id="tooltip" ref={tooltipRef}></div>
              <input
                onInput={(e) => setValue(e.currentTarget)}
                id="range"
                type="range"
                step="10"
                min="5000"
                max="100000"
              />
              <div className="start-pointe">$5000</div>
            </div>
            <div className="text-center">
              <button
                className="butn bord mt-20 fz-15"
                onClick={(e) => orderByPrice(tooltipRef.current.outerText)}
              >
                Aplicar
              </button>
            </div>
          </div>
          <div className="text-center">
            <button className="butn2 bord mt-20 fz-15" onClick={handleClean}>
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopSidebar;
