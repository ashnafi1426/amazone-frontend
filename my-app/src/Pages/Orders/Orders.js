import React, { useContext, useState, useEffect } from "react";
import LayOut from "../../components/Layout/Layoutt";
import classes from "./Orders.module.css";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../components/Dataprovider/Dataprovider";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import ProductCard from "../../components/Product/ProductCard";
const Orders = () => {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      const ordersRef = collection(db, "users", user.uid, "orders");
      const q = query(ordersRef, orderBy("created", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        console.log(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        setOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });

      return () => unsubscribe(); // cleanup
    }
    else{
      setOrders([])
    }
  }, [user]);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>Your Orders</h2>
          {
            orders?.length===0 && 
            <div style={{padding:"20px"}}>
              You don't have orders yet.
            </div>
          }
          {/*ordered item */}
          <div>
            {orders?.map((eacOrder) => (
              <div key={eacOrder.id}>
                <hr />
                <p>Order ID: {eacOrder.id}</p>
                {eacOrder?.basket?.map((order) => {
                  console.log("order item", order);
                  return (
                    <ProductCard flex={true} product={order} key={order.id} />
                  );
                  
              })}
                <hr />
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Orders;
