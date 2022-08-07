import { useRouter } from 'next/router';
import React , {useEffect,useState} from 'react';
import Order from '../models/Order';
import mongoose from 'mongoose';
import Head from 'next/head';


const MyOrder = ({ order,clearCart }) => {




  
  const router = useRouter()
  const products = order.products;
  const [date, setDate] = useState()
  useEffect(() => { 

    const d = new Date(order.createdAt)
    setDate(d)
    if(router.query.clearCart == 1){
      clearCart()
    }
  }, [])

  return (
    <div>
      <Head>
    <title>Order -  Vikas Sev Bhandar</title>
    <meta
      name="viewport"
      content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
    />
  </Head>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                Vikas Sev Bhandar
              </h2>
              <h1 className="text-gray-900 tex-xl md:text-3xl title-font font-medium mb-4">
                Order Id : #{order.orderId}
              </h1>
              <p className="leading-relaxed mb-4">
               Yayy! Your Order has been successfully placed .
               </p>
              <p className="leading-relaxed mb-4">
Order Placed On {date && date.toLocaleDateString("en-IN",{weekday:'long',year:'numeric',month:'long',day:'numeric'})}              
</p>
                <p>
                  Your Payment status is{' '}
                  <span className="font-semibold text-slate-700">{order.status}</span>
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

              {Object.keys(products).map((key) => {
                return (
                  <div key={key} className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">
                      {products[key].name}({products[key].size}/
                      {products[key].variant})
                    </span>
                    <span className="m-auto text-gray-900">
                      {products[key].qty}
                    </span>
                    <span className="m-auto text-gray-900">
                      ₹{products[key].price} X {products[key].qty} = ₹{products[key].price * products[key].qty}
                    </span>
                  </div>
                );
              })}

              <div className="flex flex-col my-8">
                <span className="title-font font-medium text-2xl text-gray-900">
                  Subtotal : ₹{order.amount}
                </span>
                <div className="my-6">
                  <button className="flex mx-0 text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">
                    Track your order
                  </button>
                </div>
              </div>
            </div>
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src="https://www.prinitifoods.com/blog/wp-content/uploads/2022/01/4.5.jpg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let order = await Order.findById(context.query.id);

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    }, // will be passed to the page component as props
  };
}

export default MyOrder;
