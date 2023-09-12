import express from "express";
import { config } from "dotenv";
import path from 'path'
import { fileURLToPath } from 'url';
import { dbConnect } from "./configuration/db.js";
import { router as productRouter } from "./routes/products/route.js";
import { router as userRouter } from "./routes/user/route.js";
import { router as orderRouter } from "./routes/products/orderRoute.js";
import { router as paymentRouter } from "./routes/payment/paymentRoutes.js";
import { ErrorMiddleware } from "./middleware/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import { sellerRouter } from "./routes/seller/seller.js";
import { adminRouter } from "./routes/admin/admin.js";
config({ path: "./configuration/.env" });
const app = express();
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

dbConnect();
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "PUT"],
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", paymentRouter);
app.use("/api/v2", sellerRouter);
app.use("/api/v3",adminRouter)

app.use(ErrorMiddleware);







const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../client/build')));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
});


export default app;
