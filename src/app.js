var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('express-flash');
var bodyParser = require('body-parser');

var onloadRouter = require('./routes/onload');
var httpResponseRouter = require('./routes/http_response');



/* 运行子进程 */
/* var child_process = require('child_process').spawn;
var child = child_process(process.platform === "win32" ? "npm.cmd" : "npm",[],{});
child.stdout.on('data',function(data){
  console.log(data);
})
child.stderr.on('data',function(data){
  console.log(data);
}) */


var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser("this is my scre"));

app.use(session({ 
  secret: 'keyboard cat', 
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000*60}
}));

app.use(flash());



/* 测试cookies 信息 */
/* app.use(function(req,res,next){
  res.send(JSON.stringify(req.cookies));
}) */


/* 测试会话存储会话信息 */
/* app.use(function(req, res, next){
  for(var name in req.query){
    req.session[name] = req.query[name];
  }
  res.send(JSON.stringify(req.session));
}); */


app.use(express.static(path.join(__dirname, 'public')));

app.use('/onload', onloadRouter);
app.use('/httpres',httpResponseRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});


module.exports = app;
