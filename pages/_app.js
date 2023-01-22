import '../styles/globals.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsCookie from 'js-cookie';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Router from 'next/router';
import Loading from '../components/Loader';

// function Spinner() {
//   const router = useRouter();

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const handleStart = (url) => url !== router.asPath && setLoading(true);
//     const handleComplete = (url) => url === router.asPath && setLoading(false);

//     router.events.on('routeChangeStart', handleStart);
//     router.events.on('routeChangeComplete', handleComplete);
//     router.events.on('routeChangeEnd', handleComplete);

//     return () => {
//       router.events.off('routeChangeStart', handleStart);
//       router.events.off('routeChangeComplete', handleComplete);
//       router.events.off('routeChangeEnd', handleComplete);
//     };
//   });

//   return (
//     loading && (
//       <div className="spinner-wrapper">  
//         <div className="spinner"></div>
//       </div>
//     )
//   );
// }

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [sidebar, setSidebar] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const router = useRouter();
  const [key, setKey] = useState();
  const [loading, setLoading] = useState(false);
  const [footerkey, seFootertKey] = useState();
  const [user, setUser] = useState({ value: null });
  const [sanityuser, setSanityuser] = useState({ value: null });
  const theme = createTheme({});

  useEffect(() => {
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(function () {
      OneSignal.init({
        appId: '8c33f5fc-1004-4f36-9b24-0b17d3cbc7c6',
        safari_web_id:
          'web.onesignal.auto.215a98b6-2876-4938-a894-401760de5038',
        notifyButton: {
          enable: true,
          size: 'medium' /* One of 'small', 'medium', or 'large' */,
          theme:
            'default' /* One of 'default' (red-white) or 'inverse" (white-red) */,
          position: 'bottom-right' /* Either 'bottom-left' or 'bottom-right' */,
          offset: {
            bottom: '40px',
            left: '0px' /* Only applied if bottom-left */,
            right: '0px' /* Only applied if bottom-right */,
          },
          showCredit: false /* Hide the OneSignal logo */,
          text: {
            'tip.state.unsubscribed': 'Subscribe to notifications of vsb',
            'tip.state.subscribed': "You're subscribed to notifications",
            'tip.state.blocked': "You've blocked notifications",
            'message.prenotify': 'Click to subscribe to notifications',
            'message.action.subscribed':
              'Thanks for subscribing!to Vikas Sev Bhandar',
            'message.action.resubscribed': "You're subscribed to notifications",
            'message.action.unsubscribed':
              "You won't receive notifications again",
            'dialog.main.title': 'Manage Site Notifications',
            'dialog.main.button.subscribe': 'SUBSCRIBE',
            'dialog.main.button.unsubscribe': 'UNSUBSCRIBE',
            'dialog.blocked.title': 'Unblock Notifications',
            'dialog.blocked.message':
              'Follow these instructions to allow notifications:',
          },
        },
        allowLocalhostAsSecureOrigin: true,
        webhooks: {
          cors: false, // Defaults to false if omitted
          'notification.displayed':
            'https://vercel.com/2006parvjain-gmailcom/vsb', // e.g. https://site.com/hook
          'notification.clicked':
            'https://vercel.com/2006parvjain-gmailcom/vsb',
          // ... follow the same format for any event in the list above
        },
      });
    });
  }, []);

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
        isAdmin: sanityuserinfo.isAdmin,
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
    grams,
    slug
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
        slug,
      };
    }
    setCart(newCart);
    saveCart(newCart);
    toast.success(`${cart[itemCode].qty} ${name} (${grams}) added to cart `, {
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
    grams,
    slug
  ) => {
    let newCart = {};
    newCart[itemCode] = {
      qty: 1,
      price,
      name,
      size,
      id,
      AvailableQty,
      grams,
      slug,
    };
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
    grams,
    slug
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

  Router.events.on('routeChangeStart', (url) => {
    // console.log('route change')
    setLoading(true);
  });
  Router.events.on('routeChangeComplete', (url) => {
    // console.log('route change is completed')
    setLoading(false);
  });
  return (
    <>
      {/* {loading && <Loading/>} */}
      {/* <Spinner /> */}
      <NextNProgress
        options={{ easing: 'ease', speed: 500, showSpinner: false }}
        color="#f2d00d"
        startPosition={0.3}
        stopDelayMs={200}
        height={5}
        showOnShallow={true}
      />
      <ThemeProvider theme={theme}>
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

        <Footer
          logout={logout}
          sanitylogout={sanitylogout}
          user={user}
          sanityuser={sanityuser}
          footerkey={footerkey}
          buyNow={buyNow}
          cart={cart}
          addToCart={addToCart}
          // addSanityToCart={addSanityToCart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          subTotal={subTotal}
        />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
