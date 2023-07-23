import passport from 'passport';
import playlist from '../playlist';

import {
  Profile,
  Strategy as GoogleStrategy,
  VerifyCallback,
} from 'passport-google-oauth20';

import { songName } from '../data';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_REDIRECT_URL,
      scope: [
        'email',
        'profile',
        'https://www.googleapis.com/auth/youtube',
        'https://www.googleapis.com/auth/youtube.force-ssl',
      ],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: passport.Profile,
      done: VerifyCallback
    ) => {
      console.log(accessToken);
      console.log(profile);

      playlist(accessToken, songName);

      done(null, { username: profile.displayName });

    }
  )
);
