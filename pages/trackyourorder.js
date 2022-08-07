import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import client from '../utils/client';
import { toast, ToastContainer } from 'react-toastify';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Trackyourorder = () => {
  const [orderid, setOrderid] = useState('');

  const handleChange = async (e) => {
    if (e.target.name == 'orderids') {
      setOrderid(e.target.value);
    }
  };
  const status = 0;

  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    // if (trackingdata[0].sanitydeliverystatus[0]) return styles.done;
    if (index - status > 1) return styles.undone;
  };

  const [state, setState] = useState({
    trackingdata: [],
    error: '',
    loading: true,
  });
  const { loading, trackingdata, error } = state;

  const fetchOrderData = async () => {
    try {
      let Trackingid = '*[_type == "sanityorder"';
      Trackingid += ` && oid == ${orderid} `;
      Trackingid += `]`;
      const trackingdata = await client.fetch(Trackingid);
      setState({ trackingdata, loading: false });
    } catch (err) {
      setState({ error: err.message, loading: false });
    }
    if (
      !trackingdata == true ||
      !orderid == trackingdata ||
      trackingdata.length == 0
    ) {
      toast.error(`Please Enter Your Valid Order Id `, {
        position: 'bottom-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success(`order tracked successfully`, {
        position: 'bottom-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  // console.log(trackingdata[0].sanitydeliverystatus)

  return (
    <div>
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
        <title>Track Your Order - Vikas Sev Bhandar</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>

      <div className="min-h-screen flex items-start justify-center pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="/img2.png"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Track Your Order
            </h2>

            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your Order Id Here
            </p>
          </div>

          <div className="px-2 w-90">
            <div className="mb-4">
              <label
                htmlFor="orderids"
                className="leading-7 text-sm text-gray-600"
              >
                Enter Your Order Id Here
              </label>
              <input
                onChange={handleChange}
                value={orderid}
                type="number"
                id="orderids"
                name="orderids"
                className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div>
            {!trackingdata ? (
              <button
                onClick={fetchOrderData}
                type="submit"
                className="my-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-yellow-500 group-hover:text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Confirm
              </button>
            ) : trackingdata ? (
              <div>
                {trackingdata[0] && (
                  <div className={statusClass(0)}>
                    {trackingdata[0].sanitydeliverystatus ? (
                      <Image src="/paid.png" width={30} height={30} alt="" />
                    ) : (
                      !trackingdata[0].sanitydeliverystatus && (
                        <span className="animate-pulse">
                          Waiting for Payment
                        </span>
                      )
                    )}
                    <span>{trackingdata[0].sanitydeliverystatus ? trackingdata[0].sanitydeliverystatus[0] :''}</span>
                    <div className={styles.checkedIcon}>
                      <Image
                        className={styles.checkedIcon}
                        src="/checked.png"
                        width={20}
                        height={20}
                        alt=""
                      />
                    </div>
                  </div>
                )}
                {trackingdata[0] && (
                  <div className={statusClass(0)}>
                    {trackingdata[0].sanitydeliverystatus ? (
                      <Image src="/bake.png" width={30} height={30} alt="" />
                    ) : (
                      !trackingdata[0].sanitydeliverystatus && (
                        <span className="animate-pulse">
                          Waiting for Baking
                        </span>
                      )
                    )}
                    <span>{trackingdata[0].sanitydeliverystatus ? trackingdata[0].sanitydeliverystatus[1] : ''}</span>
                    <div className={styles.checkedIcon}>
                      <Image
                        className={styles.checkedIcon}
                        src="/checked.png"
                        width={20}
                        height={20}
                        alt=""
                      />
                    </div>
                  </div>
                )}
                {trackingdata[0] && (
                  <div className={statusClass(0)}>
                    {trackingdata[0].sanitydeliverystatus ? (
                      <Image src="/bike.png" width={30} height={30} alt="" />
                    ) : (
                      !trackingdata[0].sanitydeliverystatus && (
                        <span className="animate-pulse">
                          Waiting for Bike Delivery
                        </span>
                      )
                    )}
                    <span>{trackingdata[0].sanitydeliverystatus ? trackingdata[0].sanitydeliverystatus[2] : ''}</span>
                    <div className={styles.checkedIcon}>
                      <Image
                        className={styles.checkedIcon}
                        src="/checked.png"
                        width={20}
                        height={20}
                        alt=""
                      />
                    </div>
                  </div>
                )}
                {trackingdata[0] && (
                  <div className={statusClass(0)}>
                    {trackingdata[0].sanitydeliverystatus ? (
                      <Image
                        src="/delivered.png"
                        width={30}
                        height={30}
                        alt=""
                      />
                      
                    ) : (
                      !trackingdata[0].sanitydeliverystatus && (
                        <span className="animate-pulse">
                          Waiting for delivery{' '}
                        </span>
                      )
                    )}
                    <span>{trackingdata[0].sanitydeliverystatus ? trackingdata[0].sanitydeliverystatus[3] : ''}</span>
                    <div className={styles.checkedIcon}>
                      <Image
                        className={styles.checkedIcon}
                        src="/checked.png"
                        width={20}
                        height={20}
                        alt=""
                      />
                    </div>
                  </div>
                )}
                <button
                  onClick={fetchOrderData}
                  type="submit"
                  className="my-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-yellow-500 group-hover:text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Confirm
                </button>
              </div>
            ) : (
              <button
                onClick={fetchOrderData}
                type="submit"
                className="my-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-yellow-500 group-hover:text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                ERROR BUTTON
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trackyourorder;
