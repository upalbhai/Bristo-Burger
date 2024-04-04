const express = require('express');
const passport = require('passport');
const { myProfile, logout,testError, getAdminUsers, getAdminStats } = require('../controllers/user');
const isAuthenticated = require('../middlewares/auth');
const authorisedAdmin = require('../middlewares/authorisedAdmin');

const router = express.Router();



router.get('/googlelogin', passport.authenticate('google', {
    scope: ['profile']
}));

// router.get('/login', passport.authenticate('google'), (req, res, next) => {
//     res.send('login');
// });

router.get('/login', 
            passport.authenticate('google', {
            successRedirect: process.env.FRONTEND_URL,
})
)

router.get('/me', isAuthenticated, myProfile);
router.get('/logout', logout);
// router.get('/test-error', testError);


// admin routes
router.get("/admin/users",isAuthenticated,authorisedAdmin,getAdminUsers)
router.get("/admin/stats",isAuthenticated,authorisedAdmin,getAdminStats)
module.exports = router;
