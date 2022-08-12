import '../styles/globals.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsCookie from 'js-cookie';

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const router = useRouter();
  const [key, setKey] = useState();
  const [user, setUser] = useState({ value: null });
  const [sanityuser, setSanityuser] = useState({ value: null });

  useEffect(() => {
    try {
      if (localStorage.getItem('cart')) {
        setCart(JSON.parse(localStorage.getItem('cart')));
        setCart(JSON.parse(jsCookie.get('cart')));
        saveCart(JSON.parse(localStorage.getItem('cart')));
        saveCart(JSON.parse(jsCookie.get('cart')));
      }
    } catch (error) {
      localStorage.clear();
      jsCookie.remove();
    }
    const myuser = JSON.parse(localStorage.getItem('myuser'));
    if (myuser) {
      setUser({ value: myuser.token, email: myuser.email });
    }
    setKey(Math.random());

    const sanityuserinfo = JSON.parse(localStorage.getItem('sanityuserinfo'));
    if (sanityuserinfo) {
      setSanityuser({
        // value: sanityuserinfo.sanityusertoken,
        value: sanityuserinfo.token,
        email: sanityuserinfo.email,
      });
    }
    setKey(Math.random());
  }, [router.query]);

  const saveCart = (myCart) => {
    localStorage.setItem('cart', JSON.stringify(myCart));
    jsCookie.set('cart', JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]]['price'] * myCart[keys[i]].qty;
    }
    setSubTotal(subt);
  };

  const addToCart = (
    itemCode,
    qty,
    price,
    name,
    size,
    id,
    AvailableQty,
    grams
  ) => {
    if (Object.keys(cart).length == 0) {
      setKey(Math.random());
    }
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = {
        qty: 1,
        price,
        name,
        size,
        id,
        AvailableQty,
        grams,
      };
    }
    setCart(newCart);
    saveCart(newCart);
    toast.success(`${cart[itemCode].qty} ${name}(${grams}) added to cart `, {
      position: 'bottom-center',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  // const addSanityToCart = (itemSanityCode, qty, price, name, size) => {
  //   if (Object.keys(cart).length == 0) {
  //     setKey(Math.random());
  //   }
  //   let newSanityCart = cart;
  //   if (itemSanityCode in cart) {
  //     newSanityCart[itemSanityCode].qty = cart[itemSanityCode].qty + qty;
  //   } else {
  //     newSanityCart[itemSanityCode] = { qty: 1, price, name, size };
  //   }
  //   setCart(newSanityCart);
  //   saveCart(newSanityCart);
  // };

  const buyNow = (
    itemCode,
    qty,
    price,
    name,
    size,
    id,
    AvailableQty,
    grams
  ) => {
    let newCart = {};
    newCart[itemCode] = { qty: 1, price, name, size, id, AvailableQty, grams };
    setCart(newCart);
    saveCart(newCart);
    router.push('/sanitycheckout');
  };

  const removeFromCart = (
    itemCode,
    qty,
    price,
    name,
    size,
    id,
    AvailableQty,
    grams
  ) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode]['qty'] <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
  };
  const logout = () => {
    localStorage.removeItem('myuser');
    setUser({ value: null });
    setKey(Math.random());
    router.push('/');
    localStorage.removeItem('sanityuserinfo');
    localStorage.removeItem('updatesanityuserinfo');
    localStorage.removeItem('updatepasssanityuserinfo');
    setSanityuser({ value: null });
    setKey(Math.random());
    router.push('/');
  };
  const sanitylogout = () => {
    // localStorage.removeItem('myuser');
    // setUser({ value: null });
    // setKey(Math.random());
    // router.push('/');
    localStorage.removeItem('sanityuserinfo');
    setSanityuser({ value: null });
    setKey(Math.random());
    router.push('/');
  };

  return (
    <>
      <NextNProgress
        options={{ easing: 'ease', speed: 500, showSpinner: false }}
        color="#f2d00d"
        startPosition={0.3}
        stopDelayMs={200}
        height={4}
        showOnShallow={true}
      />
      {key && (
        <Navbar
          logout={logout}
          sanitylogout={sanitylogout}
          user={user}
          sanityuser={sanityuser}
          key={key}
          buyNow={buyNow}
          cart={cart}
          addToCart={addToCart}
          // addSanityToCart={addSanityToCart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          subTotal={subTotal}
        />
      )}
      <Component
        buyNow={buyNow}
        cart={cart}
        addToCart={addToCart}
        // addSanityToCart={addSanityToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        {...pageProps}
      />
      <Footer />
    </>
  );
}

export default MyApp;
