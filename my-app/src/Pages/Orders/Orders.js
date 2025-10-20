import React, { useContext, useState, useEffect } from "react";
import LayOut from "../../components/Layout/Layoutt";
import classes from "./Orders.module.css";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../components/Dataprovider/Dataprovider";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import ProductCard from "../../components/Product/ProductCard";

const Orders = () => {
  const { state } = useContext(DataContext); // ✅ object destructuring
  const { user } = state;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }

    const ordersRef = collection(db, "users", user.uid, "orders");
    const q = query(ordersRef, orderBy("created", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched orders:", ordersData);
      setOrders(ordersData);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>Your Orders</h2>

          {orders.length === 0 && (
            <div style={{ padding: "20px" }}>You don't have orders yet.</div>
          )}

          {/* Render each order */}
          {orders.map((eachOrder) => (
            <div key={eachOrder.id} className={classes.order}>
              <hr />
              <p>Order ID: {eachOrder.id}</p>

              {/* Render products in this order */}
              {eachOrder.basket?.length > 0 ? (
                eachOrder.basket.map((orderItem) => (
                  <ProductCard
                    key={orderItem.id}
                    product={orderItem}
                    flex={true}
                  />
                ))
              ) : (
                <p>No items in this order</p>
              )}
              <hr />
            </div>
          ))}
        </div>
      </section>
    </LayOut>
  );
};

export default Orders;
