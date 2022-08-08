import React from 'react';
import Link from 'next/link';
import Product from '../models/Product';
import connectDB from '../middleware/mongoose';
import mongoose from 'mongoose';
import Head from 'next/head';
import ProductItem from '../components/ProductItem';
import client from '../utils/client';


const Michchar = ({  sanityproductss  }) => {
  return (
    <div>
      <Head>
    <title>Buy Michchar -  Vikas Sev Bhandar</title>
    <meta
      name="viewport"
      content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
    />
  </Head>
      {/* <section className="text-gray-600 body-font min-h-screen">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center mx-5">
            {Object.keys(products).length ===0 && <p>soory , saara michchar out of stock hai .naya stock jald aata hi hoga . stay tuned  </p>}
            {Object.keys(products).map((item) => {
              return (
                <Link passHref={true} key={products[item]._id} href={`/product/${products[item].slug}`}>
                  <div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer  shadow-lg m-5">
                    <a className="block relative  rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="m-auto  h-[30vh]  md:h-[36vh] block"
                        src={products[item].img}
                      />
                    </a>
                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        Michchar
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {products[item].title}
                      </h2>
                      <p className="mt-1">₹{products[item].price}</p>
                      <div className="mt-1">
                      {products[item].size.includes('250g') && <span className='border border-gray-300 px-1 mx-1'>250g </span>}
                    {products[item].size.includes('500g') && <span className='border border-gray-300 px-1 mx-1'>500g </span>}
                    {products[item].size.includes('1kg') && <span className='border border-gray-300 px-1 mx-1'>1kg </span>}
                        </div>
                        <div className="mt-1">
                    {products[item].color.includes('Red') && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('Green') && <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('Yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-300 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('Blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes('Purple') && <button className="border-2 border-gray-300 ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                  </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section> */}
       <div className="flex flex-wrap justify-center gap-5 ">
       {Object.keys(sanityproductss).length ===0 && <p>soory , saara michchar  out of stock hai .naya stock jald aata hi hoga . stay tuned  </p>}
        {sanityproductss.map((newsanityitem) => (
    
            <ProductItem key={newsanityitem.slug.current} newsanityitem={newsanityitem} />
      
        ))}
      </div>

    </div>
  );
};

export async function getServerSideProps(context) {
  // if (!mongoose.connections[0].readyState) {
  //   await mongoose.connect(process.env.MONGO_URI);
  // }
  // let products = await Product.find({category : 'michchar'});
  // let michchars = {};
  // for (let item of products) {
  //   if (item.title in michchars) {
  //     if (
  //       !michchars[item.title].color.includes(item.color) &&
  //       item.availableQty > 0
  //     ) {
  //       michchars[item.title].color.push(item.color);
  //     }
  //     if (
  //       !michchars[item.title].size.includes(item.size) &&
  //       item.availableQty > 0
  //     ) {
  //       michchars[item.title].size.push(item.size);
  //     }
  //   } else {
  //     michchars[item.title] = JSON.parse(JSON.stringify(item));
  //     if (item.availableQty > 0) {
  //       michchars[item.title].color = [item.color];
  //       michchars[item.title].size = [item.size];
  //     }
  //   }
  // }
  

  const productquery = '*[_type == "sanityproduct"&& category == "michchar"]';
  const sanityproductss = await client.fetch(productquery);

  return {
    props: { 
      // products: JSON.parse(JSON.stringify(michchars)) , 
      sanityproductss }, // will be passed to the page component as props
  };
}

export default Michchar;
