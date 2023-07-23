// import { Router } from 'express';
// import passport from 'passport';

// const router = Router();

// router.get('/google', passport.authenticate('google'), (req, res) => {
//   res.send(200);
//   res.redirect('http://localhost:5173');
// });


// router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
//   // router.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/', session: false }), (req, res) => {

//   res.send(200);

//   if (!req.user || !('accessToken' in req.user)) {
//     return res.status(401).send('Unauthorized');
//   }

//   res.redirect('http://localhost:5173');
// });

// export default router;
import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/google', passport.authenticate('google', { session: false }));

router.get('/google/redirect', passport.authenticate('google', { session: false }), (req, res) => {
  if (!req.user || !('username' in req.user)) {
    return res.status(401).send('Unauthorized');
  }

  // Redirect the user back to your frontend URL along with the username
  // Adjust the redirect URL and query parameters as per your frontend application's requirements
  res.redirect(`http://localhost:5173?username=${req.user.username}`);
});

export default router;