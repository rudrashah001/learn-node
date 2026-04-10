require("dotenv").config();

const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();
const logger = require("./middleware/logger");
const auth = require("./middleware/auth");
const error = require("./middleware/errorhandler");

const connectDB = require("./routes/config/db");

const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
connectDB();

// console.log("logger:" ,typeof logger);
// console.log("auth:" ,typeof auth);
// console.log("error:" ,typeof error);
// console.log("taskRoutes:" ,typeof taskRoutes);
// console.log("userRoutes:" ,typeof userRoutes);

app.use(express.json());
app.use(logger); // application layer middleware

app.use("/tasks", auth, taskRoutes); // routes  label middleware
app.use("/user", userRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "server is healthy",
  });
});

app.get("/", (req, res) => {
  res.send({ message: "first api is running" });
});
app.use(error); // error handling middleware

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "route not found",
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
