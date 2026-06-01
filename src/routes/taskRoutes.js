const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

// Only authenticated users can view their tasks
router.get(
    "/",
    authMiddleware,
    getTasks
);

// Only authenticated users can create tasks
router.post(
    "/",
    authMiddleware,
    createTask
);

// Only the user who created the task can update it
router.patch(
    "/:id",
    authMiddleware,
    updateTask
);

// Only the user who created the task can delete it
router.delete(
    "/:id",
    authMiddleware,
    deleteTask
);

module.exports = router;