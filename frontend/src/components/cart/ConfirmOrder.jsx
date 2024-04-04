import React, { useEffect, useState } from "react";
import "../../styles/confirmorder.scss";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, paymentVerification } from "../../redux/actions/order";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { server } from "../../redux/store";

export default function ConfirmOrder() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, subTotal, tax, shippingCharges, total, shippingInfo } =
    useSelector((state) => state.cart);
  const { message, error } = useSelector((state) => state.order);

  const submitHandler = async (e) => {
    e.preventDefault();
    setDisableBtn(true);

    if (paymentMethod === "COD") {
      dispatch(
        createOrder(
          shippingInfo,
          cartItems,
          paymentMethod,
          subTotal,
          tax,
          shippingCharges,
          total
        )
      );
    } else {
      try {
        const {
          data: { order, orderOption },
        } = await axios.post(
          `${server}/createorderonline`,
          {
            shippingInfo,
            orderItems: cartItems,
            paymentMethod,
            itemsPrice: subTotal,
            taxPrice: tax,
            shippingCharges,
            totalAmount: total,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        const options = {
          key: "rzp_test_1kravVoKtgywXo",
          amount: order.amount,
          currency: "INR",
          name: "Bristo Burger",
          description: "Burger App",
          order_id: order.id,
          handler: function (response) {
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
              response;

            dispatch(
              paymentVerification(
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
                orderOption
              )
            );
          },

          theme: {
            color: "#9c003c",
          },
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (error) {
        console.error("Error processing order:", error);
        setDisableBtn(false);
      }
    }
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      dispatch({ type: "emptyState" });
      navigate("/paymentsuccess");
    }
  }, [dispatch, message, error, navigate]);

  return (
    <section className="confirm-order">
      <main>
        <h1>Confirm Order</h1>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="1">Cash On Delivery</label>
            <input
              type="radio"
              id="1"
              name="payment"
              onChange={() => setPaymentMethod("COD")}
              required
            />
          </div>
          <div>
            <label htmlFor="2">Online</label>
            <input
              type="radio"
              id="2"
              name="payment"
              onChange={() => setPaymentMethod("Online")}
            />
          </div>
          <button type="submit" disabled={disableBtn}>
            Place Order
          </button>
        </form>
      </main>
    </section>
  );
}
