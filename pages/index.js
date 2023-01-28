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
// import { previewData } from 'next/headers';
// import {PreviewSuspense} from 'next-sanity/preview'
// import {lazy} from 'react'
// import {DocumentsCount, query} from '../components/DocumentsCount'
// import {clients} from '../lib/sanity.client'


const Home = ({ sanityproductss }) => {
// const Home = ({ sanityproductss , preview, data }) => {
  // if (preview) {
  //   return (
  //     <PreviewSuspense fallback="Loading...">
  //       <PreviewDocumentsCount />
  //     </PreviewSuspense>
  //   )
  // }
  // return <DocumentsCount data={data} />
  const [isLoading, setLoading] = useState(true);
  // const PreviewDocumentsCount = lazy(() => import('../components/PreviewDocumentsCount'))


  function cn(...classes) {
    return classes.filter(Boolean).join(' ');
  }
// if(previewData()){
//   return <div>preview mode</div>
// }

  return (
    // <DocumentsCount data={data} />,
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
  <meta property="og:image" content="https://vsb.vercel.app/_next/image?url=%2Fheader.png&w=1920&q=75" />
  <meta name="twitter:title" content="Vikas Sev Bhandar"/>
<meta name="twitter:description" content="Vikas Sev Bhandar is your one stop destination for the delicious Fresh namkeen ans snacks you always wanted . come shop now ."/>
<meta name="twitter:image" content=" https://vsb.vercel.app/_next/image?url=%2Fheader.png&w=1920&q=75"/>
<meta name="twitter:card" content="Vikas Sev Bhandar" />

      </Head>
     
  
      <div>
            <div className="grid grid-cols-2 lg:grid-cols-4">
               <Link href="/michchar" className=" relative col-span-2">
                  <Image
                     src="/header.png"
                     height={200}
                     width={10000}
                     className="md:h-80"
                    //  className={cn(
                    //   'group-hover:opacity-75 duration-700 ease-in-out h-80 object-cover',
                    //   isLoading
                    //     ? 'grayscale blur-2xl scale-110'
                    //     : 'grayscale-0 blur-0 scale-100'
                    // )}
                  />
               </Link>

               <Link href="/namkeens" className=" relative">
                  <Image
                     src="/banner2.png"
                     height={200}
                     width={10000}
// className={cn(
//                       'group-hover:opacity-75 duration-700 ease-in-out h-80 object-cover',
//                       isLoading
//                         ? 'grayscale blur-2xl scale-110'
//                         : 'grayscale-0 blur-0 scale-100'
//                     )}         
className="md:h-80 "

                          />
               </Link>

               <Link href="/mix" className=" relative">
                  <Image
                     src="/banner3.png"
                     height={200}
                     width={10000}
// className={cn(
//                       'group-hover:opacity-75 duration-700 ease-in-out h-80 object-cover',
//                       isLoading
//                         ? 'grayscale blur-2xl scale-110'
//                         : 'grayscale-0 blur-0 scale-100'
//                     )}   
className="md:h-80 "

                      />
               </Link>

               <Link href="/chips" className=" relative">
                  <Image
                     src="/banner4.webp"
                     height={200}
                     width={10000}
// className={cn(
//                       'group-hover:opacity-75 duration-700 ease-in-out h-80 object-cover',
//                       isLoading
//                         ? 'grayscale blur-2xl scale-110'
//                         : 'grayscale-0 blur-0 scale-100'
//                     )}     
className="md:h-80 "

                       />
               </Link>

               <Link href="/michchar" className=" relative">
                  <Image
                     src="/banner5.png"
                     height={200}
                     width={10000}
// className={cn(
//                       'group-hover:opacity-75 duration-700 ease-in-out h-80 object-cover',
//                       isLoading
//                         ? 'grayscale blur-2xl scale-110'
//                         : 'grayscale-0 blur-0 scale-100'
//                     )}    
className="md:h-80 "

                     />
               </Link>

               <Link href="/namkeens" className=" relative col-span-2">
                  <Image
                     src="/banner.png"
                     height={200}
                     width={10000}
// className={cn(
//                       'group-hover:opacity-75 duration-700 ease-in-out h-80 object-cover',
//                       isLoading
//                         ? 'grayscale blur-2xl scale-110'
//                         : 'grayscale-0 blur-0 scale-100'
//                     )}    
className="md:h-80 "

                       />
               </Link>
            </div>
         </div>
{/* 
<div className="container min-h-screen mx-auto">
  <div className="flex flex-col items-center">
<div className="bigCol flex flex-col lg:flex-row ">
<div className="row flex flex-row">
<div className="row1 w-full lg:w-[800px] ">
<div className="imagebox bg-orange-300 border">
  <Link href='/namkeens'>
     
      <Image 
      width={1700}
      height={510}
      className={cn(
        'group-hover:opacity-75 duration-700 ease-in-out',
        isLoading
          ? 'grayscale blur-2xl scale-110'
          : 'grayscale-0 blur-0 scale-100'
      )}
      onLoadingComplete={() => setLoading(false)}
      src="/header.png"
      alt="image hai"
      >
      </Image>
     
  </Link>
</div>
</div>
</div>
<div className="row flex flex-row w-full lg:w-[800px]">
  <div className="row21 w-[50vw] lg:w-[400px] bg-purple-300 border">
    <Link href="/mix">
     
        <Image
        width="600"
        height="510"
         
        src="/banner2.png"
        alt="img2 hai"
        >
        </Image>
       
    </Link>
  </div>
  <div className="row22 w-[50vw] lg:w-[400px] bg-gray-300 border">
    <Link href="/chips">
     
        <Image
        width="600"
        height="510"
         
        src="/banner3.png"
        alt="img3 hai"
        >
        </Image>
       
    </Link>
  </div>
</div>
</div>
<div className="bigCol flex flex-col lg:flex-row ">
<div className="row flex flex-row w-full lg:w-[800px]">
  <div className="row21 w-[50vw] lg:w-[400px] bg-purple-300 border">
    <Link href="/michchar">
    
        <Image
        width="600"
        height="510"
         
        src="/banner4.webp"
        alt="img2 hai"
        >
        </Image>
       
    </Link>
  </div>
  <div className="row22 w-[50vw] lg:w-[400px] bg-gray-300 border">
    <Link href="/chips">

        <Image
        width="600"
        height="510"
         
        src="/banner5.png"
        alt="img3 hai"
        >
        </Image>
       
    </Link>
  </div>
</div>
<div className="row flex flex-row">
<div className="row1 w-full lg:w-[800px]">
<div className="imagebox bg-orange-300 border">
  <Link href='/namkeens'>
     
      <Image 
      width="1200"
      height="510"
      
      src="/banner.png"
      alt="image hai"
      >
      </Image>
     
  </Link>
</div>
</div>
</div>
</div>



  </div>
</div> */}


    

      <h1 className="text-4xl  ml-4 font-medium my-12 animate-[load_1s_ease-in-out]">
        Fresh <span className='font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600'>Namkeen</span> ,<span className='text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600'>Chips</span> , <span className="font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Michchar</span> And More!{' '}
      </h1>
      <div className="h-1 mb-9 w-20 bg-white rounded"></div>

   

      <div className="flex flex-wrap justify-center gap-5 ">
        {sanityproductss.map((newsanityitem) => (
          <ProductItem key={newsanityitem.name} newsanityitem={newsanityitem} />
        ))}
      </div>




      <section className=" text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-center -m-4">
            <div className="w-full  xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg text-center">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-500 mb-4 text-center">
                  <img src="./namkeen.webp" alt="namkeen" />
                  {/* <FaTshirt/> */}
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2 text-center">
                  Tasty Fresh Namkeen
                </h2>
                <p className="leading-relaxed text-base">
                  We have a variety of Fresh And Tasty Namkeens
                </p>
              </div>
            </div>
            <div className="w-full  xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg text-center">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-500 mb-4 text-center">
                  <MdOutlineDeliveryDining></MdOutlineDeliveryDining>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2 text-center">
                  Super fast delivery
                </h2>
                <p className="leading-relaxed text-base">
                  We provide super fast delivery all over india
                </p>
              </div>
            </div>
            <div className="w-full  xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg text-center">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-500 mb-4 text-center">
                  <AiFillDollarCircle></AiFillDollarCircle>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2 text-center">
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

// export const getStaticProps = async ({preview = false}) => {
//   if (preview) {
//     return {props: {preview}}
//   }

//   const data = await client.fetch(query)

//   return {props: {preview, data}}
// }

// export default function IndexPage({preview, data}) {
//   if (preview) {
//     return (
//       <PreviewSuspense fallback="Loading...">
//         <PreviewDocumentsCount />
//       </PreviewSuspense>
//     )
//   }
//   return <DocumentsCount data={data} />
// }

export const getServerSideProps = async () => {
  const sanityquery = '*[_type == "product"]';
  const sanityproducts = await client.fetch(sanityquery);

  const productquery = '*[_type == "sanityproduct"] | order(_createdAt desc)[0..3] ';
  const sanityproductss = await client.fetch(productquery);

  return {
    props: { sanityproducts, sanityproductss },
  };
};
export default Home;
