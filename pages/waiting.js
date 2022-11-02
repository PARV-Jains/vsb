import React, { useState, useEffect, useContext } from 'react';
import client from '../utils/client';
import { useRouter } from 'next/router';

// import { Store } from '../utils/Store';

const Checkout = ({ cart, clearCart, subTotal, addToCart, removeFromCart }) => {
  const router = useRouter();

  const redirect = async (e) => {
    let sanityorderid = await client.fetch(
      `*[_type == "sanityorder"] | order(_createdAt desc) [0] ._id`
    );
    router.push(`/sanitypayorder?clearCart=1&_id=${sanityorderid}`);
  }
  redirect();
  return (
<div className="loading-screen">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
  );
};

export default Checkout;
