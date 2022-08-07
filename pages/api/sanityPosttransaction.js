import PaytmChecksum from 'paytmchecksum';
import config from '../../utils/config';
import client from '../../utils/client';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const handler = async (req, res) => {
  let sanityorderid = await client.fetch(
    `*[_type == "sanityorder"] | order(_createdAt desc) [0] ._id`
    );
  let sanityorder = await client.fetch(
    `*[_type == "sanityorder"] | order(_createdAt desc) [0] `
    );
    let slug = await client.fetch(
    `*[_type == "sanityproduct"] | order(_createdAt desc) [0] .slug.current`
  );
  // let AvailableQty = await client.fetch(
  //   `*[_type == "sanityproduct"] | order(_createdAt desc) [0] .AvailableQty -1 `
  // );
  let isPaid = await client.fetch(
    `*[_type == "sanityorder"] | order(_createdAt desc) [0] .isPaid  `
  );
  // let tryqty = await client.fetch(
  //   `*[_type == "sanityproduct"][0].AvailableQty -1`
  // );
  const projectId = config.projectId;
  const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;
  const dataset = config.dataset;

  var paytmChecksum = '';
  var paytmParams = {};

  const received_data = req.body;
  for (var key in received_data) {
    if (key == 'CHECKSUMHASH') {
      paytmChecksum = received_data[key];
    } else {
      paytmParams[key] = received_data[key];
    }
  }

  var isValidChecksum = PaytmChecksum.verifySignature(
    paytmParams,
    process.env.PAYTM_MKEY,
    paytmChecksum
  );
  if (!isValidChecksum) {
    res.status(500).send('Some error occured');
    return;
  }
  // if(req.body.TXNID){
  // const udata = await axios.post(
  //   `https://${projectId}.api.sanity.io/v2022-05-30/data/mutate/${dataset}`,
  //   {
  //     mutations: [
  //       {
  //         patch: {
  //           _type: 'sanityorder',
  //           set:{
  //             Sanitytransactionid: req.body.TXNID,
  //           }
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     headers: {
  //       'Content-type': 'application/json',
  //       Authorization: `Bearer ${tokenWithWriteAccess}`,
  //     },
  //   }
  // );
  //   // res.status(200).send({...sanityproductupdate});
  // }

  if (req.body.STATUS == 'TXN_SUCCESS') {
    // try {
    // await axios.put(
    //     '/api/sanityProductUpdate',
    //     {
    //        isPaid
    //     },
    //     { headers: {
    //     'Content-type': 'application/json',
    //      Authorization: `Bearer ${tokenWithWriteAccess}` } }
    //   );
    //   // router.push(`/`)
    // } catch (err) {
    // }
    // const data = {
    //  isPaid: isPaid
    // };
    // let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/sanityProductUpdate`, {
    //   method: 'POST', // or 'PUT'
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    
    // function onApprove(data) {
    //   return async function (details) {
    //     try {
    //       const { data } = await axios.put(
    //         `/api/sanityProductUpdate`,
    //         details,
    //         {
    //           headers: { Authorization: `Bearer ${tokenWithWriteAccess}` },
    //         }
    //       );
    //       // dispatch({ type: 'PAY_SUCCESS', payload: data });
    //     } catch (err) {
    //       // dispatch({ type: 'PAY_FAIL', payload: getError(err) });
    //     }
    //   };
    // }
    // onApprove()
    //  res.redirect('/api/sanityProductUpdate', 200);
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
    }



  if (req.body.STATUS == 'TXN_FAILURE') {
  //   toast.error("payment failed . please try again", {
  //    position: 'bottom-center',
  //    autoClose: 1000,
  //    hideProgressBar: true,
  //    closeOnClick: true,
  //    pauseOnHover: true,
  //    draggable: true,
  //    progress: undefined,
  //  });
  res.status(400).send({message: 'payment failed'})
 res.redirect('/sanitycheckout')
    }
    res.redirect('/sanitypayorder?clearCart=1&_id=' + sanityorderid, 200);

};
export default handler;
