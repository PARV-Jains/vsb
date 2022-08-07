import axios from 'axios';
import nc from 'next-connect';
import client from '../../utils/client';
import config from '../../utils/config';
import { signToken, isAuth } from '../../utils/auth';
// import bcrypt from 'bcryptjs';

//  const handler = nc();

//  handler.use(isAuth);
const handler = async (req, res) => {
  // const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  // const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  // let sanityordernew = await client.fetch(
  //   `*[_type == "sanityorder"] | order(_createdAt desc) [0] `
  //   );
  // let isPaid = await client.fetch(
  //   `*[_type == "sanityorder"] | order(_createdAt desc) [0] .isPaid  `
  // );
  let sanityorderid = await client.fetch(
    `*[_type == "sanityorder"] | order(_createdAt desc) [0] ._id`
  );
  let sanityorderitems = await client.fetch(
    `*[_type == "sanityorder"] | order(_createdAt desc) [0] .sanityorderitems`
  );

  const projectId = config.projectId;
  const dataset = config.dataset;
  const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;

  for (let i = 0; i < sanityorderitems.length; i++) {
    await axios.post(
     `https://${projectId}.api.sanity.io/v2022-05-30/data/mutate/${dataset}`,  
     {
       mutations: [
         {
           patch: {
             id: sanityorderid,
             set: {
              codStatus: false,
              isPaid: true,
              Sanitytransactionid: req.body.TXNID,
              STATUS: 'PAYTM',
              sanitypaymentinfo:req.body.BANKNAME
             },
           },
         },  
         {
           patch: {
             id: sanityorderitems[i].id,
             set: {
               AvailableQty: sanityorderitems[i].AvailableQty - sanityorderitems[i].qty,
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
   })
 }
  // await axios.post(
  //     `https://${projectId}.api.sanity.io/v2022-05-30/data/mutate/${dataset}`,
  //     {
  //       mutations: [
  //         {
  //           patch: {
  //             id: sanityorderid,
  //             set: {
  //               isPaid: true,
  //               codStatus: false,
  //               Sanitytransactionid: req.body.TXNID,
  //               STATUS: 'Paid',
  //               sanitypaymentinfo:req.body.PAYMENTMODE,
  //             },
  //           },
  //         },
  //         {
  //           patch: {
  //             id: sanityorderitems[0].id,
  //             set: {
  //               AvailableQty: sanityorderitems[0].AvailableQty - sanityorderitems[0].qty,
  //             },
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       headers: {
  //         'Content-type': 'application/json',
  //         Authorization: `Bearer ${tokenWithWriteAccess}`,
  //       },
  //     }
  //   )
  //   .then((response) => {})
  //   .catch((error) => {
  //     console.log(error.response.data);
  //     console.log(error.response.status);
  //     console.log(error.response.headers);
  //     console.log(error.request);
  //   });
  // console.log(isPaid,oid)
  // return res.send({ message: 'updated successfully' });
   res.redirect('/sanitypayorder?clearCart=1&_id=' + sanityorderid, 200);
};

export default handler;
