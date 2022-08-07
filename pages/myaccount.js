import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';

const MyAccount = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sanityname, setSanityname] = useState('');
  const [sanityemail, setSanityemail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [user, setUser] = useState({ value: null });
  const [sanityuser, setSanityuser] = useState({ value: null });
  const [password, setPassword] = useState('');
  const [sanitypassword, setSanitypassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [npassword, setNpassword] = useState('');
  const router = useRouter();

  useEffect(() => {
        const myuser = JSON.parse(localStorage.getItem('myuser'))
      if (!myuser) {
        router.push('/');
      }
    if(myuser && myuser.token){
      setUser(myuser)
      setEmail(myuser.email);
      fetchData(myuser.token)
    }
    // const sanityuserinfo = JSON.parse(localStorage.getItem('sanityuserinfo'));
    // if (!sanityuserinfo) {
    //   router.push('/');
    // }
    // if (sanityuserinfo && sanityuserinfo.token) {
    //   setUser(sanityuserinfo);
    //   setEmail(sanityuserinfo.email);
    //   fetchData(sanityuserinfo.token);
    // }
  }, [router]);

  const fetchData = async (token) => {
    let data = { token: token };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    setName(res.name);
    // setSanityname(res.name)
    setAddress(res.address);
    setPincode(res.pincode);
    setPhone(res.phone);
  };

  const handleUserSubmit = async () => {
    let data = {
      token: user.token,
      address,
      name,
      // sanityname,
      phone,
      pincode,
    };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    if (res.success) {
      toast.success('Successfully Updated Details', {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handlePasswordSubmit = async () => {
    let res;
    if (npassword == cpassword) {
      let data = {
        token: user.token,
        password,
        // sanitypassword,
        cpassword,
        npassword,
      };
      let a = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`,
        {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      res = await a.json();
    } else {
      res = { success: false };
    }
    if (res.success) {
      toast.success('Successfully Updated Password', {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error('Error Updating Password', {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setSanitypassword('');
    setCpassword('');
    setNpassword('');
  };

  const handleChange = async (e) => {
    if (e.target.name == 'name') {
      // setSanityname(e.target.value);
      setName(e.target.value);
    } else if (e.target.name == 'phone') {
      setPhone(e.target.value);
    } else if (e.target.name == 'address') {
      setAddress(e.target.value);
    } else if (e.target.name == 'pincode') {
      setPincode(e.target.value);
    } else if (e.target.name == 'password') {
      // setSanitypassword(e.target.value);
      setPassword(e.target.value);
    } else if (e.target.name == 'cpassword') {
      setCpassword(e.target.value);
    } else if (e.target.name == 'npassword') {
      setNpassword(e.target.value);
    }

    //   if (e.target.value.length == 6) {
    //     let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    //     let pinJson = await pins.json();
    //     if (Object.keys(pinJson).includes(e.target.value)) {
    //       setState(pinJson[e.target.value][1]);
    //       setCity(pinJson[e.target.value][0]);
    //     } else {
    //       setState('');
    //       setCity('');
    //     }
    //   } else {
    //     setState('');
    //     setCity('');
    //   }

    // setTimeout(() => {
    //   if (
    //     name.length > 3 &&
    //     email.length > 3 &&
    //     phone.length > 3 &&
    //     address.length > 3 &&
    //     pincode.length > 3
    //   ) {
    //     setDisabled(false);
    //   } else {
    //     setDisabled(true);
    //   }
    // }, 100);
  };

  return (
    <div className="container mx-auto my-9">
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
        <title>Your Account - Vikas Sev Bhandar</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <h1 className="text-3xl text-center font-bold">MyAccount</h1>
      <h2 className="font-semibold text-xl">1. Delivery Details</h2>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              onChange={handleChange}
              // value={sanityname}
              value={name}
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email (cannot be updated or modified)
            </label>
            {user && user.token ? (
              <input
                value={user.email}
                // {sanityuser && sanityuser.token? <input
                //               value={sanityuser.email}
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                readOnly
              />
            ) : (
              <input
                onChange={handleChange}
                value={email}
                // value={sanityemail}
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            )}
          </div>
        </div>
      </div>

      <div className="px-2 w-full">
        <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">
            Address
          </label>
          <textarea
            onChange={handleChange}
            value={address}
            id="address"
            name="address"
            className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            cols="30"
            rows="2"
          ></textarea>
        </div>
      </div>

      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              10 Digit Phone Number
            </label>
            <input
              onChange={handleChange}
              placeholder="Your 10 digit phone number"
              value={phone}
              type="phone"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label
              htmlFor="pincode"
              className="leading-7 text-sm text-gray-600"
            >
              Pincode (Shipping only to India)
            </label>
            <input
              onChange={handleChange}
              value={pincode}
              type="number"
              id="pincode"
              name="pincode"
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleUserSubmit}
        className="m-2 disabled:bg-yellow-600 flex mb-5 text-white bg-yellow-500 border-0 py-2 px-2 focus:outline-none hover:bg-yellow-600 rounded text-sm"
      >
        Submit
      </button>
      <h2 className="font-semibold text-xl">2. Change Password</h2>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              onChange={handleChange}
              value={password}
              // value={sanitypassword}
              type="password"
              id="password"
              name="password"
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label
              htmlFor="cpassword"
              className="leading-7 text-sm text-gray-600"
            >
              New Password
            </label>
            <input
              onChange={handleChange}
              value={npassword}
              type="password"
              id="npassword"
              name="npassword"
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label
              htmlFor="cpassword"
              className="leading-7 text-sm text-gray-600"
            >
              Confirm New Password
            </label>
            <input
              onChange={handleChange}
              value={cpassword}
              type="password"
              id="cpassword"
              name="cpassword"
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <button
        onClick={handlePasswordSubmit}
        className="m-2 disabled:bg-yellow-600 flex text-white bg-yellow-500 border-0 py-2 px-2 focus:outline-none hover:bg-yellow-600 rounded text-sm"
      >
        Submit
      </button>
    </div>
  );
};

export default MyAccount;
