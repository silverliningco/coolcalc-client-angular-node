const { Router} = require('express');
const router = Router();

const got = require('got');

const APIUrl = "https://stagingapi.coolcalc.com/staging/MJ8Reports/?reportId=";


//basic authentication 
const verify = function(){
    let  ClientId = '';
    let APIKey = '';
    let encoded = Buffer.from(ClientId + ':' + APIKey).toString('base64');
    return encoded;
}

router.get( '*', async(req, res) => {

   //getting the reportId 
   const reportId = req.params.reportId;   

   //sending the options to be able to make a new request 
   var options = {
        'method': 'GET',
        'url': `${APIUrl}${reportId}&rev=latest`,
        'headers': {
            'Authorization': `Basic ${verify()}`
            }
    };

    //made the request
    let response = await got(options);

    //send the headers
    res.setHeader('Content-Type', response.headers['content-type']);
    res.setHeader('allow', response.headers['allow']);
    res.setHeader('Access-Control-Expose-Headers', 'Location, Allow');

    
    //send the response
    res.jsonp(JSON.parse(response.body));

} );



module.exports = router;