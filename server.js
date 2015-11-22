var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

// 服务端渲染
require('babel-core/register');
var swig = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var routes = require('./app/routes');


var app = new express();

app.set('port', process.env.port || 3000);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// 服务端渲染请求, 拦截对应的URL, 进行对应的React组件渲染
app.use(function (request, response) {
    Router.match({
        routes: routes.default,
        location: request.path
    }, function (err, redirectLocation, renderProps) {
        if (err) {
            response.status(500).sned(err.message);
        } else if (redirectLocation) {
            res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
            var page = swig.renderFile('views/index.html', {html: html});
            response.status(200).send(page);
        } else {
            response.status(404).send('Page Not Fount');
        }
    });
});

app.listen(app.get('port'), function (request, response) {
    console.log('Express Server Listening To ' + app.get('port'));
});
