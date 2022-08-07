import Order from '../../models/Order';
import connectDB from '../../middleware/mongoose';
import jsonwebtoken from 'jsonwebtoken';

import client from '../../utils/client';

const handler = async (req, res) => {
//   const token = req.body.token;
//   const data = jsonwebtoken.verify(token, process.env.JWT_SECRET);
  const trackorder = await client.fetch(
    `*[_type == "sanityorder" && oid == $oid]`,{
      oid:1651065868948,
    }
    );
  // let sanityorders = await Order.find({ email: data.email, status: 'Paid' });
  // res.send(sanityorders);
  res.status(200).json({ trackorder });
};

export default handler;
