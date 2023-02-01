import React, { useState } from 'react';
import ProductItem from '../../../../components/ProductItem';
import client from '../../../../utils/client';
import { urlFor, urlForThumbnail } from '../../../../utils/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error from 'next/error';
import Head from 'next/head';

const Slug = ({
  buyNow,
  addToCart,
  sanityvaritem,
  sanityitem,
  sanityproductssvar,
  error,
  sanityvariants,
}) => {
  const { slug, image, name, description, price, AvailableQty, size,grams } =
    sanityproductssvar;
    const id = sanityproductssvar._id;
  const [index, setIndex] = useState(0);
  const router = useRouter();
 
  const [pin, setPin] = useState();
  const [service, setService] = useState();



  const checkServiceAbitlity = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();
    if (Object.keys(pinJson).includes(pin)) {
      setService(true);
      toast.success('Your pincode is serviable', {
        position: 'bottom-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setService(false);
      toast.error('Sorry, Your pincode is not serviable!', {
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

  const onChangePin = (e) => {
    setPin(e.target.value);
  };

  const refreshVariant = (newSize) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/sanitySlug/${name
      .replace(/\s/g, '')
      .toLowerCase()}`;
    router.push(url);
  };
  const sameVariant = (newSize) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/sanitySlug/variants/${name
      .replace(/\s/g, '')
      .toLowerCase()}-${newSize}`;
    router.push(url);
  };

  if (error == 404) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden min-h-screen">
        <ToastContainer
          position="bottom-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
          <Head>
        <title>Buy {name} - Vikas Sev Bhandar</title>
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

        <div className="container px-5 py-16 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
           
<div>
          <div className="product-detail-container">
          <div>
          <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img 
                key={i}
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        </div>
        </div>


            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                Vikas Sev Bhandar
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {name}({grams})
              </h1>
              <div className="text-xs md:text-sm">
  <div className="leading-relaxed mb-2">{description}</div>
              </div>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              {AvailableQty <= 5 && AvailableQty != 0 && (
                  <span className=" text-red-500 font-medium text-md ">
                    Hurry Up Only{' '}
                    <span className="font-bold ">{AvailableQty}</span> Packets
                    Left
                  </span>
                )}
               <div className="flex ml-6 items-center">
                  <span className="mr-3">Choose Your Size</span>
                  <div className="relative">
                    <div className="group inline-block">
  <button
    className="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center min-w-32"
  >
    
    <span className="pr-1 font-semibold flex-1">{grams}</span>
    <span>
      <svg
        className="fill-current h-4 w-4 transform group-hover:-rotate-180
        transition duration-150 ease-in-out"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
        />
      </svg>
    </span>
  </button>
  <ul
    className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
  transition duration-150 ease-in-out origin-top min-w-32"
  >
    {size[0] && (
    <option onClick={(e)=>{ 
      refreshVariant(e.target.value);
    }} className="rounded-sm px-3 cursor-pointer py-1 hover:bg-gray-100">{size[0]}</option>
    )}
    {size[1] && (
    <option onClick={(e)=>{ 
      sameVariant(e.target.value);
    }} className="rounded-sm px-3 cursor-pointer py-1 hover:bg-gray-100">{size[1]}</option>
    )}
    {size[2] && (   
    sanityproductssvar.size.includes('1kg') && (
    <option onClick={(e)=>{ 
     sameVariant(e.target.value);
    }} className="rounded-sm px-3 cursor-pointer py-1 hover:bg-gray-100">{size[2]}</option>
    )
    )}
  </ul>
</div>
                  </div>
                </div>
              </div>
              <div className="flex">
                {AvailableQty > 0 && (
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ₹{price}
                  </span>
                )}
                {AvailableQty <= 0 && (
                  <span className="title-font font-medium text-2xl text-gray-900">
                    Out of stock!
                  </span>
                )}
                <button
                  disabled={AvailableQty <= 0}
                  onClick={() => buyNow(slug.current, 1, price, name, size[0],id, AvailableQty,grams, slug.current)}
                  className="flex ml-8 text-white bg-yellow-500 disabled:bg-yellow-300 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-yellow-600 rounded"
                >
                  Buy Now
                </button>
                <button
                  disabled={AvailableQty <= 0}
                  onClick={() =>
                    addToCart(slug.current, 1, price, name, size[0],id, AvailableQty,grams, slug.current)
                  }
                  className="flex ml-4 text-white bg-yellow-500 disabled:bg-yellow-300 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-yellow-600 rounded"
                >
                  Add to cart
                </button>
                
              </div>
              <div className="pin mt-6 flex space-x-2 text-sm">
                <input
                  onChange={onChangePin}
                  placeholder="Enter your Pincode"
                  className="px-2 border-2 border-gray-400 rounded-md"
                  type="text"
                />
                <button
                  onClick={checkServiceAbitlity}
                  className="flex ml-14 text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded"
                >
                  Check
                </button>
              </div>
              {!service && service != null && (
                <div className="text-red-900 text-sm mt-3">
                  Sorry! We do not deliver to this pincode yet
                </div>
              )}
              {service && service != null && (
                <div className="text-green-900 text-sm mt-3">
                  Yay! this pincode is serviceable
                </div>
              )}
              
            </div>
          
          </div>
        </div>
      </section>
    
     
      

       
    </>
  );
};
export const revalidate = 30;

export const getStaticPaths = async () => {
  const productvarquery = `*[_type == "sanityproductvar"]{
   slug {
    current
   } 
  }`;

  const sanityvaritem = await client.fetch(productvarquery);

  const paths = sanityvaritem.map((sanityproductssvar) => ({
    params: {
      slug: sanityproductssvar.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
 

  const productvarquery = `*[_type == "sanityproductvar" && slug.current == '${slug}'][0]`;
  const sanityproductsvarquery = `*[_type == "sanityproductvar"]`;

  const sanityproductssvar = await client.fetch(productvarquery);
  const sanityvaritem = await client.fetch(sanityproductsvarquery);

  const productquery = `*[_type == "sanityproduct" && slug.current == '${slug}'][0]`;
  const sanityproductsquery = `*[_type == "sanityproduct"]`;

  const sanityproductss = await client.fetch(productquery);
  const sanityitem = await client.fetch(sanityproductsquery);
  

  return {
    props: {
      sanityvaritem,
      sanityproductssvar,
      sanityitem,
      sanityproductss,

    },
  };
};

export default Slug;
