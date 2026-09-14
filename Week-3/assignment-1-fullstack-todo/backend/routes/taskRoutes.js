const express = require("express");

const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all tasks
router.get("/", authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.user.userId
        }).sort({ createdAt: -1 });

        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Add task
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({
                message: "Task title is required"
            });
        }

        const task = new Task({
            title: title,
            user: req.user.userId
        });

        const savedTask = await task.save();

        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Update task
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.userId
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json(task);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// Delete task
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

module.exports = router;