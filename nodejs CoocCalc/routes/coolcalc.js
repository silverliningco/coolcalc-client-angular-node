/*
    route: /coolcalc/client
*/

const { Router} = require('express');
const router = Router();
const got = require('got');

const api_domain='https://stagingapi.coolcalc.com';

//raw body (this is only necessary for post and put methods)
var bodyParser = require('body-parser');
const express = require('express');
const app = express();


var rawBodySaver = function (req, res, buf, encoding, next) {
    req.headers['content-type'] = 'application/json; charset=utf-8';
    if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
    }

}

const raw = app.use(bodyParser.raw({ verify: rawBodySaver, type: '*/*' }));


//basic authentication 
const verify = function(){
    let  ClientId = '';
    let APIKey = '';
    let encoded = Buffer.from(ClientId + ':' + APIKey).toString('base64');
    return encoded;
}

router.get( '*', async(req, res) => {

   //capture and replacing a segment of the original url 
   const myUrl = req.originalUrl;
   const newURL = myUrl.replace('/coolcalc/client', '' );

   //sending the options to be able to make a new request
    var options = {
        'url': `${api_domain}${newURL}`,
        'headers': {
            'Authorization': `Basic ${verify()}`
            }
    };

    //made the request
    let response = await got.get(options);

    //send the headers
    res.setHeader('Content-Type', response.headers['content-type']);
    res.setHeader('allow', response.headers['allow']);
    res.setHeader('Access-Control-Expose-Headers', 'Location, Allow');

    //send the response
    res.jsonp(JSON.parse(response.body));

} );


router.post( '*', raw,async (req, res) => {

    const myUrl = req.originalUrl;
    const newURL = myUrl.replace('/coolcalc/client', '' );
    
    //sending the options to be able to make a new request
        var options = {
        'url': `${api_domain}${newURL}`,
        'headers': {
                'Authorization': `Basic ${verify()}`
                },
        'body':  `${req.body}`
        };
    
    res.setHeader('Access-Control-Expose-Headers', 'Location, Allow');

    //made the request
    await  got.post(options).then((doc) => {
        //send the headers
        res.setHeader('Content-Type', doc.headers['content-type']);
        res.setHeader('allow', doc.headers['allow']); 
        res.setHeader('location', doc.headers['location']); 
        return res.status(doc.statusCode).json(JSON.parse(doc.body));
    }).catch(err => {
        res.setHeader('Content-Type', err.response.headers['content-type']);
        return res.status(err.response.statusCode).json(JSON.parse(err.response.body));
    })
} );


router.put( '*', raw,async(req, res) => {

    //capture and replacing a segment of the original url 
    const myUrl = req.originalUrl;
    const newURL = myUrl.replace('/coolcalc/client', '' );
 
    //sending the options to be able to make a new request
     var options = {
         'url': `${api_domain}${newURL}`,
         'headers': {
             'Authorization': `Basic ${verify()}`
             },
             'body':  `${req.body}`
     };
  
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'Location, Allow');

    //made the request
    await  got.put(options).then((doc) => {
        res.setHeader('Content-Type', doc.headers['content-type']);
        res.setHeader('allow', doc.headers['allow']); 
        return res.status(doc.statusCode).json(JSON.parse(doc.body));
    }).catch(err => {
        res.setHeader('Content-Type', err.response.headers['content-type']);
        return res.status(err.response.statusCode).json(JSON.parse(err.response.body));
    })
});


router.delete( '*', (req, res) => {

    //capture and replacing a segment of the original url 
    const myUrl = req.originalUrl;
    const newURL = myUrl.replace('/coolcalc/client', '' );

    //sending the options to be able to make a new request
     var options = {
         'url': `${api_domain}${newURL}`,
         'headers': {
             'Authorization': `Basic ${verify()}`
        }
     };
  
    //made the request
    try{
        got.delete(options);
        res.sendStatus(204);
    }
    catch (error) {
        res.setHeader('Content-Type', error.response.headers['content-type']);
        return res.status(error.response.statusCode).json(JSON.parse(error.response.body));
    }

} );


module.exports = router;