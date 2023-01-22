import React, { useEffect } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';

const Login = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [sanityemail, setSanityemail] = useState('');
  const [sanitypassword, setSanitypassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    // if (localStorage.getItem('myuser')) {
    //   router.push('/');
    // }
    if (localStorage.getItem('sanityuserinfo')) {
      router.push('/');
    }
  }, [router]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const realdata = { email, password };
  //   let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(realdata),
  //   });
  //   let response = await res.json();
  
  //   setEmail('');
  //   setPassword('');
  //   if (response.success) {
  //     localStorage.setItem(
  //       'myuser',
  //       JSON.stringify({ token: response.token, email: response.email })
  //     );
  //     toast.success('You are succesfully logged in', {
  //       position: 'bottom-center',
  //       autoClose: 1000,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //     setTimeout(() => {
  //       router.push(process.env.NEXT_PUBLIC_HOST);
  //     }, 1000);
  //   } else {
  //     toast.error(response.error, {
  //       position: 'bottom-center',
  //       autoClose: 1000,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   }
  // };

  const handleSanitysubmit = async(e) =>{
    e.preventDefault();
    const  data  = { sanityemail, sanitypassword };
    let sanityres = await fetch(`/api/sanitylogin`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    let sanityresponse = await sanityres.json();
    setSanityemail('');
    setSanitypassword('');
    if (sanityresponse.success) {
      localStorage.setItem(
        'sanityuserinfo',
        JSON.stringify({
          token: sanityresponse.sanityusertoken,
          email: sanityresponse.email,
          isAdmin:sanityresponse.isAdmin
        })
      );
      toast.success('You are succesfully logged in', {
        position: 'bottom-center',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } else {
      toast.error(sanityresponse.error, {
        position: 'bottom-center',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  // const handleChange = (e) => {
  //   if (e.target.name === 'email') {
  //     setEmail(e.target.value);
  //   } else if (e.target.name === 'password') {
  //     setPassword(e.target.value);
  //   }
  // };
  const handleSanitychange = (e) => {
    if (e.target.name === 'sanityemail') {
      setSanityemail(e.target.value);
    } else if (e.target.name === 'sanitypassword') {
      setSanitypassword(e.target.value);
    }
  };
  return (
    <div>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
       <Head>
        <title>Login - Vikas Sev Bhandar</title>
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
      <div className="min-h-screen flex items-start justify-center py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-20 w-auto"
              src="/img2.png"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Log in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or
              <Link href={'/signup'} className="font-medium text-yellow-600 hover:text-yellow-500">
               
                  {' '}
                  Signup{' '}
                 
              </Link>
            </p>
          </div>
          {/* <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
            method="POST"
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  value={email}
                  onChange={handleChange}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  value={password}
                  onChange={handleChange}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link href={'/forgot'}>
                  <a
                    href="#"
                    className="font-medium text-yellow-600 hover:text-yellow-500"
                  >
                    {' '}
                    Forgot your password?{' '}
                   
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
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
                Sign in
              </button>
            </div>
          </form> */}

          <form
            onSubmit={handleSanitysubmit}
            className="mt-8 space-y-6"
            method="POST"
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  value={sanityemail}
                  onChange={handleSanitychange}
                  id="email"
                  name="sanityemail"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  value={sanitypassword}
                  onChange={handleSanitychange}
                  id="password"
                  name="sanitypassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            {/* <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link href={'/forgot'}>
                  <a
                    href="#"
                    className="font-medium text-yellow-600 hover:text-yellow-500"
                  >
                    {' '}
                    Forgot your password?{' '}
                   
                </Link>
              </div>
            </div> */}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
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
                Log in
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;
