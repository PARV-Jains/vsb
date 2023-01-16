import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';

const Orders = () => {
  const router = useRouter();
  const [sanityorders, setSanityorders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      let a = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/sanitymyorders`,
        {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify({token :JSON.parse(localStorage.getItem('myuser')).token}),
          body: JSON.stringify({
            token: JSON.parse(localStorage.getItem('sanityuserinfo')).token,
          }),
        }
      );
      let res = await a.json();
      setSanityorders(res.sanityorders);
    };
    if (!localStorage.getItem('sanityuserinfo')) {
      router.push('/');
    } else {
      fetchOrders();
    }

    // const secfetchOrders = async () => {
    //   try {
    //     const { data } = await axios.get(`/api/sanitymyorders`);
    //   } catch (err) {
    //    alert(err.message);
    //   }
    // };
    // secfetchOrders();
  }, [router]);

  return (
    <div className="min-h-screen">
      <Head>
        <title>Your Orders - Vikas Sev Bhandar</title>
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
      <div className="container mx-auto">
        <h1 className="font-semibold text-2xl text-center p-6">My Orders</h1>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-white border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        #Order Id
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(sanityorders).map((od) => (
                      <tr
                        key={od}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {sanityorders[od].oid}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {sanityorders[od].sanityemail}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {sanityorders[od].subTotal}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <Link
                            href={'/sanitypayorder?_id=' + sanityorders[od]._id}
                          >
                            {' '}
                            Details{' '}
                          </Link>
                        </td>
                      </tr>
                    ))}
                    {/* {Object.keys(sanityorders).map((item)=>( */}
                    {/* {Object.keys(sanityorders).map((s) => {
                      return (
                <tr key={s} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sanityorders.oid}</td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {sanityorders.sanityemail}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {sanityorders.subTotal}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <Link href={'/sanitypayorder?_id=' + sanityorders._id}> Details </Link>
                      </td>
                    </tr>
                      )
})} */}
                    {/* ))} */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
