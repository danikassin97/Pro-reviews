const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const mongoose     = require('mongoose');
const session      = require("express-session");
const passport     = require("passport");

require("dotenv").config();

require("./config/passport-config.js");

mongoose.connect(process.env.MONGODB_URI);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// default value for title local
app.locals.title = 'RestoFinder';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);
app.use(session({
  //  the value of secret doesnt matter except it has to be different for every
  secret: "gsdfs dfgstrg gssg",
  resave: true,
  saveUninitialized: true
}));



//these need to go after app.use(session()) 🤡🤡🤡🤡🤡🤡🤡🤡

app.use(passport.initialize());
app.use(passport.session());
// passport middlewares


// THIS MIDDLEWARE CREATES the currentUser for all views
// (if the user is logged in)
// (this needs to be below passport and before your routes)
app.use((req, res, next) => {
// req.user is defined by the passport middleware
// if the user is not logged in, req.user will be empty

// check if the user is logged in
  if (req.user){
    // create the currentuser local variable for all views
    res.locals.currentUser = req.user;
  }
  // without next your pages will reload forever
  next();
});


//these need to go after app.use(session()) 🤡🤡🤡🤡🤡🤡🤡🤡

const index = require('./routes/index');
app.use('/', index);

const myAutoRoutes = require("./routes/auth-routes.js");
app.use("/", myAutoRoutes);

const myReviewRoutes = require("./routes/review-routes.js");
app.use("/", myReviewRoutes);

const myRestaurantRoutes = require("./routes/restaurant-routes.js");
app.use("/", myRestaurantRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
