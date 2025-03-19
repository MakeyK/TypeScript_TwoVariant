import express from 'express';
import cors from 'cors';
import errorhandler from 'strong-error-handler';
import { auth } from './routes/user.router';
import { files } from './routes/files.router';
import { message } from './routes/message.router';
import path from 'path';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', auth);
app.use('/files', files);
app.use('/messages', message);

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(errorhandler({
    debug: process.env.ENV !== 'prod',
    log: true,
  }));