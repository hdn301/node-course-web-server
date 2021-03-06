const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


const app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// MIDDLEWARE
// app.use lets you use html files, instead of writing your html in a string like below where we use app.get, res.send
// app.use lets you register middleware, it takes a function as arg
  // in this case, this middleware is helping us see the requests made to our server
app.use((req, res, next) => { // use next to tell express when youre done
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`
  
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  
  next();
});

// // maintenance
// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// first arg is root of app, second argument is function to run (what to send back)
  // 2 args in function, req and res (request and response)
app.get('/', (req, res) => {
  res.render('index.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome hello this is a website of sorts',
    currentYear: new Date().getFullYear()
  });

});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

// MAKING A PROJECT PAGE

/*

get request to /projects
create new file, projects.hbs

*/

// app.get('/projects', (req, res) => {
//   res.render('projects.hbs'), {
//     pageTitle: 'Projects Page',
//     currentYear: new Date().getFullYear()
//   }
// });

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page',
    currentYear: new Date().getFullYear()
  });
});


app.get('/bad', (req, res) => {
  res.send({
    error: 'Unable to handle request'
  });
});

// binds app to port on machine (local host)
// second argument optional
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
  
});