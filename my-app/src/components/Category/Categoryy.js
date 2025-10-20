// src/components/Catagory/Category.js

import React from "react";
import { Categoryinfos } from "./CatagoryFullinfos"; // ✅ Correct import
import CategoryCard from "./CategoryCard";
import classes from "./Catagory.module.css";
const Categoryy = () => {
  return (
    <section className={classes.category__container}>
      {Categoryinfos.map((info, index) => (
        <CategoryCard key={index} data={info} />
      ))}
    </section>
  );
};

export default Categoryy;

