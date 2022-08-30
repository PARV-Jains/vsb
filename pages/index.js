import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import client from '../utils/client';
import Post from './product/[slug]';
import Link from 'next/link';
import { urlForThumbnail } from '../utils/image';
import ProductItem from '../components/ProductItem';
import { AiFillDollarCircle } from 'react-icons/ai';
import { MdOutlineDeliveryDining } from 'react-icons/md';
import { FaTshirt } from 'react-icons/fa';
import Script from 'next/script'
import { NovuProvider, PopoverNotificationCenter, NotificationBell } from '@novu/notification-center';


const Home = ({ sanityproductss }) => {
 

  // const [state, setState] = useState({
  //   newsanityproducts: [],
  // });
  // const { newsanityproducts } = state;

  // useEffect(() => {
  //   const fetchSanityData = async () => {
  //     try {
  //       const newsanityproducts = await client.fetch(`*[type == "product"]`);
  //       setState({ newsanityproducts });
  //     } catch (err) {
  //
  //     }
  //   };
  //   fetchSanityData();
  // }, []);
 
  // function Header() {
  //   function onNotificationClick(notification = IMessage) {
  //     navigate(notification.cta.data.url);
  //   }
    
  //   return (
  //     <NovuProvider subscriberId={'USER_ID'} applicationIdentifier={'O2nOEWpUxvir'}>
  //       <PopoverNotificationCenter onNotificationClick={onNotificationClick}>
  //         {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
  //       </PopoverNotificationCenter>
  //     </NovuProvider>
  //   );
  // }
  

  return (
    
    <div>
       <Script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""/>
       <Head>
        <title>Shri Vikas Sev Bhandar</title>
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
     
      {/* <div className="flex flex-col items-center">
<div className="bigCol flex flex-col lg:flex-row">
  <div className="row flex flex-row">
    <div className="row1 w-full lg:w-[800px]">
      <div className="imagebox bg-orange-300 border">
        <Link href="/namkeens">
          <span style={{boxSizing:"border-box" ,cursor: "pointer",display:"block", width:"initial" ,height:"initial" ,background:"none" ,opacity:"1" ,border:"0" ,margin:"0", padding:"0"  , paddingTop:"42.5%"}}>
<span style={{boxSizing:"border-box" , display:"block", width:"initial" ,height:"initial" ,background:"none" ,opacity:"1" ,border:"0" ,margin:"0", padding:"0"  , paddingTop:"42.5%"}}></span>
<img src="./banner.png" alt="" />
          </span>

        </Link>
      </div>
    </div>
  </div>
</div>
</div> */}
 

<div className="container min-h-screen mx-auto">
  <div className="flex flex-col items-center">
<div className="bigCol flex flex-col lg:flex-row ">
<div className="row flex flex-row">
<div className="row1 w-full lg:w-[800px]">
<div className="imagebox bg-orange-300 border">
  <Link href='/namkeens'>
    <a>
      <Image 
      width="1200px"
      height="510px"
      layout='responsive'
      src="/header.png"
      alt="image hai"
      >
      </Image>
    </a>
  </Link>
</div>
</div>
</div>
<div className="row flex flex-row w-full lg:w-[800px]">
  <div className="row21 w-[50vw] lg:w-[400px] bg-purple-300 border">
    <Link href="/namkeens">
      <a >
        <Image
        width="600px"
        height="510px"
        layout="responsive"
        src="/banner2.png"
        alt="img2 hai"
        >
        </Image>
      </a>
    </Link>
  </div>
  <div className="row22 w-[50vw] lg:w-[400px] bg-gray-300 border">
    <Link href="/chips">
      <a >
        <Image
        width="600px"
        height="510px"
        layout="responsive"
        src="/banner3.png"
        alt="img3 hai"
        >
        </Image>
      </a>
    </Link>
  </div>
</div>
</div>
<div className="bigCol flex flex-col lg:flex-row ">
<div className="row flex flex-row w-full lg:w-[800px]">
  <div className="row21 w-[50vw] lg:w-[400px] bg-purple-300 border">
    <Link href="/namkeens">
      <a >
        <Image
        width="600px"
        height="510px"
        layout="responsive"
        src="/banner4.webp"
        alt="img2 hai"
        >
        </Image>
      </a>
    </Link>
  </div>
  <div className="row22 w-[50vw] lg:w-[400px] bg-gray-300 border">
    <Link href="/chips">
      <a >
        <Image
        width="600px"
        height="510px"
        layout="responsive"
        src="/banner5.png"
        alt="img3 hai"
        >
        </Image>
      </a>
    </Link>
  </div>
</div>
<div className="row flex flex-row">
<div className="row1 w-full lg:w-[800px]">
<div className="imagebox bg-orange-300 border">
  <Link href='/namkeens'>
    <a>
      <Image 
      width="1200px"
      height="510px"
      layout='responsive'
      src="/banner.png"
      alt="image hai"
      >
      </Image>
    </a>
  </Link>
</div>
</div>
</div>
</div>

{/* <div className="row flex flex-row">
<div className="ro32 w-[50vw] lg:w-[400px] bg-cyan-300 border">
    <Link href="/michchar">
      <a >
        <Image
        width="1200px"
        height="510px"
        layout="responsive"
        src="/banner5.png"
        alt="img2 hai"
        >
        </Image>
      </a>
    </Link>
  </div>
</div> */}

  </div>
</div>


      {/* <div className="text-center">
        
        <Image
          priority
          alt=""
          src="/header.png"
          width="1920px"
          height="744px"
        ></Image>
      </div> */}

      {/* <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="flex w-full mb-20 flex-wrap">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 lg:w-1/3 lg:mb-0 mb-4">
              Master Cleanse Reliac Heirloom
            </h1>
            <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify, subway tile poke farm-to-table. Franzen you probably
              havent heard of them man bun deep jianbing selfies heirloom.
            </p>
          </div>
          <div className="flex flex-wrap md:-m-2 -m-1">
            <div className="flex flex-wrap w-1/2">
              <div className="md:p-2 p-1 w-full">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block"
                  src="./banner1.png"
                />
              </div>
              <div className="md:p-2 p-1 w-full">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block"
                  src="./banner2.png"
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full h-full object-cover object-center block"
                  src="./banner3.png"
                />
              </div>
            </div>
            <div className="flex flex-wrap w-1/2">
              <div className="md:p-2 p-1 w-full">
                <img
                  alt="gallery"
                  className="w-1/2 h-1/2 h-full object-cover object-center block"
                  src="./banner4.webp"
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block"
                  src="./banner5.png"
                />
              </div>
              <div className="md:p-2 p-1 w-full">
                <video
                  autoPlay
                  muted
                  alt="gallery"
                  className="w-full object-cover h-full object-center block"
                  src="./banner6.mp4"
                />
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* <div className="container mx-auto">
    <div className="grid-cols-3 space-y-2  lg:space-y-0 lg:grid lg:gap-3 lg:grid-rows-3">
        <div className="w-full rounded">
            <img src="/banner1.png"
                alt="image"/>
        </div>
        <div className="w-full col-span-2 row-span-2 rounded">
            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80"
                alt="image"/>
        </div>
        <div className="w-full rounded">
            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80"
                alt="image"/>
        </div>
        <div className="w-full rounded">
            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80"
                alt="image"/>
        </div>
        <div className="w-full rounded">
            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80"
                alt="image"/>
        </div>
        <div className="w-full rounded">
            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80"
                alt="image"/>
        </div>
    </div>
</div> */}

      {/* <section className="text-center overflow-hidden text-gray-700">
  <div className="container lg:pt-24 lg:px-32">
    <div className="flex flex-wrap -m-1 md:-m-2">
      <div className="flex flex-wrap w-1/2">
        <div className=" p-1 ">
          <Image width="1320px"
          height="650px" alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
            src="/banner1.png"/>
        </div>
        <div className="w-1/2 p-1 md:p-2">
          <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp"/>
        </div>
        <div className="w-full p-1 md:p-2">
          <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"/>
        </div>
      </div>
      <div className="flex flex-wrap w-1/2">
        <div className="w-full p-1 md:p-2">
          <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp"/>
        </div>
        <div className="w-1/2 p-1 md:p-2">
          <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp"/>
        </div>
        <div className="w-1/2 p-1 md:p-2">
          <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
            src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(77).webp"/>
        </div>
      </div>
    </div>
  </div>
</section> */}

      <h1 className="text-4xl  ml-4 font-medium my-12 animate-[load_1s_ease-in-out]">
        Fresh <span className='font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600'>Namkeen</span> ,<span className='text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600'>Chips</span> , <span className="font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Michchar</span> And More!{' '}
      </h1>
      <div className="h-1 mb-9 w-20 bg-white rounded"></div>

      {/* <div className="container px-5 py-10 mx-auto">
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-10 mx-auto">
              <div className="flex flex-wrap w-full mb-4">
                <div className="lg:w-1/2 w-full m-6 lg:mb-0">
                  <h1 className="sm:text-3xl text-2xl font-medium title-font m-2 text-gray-900">Fresh Namkeen </h1>
                  <div className="h-1 w-20 bg-yellow-500 rounded">
                  </div>
                </div>
                </div>
                </div>
                </section>
                </div> */}

      <div className="flex flex-wrap justify-center gap-5 ">
        {sanityproductss.map((newsanityitem) => (
          <ProductItem key={newsanityitem.name} newsanityitem={newsanityitem} />
        ))}
      </div>

      {/* <section className="text-gray-400 body-font ">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Shop Now With Vikas Sev Bhandar{' '}
            </h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Taste The incredible{' '}
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Shooting Stars
                </h2>
                <p className="leading-relaxed text-base">
                  Fingerstache flexitarian street art 8-bit waist co, subway
                  tile poke farm.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="6" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  The Catalyzer
                </h2>
                <p className="leading-relaxed text-base">
                  Fingerstache flexitarian street art 8-bit waist co, subway
                  tile poke farm.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Neptune
                </h2>
                <p className="leading-relaxed text-base">
                  Fingerstache flexitarian street art 8-bit waist co, subway
                  tile poke farm.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Melanchole
                </h2>
                <p className="leading-relaxed text-base">
                  Fingerstache flexitarian street art 8-bit waist co, subway
                  tile poke farm.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Bunker
                </h2>
                <p className="leading-relaxed text-base">
                  Fingerstache flexitarian street art 8-bit waist co, subway
                  tile poke farm.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Ramona Falls
                </h2>
                <p className="leading-relaxed text-base">
                  Fingerstache flexitarian street art 8-bit waist co, subway
                  tile poke farm.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="ml-28 mb-12 mt-24 text-gray-600 body-font">
        <div className="container px-5  mx-auto">
          <div className="flex flex-wrap -m-4">
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-500 mb-4">
                  <img src="./namkeen.webp" alt="namkeen" />
                  {/* <FaTshirt/> */}
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Tasty Fresh Namkeen
                </h2>
                <p className="leading-relaxed text-base">
                  We have a variety of Fresh And Tasty Namkeens
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-500 mb-4">
                  <MdOutlineDeliveryDining></MdOutlineDeliveryDining>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Super fast delivery
                </h2>
                <p className="leading-relaxed text-base">
                  We provide super fast delivery all over india
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-500 mb-4">
                  <AiFillDollarCircle></AiFillDollarCircle>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Exciting offers
                </h2>
                <p className="leading-relaxed text-base">
                  We provide exciting offers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export const getServerSideProps = async () => {
  const sanityquery = '*[_type == "product"]';
  const sanityproducts = await client.fetch(sanityquery);

  const productquery = '*[_type == "sanityproduct"][0..3] ';
  const sanityproductss = await client.fetch(productquery);

  return {
    props: { sanityproducts, sanityproductss },
  };
};
export default Home;
