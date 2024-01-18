import session, { SessionOptions } from 'express-session';
import crypto from 'crypto';
import { Request } from 'express';

declare module 'express-session' {
  interface Session {
    spotifyState?: string;
  }
}

const secret = crypto.randomBytes(32).toString('hex');

const sessionConfig: SessionOptions = {
  secret: secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 60 * 1000
  }
};

export default session(sessionConfig);
