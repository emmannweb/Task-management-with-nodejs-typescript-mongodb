import express, { Request, Response } from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
app.set("trust proxy", 1);

//test route
// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello from Node js");
// });

// import routes
let handleError = require("./middleware/error");
let authRoutes = require("./routes/authRoute");
let userRoutes = require("./routes/userRoute");
let taskRoutes = require("./routes/taskRoute");

mongoose
  .connect(process.env.DATABASE!)
  .then(() => console.log("DB connected"))
  .catch((err: any) => console.log(err));

//MIDDLEWARE
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);
app.use(cookieParser());
app.use(cors());
// prevent SQL injection
app.use(mongoSanitize());
// adding security headers
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
    },
  })
);

//limit queries per 15mn
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

//route middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", taskRoutes);

//error middleware
app.use(handleError);

__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req: Request, res: Response) => {
    res.send("API is running....");
  });
}

const port: number = parseInt(process.env.PORT as string) || 10000;

app.listen(port, (): void => {
  console.log(`Server running on port ${port}`);
});
