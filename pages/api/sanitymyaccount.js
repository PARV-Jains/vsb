import axios from 'axios';
 import nc from 'next-connect';
import config from '../../utils/config';
import { signToken, isAuth } from '../../utils/auth';
import bcrypt from 'bcryptjs';

const handler = nc();



handler.use(isAuth);
 handler.put(async (req, res) => {
  // const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  // const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const projectId = config.projectId;
  const dataset = config.dataset;
  const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;
  await axios.post(
    `https://${projectId}.api.sanity.io/v2022-05-30/data/mutate/${dataset}`,
    {
      mutations: [
        {
          patch: {
            id: req.sanityuser._id,
            set: {
              name: req.body.sanityname,
              email: req.body.sanityemail,
              password: bcrypt.hashSync(req.body.sanitypassword),
              address:req.body.address,
              pincode: req.body.pincode,
              phone:req.body.phone,
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

  const sanityuser = {
    _id: req.sanityuser._id,
    name: req.body.sanityname,
    email: req.body.sanityemail,
    address: req.body.address,
    pincode: req.body.pincode,
    phone: req.body.phone,
    value: sanityuserinfo.token,
  };
  const sanityusertoken = signToken(sanityuser);
   res.send({ ...sanityuser, sanityusertoken });
});

export default handler;
