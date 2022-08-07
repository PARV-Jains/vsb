import React, { useState ,useEffect} from 'react';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import Link from 'next/link';
import { BsFillBagCheckFill } from 'react-icons/bs';
import Head from 'next/head';
import Script from 'next/script';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = ({ cart,clearCart, subTotal, addToCart, removeFromCart }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sanityname, setSanityname] = useState('');
  const [sanityemail, setSanityemail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [disabled, setDisabled] = useState(true);
const [user, setUser] = useState({value : null})
const [sanityuser, setSanityuser] = useState({value : null})
useEffect(() => {
  const myuser = JSON.parse(localStorage.getItem('myuser'))
  if(myuser && myuser.token){
    setUser(myuser)
    setEmail(myuser.email);
    fetchData(myuser.token)
  }
  // const sanityuserinfo = JSON.parse(localStorage.getItem('sanityuserinfo'))
  // if(sanityuserinfo && sanityuserinfo.token){
  //   setSanityuser(sanityuserinfo)
  //   setSanityemail(sanityuserinfo.email);
  //   fetchData(sanityuserinfo.token)

  // }
}, [fetchData])


useEffect(() => {

  if (
    name.length > 3 &&
    email.length > 3 &&
    phone.length > 3 &&
    address.length > 3 &&
    pincode.length > 3
  ) {
    setDisabled(false);
  } else {
    setDisabled(true);
  }
}, [name,email,phone,address,pincode])
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

const fetchData = async(token) => {
  let data = {token: token}
  let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: 'POST', // or 'PUT'
      headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    let res = await a.json()
    setName(res.name)
    // setSanityname(res.name)
    setAddress(res.address)
    setPincode(res.pincode)
    setPhone(res.phone)
    getPincode(res.pincode)
}
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

const getPincode = async(pin) => {
  let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
  let pinJson = await pins.json();
  if (Object.keys(pinJson).includes(pin)) {
    setState(pinJson[pin][1]);
    setCity(pinJson[pin][0]);
  } else {
    setState('');
    setCity('');
  }
}

  const handleChange = async (e) => {
   
    if (e.target.name == 'name') {
      setName(e.target.value);
      // setSanityname(e.target.value);
    } else if (e.target.name == 'email') {
      setEmail(e.target.value);
      // setSanityemail(e.target.value);
    } else if (e.target.name == 'phone') {
      setPhone(e.target.value);
    } else if (e.target.name == 'address') {
      setAddress(e.target.value);
    } else if (e.target.name == 'pincode') {
      setPincode(e.target.value);
      if (e.target.value.length == 6) {
        getPincode(e.target.value)
      }
        else {
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

  const initiatePayment = async () => {
    let oid = Math.floor(Math.random() * Date.now());
    //get a transaction token
    const data = {
      cart,
      subTotal,
      oid,
      email: email,
      // email:sanityemail,
      name,
      // sanityname,
      address,
      pincode,
      phone,
    };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    let txnRes = await a.json()
     if (txnRes.success) {
      let txnToken = txnRes.txnToken

      var config = {
        root: '',
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

      window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
          // after successfully updating configuration, invoke JS Checkout
          window.Paytm.CheckoutJS.invoke();
        })
        .catch(function onError(error) {
          console.log('error => ', error);
        });
    } 
    else {
      console.log(txnRes.error)
      if(txnRes.cartClear){
        clearCart()
      }
      toast.error(txnRes.error, {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

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
        <title>Checkout -  Vikas Sev Bhandar</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
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
              value={name}
              // value={sanityname}
              type="text"
              id="sanityname"
              name="name"
              // name="sanityname"
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
{user && user.token? <input
              value={user.email}
//  {sanityuser && sanityuser.token? <input
              //  value={sanityuser.email}
              type="email"
              id="email"
              name="email"
              // name="sanityemail"
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              readOnly  /> : 
            <input
              onChange={handleChange}
              // value={sanityemail}
              value={email}
              type="email"
              id="email"
              // name="sanityemail"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />}
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
                    {cart[k].name}({cart[k].size}/{cart[k].variant})
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
                          cart[k].variant
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
                          cart[k].variant
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
      </div>
      <div className="mx-1 my-2">
        <Link passHref href={'/checkout'}>
          <button
            onClick={initiatePayment}
            disabled={disabled}
            className="disabled:bg-yellow-600 flex mr-2 text-white bg-yellow-400 border-0 py-2 px-4 focus:outline-none hover:bg-yellow-500 rounded text-sm"
          >
            <BsFillBagCheckFill className="m-1 " /> Pay ₹ {subTotal}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
