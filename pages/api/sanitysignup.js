import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import config from '../../utils/config';
import { signToken } from '../../utils/auth';
import { useState } from 'react';
import client from '../../utils/client';

const handler = nc();


handler.post(async (req, res) => {
  

  const projectId = config.projectId;
  const dataset = config.dataset;
  const tokenWithWriteAccess = process.env.SANITY_API_WRITE_TOKEN;
  const createMutations = [
    {
      create: {
        _type: 'sanityuser',
        name: req.body.sanityname,
        email: req.body.sanityemail,
        password: bcrypt.hashSync(req.body.sanitypassword),
        address: req.body.address,
        pincode: req.body.pincode,
        phone: req.body.phone,
      },
    },
  ];

  const existSanityuser = await client.fetch(
    `*[_type == "sanityuser" && email == $email][0]`,
    {
      email: req.body.sanityemail,
    }
  );
  if (existSanityuser) {
    return res.status(401).send({ error: 'Email aleardy exists' });
  }


  const { data } = await axios.post(`https://${projectId}.api.sanity.io/v2022-05-30/data/mutate/${dataset}?returnIds=true`,
    { mutations: createMutations },
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${tokenWithWriteAccess}`,
      },
    }
  );
  const sanityuserId = data.results[0].id;
  const sanityuser = {
    _id: sanityuserId,
    name: req.body.sanityname,
    email: req.body.sanityemail,
    address:req.body.address,
    pincode: req.body.pincode,
    phone: req.body.phone,
  };
  const sanityusertoken = signToken(sanityuser);
  res.send({ ...sanityuser, sanityusertoken,success:true });
});

export default handler;
