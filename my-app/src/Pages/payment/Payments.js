import React, { useContext, useState } from "react";
import classes from "./payment.module.css";
import Layoutt from "../../components/Layout/Layoutt";
import { DataContext } from "../../components/Dataprovider/Dataprovider";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { doc, setDoc, collection } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.Type";
const Payment = () => {
const { state, dispatch } = useContext(DataContext);
const { user, basket } = state;
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [Processing, setProcessing]= useState(false)
  
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()
  const handelChange = (e) => {
   // console.log(e);
    e.error?.message ? setCardError(e.error?.message) : setCardError("");
  };
  const handlePayment = async (e) => {
  e.preventDefault();
  setProcessing(true);
  if (!stripe || !elements) {
    setCardError("Stripe has not loaded.");
    setProcessing(false);
    return;
  }
  if (!user || !user.uid) {
    setCardError("User not logged in.");
    setProcessing(false);
    return;
  }
  try {
    const amount = Math.round(total * 100); // ensure it's an integer
    const response = await axiosInstance.post(`/payment/create?total=${amount}`);
    const clientSecret = response.data?.clientSecret;
    if (!clientSecret) {
      throw new Error("Client secret not received from backend.");
    }
    // console.log("🔑 Client Secret:", clientSecret);


    const cardElement = elements.getElement(CardElement);
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          email: user.email,
        },
      },
    });
    if (error) {
      console.error("❌ Stripe error:", error.message);
      setCardError(error.message);
      setProcessing(false);
      return;
    }
    console.log("💳 PaymentIntent Status:", paymentIntent?.status);
    if (!paymentIntent || paymentIntent.status !== "succeeded") {
      setCardError("Payment failed. Please try again.");
      setProcessing(false);
      return;
    }
    console.log("✅ Payment succeeded:", paymentIntent);
    console.log("🧺 Basket to store:", basket);

    // Firestore: Save order
    try {
      await setDoc(
        doc(collection(db, "users", user.uid, "orders"), paymentIntent.id),
        {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        }
      );
      console.log("📦 Order stored in Firestore");
    } catch (firestoreError) {
      console.error("🔥 Firestore write error:", firestoreError);
      setCardError("Failed to store order in database.");
      setProcessing(false);
      return;
    }

try {
  if (!user || !user.uid) throw new Error("User UID is missing.");
  if (!paymentIntent.id) throw new Error("PaymentIntent ID is missing.");

  console.log("📤 Saving to Firestore", {
    uid: user.uid,
    paymentId: paymentIntent.id,
    basket,
    amount: paymentIntent.amount,
    created: paymentIntent.created,
  });
  await setDoc(
    doc(db, "users", user.uid, "orders", paymentIntent.id),
    {
      basket: basket,
      amount: paymentIntent.amount,
      created: paymentIntent.created,
    }
  );
  console.log("✅ Order stored in Firestore");

} catch (firestoreError) {
  console.error("🔥 Firestore write error:", firestoreError);
  setCardError("Failed to store order in database.");
  setProcessing(false);
  return;
}
    dispatch({ type: Type.EMPTY_BASKET });
    setProcessing(false);
    navigate("/orders", { state: { msg: "You have placed a new order." } });

  } catch (err) {
    // console.error("💥 General error:", err);
    setCardError(err.message || "Something went wrong.");
    setProcessing(false);
  }
};
  return (
    <Layoutt>
      {/*header */}
      <div className={classes.payment_header}>Checkout ({totalItem}) items</div>
      {/*payment */}
      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 react lane</div>
            <div>chicago, IL</div>
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handelChange} />
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order | </p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {Processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>please wait...</p>
                      </div>
                    ) : (  
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layoutt>
  );
};
export default Payment;