import React, { useState, useEffect, useContext } from 'react';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import Link from 'next/link';
import { BsFillBagCheckFill } from 'react-icons/bs';
import Head from 'next/head';
import Script from 'next/script';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import client from '../utils/client';
import { BsCash } from 'react-icons/bs';
import { SiPaytm } from 'react-icons/si';
// import { Store } from '../utils/Store';

const Checkout = ({ cart, clearCart, subTotal, addToCart, removeFromCart }) => {
  const router = useRouter();

  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  const [sanityname, setSanityname] = useState('');
  const [sanityemail, setSanityemail] = useState('');
  const [isPaid, setIspaid] = useState(false);
  const [codStatus, setCodstatus] = useState(false);
  const [isDelivered, setIsdelivered] = useState(false);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [value, setValue] = useState('');
  const [cash, setCash] = useState(false);
  const [coupon, setCoupon] = useState();
  const [couponavailability, setCouponAvailability] = useState();

  //  const router = useRouter();

  //  const { dispatch } = useContext(Store);
  // const [user, setUser] = useState({value : null})
  const [sanityuser, setSanityuser] = useState({ value: null });
  useEffect(() => {
    //   const myuser = JSON.parse(localStorage.getItem('myuser'))
    //   if(myuser && myuser.token){
    //     setUser(myuser)
    //     setEmail(myuser.email);
    //     fetchData(myuser.token)
    //   }
    const sanityuserinfo = JSON.parse(localStorage.getItem('sanityuserinfo'));
    if (sanityuserinfo && sanityuserinfo.token) {
      setSanityuser(sanityuserinfo);
      setSanityemail(sanityuserinfo.email);
      // fetchData(sanityuserinfo.token)
    }
  }, []);

  useEffect(() => {
    if (
      sanityname.length > 3 &&
      sanityemail.length > 3 &&
      phone.length > 3 &&
      address.length > 3 &&
      pincode.length > 3 &&
      paymentMethod
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [sanityname, sanityemail, phone, address, pincode, paymentMethod]);

  // useEffect(() => {
  //   if (
  //     value == "PAYTM"
  //     // return
  //   ) {

  //   } else if(value){
  // value == "CASH"
  //   } {

  //   }
  // }, []);

  //   if (
  //     sanityname?.length > 3 &&
  //     sanityemail.length > 3 &&
  //     phone.length > 3 &&
  //     address.length > 3 &&
  //     pincode.length > 3
  //   ) {
  //     setDisabled(false);
  //   } else {
  //     setDisabled(true);
  //   }
  // }, [sanityname,sanityemail,phone,address,pincode])

  // const fetchData = async(token) => {
  //   let data = {token: token}
  //   let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getsanityuser`, {
  //       method: 'POST', // or 'PUT'
  //       headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(data),
  //     })
  //     let res = await a.json()
  //     // setName(res.name)
  //     setSanityname(res.sanityname)
  //     setAddress(res.address)
  //     setPincode(res.pincode)
  //     setPhone(res.phone)
  //     getPincode(res.pincode)
  // }
  // const fetchData = async(token) => {
  //   let data = {token: token}
  //   let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getsanityuser`, {
  //       method: 'POST', // or 'PUT'
  //       headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(data),
  //     })
  //     let res = await a.json()
  //     // setName(res.name)
  //     setSanityname(res.sanityname)
  //     setAddress(res.address)
  //     setPincode(res.pincode)
  //     setPhone(res.phone)
  //     getPincode(res.pincode)
  // }

  const getPincode = async (pin) => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();
    if (Object.keys(pinJson).includes(pin)) {
      setState(pinJson[pin][1]);
      setCity(pinJson[pin][0]);
    } else {
      setState('');
      setCity('');
    }
  };

  const handleChange = async (e) => {
    if (e.target.name == 'sanityname') {
      //   setName(e.target.value);
      setSanityname(e.target.value);
    } else if (e.target.name == 'sanityemail') {
      //   setEmail(e.target.value);
      setSanityemail(e.target.value);
    } else if (e.target.name == 'phone') {
      setPhone(e.target.value);
    } else if (e.target.name == 'address') {
      setAddress(e.target.value);
    } else if (e.target.name == 'pincode') {
      setPincode(e.target.value);
      if (e.target.value.length == 6) {
        getPincode(e.target.value);
      } else {
        setState('');
        setCity('');
      }
    }

    // setTimeout(() => {
    //   if (
    //     name.length > 3 &&
    //     email.length > 3 &&
    //     phone.length > 3 &&
    //     address.length > 3 &&
    //     pincode.length > 3
    //   ) {
    //     setDisabled(false);
    //   } else {
    //     setDisabled(true);
    //   }
    // }, 100);
  };

  // const checkCouponAbitlity = async () => {
  //   let coupons = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/coupon`);
  //   let couponJson = await coupons.json();
  //   if (Object.keys(couponJson).includes(coupon)) {
  //     setCouponAvailability(true);
  //     toast.success('Your Coupon is applied', {
  //       position: 'bottom-center',
  //       autoClose: 1000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   } else {
  //     setCouponAvailability(false);
  //     toast.error('Sorry, Your coupon is not valid!', {
  //       position: 'bottom-center',
  //       autoClose: 1000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   }
  // };

  // const onChangeCoupon = (e) => {
  //   if (e.target.name == 'coupon') {
  //     setCoupon(e.target.value);
  //     getCoupon(e.target.value);
  //   }
  // };
  // const getCoupon = async (coupon) => {
  //   let coupons = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/coupon`);
  //   let couponJson = await coupons.json();
  //   if (Object.keys(couponJson).includes(coupon)) {
  //   subTotal = couponJson[coupon][0];
  //   console.log(subTotal)
  //   } else {
  //     subTotal
  //   }
  // };

  const initiatePayment = async () => {
    let oid = Math.floor(Math.random() * Date.now());
    //get a transaction token
    const data = {
      sanityorderitems: Object.keys(cart).map((i) => ({
        ...cart[i],
        _key: i,
      })),
      subTotal,
      oid,
      isPaid,
      codStatus,
      isDelivered,
      //   email: email,
      sanityemail,
      //   name,
      sanityname,
      address,
      pincode,
      paymentMethod,
      phone,
    };
    // const sanityuserinfo = JSON.parse(localStorage.getItem('sanityuserinfo'));
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/sanityorders`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        //  authorization: `Bearer ${sanityuserinfo.token}`,
      },
      body: JSON.stringify(data),
    });

    let txnRes = await a.json();
    if (txnRes.success) {
      let txnToken = txnRes.txnToken;
      var config = {
        root: '',
        // style: {
        //   "bodyBackgroundColor": "#ffffff",
        //   "bodyColor": "",
        //   "themeBackgroundColor": "#20c4d6",
        //   "themeColor": "#ffffff",
        //   "headerBackgroundColor": "#3982f7",
        //   "headerColor": "#ffffff",
        //   "errorColor": "",
        //   "successColor": "",
        //   "card": {
        //     "padding": "",
        //     "backgroundColor": "#3982f7"
        //   }
        // },
        flow: 'DEFAULT',
        data: {
          orderId: oid /* update order id */,
          token: txnToken /* update token value */,
          tokenType: 'TXN_TOKEN',
          amount: subTotal /* update amount */,
        },
        handler: {
          notifyMerchant: function (eventName, data) {
            console.log('notifyMerchant handler function called');
            console.log('eventName => ', eventName);
            console.log('data => ', data);
          },
        },
      };
      window.Paytm.CheckoutJS.init(config)
        .then(function onSuccess() {
          // after successfully updating configuration, invoke JS Checkout
          window.Paytm.CheckoutJS.invoke();
        })
        .catch(function onError(error) {
          console.log('error => ', error);
        });

        const options = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: 'Basic Yjk3ZWFlNjEtZWYwZi00ODhjLWFlY2EtZDI4MmE1Yjk5Nzc1',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            app_id: '8c33f5fc-1004-4f36-9b24-0b17d3cbc7c6',
            include_player_ids: ["06dbb999-bc41-486b-a952-caa00f41ed97"],
            // external_id: '514c1b62-cb15-4f13-a9dd-fb141d7fe215',
            contents: {en: 'Naya Order Aaya Hai English', es: 'Spanish Message'},
            headings:{"en": "Kisi Ne Order Place Kiya Hai English", "es": "Spanish Title"},
            name: 'NEW_ORDER',
            url:'https://vsb.sanity.studio',
            big_picture:'https://img.onesignal.com/tmp/53a40efa-9a8b-431f-a034-04525b8bed60.png'
            // send_after: 'string',
            // delayed_option: 'string',
            // delivery_time_of_day: 'string',
            // throttle_rate_per_minute: 0
          })
        };
        
        fetch('https://onesignal.com/api/v1/notifications', options)
          .then(response => response.json())
          .then(response => console.log(response))
          .catch(err => console.error(err));
        

    } else {
      console.log(txnRes.error);
      if (txnRes.cartClear) {
        clearCart();
      }
      toast.error(txnRes.error, {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const paymentmethodHandler = async (e) => {
    e.preventDefault();
    let oid = Math.floor(Math.random() * Date.now());
    //get a transaction token
    const data = {
      sanityorderitems: Object.keys(cart).map((i) => ({
        ...cart[i],
        _key: i,
      })),
      subTotal,
      oid,
      isPaid,
      isDelivered,
      codStatus,
      //   email: email,
      sanityemail,
      //   name,
      sanityname,
      address,
      pincode,
      paymentMethod,
      phone,
    };

    // const sanityuserinfo = JSON.parse(localStorage.getItem('sanityuserinfo'));
    let cashpayment = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/sanityorders`,
      {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          //  authorization: `Bearer ${sanityuserinfo.token}`,
        },
        body: JSON.stringify(data),
      }
    );

    let cashRes = await cashpayment.json();
    let sanityorderid = await client.fetch(
      `*[_type == "sanityorder"] | order(_createdAt asc) [0] ._id`
    );
    if (cashRes.success) {
      router.push(`/sanitypayorder?clearCart=1&_id=${sanityorderid}`);
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: 'Basic Yjk3ZWFlNjEtZWYwZi00ODhjLWFlY2EtZDI4MmE1Yjk5Nzc1',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          app_id: '8c33f5fc-1004-4f36-9b24-0b17d3cbc7c6',
          include_player_ids: ["06dbb999-bc41-486b-a952-caa00f41ed97"],
          // external_id: '514c1b62-cb15-4f13-a9dd-fb141d7fe215',
          contents: {en: 'Naya Order Aaya Hai English', es: 'Spanish Message'},
          headings:{"en": "Kisi Ne Order Place Kiya Hai English", "es": "Spanish Title"},
          name: 'NEW_ORDER',
          url:'https://vsb.sanity.studio',
          big_picture:'https://img.onesignal.com/tmp/53a40efa-9a8b-431f-a034-04525b8bed60.png'
          // send_after: 'string',
          // delayed_option: 'string',
          // delivery_time_of_day: 'string',
          // throttle_rate_per_minute: 0
        })
      };
      
      fetch('https://onesignal.com/api/v1/notifications', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
      
    } else {
      console.log(cashRes.error);
      if (cashRes.cartClear) {
        clearCart();
      }
      toast.error(cashRes.error, {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    if (!paymentMethod) {
      console.error('Payment method is required');
    } else {
      localStorage.setItem('paymentMethod', paymentMethod);
      // router.push(`/sanitypayorder?clearCart=1&_id=${sanityorderid}`);
      // router.push(`/api/sanitycashorders`);
    }
  };

  return (
    <div className="container px-2 sm:m-auto min-h-screen">
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Head>
        <title>Checkout - Vikas Sev Bhandar</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
        <meta name="description" content="Vikas Sev Bhandar is your one stop destination for the delicious Fresh namkeen ans snacks you always wanted . come shop now " />
  <meta property="og:title" content="Vikas Sev Bhandar" />
  <meta property="og:description" content="Vikas Sev Bhandar is your one stop destination for the delicious Fresh namkeen ans snacks you always wanted . come shop now " />
  <meta property="og:url" content="https://vsb.vercel.com/" />
  <meta property="og:type" content="website" />
      </Head>
      <Script
        type="application/javascript"
        crossorigin="anonymous"
        src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}
      />
      <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
      <h2 className="font-semibold text-xl">1. Delivery Details</h2>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              onChange={handleChange}
              //   value={name}
              value={sanityname}
              type="text"
              id="sanityname"
              //   name="name"
              name="sanityname"
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            {/* {user && user.token? <input
              value={user.email} */}
            {sanityuser && sanityuser.token ? (
              <input
                value={sanityuser.email}
                type="email"
                id="email"
                //   name="email"
                name="sanityemail"
                className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                readOnly
              />
            ) : (
              <input
                onChange={handleChange}
                value={sanityemail}
                //   value={email}
                type="email"
                id="email"
                name="sanityemail"
                //   name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            )}
          </div>
        </div>
      </div>

      <div className="px-2 w-full">
        <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">
            Address
          </label>
          <textarea
            onChange={handleChange}
            value={address}
            id="address"
            name="address"
            className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            cols="30"
            rows="2"
          ></textarea>
        </div>
      </div>

      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              10 Digit Phone Number
            </label>
            <input
              onChange={handleChange}
              placeholder="Your 10 digit phone number"
              value={phone}
              type="phone"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label
              htmlFor="pincode"
              className="leading-7 text-sm text-gray-600"
            >
              Pincode (Shipping only to India)
            </label>
            <input
              onChange={handleChange}
              value={pincode}
              type="number"
              id="pincode"
              name="pincode"
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">
              State
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="state"
              value={state}
              name="state"
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">
              District
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="city"
              value={city}
              name="city"
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>

      <h2 className="font-semibold text-xl ">2. Review Cart Items & Pay</h2>
      <div className="sideCart  bg-yellow-100 rounded-md p-6 m-2">
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length === 0 && (
            <div className="my-4 font-semibold">Your cart is empty!</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-5">
                  <div className="font-semibold">
                    {cart[k].name} ({cart[k].grams})
                  </div>
                  <div className=" font-semibold flex items-center justify-center text-lg w-1/3">
                    <AiFillMinusCircle
                      className="mx-3 cursor-pointer text-yellow-500"
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].grams
                        );
                      }}
                    />{' '}
                    {cart[k].qty}{' '}
                    <AiFillPlusCircle
                      onClick={() => {
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].grams
                        );
                      }}
                      className="mx-3 cursor-pointer text-yellow-500"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <span className="total font-bold">Subtotal: ₹{subTotal}</span>
        {/* <div className="pin mt-6 flex space-x-2 text-sm">
          <input
            onChange={onChangeCoupon}
            name="coupon"
            placeholder="Coupon Code"
            className="px-2 border-2 border-gray-400 rounded-md"
            type="text"
          />
          <button
            onClick={checkCouponAbitlity}
            className="flex ml-14 text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded"
          >
            Apply Coupon
          </button>
        </div> */}
        {/* {!service && service != null && (
                <div className="text-red-900 text-sm mt-3">
                  Sorry! We do not deliver to this pincode yet
                </div>
              )}
              {service && service != null && (
                <div className="text-green-900 text-sm mt-3">
                  Yay! this pincode is serviceable
                </div>
              )} */}
      </div>

      <form onSubmit={paymentmethodHandler}>
        <div
          className="mt-8 w-full mx-auto rounded-lg bg-white shadow-lg shadow-yellow-200  text-gray-700"
          style={{ maxWidth: '600px' }}
        >
          <div className="w-full pt-1 pb-5">
            <div className="bg-yellow-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
              <i className="mdi mdi-credit-card-outline text-center text-4xl">
                <BsCash />
                <SiPaytm />
              </i>
            </div>
          </div>
          <div className="mb-10">
            <h1 className="text-center font-bold text-xl uppercase">
              Choose Your Payment Method
            </h1>
          </div>
          <div className="mb-3 flex -mx-2 justify-center">
            <div className="px-2">
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="Payment Method"
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <FormControlLabel
                    label="Cash"
                    value="Cash"
                    control={<Radio />}
                  ></FormControlLabel>
                  {paymentMethod == 'Cash' && (
                    <div className="mx-4 ">
                      <div className="form-check flex items-center">
                        <button
                          onClick={() => setCash(true)}
                          disabled={disabled}
                          className="text-white disabled:bg-gray-300 bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#708281]/80 dark:focus:ring-[#FF9119]/40  mb-2 mr-2 p-8 "
                        >
                          <BsCash className="w-4 h-4 mr-2 -ml-1" />
                          Cash On Delivery
                        </button>
                        {/* <button
    onClick={() => setCash(true)}
     disabled={disabled}
   className="bg-yellow-300 mr-2 p-8 md:h-4 md:w-4 disabled:bg-gray-300" >
Cash On Delivery
      </button> */}
                      </div>
                    </div>
                  )}
                  OR
                  <FormControlLabel
                    label="PAYTM"
                    value="PAYTM"
                    control={<Radio />}
                  ></FormControlLabel>
                  {paymentMethod == 'PAYTM' && (
                    <div className="mx-1 my-2">
                      <Link passHref href={'/sanitycheckout'}>
                        <button
                          onClick={initiatePayment}
                          disabled={disabled}
                          className="disabled:bg-yellow-600 flex mr-2 text-white bg-yellow-400 border-0 py-2 px-4 focus:outline-none hover:bg-yellow-500 rounded text-sm"
                        >
                          <BsFillBagCheckFill className="m-1 " /> Pay ₹{' '}
                          {subTotal} (PAYTM)
                        </button>
                      </Link>
                    </div>
                  )}
                </RadioGroup>
              </FormControl>
            </div>
            {/* px-2 div above */}
          </div>
        </div>
        {/* 
       
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  label="Cash"
                  value="Cash"
                  control={<Radio />}
                ></FormControlLabel>
                {paymentMethod == 'Cash' && (
                  <div className="mx-4">
                    <div className="form-check flex items-center">
                      <button
                        onClick={() => setCash(true)}
                        disabled={disabled}
                        className="text-white disabled:bg-gray-300 bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40  mb-2 mr-2 p-8 "
                      >
                        <BsCash className="w-4 h-4 mr-2 -ml-1" />
                        Cash On Delivery
                      </button> */}
        {/* <button
    onClick={() => setCash(true)}
     disabled={disabled}
   className="bg-yellow-300 mr-2 p-8 md:h-4 md:w-4 disabled:bg-gray-300" >
Cash On Delivery
      </button> */}
        {/* </div>
                  </div>
                )}
                OR
                <FormControlLabel
                  label="PAYTM"
                  value="PAYTM"
                  control={<Radio />}
                ></FormControlLabel>
                {paymentMethod == 'PAYTM' && (
                  <div className="mx-1 my-2">
                    <Link passHref href={'/sanitycheckout'}>
                      <button
                        onClick={initiatePayment}
                        disabled={disabled}
                        className="disabled:bg-yellow-600 flex mr-2 text-white bg-yellow-400 border-0 py-2 px-4 focus:outline-none hover:bg-yellow-500 rounded text-sm"
                      >
                        <BsFillBagCheckFill className="m-1 " /> Pay ₹ {subTotal}{' '}
                        (PAYTM)
                      </button>
                    </Link>
                  </div>
                )}
              </RadioGroup>
            </FormControl>
          </ListItem>
        </List> */}
        {/* {Cash && (

)}  */}
      </form>
{/* <div className="flex row justify-between lg:items-center flex-col lg:flex-row">
  <div className="coupon mx-4 my-4 lg:mx-60">
    <h3 className="coupon mx-4 my-4 lg:mx-96 text-center">Apply Promo Code</h3>
    <div className="pin lg:mx-96 my-2 flex space-x-2 text-sm">
      <input type="text" className="px-2 border-2 border-gray-400 rounded-md" placeholder="Enter Code (Only Prepaid)" value={coupon}/>
      <button className="text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded disabled:bg-yellow-200">Apply</button>
    </div>
  </div>
</div> */}
    </div>
  );
};

export default Checkout;
