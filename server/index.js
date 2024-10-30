import express from "express";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { fileURLToPath } from "url";
import { dirname } from "path";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Now you can use __dirname in your code
// Routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import categoryRoutes from "./routes/category.js";
import locationRoutes from "./routes/location.js";
import sublocationRoutes from "./routes/sublocation.js";
import vendorRoutes from "./routes/vendor.js";
import itemRoutes from "./routes/item.js";
import stockRoutes from "./routes/stock.js";
import billRoutes from "./routes/bill.js";
import requestRoutes from "./routes/request.js";
import path from "path";

// Middlewares
import { authAdmin, authUser } from "./middleware/auth.middleware.js";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { Lucia } from "lucia";
import 'dotenv/config';
await mongoose
  .connect(
    process.env.MONGODB_URL
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Database connection failed");
  });

const adapter = new MongodbAdapter(
  mongoose.connection.collection("sessions"),
  mongoose.connection.collection("users")
);

const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true, // Enable sending cookies
  })
);

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
  })
);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/location", locationRoutes);
app.use("/sublocation", sublocationRoutes);
app.use("/vendor", vendorRoutes);
app.use("/item", itemRoutes);
app.use("/stock", stockRoutes);
app.use("/request", requestRoutes);
app.use("/bill", billRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// App start
let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server currently running on port " + port);
});
