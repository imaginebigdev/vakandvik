import React, { useEffect } from "react";
import Homepage1 from "./homepage/home6-light";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Home = () => {
  const [cart, setCart] = useLocalStorage("cart", []);

  useEffect(() => {
    // evita errores al cargar por primera vez

    setCart([]);
  }, [setCart]);
  return (
    <>
      <Homepage1 />
    </>
  );
};

export default Home;
