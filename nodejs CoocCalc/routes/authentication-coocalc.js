/*
    route: /coolcalc/user
*/
const { Router } = require('express');

const router = Router();

//this is for the authentication of api Coolcalc, but you can use the validarJWT also
router.get('/', function(req, res)  {


    const a = res.json({
        "userReference" : "",
        "dealerReference" :"",
        "isAdmin" : true
    });

    return a;
} );

module.exports = router;