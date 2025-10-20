import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "./Product.module.css";
import { DataContext } from "../Dataprovider/Dataprovider";
import { Type } from "../../Utility/action.Type";

function ProductCard({ product, flex = false, renderDesc = false, renderAdd = true }) {
  const { state, dispatch } = useContext(DataContext); // ✅ use object destructuring
  const { basket = [] } = state;

  if (!product) return null;

  const {
    id,
    image = "",
    title = "No Title",
    rating = {},
    price = 0,
    description = "No description"
  } = product;

  const handleAddToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: product
    });
  };

  // ✅ Check if item is already in the basket
  const isInBasket = basket.some((item) => item.id === id);

  return (
    <div className={`${classes.card_container} ${flex ? classes.product_flexed : ""}`}>
      <div className={classes.image_container}>
        <Link to={`/products/${id}`}>
          <img src={image} alt={title} />
        </Link>

        {/* ✅ Show "Add to Cart" only if allowed and NOT in basket */}
        {renderAdd && !isInBasket && (
          <button className={classes.button} onClick={handleAddToCart}>
            Add to Cart
          </button>
        )}
      </div>

      <div>
        <h3>{title}</h3>
        <div className={classes.rating}>
          <Rating value={rating.rate || 0} precision={0.1} readOnly />
          <small>{rating.count || 0}</small>
        </div>
        {renderDesc && <p className={classes.description}>{description}</p>}
      </div>

      <div>
        <CurrencyFormat amount={price} />
      </div>
    </div>
  );
}

export default ProductCard;
