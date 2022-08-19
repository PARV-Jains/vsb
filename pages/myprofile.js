import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import axios from 'axios';

const MyProfile = () => {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  const [sanityname, setSanityname] = useState();
  const [sanityemail, setSanityemail] = useState('');
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [pincode, setPincode] = useState();
  // const [user, setUser] = useState({ value: null });
  const [sanityuser, setSanityuser] = useState({ value: null });
  // const [password, setPassword] = useState('');
  const [sanitypassword, setSanitypassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [npassword, setNpassword] = useState('');
  const router = useRouter();
  // const sanityuserinfo = JSON.parse(localStorage.getItem('sanityuserinfo'));

  useEffect(() => {
    //     const myuser = JSON.parse(localStorage.getItem('myuser'))
    //   if (!myuser) {
    //     router.push('/');
    //   }
    // if(myuser && myuser.token){
    //   setUser(myuser)
    //   setEmail(myuser.email);
    //   fetchData(myuser.token)
    // }
    const sanityuserinfo = JSON.parse(localStorage.getItem('sanityuserinfo'));
    if (!sanityuserinfo) {
      router.push('/');
    }
    if (sanityuserinfo && sanityuserinfo.token) {
      setSanityuser(sanityuserinfo);
      setSanityemail(sanityuserinfo.email);
      // fetchData(sanityuserinfo.token);
    }

  }, [router]);
  //  const fetchData = async (sanityusertoken) => {
  //   let data = { sanityusertoken: sanityusertoken };
  
  //   let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getsanityuser`, {
  //     method: 'POST', // or 'PUT'
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   let res = await a.json();
  //   // setName(res.name);
  //   setSanityname(res.sanityname);
  //   setAddress(res.address);
  //   setPincode(res.pincode);
  //   setPhone(res.phone);
  // };
  
  const handleSanitysubmit = async () => {
    // e.preventDefault();
    // const sanityuserinfo = JSON.parse(localStorage.getItem('sanityuserinfo'));
    const sanityuserinfo = JSON.parse(localStorage.getItem('sanityuserinfo'));
    try {
      const { data } = await axios.put(
        '/api/sanitymyaccount',
        {
          sanityname,
          sanityemail,
          sanitypassword,
          address,
          pincode,
          phone
        },
        { headers: { authorization: `Bearer ${sanityuserinfo.token}` } }
      );
      // add cookies in login page of user data then fetch the token from it in sanitymyaccount api in value field
      // dispatch({ type: 'USER_LOGIN', payload: data });
      localStorage.setItem('updatesanityuserinfo', JSON.stringify(data));
      alert('Profile updated successfully');
      router.push(`/`)
         // setSanityname('');
    // setSanityemail('');
    // setSanitypassword('');
    // setAddress('');
    // setPhone('');
    // setPincode('');
    } catch (err) {
      alert((err));
    }
    // const data = {
    //   sanityname,
    //   // sanityusertoken: sanityuser.token,
    //   sanityemail,
    //   // address,
    //   // phone,
    //   // pincode,
    //   sanitypassword
    // };
    
    // let sanityres = await fetch(
    //   `${process.env.NEXT_PUBLIC_HOST}/api/sanitymyaccount`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       authorization: `Bearer ${sanityuserinfo.token}`},
    //     body:JSON.stringify(data),
    //   }
    // );
    // let sanityresponse = await sanityres.json();
   
    // setSanityname('');
    // setSanityemail('');
    // setSanitypassword('');
    // setAddress('');
    // setPhone('');
    // setPincode('');
    // if (sanityresponse.success) {
    //   localStorage.setItem(
    //     'sanityuserinfo',
    //     JSON.stringify({
    //       token: sanityresponse.sanityusertoken,
    //       email: sanityresponse.email,
    //       name: sanityresponse.name,
    //     })
    //   );
    //   toast.success('Profile Updated Successfully', {
    //     position: 'bottom-center',
    //     autoClose: 1000,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // } else {
    //   toast.error(sanityresponse.error, {
    //     position: 'bottom-center',
    //     autoClose: 1000,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }
  };

  const handlePasswordSubmit = async () => {
    // const sanityuserinfo = JSON.parse(localStorage.getItem('sanityuserinfo'));
    // let sanityres;
    if (npassword == cpassword) {
      // let data = {
      //   token: sanityuser.token,
      //   sanitypassword,
      //   // sanitypassword,
      //   cpassword,
      //   npassword,
    


      const sanityuserinfo = JSON.parse(localStorage.getItem('sanityuserinfo'));
      try {
        const { data } = await axios.put(
          '/api/sanitymyaccount',
          {
            sanitypassword,
            cpassword,
            npassword,
          },
          { headers: { authorization: `Bearer ${sanityuserinfo.token}` } }
        );
        // dispatch({ type: 'USER_LOGIN', payload: data });
        localStorage.setItem('updatepasssanityuserinfo', JSON.stringify(data));
        alert('Profile updated successfully');
      } catch (err) {
        alert((err));
      }
    }
    if (npassword != cpassword) {
      
      toast.error("Passwords Does Not Match", {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
    
    //   let a = await fetch(
    //     `${process.env.NEXT_PUBLIC_HOST}/api/sanitymyaccount`,
    //     {
    //       method: 'POST', // or 'PUT'
    //       headers: {
    //         'Content-Type': 'application/json',
    //         authorization: `Bearer ${sanityuserinfo.token}`,
    //       },
    //       body: JSON.stringify(data),
    //     }
    //   );
    //   sanityres = await a.json();
    // } else {
    //   sanityres = { success: false };
    // }
    // if (sanityres.success) {
    //   toast.success('Successfully Updated Password', {
    //     position: 'top-left',
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // } else {
    //   toast.error('Error Updating Password', {
    //     position: 'top-left',
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }
    // setSanitypassword('');
    // setCpassword('');
    // setNpassword('');
  };

  const handleChange = async (e) => {
    if (e.target.name == 'sanityname') {
      setSanityname(e.target.value);
      //   setName(e.target.value);
    } else if (e.target.name == 'phone') {
      setPhone(e.target.value);
    } else if (e.target.name == 'address') {
      setAddress(e.target.value);
    } else if (e.target.name == 'pincode') {
      setPincode(e.target.value);
    } else if (e.target.name == 'sanitypassword') {
      setSanitypassword(e.target.value);
      //   setPassword(e.target.value);
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
        <meta name="description" content="Vikas Sev Bhandar is your one stop destination for the delicious Fresh namkeen ,michhcar , nukti and snacks you always wanted . come shop now " />
  <meta property="og:title" content="Vikas Sev Bhandar" />
  <meta property="og:description" content="Vikas Sev Bhandar is your one stop destination for the delicious Fresh namkeen namkeen ,michhcar , nukti and snacks you always wanted . come shop now " />
  <meta property="og:url" content="https://vsb.vercel.com/" />
  <meta property="og:type" content="website" />
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
              value={sanityname}
              //   value={name}
              type="text"
              id="name"
              name="sanityname"
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email (cannot be updated or modified)
            </label>
            {/* {user && user.token ? (
              <input
                value={user.email} */}
            {sanityuser && sanityuser.token ? (
              <input
                value={sanityuser.email}
                type="email"
                id="email"
                name="sanityemail"
                className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                readOnly
              />
            ) : (
              <input
                onChange={handleChange}
                // value={email}
                value={sanityemail}
                type="email"
                id="email"
                name="sanityemail"
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
        onClick={handleSanitysubmit}
        className="m-2 disabled:bg-yellow-600 flex mb-5 text-white bg-yellow-500 border-0 py-2 px-2 focus:outline-none hover:bg-yellow-600 rounded text-sm"
      >
        Submit
      </button>
      <h2 className="font-semibold text-xl">2. Change Password</h2>
      <div className="mx-auto flex my-2">
        {/* <div className="px-2 w-1/2">
          <div className="mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              onChange={handleChange}
              //   value={password}
              value={sanitypassword}
              type="password"
              id="password"
              name="sanitypassword"
              className="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div> */}
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

export default MyProfile;
