import React from "react";
import "../css/Cart.css";
import { IoClose } from "react-icons/io5";

import StripeCheckout from "react-stripe-checkout";

const Cart = ({ cart, setCart }) => {

  
  const handleDelete = (item) => {
    setCart(cart.filter((i) => i.id !== item.id));
  };


  const total = cart.map(item => item.price)
  const grandTotal = total.reduce((tl, cur) =>  tl+cur, 0 )
 
  

  return (
    <section className="cart">
    <h1>CART</h1>
      {cart.map((item, index) => (
        <div className="item" key={index}>
          <IoClose className="del-item" onClick={() => handleDelete(item)} />
          <h3>{item.title}</h3>
          <h2>Rs {item.price}</h2>
        </div>
      ))}
      <h2 className="grand">Grand Total : Rs {grandTotal}</h2>
      {cart.length > 0 ? (
        <StripeCheckout
          className="checkout"
          stripeKey="pk_test_51LJH9YEcrrpUuR0veGScSYs5VDdaCsKDjYGJsQFo9DEFXvhX7EC0VoXwvEbMYe77BkiqmGcrnwreni30EbXQBuYD00tAIM3aLp"
          amount={grandTotal}
        />
      ) : null}
    </section>
  );
};

export default Cart;
