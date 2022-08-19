import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import { signToken } from '../../utils/auth';
import client from '../../utils/client';

const handler = nc();

handler.post(async (req, res) => {
  const sanityuser = await client.fetch(`*[_type == "sanityuser" && email == $email][0].isAdmin`, {
    email: "admin@vsb.com",
  });  
});
export default handler;