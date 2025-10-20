import React from "react";
import classes from "./Catagory.module.css";
import { Link } from "react-router-dom";

const CategoryCard = ({ data }) => {
  return (
    <div className={classes.Category}>
      <Link to={`/Category/${data.name}`}>
        <span>
          <h2>{data?.title}</h2>
        </span>
        <img src={data?.imgLink} alt={data?.title || "Category image"} />
        <p>Shop now</p>
      </Link>
    </div>
  );
};
export default CategoryCard;
