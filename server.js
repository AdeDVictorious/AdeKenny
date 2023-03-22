/////////-----------How to create a server and listen for request--------------////////////////////

// /////-------We have to require the http modules-----------//////////
// const http = require('http');


// /////------creating a server-----------//////////

// const server = http.createServer((req, res) => {
//     console.log('request made')
// });


// /////------port and localhost-----------//////////

// server.listen(3000, 'localhost', () =>{
//     console.log('Listening for request on port 3000')
// });




//////////-----------fundamental background to NODE development------------/////////////
/////------Another examples-----------//////////

const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
   
    ////Lodash
    const num  = _.random(0, 20);
    console.log(num);

    const greet = _.once(() => {                //This function block the code from running the 2nd time, since it has been specified in it as (_.once)
        console.log('Hello');
    });

    greet();
    greet();                                     // This code will not run.

    ///--- Set header content type -----//////
    res.setHeader('content-type',  'text/html');

                ////----routing system-----/////
    let path = './views/';
    switch(req.url){
     case'/':
        path += 'index.html';
        res.statusCode = 200;
        break; 
     case '/about':
        path += 'about.html';
        res.statusCode = 200;
        break;
     case '/about me':
        res.statusCode = 301;
        res.setHeader('Location', './about');
        res.end();
            break;
     default:
        path += '404.html';
        res.statusCode = 404;
        break;
    }
    
 
                ///----- this become to messy if the html file is large, sowe open an index.html file & link it up -----//////
            // res.write('<head><link rel="stylesheet" href="#"></head>');
            // res.write('<p>Hello Kenny</p>');
            // res.write('<p>Hello Kenny how is the learning going</p>');

            ///Sending an HTML files
    fs.readFile(path, (err, data) => {                      //This send an html file or folder from another source to the browser.
        if (err) {
            console.log(err);
            res.end();                                                      //if this is not included the even if their is an error the server will not read or respond to us the error.
        } else {
            // res.write(data);     //since we are sending just one data we can just input it below
            res.end(data);
        };

    });

});


 
server.listen(3000, 'localhost', () => {
    console.log('Listening for request on port 3000')
});