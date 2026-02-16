const express = require("express");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");

require("dotenv").config();

const userRoutes = require("../routes/auth.routes");
const pollRoutes = require("../routes/polls.routes");
const voteRoutes = require("../routes/votes.routes");

const port = process.env.PORT;
const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173";
const mongodb_uri = process.env.MONGODB_URI;
const db = process.env.DB;


const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: frontend_url,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

const io = new Server(server, {
  cors: {
    origin: frontend_url,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("joinPoll", (shareId) => {
    socket.join(shareId);
  });
});


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/poll", pollRoutes);
app.use("/api/v1/vote", voteRoutes);


const mongodb = async function () {
  try {
    await mongoose.connect(`${mongodb_uri}/${db}`);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

// start server only after DB connects
mongodb().then(() => {
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
