const express = require('express');
const app = express();
// const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
// const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const server = require('http').createServer(app)
const bodyParser = require('body-parser')
require('express-async-errors')
const cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var isProduction = process.env.NODE_ENV === 'production';

//------------ Passport Configuration ------------//
require('./config/passport')(passport);

//------------ DB Configuration ------------//
const db = require('./config/key').MongoURI;

//------------ Mongo Connection ------------//
mongoose.set("strictQuery", false);
mongoose.connect(db)
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch(err => console.log(err));

//------------ Express session Configuration ------------//
app.use(
    session({
        secret: 'secret',
        cookie: {maxAge: 60000},
        resave: true,
        saveUninitialized: true
    })
);

//------------ Passport Middlewares ------------//
app.use(passport.initialize());
app.use(passport.session());

//------------ Routes ------------//
app.use('/api', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

//------------ middleware ------------//
app.use(require('./middlewares/ErrorHandler'))

app.use((req, res, next) => {
	res.status(404).json({
		code: 404,
		message: 'Not found',
	})
})

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
    app.use(function(err, req, res, next) {
      console.log(err.stack);

      res.status(err.status || 500);

      res.json({'errors': {
        message: err.message,
        error: err
      }});
    });
  }

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        'errors': {
            message: err.message,
            error: {}
        }
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, function() {
    console.log(`Server running on PORT ${PORT}`);
});
