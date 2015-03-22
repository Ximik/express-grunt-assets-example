var express = require('express');
var glob = require('glob');

var app = express();

app.locals.env = process.env.NODE_ENV || 'dev';
if (app.locals.env === 'dev') {
  app.locals.js = glob.sync('assets/js/**/*.js').map(function (file) {
    return '/' + file;
  });
  app.locals.js.push('http://localhost:35729/livereload.js');
  app.locals.css = ['/public/css/style.css'];
  app.use('/assets', express.static(__dirname + '/assets'));
  app.use('/public', express.static(__dirname + '/public'));
} else {
  app.locals.js = ['/public/js/app.min.js'];
  app.locals.css = ['/public/css/style.min.css'];
  // FIXME: Use your proxy server instead
  app.use('/public', express.static(__dirname + '/public'));
}

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(3000);
