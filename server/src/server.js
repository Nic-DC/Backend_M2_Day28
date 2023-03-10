import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import passport from "passport";
import mongoose from "mongoose";
import blogPostsRouter from "./api/blogPosts/index.js";
import authorsRouter from "./api/authors/index.js";
import usersRouter from "./api/users/index.js";
import authRouter from "./api/AUTHENTICATIONrouter/index.js";
import { badRequestHandler, notFoundHandler, genericErrorHandler } from "./errorHandlers.js";
import googleStrategy from "./lib/auth/googleOAUTH.js";

const server = express();
const port = process.env.PORT || 3008;

const { FE_DEV_URL } = process.env;

const whitelist = [FE_DEV_URL];

const corsOpts = {
  origin: (origin, corsNext) => {
    console.log("CURRENT ORIGIN: ", origin);
    if (!origin || whitelist.indexOf(origin) !== -1) {
      // If current origin is in the whitelist you can move on
      corsNext(null, true);
    } else {
      // If it is not --> error
      corsNext(createHttpError(400, `Origin ${origin} is not in the whitelist!`));
    }
  },
};
passport.use("google", googleStrategy); // Do not forget to inform Passport that we need to use GoogleStrategy!

// ******************************* MIDDLEWARES ****************************************
server.use(cors(corsOpts));
server.use(express.json());
server.use(passport.initialize()); // Do not forget to inform Express that we need to use Passport!

// ******************************** ENDPOINTS *****************************************
server.use("/blogPosts", blogPostsRouter);
server.use("/authors", authorsRouter);
server.use("/users", usersRouter);
server.use("/auth", authRouter);

// ***************************** ERROR HANDLERS ***************************************
server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to Mongo!");
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`Server is running on port ${port}`);
  });
});
