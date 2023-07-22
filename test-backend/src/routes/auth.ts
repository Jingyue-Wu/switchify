import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/google', passport.authenticate('google'), (req, res) => {
  res.send(200);
  res.redirect('http://localhost:5173');
});


router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // router.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/', session: false }), (req, res) => {

  res.send(200);

  if (!req.user || !('accessToken' in req.user)) {
    return res.status(401).send('Unauthorized');
  }

  res.redirect('http://localhost:5173');
});

export default router;