/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
// import Order from '../models/Order';
// import mongoose from 'mongoose';
import Head from 'next/head';
import client from '../utils/client';
import { runFireworks } from '../utils/fireworks';
import axios from 'axios';
import Image from 'next/image';
import { Link } from '@mui/material';
import { MdOutlineContentCopy } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';

const MyOrder = ({ sanityorder, clearCart }) => {
  const router = useRouter();
  const tooltip = () => {
    navigator.clipboard.writeText(sanityorder.oid);
    toast.success(`Order Id Copied To Clipboard `, {
      position: 'bottom-center',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const sanityproductss = sanityorder.sanityorderitems;
  const [date, setDate] = useState();
  useEffect(() => {
    const d = new Date(sanityorder.createdAt);
    setDate(d);
    if (router.query.clearCart == 1) {
      clearCart();
    }

    // runFireworks();
  }, []);
  // const ProductUpdates = async () => {
  // const generateInvoice = e => {
  //   e.preventDefault();
  //   // send a post request with the name to our API endpoint
  //   const fetchData = async () => {
  //     const data = await fetch('http://localhost:3000/api/generate-invoice', {
  //       method: 'POST',
  //       body: JSON.stringify(" sanityname" ),
  //     });
  //     // convert the response into an array Buffer
  //     return data.arrayBuffer();
  //   };

  //   // convert the buffer into an object URL
  //   const saveAsPDF = async () => {
  //     window.print();
  //   };

  //   saveAsPDF();
  // };

  //   // const sanityuserinfo = JSON.parse(localStorage.getItem('sanityuserinfo'));
  //   try {
  //     const { sanityorder2 } = await axios.put(
  //       '/api/sanityProductUpdate',
  //       {
  //         AvailableQty: sanityproductss.qty,
  //       }
  //       // { headers: { authorization: `Bearer ${sanityuserinfo.token}` } }
  //     );
  //     alert('Product updated successfully');
  //   } catch (err) {
  //     alert(err);
  //   }
  // };

  // const generateInvoice = async () => {
  //     window.print();
  //   };
  return (
    <div>
      <Head>
        <title>Order - Vikas Sev Bhandar</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
        <meta
          name="description"
          content="Vikas Sev Bhandar is your one stop destination for the delicious Fresh namkeen ans snacks you always wanted . come shop now "
        />
        <meta property="og:title" content="Vikas Sev Bhandar" />
        <meta
          property="og:description"
          content="Vikas Sev Bhandar is your one stop destination for the delicious Fresh namkeen ans snacks you always wanted . come shop now "
        />
        <meta property="og:url" content="https://vsb.vercel.com/" />
        <meta property="og:type" content="website" />
      </Head>
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
      {sanityorder.isPaid && (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  Vikas Sev Bhandar
                </h2>
                <h1 className="text-gray-900 flex tex-xl md:text-3xl title-font font-medium mb-4">
                  Order Id : #{sanityorder.oid}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 sm:text-sm mt-1 w-6 shadow-md shadow-slate-700 active:translate-y-1 hover:cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    onClick={() => tooltip()}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                </h1>
                <p className="leading-relaxed mb-4">
                  Yayy! Your Order has been successfully placed .
                </p>
                <p className="leading-relaxed mb-4">
                  Order Placed On{' '}
                  {date &&
                    date.toLocaleDateString('en-IN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                </p>
                <p>
                  Your Payment status is{' '}
                  <span className="font-semibold text-slate-700">
                    {sanityorder.isPaid ? `PAID` : 'NOT PAID'}
                    {/* {'   '}
                  {sanityorder.codStatus ? `COD(Cash On delivery)` : `BY PAYTM`} */}
                  </span>
                </p>

                <div className="flex mb-4">
                  <a className="flex-grow py-2 text-lg px-1">Description</a>
                  <a className="flex-grow text-center border-gray-300 py-2 text-lg px-1">
                    Quantity
                  </a>
                  <a className="flex-grow text-center border-gray-300 py-2 text-lg px-1">
                    Item Total
                  </a>
                </div>
                {/* <button onClick={ProductUpdates}>p</button> */}

                {Object.keys(sanityproductss).map((key) => {
                  return (
                    <div
                      key={key}
                      className="flex border-t border-gray-200 py-2"
                    >
                      <span className="text-gray-500">
                        {sanityproductss[key].name}({sanityproductss[key].grams}
                        )
                      </span>
                      <span className="m-auto text-gray-900">
                        {sanityproductss[key].qty}
                      </span>
                      <span className="m-auto text-gray-900">
                        ₹{sanityproductss[key].price} X{' '}
                        {sanityproductss[key].qty} = ₹
                        {sanityproductss[key].price * sanityproductss[key].qty}
                      </span>
                    </div>
                  );
                })}

                <div className="flex flex-col my-8">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    Subtotal : ₹{sanityorder.subTotal}
                  </span>
                  <Link href="/trackyourorder">
                    <div className="my-6">
                      <button className="flex mx-0 text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">
                        Track your order
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                src="https://cdn3d.iconscout.com/3d/premium/thumb/delivery-boy-doing-online-food-delivery-on-scooter-5454190-4553157.png"
              />
            </div>
          </div>
        </section>
      )}
      {sanityorder.codStatus && (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  Vikas Sev Bhandar
                </h2>
                <h1 className="text-gray-900 tex-xl md:text-3xl flex title-font font-medium mb-4">
                  Order Id: #{sanityorder.oid}
                  {/* <MdOutlineContentCopy className="text-md m-1"/> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 sm:text-sm mt-1 w-6 shadow-md shadow-slate-700 active:translate-y-1 hover:cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    onClick={() => tooltip()}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                </h1>

                <p className="leading-relaxed mb-4">
                  Yayy! Your Order has been successfully placed .
                </p>
                <p className="leading-relaxed mb-4">
                  Order Placed On{' '}
                  {date &&
                    date.toLocaleDateString('en-IN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                </p>
                <p>
                  Your Payment status is{' '}
                  <span className="font-semibold text-slate-700">
                    {sanityorder.STATUS}
                    {/* {'   '}
                  {sanityorder.codStatus ? `COD(Cash On delivery)` : `BY PAYTM`} */}
                  </span>
                </p>

                {Object.keys(sanityproductss).map((key) => {
                  return(
                  <table  key={key} className="min-w-full">
                    <thead className="bg-white border-b">
                      <tr>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-2 md:px-6 py-4 text-left"
                        >
                          Item
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-2 md:px-6 py-4 text-left"
                        >
                          Quantity
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-2 md:px-6 py-4 text-left"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-2 md:px-6 py-4 text-left"
                        >
                          Link
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                        <td className="px-2 md:px-6 py-4  text-sm font-medium text-gray-900 whitespace-pre-wrap">
                          {sanityproductss[key].name}(
                          {sanityproductss[key].grams})
                        </td>
                        <td className="px-2 md:px-6 py-4  text-sm font-medium text-gray-900 whitespace-pre-wrap">
                          {sanityproductss[key].qty}
                        </td>
                        <td className="px-2 md:px-6 py-4  text-sm font-medium text-gray-900 whitespace-pre-wrap">
                          ₹{sanityproductss[key].price} X{' '}
                          {sanityproductss[key].qty} = ₹
                          {sanityproductss[key].price *
                            sanityproductss[key].qty}
                        </td>
                        <td className="px-2 md:px-6 py-4  text-sm font-medium text-gray-900 whitespace-pre-wrap">
                          <Link href={`/product/sanitySlug/${sanityproductss[key].slug}`}>
                            <button className="bg-yellow-500 px-2 py-1 pb-1.5 rounded-md text-sm text-white cursor-pointer">
                              Link
                            </button>
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  )
                })}
                {/* <div className="flex mb-4">
                  <a className="flex-grow py-2 text-lg px-1">Description</a>
                  <a className="flex-grow text-center border-gray-300 py-2 text-lg px-1">
                    Quantity
                  </a>
                  <a className="flex-grow text-center border-gray-300 py-2 text-lg px-1">
                    Item Total
                  </a>
                </div> */}
                {/* <button onClick={ProductUpdates}>p</button> */}

                {/* {Object.keys(sanityproductss).map((key) => {
                  return (
                    <div
                      key={key}
                      className="flex border-t border-gray-200 py-2"
                    >
                      <span className="text-gray-500">
                        {sanityproductss[key].name}({sanityproductss[key].grams}
                        )
                      </span>
                      <span className="m-auto text-gray-900">
                        {sanityproductss[key].qty}
                      </span>
                      <span className="m-auto text-gray-900">
                        ₹{sanityproductss[key].price} X{' '}
                        {sanityproductss[key].qty} = ₹
                        {sanityproductss[key].price * sanityproductss[key].qty}
                      </span>
                    </div>
                  );
                })} */}

                <div className="flex flex-col my-8">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    Subtotal : ₹{sanityorder.subTotal}
                  </span>
                  <div className="my-6">
                    <Link href="/trackyourorder">
                      <button className="flex  mx-0 text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">
                        Track your order
                      </button>
                    </Link>
                  </div>

                  {/* <div  className=" w-5/4 flex justify-content: space-between">
          <div  className="flex flex-col align-items-center">
            <Image src="/paid.png" width={30} height={30} alt="" />
            <span>Payment</span>
            <div className="checkedIcon">
              <Image
                 className="checkedIcon"
                src="/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div  className="display: flex
  flex-direction: column
  align-items: center
  animation: inProgress 1s ease infinite alternate">
            <Image src="/bake.png" width={30} height={30} alt="" />
            <span>Preparing</span>
            <div  className="checkedIcon">
              <Image
                 className="checkedIcon"
                src="/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div  className="statusClass(2)">
            <Image src="/bike.png" width={30} height={30} alt="" />
            <span>On the way</span>
            <div  className="checkedIcon">
              <Image
                 className="checkedIcon"
                src="/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div  className="statusClass(3)">
            <Image src="/delivered.png" width={30} height={30} alt="" />
            <span>Delivered</span>
            <div  className="checkedIcon">
              <Image
                 className="checkedIcon"
                src="/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
        </div> */}
                </div>
              </div>

              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                src="https://cdn3d.iconscout.com/3d/premium/thumb/delivery-guy-delivered-parcel-2937681-2426380.png"
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  // if (!mongoose.connections[0].readyState) {
  //   await mongoose.connect(process.env.MONGO_URI);
  // }
  // let order = await Order.findById(context.query.id);
  //  let sanityorder = await client.fetch(`*[_type == "sanityorder" && oid == oid]| order(_createdAt desc) [0] .oid`);
  let sanityorder = await client.fetch(
    `*[_type == "sanityorder" && _id == $id][0]`,
    {
      id: context.query._id,
    }
  );
  return {
    props: {
      // order: JSON.parse(JSON.stringify(order)),
      sanityorder: JSON.parse(JSON.stringify(sanityorder)),
    }, // will be passed to the page component as props
  };
}

export default MyOrder;
