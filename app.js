import express from 'express'
import { BuildResumePageRoute } from './routes/buildResume.js';
import { env } from './config/env.js';
import { ConnectDB } from './config/db-client.js';
import { authRoute } from './routes/auth.route.js';
import requestIp from 'request-ip';
import cookieParser from 'cookie-parser';
import { verifyAuthentication } from './middlewares/verify-auth-middleware.js';
import methodOverride from "method-override";


const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.set("view engine", "ejs");

app.use(cookieParser());
app.use(verifyAuthentication);

app.use((req, res, next) => {
  res.locals.user = req.user;
  return next();
})

app.use(requestIp.mw());
app.use(BuildResumePageRoute);// middleware to use router
app.use(authRoute);

app.use(methodOverride("_method"));


try {
  await ConnectDB();
  app.listen(env.PORT, () => {
    console.log(`Server running at http://localhost:${env.PORT}`);
  });
} catch (error) {
  console.error(error);
}
