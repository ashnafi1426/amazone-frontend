import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classes from "./Header.module.css";
import LowerHeader from './LowerHeader';
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { DataContext } from '../Dataprovider/Dataprovider';
import { auth } from '../../Utility/firebase';

function Header() {
  const { state, dispatch } = useContext(DataContext);
  const { user, basket } = state;

  const totalItem = basket?.reduce((amount, item) => amount + item.amount, 0);

  return (
    <section className={classes.fixed}>
      <div className={classes.header_container}>
        <div className={classes.logo_container}>
          <Link to='/'>
            <img src='https://pngimg.com/uploads/amazon/amazon_PNG11.png' alt='Amazon Logo'/>
          </Link>
        </div>
        <div className={classes.delivery}>
          <SlLocationPin size={18}/>
          <div>
            <p>Deliver to</p>
            <span>Ethiopia</span>
          </div>
        </div>
        <div className={classes.search}>
          <select>
            <option value="">All</option>
          </select>
          <input type='text' placeholder='Search Amazon'/>
          <BsSearch size={38} />
        </div>
        <div className={classes.language_selector}>
          <img src='https://cdn.britannica.com/33/4833-050-F6E415FE/Flag-United-States-of-America.jpg' alt='USA flag'/>
          <span>EN</span>
        </div>
        <div className={classes.account_container}>
          <Link to={!user && '/auths'}>
            <div>
              { user ? (
                <>
                  <p>Hello {user?.email?.split("@")[0]}</p>
                  <span onClick={() => auth.signOut()}>Sign Out</span>
                </>
              ) : (
                <>
                  <p>Hello, Sign In</p>
                  <span>Account and list</span>
                </>
              )}
            </div>
          </Link>
        </div>
        <div className={classes.returns_container}>
          <Link to='/orders'>
            <p>Returns</p>
            <span>& Orders</span>
          </Link>
        </div>
        <Link to='/cart'>
          <div className={classes.cart_container}>
            <BiCart size={35}/>
            <span className={classes.cart_count}>{totalItem}</span>
            <span className={classes.cart_text}>Cart</span>
          </div>
        </Link>
      </div>
      <LowerHeader/>
    </section>
  );
}

export default Header;
