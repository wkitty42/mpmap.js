/*
This is mpmap.js - a nodejs based multiplayer map for flightgear
Copyright (C) 2017 - Torsten Dreyer torsten _at_ t3r.de

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

var express = require('express');
var helmet = require('helmet')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

global.appRoot = path.resolve(__dirname);

var app = express();

/*
if( app.get('env') !== 'development' ) {
  console.log("Using https redirector")
  // Production: redirect http to https
  app.all('*', function(req,res,next) {
    if( req.secure ) return next()
    else return res.redirect( 'https://' + req.get('host') + req.originalUrl );
  });
}
*/

app.set('trust proxy', 1)
app.use(helmet())

// view engine setup: pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// handle favicon
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'static')));

app.use('/api', require('./routes/api'));

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('main');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message : err.message,
      error : err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message : err.message,
    error : {}
  });
});

module.exports = app;
