import { Router } from 'express';
import passport from 'passport';
import playlist from '../playlist';

const router = Router();

router.get('/google', passport.authenticate('google'), (req, res) =>
  res.send(200)
);
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  const accessToken = req.user;
  console.log('Access Token:', accessToken);
  // playlist(accessToken);
}
);

export default router;