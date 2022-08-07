import jwt from 'jsonwebtoken';

const signToken = (sanityuser) => {
  return jwt.sign(sanityuser, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const isAuth = async (req, res, next) => {
  const {authorization} = req.headers;
  if (authorization) {
    const sanityusertoken = authorization.slice(7, authorization.length); // BEARER XXX
    //  return
    jwt.verify(sanityusertoken, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ error: 'Token is not valid' });
      } else {
        req.sanityuser = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ error: 'Token is not suppiled' });
  }
};
export { signToken, isAuth };
