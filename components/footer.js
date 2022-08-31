import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Transition } from '@headlessui/react';
import { MdAccountCircle } from 'react-icons/md';
import { ImCross } from 'react-icons/im';
import {
  AiFillCloseCircle,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import Menuitems from '../src/layouts/sidebar/MenuItems';
import {
  Box,
  Drawer,
  useMediaQuery,
  List,
  Button,
  Typography,
  ListItem,
  Collapse,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import FeatherIcon from 'feather-icons-react';

const Footer = ({
  logout,
  sanitylogout,
  user,
  sanityuser,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
  placeholder,
  // isMobileSidebarOpen, onSidebarClose, isSidebarOpen
}) => {
  const d = new Date();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const [sidebar, setSidebar] = useState(false);
  // const [muiopen, setMuiopen] = React.useState(true);
  const ref = useRef();
  const fullYear = d.getFullYear();
  const router = useRouter();
  const toggleCart = () => {
    setSidebar(!sidebar);
  };
  useEffect(() => {
    Object.keys(cart).length === 0 && setSidebar(false);
    // Object.keys(cart).length === 0 && setSidebar(true);
    let exempted = [
      '/checkout',
      '/order',
      '/orders',
      '/myaccount',
      '/sanitycheckout',
      '/sanitypayorder',
      'sanitymyorders',
      'sanitymyaccount',
    ];
    if (exempted.includes(router.pathname)) {
      setSidebar(false);
    }
  }, [cart, router.pathname]);

  //   const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  //   const Sidebar = () => {
  //     const handleDrawerClick = (index) => {
  //       if (muiopen === index) {
  //         setMuiopen((prevopen) => !prevopen);
  //       } else {
  //         setMuiopen(index);
  //       }
  //     };

  //   }
  //   let curl = useRouter();
  //   const location = curl.pathname;

  //   const SidebarContent = (
  //     <Box p={2} height="100%">
  //       <Box mt={2}>
  //         <List>
  //           {Menuitems.map((item, index) => (

  //             <List component="li" disablePadding key={item.title}>
  //               <NextLink href={item.href}>
  //                 <ListItem
  //                   onClick={() => handleDrawerClick(index)}
  //                   button
  //                   selected={location === item.href}
  //                   sx={{
  //                     mb: 1,
  //                     ...(location === item.href && {
  //                       color: "white",
  //                       backgroundColor: (theme) =>
  //                         `${theme.palette.primary.main}!important`,
  //                     }),
  //                   }}
  //                 >
  //                   <ListItemIcon>
  //                     <FeatherIcon
  //                       style={{
  //                         color: `${location === item.href ? "white" : ""} `,
  //                       }}
  //                       icon={item.icon}
  //                       width="20"
  //                       height="20"
  //                     />
  //                   </ListItemIcon>

  //                   <ListItemText onClick={onSidebarClose}>
  //                     {item.title}
  //                   </ListItemText>
  //                 </ListItem>
  //               </NextLink>
  //             </List>
  //           ))}
  //         </List>
  //       </Box>

  //     </Box>
  //   );

  //   if (lgUp) {
  //     return (
  // <>
  //       <Drawer
  //       anchor="left"
  //       open={isMobileSidebarOpen}
  //       onClose={onSidebarClose}
  //       PaperProps={{
  //         sx: {
  //           width: "265px",
  //           border: "0 !important",
  //         },
  //       }}
  //       variant="temporary"
  //     >
  //       {SidebarContent}
  //     </Drawer>

  //     <div
  //         ref={ref}
  //         className={`w-72 h-[100vh] z-10 sideCart  absolute top-0 bg-white px-8 py-10 transition-all ${
  //           sidebar ? 'right-0' : '-right-96'
  //         }`}
  //       >
  //         <h2 className="text-xl font-bold text-center">Shopping Cart</h2>
  //         <span
  //           onClick={toggleCart}
  //           className="absolute top-5 right-2 cursor-pointer text-2xl text-yellow-500"
  //         >
  //           <AiFillCloseCircle />
  //         </span>
  //         <ol className="list-decimal font-semibold">
  //           {Object.keys(cart).length == 0 && (
  //             <div className="my-4 font-semibold"> Your cart is empty! </div>
  //           )}
  //           {Object.keys(cart).map((k) => {
  //             return (
  //               <li key={k}>
  //                 <div className="item flex my-5">
  //                   <div className="w-2/3 font-semibold">
  //                     {cart[k].name}({cart[k].grams})
  //                   </div>
  //                   <div className="flex font-semibold items-center w-1/3 justify-center text-lg">
  //                     <AiFillPlusCircle
  //                       onClick={() => {
  //                         addToCart(
  //                           k,
  //                           1,
  //                           cart[k].price,
  //                           cart[k].name,
  //                           cart[k].size,
  //                           cart[k].id,
  //                           cart[k].AvailableQty,
  //                           cart[k].grams
  //                         );
  //                       }}
  //                       className="cursor-pointer  text-yellow-500"
  //                     />
  //                     <span className="mx-2 text-sm">{cart[k].qty}</span>
  //                     <AiFillMinusCircle
  //                       onClick={() => {
  //                         removeFromCart(
  //                           k,
  //                           1,
  //                           cart[k].price,
  //                           cart[k].name,
  //                           cart[k].size,
  //                           cart[k].id,
  //                           cart[k].AvailableQty,
  //                           cart[k].grams
  //                         );
  //                       }}
  //                       className="cursor-pointer text-yellow-500"
  //                     />
  //                   </div>
  //                 </div>
  //               </li>
  //             );
  //           })}
  //         </ol>
  //         <div className="total font-bold my-2">Subtotal: ₹{subTotal}</div>
  //         <div className="flex">
  //           <Link href={'/sanitycheckout'}>
  //             <button
  //               disabled={Object.keys(cart).length === 0}
  //               className="disabled:bg-yellow-300 flex mr-2 text-white bg-yellow-500 border-0 py-2 px-2 focus:outline-none hover:bg-yellow-600 rounded text-sm"
  //             >
  //               <BsFillBagCheckFill className="m-1" />
  //               Checkout
  //             </button>
  //           </Link>
  //           <button
  //             disabled={Object.keys(cart).length === 0}
  //             onClick={clearCart}
  //             className="disabled:bg-yellow-300 flex mr-2 text-white bg-yellow-500 border-0 py-2 px-2 focus:outline-none hover:bg-yellow-600 rounded text-sm"
  //           >
  //             Clear cart
  //           </button>
  //         </div>
  //       </div>
  //     <footer className="text-gray-600 body-font bg-slate-100 shadow-lg ">
  //       <div className="container px-5 py-10 mx-auto flex  lg:items-start lg:flex-row lg:flex-nowrap flex-wrap flex-col">
  //         <div className="w-64 flex-shrink-0 lg:mx-0 mx-auto text-center lg:text-left">
  // <Link href={'/'}><a className="flex title-font font-medium items-center lg:justify-start justify-center text-gray-900">
  //             <Image src="/main-logo.png" width="256px" height="48px"></Image>
  //           </a>
  //           </Link>
  //           <p className="mt-2 text-sm text-gray-500 px-4">
  //             Taste the incredible
  //           </p>
  //           <p className=" text-sm text-gray-500 px-4">Fresh Namkeen , Michchar and snacks</p>
  //         </div>
  //         <div className="flex-grow flex flex-wrap lg:pl-20 -mb-10 lgd:mt-0 mt-10 lg:text-left text-center">
  //           <div className="lg:w-1/4  w-full px-4">
  //             <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
  //               Shop
  //             </h2>
  //             <nav className="list-none mb-10">
  //               <li>
  //               <Link href={`/namkeens`}><a className="text-gray-600 hover:text-gray-800">
  //                 Namkeen
  //                 </a>
  //                 </Link>
  //               </li>
  //               <li>
  //               <Link href={`/michchar`}><a className="text-gray-600 hover:text-gray-800">
  //                   Michchar
  //                 </a>
  //                 </Link>
  //               </li>
  //               <li>
  //               <Link href={`/chips`}><a className="text-gray-600 hover:text-gray-800">
  //                  Chips
  //                 </a>
  //                 </Link>
  //               </li>
  //               <li>
  //               <Link href={`/mix`}><a className="text-gray-600 hover:text-gray-800">
  //                   Mix
  //                 </a>
  //                 </Link>
  //               </li>
  //             </nav>
  //           </div>
  //           <div className="lg:w-1/4 md:w-1/2 w-full px-4">
  //             <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
  //               Policy
  //             </h2>
  //             <nav className="list-none mb-10">
  //               <li>
  //                 <Link href={`/privacy`}>
  //                 <a className="text-gray-600 hover:text-gray-800">
  //                  Privacy Policy
  //                 </a>
  //                 </Link>
  //               </li>
  //               <li>
  // <Link href="/terms">
  //                 <a className="text-gray-600 hover:text-gray-800">
  //                  Terms and Conditions
  //                 </a>
  //                 </Link>
  //               </li>
  //             </nav>
  //           </div>
  //           <div className="lg:w-1/4 md:w-1/2 w-full px-4">
  //             <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
  //               CUSTOMER SERVICE
  //             </h2>
  //             <nav className="list-none mb-10">
  //               <li>
  //                                   <Link href="/contact">
  //                 <a className="text-gray-600 hover:text-gray-800">
  //                   Contact Us
  //                 </a>
  //                 </Link>

  //               </li>
  //               <li>
  //               <Link href="/about">

  //                 <a className="text-gray-600 hover:text-gray-800">
  //                   About us
  //                 </a>
  //                 </Link>

  //               </li>
  //               <li>
  //                 <Link href="/returnpolicy">
  //                 <a className="text-gray-600 hover:text-gray-800">
  //                  Return Policy
  //                 </a>
  //                 </Link>
  //               </li>
  //             </nav>
  //           </div>
  //           <div className="lg:w-1/4 md:w-1/2 w-full px-4">
  //          <Image alt="pay" src="/pay.png" width="800" height="337"  className="lg:w-1/4 flex items-center justify-center md:w-1/2 w-full px-4"></Image>

  //           </div>
  //         </div>
  //       </div>
  //       <div className="bg-gray-100">
  //         <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
  //           <p className="text-gray-500 text-sm text-center sm:text-left">
  //             © {fullYear} VikasSevBhandar.com - All rights reserved
  //           </p>

  //           <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
  //             <a className="text-gray-500">
  //               <svg
  //                 fill="currentColor"
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 strokeWidth="2"
  //                 className="w-5 h-5"
  //                 viewBox="0 0 24 24"
  //               >
  //                 <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
  //               </svg>
  //             </a>
  //             <a className="ml-3 text-gray-500">
  //               <svg
  //                 fill="currentColor"
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 strokeWidth="2"
  //                 className="w-5 h-5"
  //                 viewBox="0 0 24 24"
  //               >
  //                 <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
  //               </svg>
  //             </a>
  //             <a className="ml-3 text-gray-500">
  //               <svg
  //                 fill="none"
  //                 stroke="currentColor"
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 strokeWidth="2"
  //                 className="w-5 h-5"
  //                 viewBox="0 0 24 24"
  //               >
  //                 <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
  //                 <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
  //               </svg>
  //             </a>
  //             <a className="ml-3 text-gray-500">
  //               <svg
  //                 fill="currentColor"
  //                 stroke="currentColor"
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 strokeWidth="0"
  //                 className="w-5 h-5"
  //                 viewBox="0 0 24 24"
  //               >
  //                 <path
  //                   stroke="none"
  //                   d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
  //                 ></path>
  //                 <circle cx="4" cy="4" r="2" stroke="none"></circle>
  //               </svg>
  //             </a>
  //           </span>
  //         </div>
  //       </div>
  //     </footer>

  //   <div className="lg:hidden">
  // <div className="bg-white md:hidden fixed bottom-0 w-full">
  // <hr />

  // <ul className="h-14 flex px-6 items-center justify-between">
  //   <li>
  //   <div className="mr-10 flex md:hidden">
  //       <button
  //               onClick={() => setIsOpen(!isOpen)}
  //               type="button"
  //               className="bg-yellow-600 inline-flex items-center justify-center p-2 rounded-md text-white  hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-800 focus:ring-white"
  //               aria-controls="mobile-menu"
  //               aria-expanded="false"
  //             ><span className="sr-only">Open main menu</span>
  //             {!isOpen ? (
  //                 <svg
  //                   className="block h-6 w-6"
  //                   xmlns="http://www.w3.org/2000/svg"
  //                   fill="none"
  //                   viewBox="0 0 24 24"
  //                   stroke="currentColor"
  //                   aria-hidden="true"
  //                 >
  //                   <path
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                     strokeWidth="2"
  //                     d="M4 6h16M4 12h16M4 18h16"
  //                   />
  //                 </svg>
  //               ) : (
  //                 <svg
  //                   className="block h-6 w-6"
  //                   xmlns="http://www.w3.org/2000/svg"
  //                   fill="none"
  //                   viewBox="0 0 24 24"
  //                   stroke="currentColor"
  //                   aria-hidden="true"
  //                 >
  //                   <path
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                     strokeWidth="2"
  //                     d="M6 18L18 6M6 6l12 12"
  //                   />
  //                 </svg>
  //               )}
  //             </button>
  //     </div>
  //     <Transition
  //         show={isOpen}
  //         enter="transition ease-out duration-100 transform"
  //         enterFrom="opacity-0 scale-95"
  //         enterTo="opacity-100 scale-100"
  //         leave="transition ease-in duration-75 transform"
  //         leaveFrom="opacity-100 scale-100"
  //         leaveTo="opacity-0 scale-95"
  //       >
  //         {(ref) => (
  //           <div className="sm:hidden" id="mobile-menu">
  //             <div
  //               ref={ref}
  //               className="bg-white px-2 pt-2 pb-3 space-y-1 sm:px-3"
  //             >
  //              <ul className="flex items-center space-x-6 font-bold  md:text-md">
  //           <Link href={'/namkeens'}>
  //             <a className="mr-1 hover:bg-yellow-400  rounded-md px-3 py-2 text-lg" >
  //               <li>Namkeen</li>
  //             </a>

  //           </Link>
  //           <Link href={'/mix'}>
  //             <a className="mr-1 hover:bg-yellow-400  rounded-md px-3 py-2 text-lg">
  //               <li>Mix</li>
  //             </a>
  //           </Link>

  //           <Link href={'/michchar'}>
  //             <a className="mr-1 hover:bg-yellow-400  rounded-md px-3 py-2 text-lg">
  //               <li>Michchar</li>
  //             </a>
  //           </Link>
  //           <Link href={'/chips'}>
  //             <a className="mr-1 hover:bg-yellow-400  rounded-md px-3 py-2 text-lg">
  //               <li>Chips</li>
  //             </a>
  //           </Link>
  //         </ul>
  //             </div>
  //           </div>
  //         )}
  //       </Transition>
  //   </li>
  //   <Link href='/' >
  //     <a>
  //   <li>
  //   <svg  stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="text-2xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" >
  //     <path d="M946.5 505L534.6 93.4a31.93 31.93 0 0 0-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z"></path>
  //   </svg>
  //   </li>
  //   </a>
  //   </Link>

  //   <li >
  //   <AiOutlineShoppingCart onClick={toggleCart} className="text-2xl cursor-pointer"/>
  //   </li>
  // {!sanityuser.value && (
  //   <Link href='/login'>
  //     <a>
  //   <li>
  // <MdAccountCircle className="text-2xl"/>
  //   </li>
  //   </a>
  //   </Link>
  // )}
  // {sanityuser.value && (
  // <li>
  //     <span
  //         onMouseOver={() => {
  //           setDropdown(true);
  //         }}
  //         onMouseLeave={() => {
  //           setDropdown(false);
  //         }}
  //         className=" right-9  top-4 z-30 cursor-pointer"
  //       >
  //         {dropdown && (
  //           <div className=" right-5 bg-white shadow-lg border top-5 py-4 rounded-md px-5 w-32 z-30">
  //             <ul>
  //               <Link href={'/myprofile'}>
  //                 <a>
  //                   <li className="py-1 hover:text-yellow-700 text-sm font-bold">
  //                     My account
  //                   </li>
  //                 </a>
  //               </Link>
  //               <Link href={'/sanitymyorders'}>
  //                 <a>
  //                   <li className="py-1 hover:text-yellow-700 text-sm font-bold">
  //                     My Orders
  //                   </li>
  //                 </a>
  //               </Link>
  //               <li
  //                 onClick={logout}
  //                 className="py-1 hover:text-yellow-700 text-sm font-bold"
  //               >
  //                 Logout
  //               </li>
  //             </ul>
  //           </div>
  //         )}

  //           <MdAccountCircle className=" hover:text-yellow-500 text-2xl md:text-3zxl mx-2 cursor-pointer" />
  //       </span>
  //       </li>
  // )}
  // </ul>
  // </div>
  //   </div>
  //   </>
  //     );
  //   }
  //   Sidebar.propTypes = {
  //     isMobileSidebarOpen: PropTypes.bool,
  //     onSidebarClose: PropTypes.func,
  //     isSidebarOpen: PropTypes.bool,
  //   };

  return (
    <>
      <div>
        <div
          ref={ref}
          className={`w-full z-30 h-full fixed top-0 bg-white px-8 py-10 overflow-auto left-0 transform transition-all ${
            sidebar ? 'right-0 ' : 'hidden'
          }`}
        >
          <h2 className="text-xl font-bold text-center">Shopping Cart</h2>
          <span
            onClick={toggleCart}
            className="absolute top-5 right-2 cursor-pointer text-2xl text-yellow-500"
          >
            <AiFillCloseCircle />
          </span>
          <ol className="list-decimal font-semibold">
            {Object.keys(cart).length == 0 && (
              <div className="my-4 font-semibold"> Your cart is empty! </div>
            )}
            {Object.keys(cart).map((k) => {
              return (
                <li key={k}>
                  <div className="item flex my-5">
                    <div className="w-2/3 font-semibold">
                      {cart[k].name}({cart[k].grams})
                    </div>
                    <div className="flex font-semibold items-center w-1/3 justify-center text-lg">
                      <AiFillPlusCircle
                        onClick={() => {
                          addToCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].id,
                            cart[k].AvailableQty,
                            cart[k].grams
                          );
                        }}
                        className="cursor-pointer  text-yellow-500"
                      />
                      <span className="mx-2 text-sm">{cart[k].qty}</span>
                      <AiFillMinusCircle
                        onClick={() => {
                          removeFromCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].id,
                            cart[k].AvailableQty,
                            cart[k].grams
                          );
                        }}
                        className="cursor-pointer text-yellow-500"
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="total font-bold my-2">Subtotal: ₹{subTotal}</div>
          <div className="flex">
            <Link href={'/sanitycheckout'}>
              <button
                disabled={Object.keys(cart).length === 0}
                className="disabled:bg-yellow-300 flex mr-2 text-white bg-yellow-500 border-0 py-2 px-2 focus:outline-none hover:bg-yellow-600 rounded text-sm"
              >
                <BsFillBagCheckFill className="m-1" />
                Checkout
              </button>
            </Link>
            <button
              disabled={Object.keys(cart).length === 0}
              onClick={clearCart}
              className="disabled:bg-yellow-300 flex mr-2 text-white bg-yellow-500 border-0 py-2 px-2 focus:outline-none hover:bg-yellow-600 rounded text-sm"
            >
              Clear cart
            </button>
          </div>
        </div>



        <div>
        {isOpen &&(
             <>
                <div className={`w-full z-30 h-full fixed top-0 bg-white px-8 py-10 overflow-auto left-0 transform transition-all ${
            isOpen ? 'right-0 ' : 'hidden'
          }`}>
<div className="w-full flex justify-between items-center relative ps-5 md:ps-7 py-0 5 border-b border-gray-100">
  <h2 className="font-bold text-xl md:text-2xl m-0 text-heading">Menu</h2>
  
  <button  onClick={() => setIsOpen(!isOpen)} className="text-2xl text-black py-6 lg:py-8 focus:outline-none transition-opacity hover:opacity-60"><ImCross /></button>
</div>
<span className="text-sm text-gray-500">Featured</span>
<ul onClick={() => setIsOpen(!isOpen)} className="flex flex-col space-y-5 font-bold  md:text-md">
                        <Link href={'/namkeens'}>
                          <a className="mr-1 hover:bg-yellow-400  rounded-md px-3 py-2 text-lg">
                            <li>
                              {/* <Image
                              src="/all_in_one_200g.webp"
                              alt="namkeen"
                              width="64px"
                              height="64px">
                              </Image> */}
                              Namkeen
                              </li>
                          </a>
                        </Link>
                        <Link href={'/mix'}>
                          <a className="mr-1 hover:bg-yellow-400  rounded-md px-3 py-2 text-lg">
                            <li>Mix</li>
                          </a>
                        </Link>

                        <Link href={'/michchar'}>
                          <a className="mr-1 hover:bg-yellow-400  rounded-md px-3 py-2 text-lg">
                            <li>Michchar</li>
                          </a>
                        </Link>
                        <Link href={'/chips'}>
                          <a className="mr-1 hover:bg-yellow-400  rounded-md px-3 py-2 text-lg">
                            <li>Chips</li>
                          </a>
                        </Link>
                      </ul>
                </div>

                </>
              )}
              </div>





        <footer className="text-gray-600 body-font bg-slate-100 shadow-lg ">
          <div className="container px-5 py-10 mx-auto flex  lg:items-start lg:flex-row lg:flex-nowrap flex-wrap flex-col">
            <div className="w-64 flex-shrink-0 lg:mx-0 mx-auto text-center lg:text-left">
              <Link href={'/'}>
                <a className="flex title-font font-medium items-center lg:justify-start justify-center text-gray-900">
                  <Image
                    src="/main-logo.png"
                    width="256px"
                    height="48px"
                  ></Image>
                </a>
              </Link>
              <p className="mt-2 text-sm text-gray-500 px-4">
                Taste the incredible
              </p>
              <p className=" text-sm text-gray-500 px-4">
                Fresh Namkeen , Michchar and snacks
              </p>
            </div>
            <div className="flex-grow flex flex-wrap lg:pl-20 -mb-10 lgd:mt-0 mt-10 lg:text-left text-center">
              <div className="lg:w-1/4  w-full px-4">
                <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                  Shop
                </h2>
                <nav className="list-none mb-10">
                  <li>
                    <Link href={`/namkeens`}>
                      <a className="text-gray-600 hover:text-gray-800">
                        Namkeen
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/michchar`}>
                      <a className="text-gray-600 hover:text-gray-800">
                        Michchar
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/chips`}>
                      <a className="text-gray-600 hover:text-gray-800">Chips</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/mix`}>
                      <a className="text-gray-600 hover:text-gray-800">Mix</a>
                    </Link>
                  </li>
                </nav>
              </div>
              <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                  Policy
                </h2>
                <nav className="list-none mb-10">
                  <li>
                    <Link href={`/privacy`}>
                      <a className="text-gray-600 hover:text-gray-800">
                        Privacy Policy
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms">
                      <a className="text-gray-600 hover:text-gray-800">
                        Terms and Conditions
                      </a>
                    </Link>
                  </li>
                </nav>
              </div>
              <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                  CUSTOMER SERVICE
                </h2>
                <nav className="list-none mb-10">
                  <li>
                    <Link href="/contact">
                      <a className="text-gray-600 hover:text-gray-800">
                        Contact Us
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/about">
                      <a className="text-gray-600 hover:text-gray-800">
                        About us
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/returnpolicy">
                      <a className="text-gray-600 hover:text-gray-800">
                        Return Policy
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/trackyourorder">
                      <a className="text-gray-600 hover:text-gray-800">
                       Track Your Order
                      </a>
                    </Link>
                  </li>
                </nav>
              </div>
              <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                <Image
                  alt="pay"
                  src="/pay.png"
                  width="800"
                  height="337"
                  className="lg:w-1/4 flex items-center justify-center md:w-1/2 w-full px-4"
                ></Image>
              </div>
            </div>
          </div>
          <div className="bg-gray-100">
            <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
              <p className="text-gray-500 text-sm text-center sm:text-left">
                © {fullYear} VikasSevBhandar.com - All rights reserved
              </p>

              <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
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
                <a className="ml-3 text-gray-500">
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
                <a className="ml-3 text-gray-500">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                  </svg>
                </a>
                <a className="ml-3 text-gray-500">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="none"
                      d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                    ></path>
                    <circle cx="4" cy="4" r="2" stroke="none"></circle>
                  </svg>
                </a>
              </span>
            </div>
          </div>
        </footer>
      </div>

      <div className="lg:hidden">
        <div className="bg-white md:hidden fixed bottom-0 w-full">
          <hr />
          
          <ul className="h-14 flex px-6 items-center justify-between">
            <li>
              <div className="mr-10 flex md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="bg-yellow-600 inline-flex items-center justify-center p-2 rounded-md text-white  hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-800 focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  {!isOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
             
              {/* <Transition
                show={isOpen}
                enter="transition ease-out duration-100 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {(ref) => (
                  <div className="sm:hidden" id="mobile-menu">
                    <div
                      ref={ref}
                      className="bg-white mt-7 px-2 pt-2 pb-3 space-y-1 sm:px-3"
                    >
                      <ul className="flex items-center space-x-6 font-bold  md:text-md">
                        <Link href={'/namkeens'}>
                          <a className="mr-1 hover:bg-yellow-400  rounded-md px-3 py-2 text-lg">
                            <li>Namkeen</li>
                          </a>
                        </Link>
                        <Link href={'/mix'}>
                          <a className="mr-1 hover:bg-yellow-400  rounded-md px-3 py-2 text-lg">
                            <li>Mix</li>
                          </a>
                        </Link>

                        <Link href={'/michchar'}>
                          <a className="mr-1 hover:bg-yellow-400  rounded-md px-3 py-2 text-lg">
                            <li>Michchar</li>
                          </a>
                        </Link>
                        <Link href={'/chips'}>
                          <a className="mr-1 hover:bg-yellow-400  rounded-md px-3 py-2 text-lg">
                            <li>Chips</li>
                          </a>
                        </Link>
                      </ul>
                    </div>
                  </div>
                )}
              </Transition> */}
            </li>
            <Link href="/">
              <a>
                <li>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    className="text-2xl"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M946.5 505L534.6 93.4a31.93 31.93 0 0 0-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z"></path>
                  </svg>
                </li>
              </a>
            </Link>

            <li>
            <span onClick={toggleCart} className="relative inline-block cursor-pointer">
              <AiOutlineShoppingCart
                onClick={toggleCart}
                className="text-2xl cursor-pointer"
              />
               {Object.keys(cart).map((k) =>{
          return( 
            <span key={k} className="absolute  md:block top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{cart[k].qty}</span>
)})}
 </span>
            </li>
            {!sanityuser.value && (
              <Link href="/login">
                <a>
                  <li>
                    <MdAccountCircle className="text-2xl" />
                  </li>
                </a>
              </Link>
            )}
            {sanityuser.value && (
              <li>
                <span
                  onMouseOver={() => {
                    setDropdown(true);
                  }}
                  onMouseLeave={() => {
                    setDropdown(false);
                  }}
                  className=" right-9  top-4 z-30 cursor-pointer"
                >
                  {dropdown && (
                    <div className=" right-5 bg-white shadow-lg border top-5 py-4 rounded-md px-5 w-32 z-30">
                      <ul>
                        <Link href={'/myprofile'}>
                          <a>
                            <li className="py-1 hover:text-yellow-700 text-sm font-bold">
                              My account
                            </li>
                          </a>
                        </Link>
                        <Link href={'/sanitymyorders'}>
                          <a>
                            <li className="py-1 hover:text-yellow-700 text-sm font-bold">
                              My Orders
                            </li>
                          </a>
                        </Link>
                        <li
                          onClick={logout}
                          className="py-1 hover:text-yellow-700 text-sm font-bold"
                        >
                          Logout
                        </li>
                      </ul>
                    </div>
                  )}

                  <MdAccountCircle className=" hover:text-yellow-500 text-2xl md:text-3zxl mx-2 cursor-pointer" />
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
