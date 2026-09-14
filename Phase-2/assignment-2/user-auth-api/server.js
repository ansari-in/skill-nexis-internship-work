const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = 5000;

const MONGO_URL = "mongodb://127.0.0.1:27017/skill_nexis_user_auth_db";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "User Authentication API is running"
    });
});

app.use("/api/auth", authRoutes);

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error.message);
    });