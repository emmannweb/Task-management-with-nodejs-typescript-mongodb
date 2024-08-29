"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
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
mongoose_1.default
    .connect(process.env.DATABASE)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));
//MIDDLEWARE
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
app.use(body_parser_1.default.json({ limit: "5mb" }));
app.use(body_parser_1.default.urlencoded({
    limit: "5mb",
    extended: true,
}));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
// prevent SQL injection
app.use((0, express_mongo_sanitize_1.default)());
// adding security headers
app.use(helmet_1.default.contentSecurityPolicy({
    useDefaults: true,
    directives: {
        "img-src": ["'self'", "https: data:"],
    },
}));
//limit queries per 15mn
const limiter = (0, express_rate_limit_1.default)({
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
__dirname = path_1.default.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, "/frontend/build")));
    app.get("*", (req, res) => res.sendFile(path_1.default.resolve(__dirname, "frontend", "build", "index.html")));
}
else {
    app.get("/", (req, res) => {
        res.send("API is running....");
    });
}
const port = parseInt(process.env.PORT) || 10000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
