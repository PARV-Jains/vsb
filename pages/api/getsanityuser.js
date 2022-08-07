// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// // import User from '../../models/User';
// // import connectDB from '../../middleware/mongoose';
// import client from '../../utils/client';
// import jsonwebtoken from 'jsonwebtoken';

// const handler = async (req, res) => {
//   if (req.method == 'POST') {
//     let sanityusertoken = req.body.sanityusertoken;
//     let sanityuser = jsonwebtoken.verify(sanityusertoken, process.env.JWT_SECRET);
//     let newsanityuser = await client.fetch(
//       `*[_type == "sanityuser" && email == $email]`,
//       {
//         email: sanityuser.email,
//       }
 
//     );
//     const { sanityname, sanityemail, address, pincode, phone } = newsanityuser;
//     // console.log(newsanityuser)
//     res.status(200).json({ sanityname, sanityemail, address, pincode, phone });
//   } else {
//     res.status(400).json({ error: 'error' });
//   }
// };
// export default handler;
import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import { signToken } from '../../utils/auth';
import client from '../../utils/client';

const handler = nc();

handler.post(async (req, res) => {
  const sanityuser = await client.fetch(`*[_type == "sanityuser" && email == $email][0]`, {
    email: "hello@parv.com",
  });
  if (sanityuser) {
    const sanityusertoken = signToken({
      _id: sanityuser._id,
      name: sanityuser.name,
      email: sanityuser.email,
      address:  sanityuser.address,
    pincode:  sanityuser.pincode,
    phone:  sanityuser.phone,
    });
    res.status(200).json({success: true, sanityusertoken, email: sanityuser.email,name: sanityuser.name, address:  sanityuser.address,
      pincode:  sanityuser.pincode,
      phone:  sanityuser.phone,
      _id: sanityuser._id,});
    res.send({
      _id: sanityuser._id,
      name: sanityuser.name,
      email: sanityuser.email,
      address:  sanityuser.address,
      pincode:  sanityuser.pincode,
      phone:  sanityuser.phone,
      sanityusertoken,
    });
  } else {
    res.status(401).send({ error: 'Invalid get user' });
  }
});

export default handler;
