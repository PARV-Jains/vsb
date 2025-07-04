import Head from "next/head";
import React from "react";

const Contact = () => {
  return (
    <div>
        <Head>
        <title>Contact Us - Vikas Sev Bhandar</title>
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
      <div className="min-h-screen">
  <div className="max-w-screen-xl md:mt-24 px-4 md:px-8 lg:px-12 xl:px-26 py-16 mx-auto bg-gray-100 text-gray-900 rounded-lg shadow-lg">
    <div className="flex flex-col justify-center items-center">
      <div>
        <h2 className="text-center text-3xl font-bold leading-tight">
          Lets talk about everything!
        </h2>
        <img className="h-40 mx-auto py-2" src="/fav2.svg" />
        <p className="text-center text-xl lg:text-2xl font-medium leading-tight">
          Feel free to ask us anything!
        </p>
        <p className="py-4 px-4 text-md lg:text-md leading-tight text-center">
          If you have any questions regarding your order, feel free to send
          email, call or Whatsapp us on our support number
        </p>
        <div className="flex justify-between">
          <div className="text-center px-5 md:px-0 md:text-left py-10">
            <span className="font-bold">Corporate Address</span>
            <br />
            vsb.com
            <br />
            226 lig sector b scheme no.71 
            <br />
            Indore-452009
            <br />
          </div>
          <div className="text-center px-5 md:px-0 md:text-left py-10">
            <span className="font-bold">Customer Support</span>
            <br />
            Call/Whatsapp:
            <a
              className="underline text-blue-600"
              rel="noreferrer"
              target="_blank"
              href="https://wa.me/9340317836?text=Hi,%20I%20need%20to%20enquire%20about%20products%20on%20VikasSevBhandar"
            />
              +91 9340317836
             
            <br />
            Email: 2006parvjain@gmail.com
            <br />
            Morning: 9AM - 6PM
            <br />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default Contact;