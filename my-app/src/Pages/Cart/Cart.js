import React, { useContext } from "react";
import Layout from "../../components/Layout/Layoutt";
import classes from "./Cart.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../../components/Dataprovider/Dataprovider";
import ProductCard from "../../components/Product/ProductCard";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { Type } from "../../Utility/action.Type";
const Cart = () => {
  const [{ basket }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.price *item.amount + amount;
  }, 0);
  const increment=(item)=>{
    dispatch({
      type: Type.ADD_TO_BASKET,
      item
    })
  }
  const decrement=(id)=>{
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id
    })
  }
  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your Shopping Basket</h3>
          <hr />
          <div className={classes.cart_img}>
            {basket?.length === 0 ?
             (<p>Oppps ! No item in your cart</p>) : (
              basket?.map((item, i) => {
                return(
                  <section key={item.id || i} className={classes.cart_product}>
                     <ProductCard
                      product={item}  
                      renderDesc={true}
                      renderAdd={false}
                      flex={true}
                    />
                    <div className={classes.btn_container}>
                      <button onClick={() => increment(item)}>
                        <IoIosArrowUp size={20} />
                      </button>
                      <span>{item.amount}</span>
                      <button onClick={() => decrement(item.id)}>
                       
                        <IoIosArrowDown size={20} />
                      </button>
                    </div>
                  </section>
                );
              })
            )}
          </div>
        </div>
        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>subtotal({basket?.length} item)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments">continue to check out</Link>
          </div>
        )}
      </section>
    </Layout>
  );
};
export default Cart;