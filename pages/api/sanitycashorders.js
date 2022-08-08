import axios from 'axios';
import nc from 'next-connect';
import { isAuth } from '../../utils/auth';
import client from '../../utils/client';
import config from '../../utils/config';
const PaytmChecksum = require('paytmchecksum');
const https = require('https');
import pincodes from '../../pincodes.json';

// const handler = nc();

// handler.use(isAuth);
const handler = async (req, res) => {


  if (!Object.keys(pincodes).includes(req.body.pincode)) {
    res.status(200).json({
      success: false,
      error: 'the pincode you have entered is not serviceable ',
      cartClear: false,
    });
    return;
  }

  // let product,
  let sanityorderitems = await client.fetch(
    `*[_type == "sanityorder"] | order(_createdAt desc) [0] .sanityorderitems`
  );

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
      console.log(sanityproductss[0].price,cart[item].price);
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
    console.log(sumTotal, req.body.subTotal);
    res.status(200).json({
      success: false,
      error:
        'price of some items in your cart have changed . please try again subtotal error',
      cartClear: true,
    });
    return;
  }

  if (
    req.body.phone.length != 10 ||
    !Number.isInteger(Number(req.body.phone))
  ) {
    res.status(200).json({
      success: false,
      error: 'Please enter your 10 digit phone number',
      cartClear: false,
    });
    return;
  }
  if (
    req.body.pincode.length != 6 ||
    !Number.isInteger(Number(req.body.pincode))
  ) {
    res.status(200).json({
      success: false,
      error: 'Please enter your 6 digit pincode',
      cartClear: false,
    });
    return;
  }
  let sanityorderid = await client.fetch(
    `*[_type == "sanityorder"] | order(_createdAt desc) [0] ._id`
  );
  const projectId = config.projectId;
  const dataset = config.dataset;
  const tokenWithWriteAccess = process.env.SANITY_API_WRITE_TOKEN;
  const { data } = await axios.post(
    `https://${projectId}.api.sanity.io/v2022-05-30/data/mutate/${dataset}?returnIds=true`,
    {
      mutations: [
        {
          create: {
            _type: 'sanityorder',
            createdAt: new Date().toISOString(),
            ...req.body,
            // sanityusername: req.sanityuser.name,
            sanityuser: {
              _type: 'reference',
              // _ref: req.sanityuser._id,
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
  );
 

  // let sanityproductid = await client.fetch(
  //   `*[_type == "sanityproduct"] | order(_createdAt desc) [1]  ._id`
  // );
  // let AvailablepQty = await client.fetch(
  //   `*[_type == "sanityproduct"] | order(_createdAt desc) [1]  .AvailableQty`
  // );
 
  // let sanitydeliverystatuss = await client.fetch(
  //   `*[_type == "sanityorder"] .sanitydeliverystatus`
  // );

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
 
  // var paytmParams = {};
  // paytmParams.body = {
  //   requestType: 'Payment',
  //   mid: process.env.NEXT_PUBLIC_PAYTM_MID,
  //   websiteName: 'VikasSevBhandar',
  //   orderId: req.body.oid,
  //   callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/api/sanityPosttransaction`,
  //   txnAmount: {
  //     value: req.body.subTotal,
  //     currency: 'INR',
  //   },
  //   userInfo: {
  //     custId: req.body.sanityemail,
  //   },
  // };

  // /*
  //  * Generate checksum by parameters we have in body
  //  * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
  //  */
  // const checksum = await PaytmChecksum.generateSignature(
  //   JSON.stringify(paytmParams.body),
  //   process.env.PAYTM_MKEY
  // );

  // paytmParams.head = {
  //   signature: checksum,
  // };

  // var post_data = JSON.stringify(paytmParams);

  // const requestAsync = async () => {
  //   return new Promise((resolve, reject) => {
  //     var options = {
  //       /* for Staging */
  //       hostname: 'securegw-stage.paytm.in',
  //       /* for Production */
  //       // hostname: 'securegw.paytm.in',

  //       port: 443,
  //       path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Content-Length': post_data.length,
  //       },
  //     };

  //     var response = '';
  //     var post_req = https.request(options, function (post_res) {
  //       post_res.on('data', function (chunk) {
  //         response += chunk;
  //       });

  //       post_res.on('end', function () {
  //         // console.log('Response: ', response);
  //         // response.success = true
  //         let ress = JSON.parse(response).body;
  //         ress.success = true;
  //         ress.cartClear = false;
  //         resolve(ress);
  //       });
  //     });

  //     post_req.write(post_data);
  //     post_req.end();
  //   });
  // };

  // let myr = await requestAsync();
  // res.status(200).json(myr);
  // res.status(201).send(data.results[0].id);
 
  res.redirect('/sanitypayorder?clearCart=1&_id=' + sanityorderid, 200);
};

export default handler;
