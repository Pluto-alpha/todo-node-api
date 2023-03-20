const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");


//routing for user login and register
router.use("/", (require("../Routes/User")));

// ------- ROUTE MIDDLEWARE START  ----//

router.use(function (req, res, next) {
    let token =
        req.body.token || req.query.token || req.headers["x-access-token"] || req.headers['authorization'];
    token = token.split(' ')[1];
    // decode token
    if (token) {
        // verifies the scret and checks expirationheight: 90px;
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
            if (err) {
                return res.status(401).json({ message: "Fail to authenticate token!" });
            } else {
                // if everything is good, save to request for use in other routes
                decoded = jwt.decode(token, { complete: true, });
                req.user = decoded.payload.user;
                next();
            }
        });
    } else {
        return res.status(401).send({ message: "No token provided!" });
    }
    // ------- ROUTE MIDDLEWARE END  ----//
});


router.use("/", require("../Routes/Todo"));



module.exports = router;