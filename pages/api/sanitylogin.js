import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import { signToken } from '../../utils/auth';
import client from '../../utils/client';

const handler = nc();

handler.post(async (req, res) => {
  const sanityuser = await client.fetch(`*[_type == "sanityuser" && email == $email][0]`, {
    email: req.body.sanityemail,
  });
  if (sanityuser && bcrypt.compareSync(req.body.sanitypassword, sanityuser.password)) {
    const sanityusertoken = signToken({
      _id: sanityuser._id,
      name: sanityuser.name,
      email: sanityuser.email,
      address:  sanityuser.address,
    pincode:  sanityuser.pincode,
    phone:  sanityuser.phone,
    });
    res.status(200).json({success: true, sanityusertoken, email: sanityuser.email});
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
    res.status(401).send({ error: 'Invalid email or password' });
  } 
});

export default handler;