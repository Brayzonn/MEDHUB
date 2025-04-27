import session, { SessionOptions } from 'express-session';
import crypto from 'crypto';


const secret = crypto.randomBytes(32).toString('hex');

const sessionConfig: SessionOptions = {
      secret: secret,
      resave: false,
      saveUninitialized: false,
      cookie: {
          maxAge: 100 * 60 * 1000
      }
};

export default session(sessionConfig);
