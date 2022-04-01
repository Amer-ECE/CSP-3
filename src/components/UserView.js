import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const UserView = ({ productsProp }) => {
  const [productsArr, setProductsArr] = useState([]);

  useEffect(() => {
    const products = productsProp.map((product) => {
      if (product.isActive) {
        return <ProductCard key={product._id} productProp={product} />;
      } else {
        return null;
      }
    });
    setProductsArr(products);
  }, [productsProp]);

  return <>{productsArr}</>;
};

export default UserView;
