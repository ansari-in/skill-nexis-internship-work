const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

const PORT = 5000;

const MONGO_URL =
    "mongodb://127.0.0.1:27017/fullstack_todo_db";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Full Stack Todo API is running"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(PORT, () => {
            console.log(
                `Server running on http://localhost:${PORT}`
            );
        });
    })
    .catch((error) => {
        console.log(
            "MongoDB connection failed:",
            error.message
        );
    });