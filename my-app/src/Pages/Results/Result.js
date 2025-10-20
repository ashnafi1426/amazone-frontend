import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layoutt";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/EndPoints";
import classes from "./Results.module.css";
import ProductCard from "../../components/Product/ProductCard";
import Loader from "../../components/Loader/Loader";

const Results = () => {
  const [result, setresult] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const { categoryName } = useParams();

  useEffect(() => {
    setisLoading(true);
    axios.get(`${productUrl}/products/category/${encodeURIComponent(categoryName)}`)
      .then((res) => {
        console.log(res.data)
        setresult(res.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching category:", err);
        setisLoading(false);
      });
  }, [categoryName]);

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <section>
          <h1 style={{ padding: "30px" }}>Results</h1>
          <p style={{ padding: "30px" }}>Category: {categoryName}</p>
          <hr />
          <div className={classes.products__container}>
            {result?.map((product) => (
              <ProductCard
                key={product.id}
                product={product} // ✅ fixed here
                renderDesc={false}
                renderAdd={true}
              />
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Results;
