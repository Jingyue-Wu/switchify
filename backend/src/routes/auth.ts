import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/google', passport.authenticate('google', { session: false }));

router.get('/google/redirect', passport.authenticate('google', { session: false }), (req, res) => {
  if (!req.user || !('username' in req.user)) {
    return res.status(401).send('Unauthorized');
  }
  res.redirect(`http://localhost:5173/transfer/?username=${req.user.username}`);
});

export default router;