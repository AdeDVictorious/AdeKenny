

//////////-----------current and actively used fundamental in NODE development today -----------/////////////

const express = require('express');
let ejs = require('ejs');                                   ////This is used for injecting and making a static html page dynamic
const morgan = require('morgan');                           ////This is used for middleware.
const mongoose = require('mongoose');
const Blog  = require('./models/blog');



///express app
const app = express();



////Connect to Monogodb
const dbURL = 'mongodb+srv://AdeDvictorious:qkv6DAJGay2K15Xj@kenny-blog.waiqknc.mongodb.net/test';
mongoose.connect(dbURL,{ userNewUrlParser: true, useUnifiedTopology: true })
.then((result) => {
    app.listen(3000, (err) => {
        if(err){
            console.log(err)
        }
        else{
            console.log('App running on port 3000')
        }
    })
})
.catch((err) => console.log(err));


app.use(express.static('public'));        //// This is the built in  middleware on express, This allow the styles folder to work on the browser
app.use(morgan('dev'));                  //// This an npm installation for loging middleware to the console

// // Middleware written manually, but there are built in and npm package that can be used instead of this, check the 2 code above this
// app.use((req, res, next) => {
//     console.log('new  request made:');
//     console.log('host:', req.hostname);
//     console.log('path:', req.path);
//     console.log('method:', req.method);
//     next();
// });

// //Middleware written manually
// app.use((req, res, next) => {
//     console.log('In the next middleware');
    
//     next();
// });

            
        /////// ------- interacting with the mongodb  -------- ///////////////////

app.get('./addblog', (req, res) => {                 //This is how to add a Blog
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog',
    });
    blog.save()                                     //This is an Asynchronous functions, it will take sometime to perform and return a promise, so we use the (.then() method) to catch and save the result.
    .then((result) => {                             //This is used to catch the promise that is return form the function 
        res.send(result);                           //This send the result to the browser. if the collection have not been created b4 mongodb will create it and save the document in it.
    })
    .catch((err) => {                               //This catches the error and display it to the console.
        console.log(err)
    });
});


app.get('./all-blogs', (req, res) => {                      //This is how to  request all Blog        
    Blog.find()                                        //This is the the main Blog (Blog.find() return all the object inside the database) not the instance blog(blog.save() This save into the database)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    })
})


app.get('./single-blog', (req, res) => {                        //This is how to request a single Blog
    Blog.findById('Id inside here')
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});



                
app.set('view engine', 'ejs');                                           //This is a view engine and is set to view.


    //// ----- routes ----- /////
app.get('/', (req, res) => {                                ////this is the main route
    res.redirect('./blogs');                                    /////this is the route that will redirect us to the blog route
    // const blogs = [
    //     {title: 'Kenny got a job', snippet: 'This is a dream job'},
    //     {title: 'Kenny finds Wife', snippet: 'This is a dream wife'},
    //     {title: 'Kenny found Jesus', snippet: 'This is a joy eternal'},
    // ];
    // res.send('<p>Home Page</p>');                   /// The beauty of this is that it automatically set some features for us, So we dont need to start write out the code e.g. ('content-type:' 'type/html')
    res.render('index', {title: 'Home', blogs });                                //res.render is the format use to send and dynamic file to the browser using express & ejs view engine
});

        ////// ------ This is John Examples ------- /////////////
// app.get('/about', (req, res) => { 
//     // res.send('<p>About Page</p>');   
//     res.render('about.ejs', {items: ["john", "peter", "happy", "Timothy"]})
// });


app.get('/about1', (req, res) => { 
    // res.send('<p>About Page</p>');   
    res.render('about1.ejs', {title: 'About' })
});


/// ---- blog route ----- /////                                             ///this aspect handle all the blog posting and creating.

app.get('./blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })                 
    .then((result) => {
        res.render('about', {title: 'All Blogs', blogs: result})
    })
    .catch((err) => {
        console.log(err);
    });
});


app.get ('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create a new Blog' });
})


app.use( (req, res) => { 
    // res.send('<p>About Page</p>');   
    res.status(404).render('404.ejs', {title: '404' });
});


// let PORT = process.env.PORT || 3000
// app.listen(PORT, (err)=>{
//     console.log("App running on port", PORT)
// }); 
 




// <% const name = 'mario' %>              //This is going to run as javascript not on the frontend but on the server
// <p><%= name %></p>                      //This will dynamically inject the content into the HTML file on the browser.
