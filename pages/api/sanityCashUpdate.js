import axios from 'axios';
import nc from 'next-connect';
import client from '../../utils/client';
import config from '../../utils/config';
import { signToken, isAuth } from '../../utils/auth';
import jsCookie from 'js-cookie';
import pincodes from '../../pincodes.json';

// import bcrypt from 'bcryptjs';

const handler = nc();

//  handler.use(isAuth);
handler.put(async (req, res) => {
  if (!Object.keys(pincodes).includes(req.body.pincode)) {
    res.status(200).json({
      success: false,
      error: 'the pincode you have entered is not serviceable ',
      cartClear: false,
    });
    return;
  }

  // let product,
  let sanityproductss,
    sumTotal = 0;
  let cart = JSON.parse(req.cookies.cart);
  if (req.body.subTotal <= 0) {
    res.status(200).json({
      success: false,
      error: 'your cart is empty . Please build your cart and try again ',
      cartClear: false,
    });
    return;
  }
  for (let item in cart) {
    sumTotal += cart[item].price * cart[item].qty;
    sanityproductss = await client.fetch(
      `*[_type == "sanityproduct" && _id == $id]`,
      {
        id: cart[item].id,
      }
    );

    if (cart[item].AvailableQty < cart[item].qty) {
      res.status(200).json({
        success: false,
        error: 'some items in your cart went out of stock . please try again ',
        cartClear: true,
      });
      return;
    }

    if (sanityproductss[0].price != cart[item].price) {
      console.log(sanityproductss[0].price, cart[item].price);
      res.status(200).json({
        success: false,
        error:
          'price of some items in your cart have changed . please try again price',
        cartClear: true,
      });
      return;
    }
  }
  if (sumTotal != req.body.subTotal) {
    res.status(200).json({
      success: false,
      error:
        'price of some items in your cart have changed . please try again subtotal error',
      cartClear: true,
    });

    return;
  }

  let sanityorderid = await client.fetch(
    `*[_type == "sanityorder"] | order(_createdAt desc) [0] ._id`
  );

  let sanityorderitems = await client.fetch(
    `*[_type == "sanityorder"] | order(_createdAt desc) [0] .sanityorderitems`
  );

  const projectId = config.projectId;
  const dataset = config.dataset;
  const tokenWithWriteAccess = process.env.SANITY_API_WRITE_TOKEN;

  for (let i = 0; i < sanityorderitems.length; i++) {
    sanityorderitems[i];
    await axios
      .post(
        `https://${projectId}.api.sanity.io/v2022-05-30/data/mutate/${dataset}`,
        {
          mutations: [
            {
              patch: {
                id: sanityorderid,
                set: {
                  codStatus: true,
                  isPaid: false,
                  Sanitytransactionid: 'Paid By Cash',
                  STATUS: 'Cash On Delivery',
                  //  sanitydeliverystatus: sanitydeliverystatus[0]
                },
              },
            },
            {
              patch: {
                id: sanityorderitems[i].id,
                set: {
                  AvailableQty:
                    sanityorderitems[i].AvailableQty - sanityorderitems[i].qty,
                },
              },
            },
          ],
        },
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${tokenWithWriteAccess}`,
          },
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        console.log(error.request);
      });
  }
});

export default handler;
