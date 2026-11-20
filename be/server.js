const dotenv = require("dotenv");
const path = require("path");
const http = require("http");

dotenv.config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoute");
const authRoutes = require("./routes/authRoute");
const blogRoute = require("./routes/blogRoute");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const wishlistRoute = require("./routes/wishlistRoute");
const reviewRoute = require("./routes/reviewRoute");
const bannerRoute = require("./routes/bannerRoute");
const attributeRoute = require("./routes/attributeRoute");
const voucherRoute = require("./routes/voucherRoute");
const subscriberRoutes = require("./routes/subscriberRoute");
const notificationRoute = require("./routes/notificationRoute");
const spaServiceRoute = require("./routes/spaServiceRoute");
const spaBookingRoute = require("./routes/spaBookingRoute");
const petRoute = require("./routes/petRoute");
const staffSpaBookingRoute = require("./routes/staffSpaBookingRoute");
const adminStaffScheduleRoute = require("./routes/adminStaffScheduleRoute");
const adminUserRoute = require("./routes/adminUserRoute");
const staffScheduleRoute = require("./routes/staffScheduleRoute");
const adminSpaServiceRoute = require("./routes/adminSpaServiceRoute");
const searchRoute = require("./routes/searchRoute");
const adminSpaBookingRoute = require("./routes/adminSpaBookingRoute");
const adminOrderRoute = require("./routes/adminOrderRoute");
const adminDashboardRoute = require("./routes/adminDashboardRoute");
const staffDashboardRoute = require("./routes/staffDashboardRoute");
const aiChatRoute = require("./routes/aiChatRoute");
const chatRoute = require("./routes/chatRoute");
const orderRoute = require("./routes/orderRoute");
const cartRoute = require("./routes/cartRoute");

const { setupSocket, getIO } = require("./config/socket.io");

const app = express();
const DEFAULT_PORT = Number(process.env.PORT) || 5000;

if (process.env.NODE_ENV === "production" && !process.env.JWT_SECRET?.trim()) {
  throw new Error("JWT_SECRET is required in production");
}

if (process.env.RENDER === "true") {
  app.set("trust proxy", 1);
}
if (process.env.RENDER_EXTERNAL_URL) {
  process.env.BASE_URL ||= process.env.RENDER_EXTERNAL_URL;
}

const clientOrigin = process.env.CLIENT_URL
  ? new URL(process.env.CLIENT_URL).origin
  : "*";

app.use(cors({ origin: clientOrigin }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const server = http.createServer(app);

setupSocket(server, clientOrigin);

app.get("/health", (req, res) => {
  const connected = mongoose.connection.readyState === 1;
  res.status(connected ? 200 : 503).json({ status: connected ? "ok" : "unavailable" });
});

app.use((req, res, next) => {
  req.io = getIO();
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/wishlist", wishlistRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/banners", bannerRoute);
app.use("/api/attributes", attributeRoute);
app.use("/uploads", express.static("uploads"));
app.use("/api/vouchers", voucherRoute);
app.use("/api/subscribers", subscriberRoutes);
app.use("/api/notifications", notificationRoute);
app.use("/api/spa-services", spaServiceRoute);
app.use("/api/spa-bookings", spaBookingRoute);
app.use("/api/pets", petRoute);
app.use("/api/staff/spa-bookings", staffSpaBookingRoute);
app.use("/api/admin/staff-schedules", adminStaffScheduleRoute);
app.use("/api/admin/users", adminUserRoute);
app.use("/api/staff/schedules", staffScheduleRoute);
app.use("/api/admin/spa-services", adminSpaServiceRoute);
app.use("/api/search", searchRoute);
app.use("/api/admin/spa-bookings", adminSpaBookingRoute);
app.use("/api/admin", adminDashboardRoute);
app.use("/api/staff/dashboard", staffDashboardRoute);
const paymentRoute = require("./routes/paymentRoute");
app.use("/api/payments", paymentRoute);
app.use("/api/ai", aiChatRoute);
app.use("/api/chat", chatRoute);
app.use("/api/admin/orders", adminOrderRoute);
app.use("/api/orders", orderRoute);
app.use("/api/cart", cartRoute);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use((err, req, res, next) => {
  if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
});

function startServer(port) {
  function onListening() {
    server.off("error", onError);
    console.log(`Server is running on port ${port}`);
  }

  function onError(err) {
    server.off("listening", onListening);
    if (err.code !== "EADDRINUSE") {
      throw err;
    }

    if (process.env.PORT) {
      console.error(`Port ${port} đã được sử dụng. Hãy đổi PORT trong file .env.`);
      process.exit(1);
    }

    const nextPort = port + 1;
    console.warn(`Port ${port} đang bận, thử khởi động với port ${nextPort}...`);
    startServer(nextPort);
  }

  server.once("error", onError);
  server.listen(port, onListening);
}

connectDB().then(() => startServer(DEFAULT_PORT));
