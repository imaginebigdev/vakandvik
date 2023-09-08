import React, { useEffect } from "react";
import Homepage1 from "./homepage/home6-light";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Home = () => {
  const [items, setItems] = useLocalStorage("cart", []);

  React.useEffect(() => {
    if (window.localStorage.getItem("cart") === null) {
      setItems([]);
    }
  }, []);
  return (
    <>
      <Homepage1 />
    </>
  );
};

export default Home;
