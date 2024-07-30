import createError from 'http-errors';
import express, {Request, Response} from 'express';
import path from "node:path";
import cookieParser from "cookie-parser"
import {WebSocket} from 'ws';

import indexRouter from './routes/index';
import apiRouter from './routes/api';

var app = express();

// Initialize WebSocket server
const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', (ws) => {
  console.log('A new client connected.');
  // Event listener for incoming messages
  ws.on('message', (message) => {
    const data = JSON.parse(message.toString())
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data.body);
      }
    });
  });

  ws.on('close', () => {
    console.log('A client disconnected.');
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: Error, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(500);
  res.render('error');
});

export default app;
