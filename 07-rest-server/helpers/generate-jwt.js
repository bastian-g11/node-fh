import jwt from 'jsonwebtoken';

const generateJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject(new Error('JWT could not be generated'));
        } else {
          resolve(token);
        }
      }
    );
  });
};

export { generateJWT };
