import express from 'express';
import sessionMiddleware from './modules/session-middleware';
import bodyParser from 'body-parser';
import passport from './strategies/user.strategy';
import userRouter from './routes/user.router';
import dataRouter from './routes/data.router';
import planCountRouter from './routes/planCount.router';
import imperatorRouter from './routes/imperator.router';
import analyticRouter from './routes/company.analytics.router';
import passwordResetRouter from './routes/passwordReset.router';
import monthlyUsersRouter from './routes/monthlyUsers.router';
import strategicRouter from './routes/strategic.router';
import emailRouter from './routes/email.router';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(
  `${process.env.MONGO_URI}`,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log('Connected To Mongo');
  }
);

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/data', dataRouter);
app.use('/api/userOverTime', monthlyUsersRouter);
app.use('/api/planCount', planCountRouter);
app.use('/api/imperator', imperatorRouter);
app.use('/api/analytics', analyticRouter);
app.use('/api/strategic', strategicRouter);
app.use('/api/reset', passwordResetRouter);
app.use('/api/email', emailRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT: number | string = process.env.PORT || 5000;
/** Listen * */
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running in TS running on port:${PORT}`);
  });
}

export default app;
