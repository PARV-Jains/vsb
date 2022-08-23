import React, { useState } from 'react';
import ProductItem from '../../../components/ProductItem';
import client from '../../../utils/client';
import { urlFor, urlForThumbnail } from '../../../utils/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Script from 'next/script';

// import mongoose from 'mongoose';
// import Product from '../../models/Product';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error from 'next/error';
import Head from 'next/head';

const Slug = ({
  buyNow,
  addToCart,
  // addSanityToCart,
  sanityitem,
  sanityproductss,
  error,
  sanityvariants,
  sanityproductssvar,
  sanityvaritem
}) => {
  const {
    slug,
    image,
    name,
    description,
    price,
    AvailableQty,
    size,
    grams
  } = sanityproductss;

  const id = sanityproductss._id;
  const [index, setIndex] = useState(0);
  const router = useRouter();
  // const { slug } = router.query;
  //  const [color, setColor] = useState();
  // const [size, setSize] = useState();
  const [pin, setPin] = useState();
  const [service, setService] = useState();

  // useEffect(() => {
  //   if (!error) {
  //     // setColor(product.color);
  //     setSize(sanityproductss.size);
  //   }
  // }, [router.query,error]);

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
      // <Script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async></Script>
      
    }
   
  };

  const onChangePin = (e) => {
    setPin(e.target.value);
  };

  const refreshVariant = async(newSize) =>{
   
 
    let url = `${
      process.env.NEXT_PUBLIC_HOST
    }/product/sanitySlug/variants/${name
      .replace(/\s/g, '')
      .toLowerCase()}-${newSize}`;
    // let url = `${
    //   process.env.NEXT_PUBLIC_HOST
    // }/product/sanitySlug/${variants[0].slug.current
    //   .replace(/\s/g, '')
    //   .toLowerCase()}-${newSize}`;

  
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
        <div className="container  px-5 py-16 mx-auto">
          <div className="lg:w-4/5  mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto px-24  object-cover object-top rounded "
              src={urlFor(image && image[index])}
            />

            <div className="lg:w-1/2 product-detail-desc w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                Vikas Sev Bhandar
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {name}({grams})
              </h1>
              {/* <div className="flex mb-4">
            <span className="flex items-center">
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 text-yellow-500"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 text-yellow-500"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 text-yellow-500"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 text-yellow-500"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 text-yellow-500"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <span className="text-gray-600 ml-3">4 Reviews</span>
            </span>
            <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
              <a className="text-gray-500">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a className="text-gray-500">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a className="text-gray-500">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>
              </a>
            </span>
          </div> */}
              <p className="leading-relaxed">{description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                {/* <div className="flex">
              <span className="mr-3">Color</span>
              {Object.keys(variants).includes('Red') &&
                Object.keys(variants['Red']).includes(size) && (
                  <button
                    onClick={() => {
                      refreshVariant(size, 'Red');
                    }}
                    className={`border-2  bg-red-700 rounded-full w-6 h-6 focus:outline-none ${
                      color === 'Red' ? 'border-black' : 'border-gray-300'
                    }`}
                  ></button>
                )}

              {Object.keys(variants).includes('Green') &&
                Object.keys(variants['Green']).includes(size) && (
                  <button
                    onClick={() => {
                      refreshVariant(size, 'Green');
                    }}
                    className={`border-2  ml-1 bg-green-600 rounded-full w-6 h-6 focus:outline-none ${
                      color === 'Green' ? 'border-black' : 'border-gray-300'
                    }`}
                  ></button>
                )}

              {Object.keys(variants).includes('Blue') &&
                Object.keys(variants['Blue']).includes(size) && (
                  <button
                    onClick={() => {
                      refreshVariant(size, 'Blue');
                    }}
                    className={`border-2  ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none ${
                      color === 'Blue' ? 'border-black' : 'border-gray-300'
                    }`}
                  ></button>
                )}

              {Object.keys(variants).includes('Purple') &&
                Object.keys(variants['Purple']).includes(size) && (
                  <button
                    onClick={() => {
                      refreshVariant(size, 'Purple');
                    }}
                    className={`border-2  ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none ${
                      color === 'Purple'
                        ? 'border-black'
                        : 'border-gray-300'
                    }`}
                  ></button>
                )}

              {Object.keys(variants).includes('Yellow') &&
                Object.keys(variants['Yellow']).includes(size) && (
                  <button
                    onClick={() => {
                      refreshVariant(size, 'Yellow');
                    }}
                    className={`border-2  ml-1 bg-yellow-400 rounded-full w-6 h-6 focus:outline-none ${
                      color === 'Yellow'
                        ? 'border-black'
                        : 'border-gray-300'
                    }`}
                  ></button>
                )}
            </div> */}

                <div className="flex ml-6 items-center">
                  <span className="mr-3">Choose Your Size</span>
                  <div className="relative">
                    {/* <select
                      value={size}
                      multiple

                      onChange={(e) => {
                        refreshVariant(e.target.value);
                      }}
                      className="overflow-hidden rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 text-base pl-3 pr-10"
                    > */}
                    {/* {Object.keys(sanityvariants).includes('500g') && (
                        <option value={'500g'}>500g</option>
                      )}
                     {Object.keys(sanityvariants).includes('250g') && (
                        <option value={'250g'}>250g</option>
                      )}
                     {Object.keys(sanityvariants).includes('1kg') && (
                        <option value={'1kg'}>1kg</option>
                      )} */}
                    {/* {sanityproductss.size.includes('500g') && (
                        <option className="mb-5 select-text hover:bg-amber-300 cursor-pointer rounded border appearance-none  py-2 bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 text-base pl-3 pr-10" value={'500g'}>500g</option>
                      )}          
                      {sanityproductss.size.includes('250g') && (
                        <option className="mb-5 hover:bg-amber-300 cursor-pointer  rounded border appearance-none  py-2 bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 text-base pl-3 pr-10" value={'250g'}>250g</option>
                      )}
                      {sanityproductss.size.includes('1kg') && (
                        <option className="mb-5 hover:bg-amber-300 cursor-pointer  rounded border appearance-none  py-2 bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 text-base pl-3 pr-10" value={'1kg'}>1kg</option>
                      )}
                    </select> */}
                    <div className="group inline-block">
                      <button className="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center min-w-32">
                        <span className="pr-1 font-semibold flex-1">
                          {grams}
                        </span>
                        <span>
                          <svg
                            className="fill-current h-4 w-4 transform group-hover:-rotate-180
        transition duration-150 ease-in-out"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </span>
                      </button>
                      <ul
                        className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
  transition duration-150 ease-in-out origin-top min-w-32"
                      >
                        {(
                          <option
                            onClick={(e) => {
                              refreshVariant(e.target.value);
                            }}
                            className="rounded-sm px-3 cursor-pointer py-1 hover:bg-gray-100"
                          >
                            {size[1]}
                          </option>
                        )}
                        {size[2] && sanityproductss.size.includes('500g') && (
                          <option
                            onClick={(e) => {
                              refreshVariant(e.target.value);
                            }}
                            className="rounded-sm px-3 cursor-pointer py-1 hover:bg-gray-100"
                          >
                            {size[2]}
                          </option>
                        )}
                      </ul>
                    </div>
                    {/* <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span> */}
                  </div>
                </div>
              </div>
              <div className="flex">
                {AvailableQty > 0 && (
                  <>
                    <span className="title-font font-medium text-2xl text-gray-900">
                      ₹{sanityproductss.size.includes('500g') ? price : sanityvaritem[0].price}
                    </span> 
                    {/* <span className="ml-2 title-font font-medium text-gray-900">Hurry Up only {AvailableQty} itmes Left</span> */}
                  </>
                )}
                {AvailableQty <= 0 && (
                  <span className="title-font font-medium text-2xl text-gray-900">
                    Out of stock!
                  </span>
                )}
                {size && (
                  <>
                    <button
                      disabled={AvailableQty <= 0}
                      onClick={() =>
                        buyNow(
                          sanityproductss.slug.current,
                          1,
                          price,
                          name,
                          size[0],
                          id,
                          AvailableQty,
                          grams
                        )
                      }
                      className="flex ml-8 text-white bg-yellow-500 disabled:bg-yellow-300 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-yellow-600 rounded"
                    >
                      Buy Now
                    </button>
                    <button
                      disabled={AvailableQty <= 0}
                      onClick={() =>
                        addToCart(
                          sanityproductss.slug.current,
                          1,
                          sanityproductss.price,
                          sanityproductss.name,
                          size[0],
                          id,
                          AvailableQty,
                          grams
                        )
                      }
                      className="flex ml-4 text-white bg-yellow-500 disabled:bg-yellow-300 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-yellow-600 rounded"
                    >
                      Add to cart
                    </button>
                  </>
                )}
                {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
              </svg>
            </button> */}
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
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? 'small-image selected-image' : 'small-image'
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* <div>
        <div className="maylike-products-wrapper">
          <h1>You May also Like </h1>
          <div className="maylike-products-container track">
            <div className="flex flex-wrap justify-center gap-5 marquee  ">
              {sanityitem.map((newsanityitem) => (
                <ProductItem
                  key={newsanityitem._id}
                  newsanityitem={newsanityitem}
                />
              ))}
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export const getStaticPaths = async () => {
  const productquery = `*[_type == "sanityproduct"]{
   slug {
    current
   } 
  }`;
  // const productvarquery = `*[_type == "sanityproductvar"]{
  //   slug {
  //    current
  //   } 
  //  }`;
  // const variantquery = `*[_type == "sanityproduct"]{
  //   variants[0]{
  //     slug{
  //     current
  //   }
  //   }
  //  }`;
   const sanityitem = await client.fetch(productquery);
  //  const variantinaction = await client.fetch(variantquery);
  // const sanityvaritem = await client.fetch(productvarquery);
  const paths = sanityitem.map((sanityproductss) => ({
    params: {
      slug: sanityproductss.slug.current,
    },
  }));
  // const varpaths = sanityvaritem.map((sanityproductssvar) => ({
  //   params: {
  //     slug: sanityproductssvar.slug.current,
  //   },
  // }));
  // const variantpaths = variantinaction.map((sanityproductss) => ({
  //   params: {
  //     vslug: sanityproductss.variants[0].slug.current,
  //   },
  // }));

  return {
    paths,
    // varpaths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug} }) => {
  // const sanityquery = `*[_type == "product"]`;
  // const sanityproducts = await client.fetch(sanityquery);
// const variantquery = `*[_type == "sanityproduct" && slug.current == '${slug}'][0].variants[0].slug`;
// const variantinaction = await client.fetch(variantquery);

  const productquery = `*[_type == "sanityproduct" && slug.current == '${slug}'][0]`;
  const sanityproductsquery = `*[_type == "sanityproduct"]`;

  const sanityproductss = await client.fetch(productquery);
  const sanityitem = await client.fetch(sanityproductsquery);

  const productvarquery = `*[_type == "sanityproductvar" && slug.current == 'rusktoast-1kg'][0]`;
  const sanityproductsvarquery = `*[_type == "sanityproductvar"]`;

  const sanityproductssvar = await client.fetch(productvarquery);
  const sanityvaritem = await client.fetch(sanityproductsvarquery);
  // sanityproductss = product
  // sanityitem = products
  // let sanityvariants =  await client.fetch({
  //   name: sanityproductss.name,
  //   category: sanityproductss.category,
  // })

  // let colorSizeSlug = {};
  //   for (let item of sanityvariants) {
  //     if (Object.keys(colorSizeSlug).includes) {
  //       colorSizeSlug[item.size] = { slug: item.slug.current };
  //     } else {
  //       colorSizeSlug = {};
  //       colorSizeSlug[item.size] = { slug: item.slug.current };
  //     }
  //   }

  return {
    props: {
      sanityitem,
      sanityproductss,
      sanityproductssvar,
      sanityvaritem
      // sanityvariants: JSON.parse(JSON.stringify(colorSizeSlug))
    },
  };
};

export default Slug;
