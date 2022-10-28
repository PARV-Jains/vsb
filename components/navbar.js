import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {Transition} from '@headlessui/react'
import Link from 'next/link';
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import {GiHamburgerMenu} from 'react-icons/gi';
import {RiArrowDropDownLine,RiNotificationBadgeLine} from 'react-icons/ri';
import {IoMdNotifications} from 'react-icons/io';

const Navbar = ({
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
}) => {
  const [dropdown, setDropdown] = useState(false);
  // const [itemList, setItemList] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    Object.keys(cart).length === 0 && setSidebar(false);
    // Object.keys(cart).length === 0 && setSidebar(true);
    let exempted = ['/checkout', '/order', '/orders', '/myaccount','/sanitycheckout','/sanitypayorder','sanitymyorders','sanitymyaccount'];
    if (exempted.includes(router.pathname)) {
      setSidebar(false);
    }
  }, [cart,router.pathname]);

  


  const toggleCart = () => {
    setSidebar(!sidebar);
  };
  const ref = useRef();
    const clickPoint = useRef();
    const handleFocus = () => {
      clickPoint.current.style.display = "none";
  };

  const handleBlur = () => {
    clickPoint.current.style.display = "block";
  };

  const [query, setQuery] = useState('');
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

 

  return (
    <>
      {!sidebar && (
        <span
          onMouseOver={() => {
            setDropdown(true);
          }}
          onMouseLeave={() => {
            setDropdown(false);
          }}
          className="fixed  right-9 hidden md:block top-4 z-30 cursor-pointer"
        >
          
          {dropdown && (
            <div className="absolute right-5 bg-white shadow-lg border top-5 py-4 rounded-md px-5 w-32 z-30">
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
          {/* {user.value && (
            <MdAccountCircle className=" hover:text-yellow-500 text-xl md:text-2xl mx-2 cursor-pointer" />
          )} */}
           
          {sanityuser.value && (  
            <MdAccountCircle className=" hover:text-yellow-500 text-xl md:text-2xl mx-2 cursor-pointer" />
          )}
         
         
        </span>
      )}
      
      
      <div
        className={`sticky w-full border-b border-gray-200  flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-sm  top-0 z-10 bg-white ${
          !sidebar && `overflow-hidden`
        }`}
      >
        <div className="logo ">
          <Link href='/'>
            <a>
              <Image alt="" src="/main-logo.png" width="256" height="48" />
            </a>
          </Link>
        </div>
        <div className="nav hidden md:block">
        {/* <div className="p-10"> */}

        {/* <div id="dropdown" className="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
    <ul className="py-1" aria-labelledby="dropdownButton">
      <li>
        <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
      </li>
      <li>
        <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
      </li>
      <li>
        <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
      </li>
      <li>
        <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
      </li>
    </ul>
</div> */}

{/* </div> */}
{/* {itemList && (
  
           <li className="fixed  w-[20%] -ml-4 mt-10 z-10 " style={{opacity: "1", transform: "none", transition: "opacity 304ms cubic-bezier(0.4, 0, 0.2, 1) 0ms , transform 202ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"}}>
            <div className="bg-gray-50 flex">
              <ul className="pb-5 pt-6 2xl:pt-7 w-full">
                <li className="text-body text-sm block py-1 5 px-5 xl:px-10 hover:bg-yellow-300">Ratlami</li>
                <li className="text-body text-sm block py-1 5 px-5 xl:px-10 hover:bg-yellow-300">Ujjaini</li>
                <li className="text-body text-sm block py-1 5 px-5 xl:px-10 hover:bg-yellow-300">Double Laung</li>
                <li className="text-body text-sm block py-1 5 px-5 xl:px-10 hover:bg-yellow-300">Tikhi</li>
              </ul>
            </div>
           </li>
          )} */}
          <ul className="flex items-center space-x-6 font-bold  md:text-md">
            <Link href={'/namkeens'}>
              <a 
          //     onMouseOver={() => {
          //   setItemList(true);
            
          // }}
          // onMouseLeave={() => {
          //   setItemList(false);
          // }}
          >
            <li 
           className="flex hover:text-yellow-500 mr-1 px-3 py-2 rounded-md h-20 items-center relative text-lg lg:text-xl">Namkeen 
           {/* <RiArrowDropDownLine className="text-3xl"/> */}
           </li>
              </a>
            </Link>
            <Link href={'/mix'}>
            <a >
                <li className="flex hover:text-yellow-500 mr-1 px-3 py-2 rounded-md h-20 items-center relative text-lg lg:text-xl">Mix 
                {/* <RiArrowDropDownLine className="text-3xl"/> */}
                </li>
              </a>
            </Link>
           
            <Link href={'/michchar'}>
            <a >
                <li className="flex hover:text-yellow-500 mr-1 px-3 py-2 rounded-md h-20 items-center relative text-lg lg:text-xl">Michchar 
                {/* <RiArrowDropDownLine className="text-3xl"/> */}
                </li>
              </a>
            </Link>
            <Link href={'/chips'}>
            <a >
                <li className="flex hover:text-yellow-500 mr-1 px-3 py-2 rounded-md h-20 items-center relative text-lg lg:text-xl">Chips
                 {/* <RiArrowDropDownLine className="text-3xl"/> */}
                </li>
              </a>
            </Link>
          </ul>
     

        </div>
        
        {/* <div className="mr-10 flex md:hidden">

        <button
								onClick={() => setIsOpen(!isOpen)}
								type="button"
								className="bg-yellow-600 inline-flex items-center justify-center p-2 rounded-md text-white  hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-800 focus:ring-white"
								aria-controls="mobile-menu"
								aria-expanded="false"
							><span className="sr-only">Open main menu</span>
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
      <Transition
					show={isOpen}
					enter="transition ease-out duration-100 transform"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="transition ease-in duration-75 transform"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					{(ref) => (
						<div className="md:hidden" id="mobile-menu">
							<div
								ref={ref}
								className="bg-white px-2 pt-2 pb-3 space-y-1 sm:px-3"
							>
							 <ul className="flex items-center space-x-6 font-bold  md:text-md">
            <Link href={'/namkeens'}>
              <a className="mr-1 hover:bg-yellow-400  rounded-md px-3 py-2 text-lg" >
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
				</Transition> */
        }



 <form onSubmit={submitHandler}> 
<div className="items-center px-4 flex justify-center " >
            <div className="relative mr-3 mt-3 mb-3">
                <div className="absolute top-3 left-3 items-center"ref={clickPoint} >
                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                </div>
                <input
                    type="text"
                    name="query"
                     onChange={queryChangeHandler}
                    className="block p-2 pl-10 w-70 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:pl-3"
                    placeholder={ placeholder || "Laung Ki Namkeen"}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
        </div>
        </form>
        <div className="cursor-pointer items-center cart absolute right-0 top-5 mx-5 flex ">
       
          {!sanityuser.value && (
          
            <Link href={'/login'}>
              <a>
                <button className="bg-yellow-500 hidden md:block rounded-md px-2 py-1 pb-1.5 text-white mx-3 text-sm">
                  Login
                </button>
              </a>
            </Link>
          )}
<span onClick={toggleCart} className="relative inline-block cursor-pointer">
          <AiOutlineShoppingCart
            onClick={toggleCart}
            className="text-xl hidden md:block md:text-2xl"
            
          />
         {Object.keys(cart).map((k) =>{
          return( 
            <span key={k} className="absolute hidden md:block top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">{cart[k].qty}</span>
)})}
         </span>
        </div>
       
        {sanityuser.email == "admin@vsb.com" && ( 
        
          <>
            <IoMdNotifications className=" hover:text-yellow-500  text-2xl md:text-3xl mx-2 cursor-pointer" />
            </>
          )
        }
        <div
          ref={ref}
          className={`w-72  h-[100vh] z-10 sideCart overflow-y-scroll absolute top-0 bg-yellow-100 px-8 py-10 transition-all ${
            sidebar ? 'right-0' : '-right-96'
          }`}
        >
          <h2 className="text-xl md:text-2xl m-0 text-heading font-bold ">Shopping Cart</h2>
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
      </div>
    
    </>
    
  );
};

export default Navbar;
