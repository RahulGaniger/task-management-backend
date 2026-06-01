const prisma = require("../config/prisma");

// Create a new task
const createTask = async (req, res) => {
    try {

        const {
            title,
            description,
            priority,
            status,
            dueDate
        } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const task = await prisma.task.create({
            data: {
                title,
                description,
                priority,
                status,
                dueDate: dueDate ? new Date(dueDate) : null,
                userId: req.user.userId
            }
        });

        return res.status(201).json(task);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

// Get tasks with optional filtering by status and priority, and sorting by due date
const getTasks = async (req, res) => {
    try {
        const { status, priority, sort } = req.query;
        const userId = req.user.userId;

        // Build the where filter
        const where = {
            userId
        };

        if (status) {
            where.status = status.toUpperCase();
        }

        if (priority) {
            where.priority = priority.toUpperCase();
        }

        // Build the order by (sort)
        const orderBy = {};
        if (sort === "dueDate") {
            orderBy.dueDate = "asc";
        } else if (sort === "-dueDate") {
            orderBy.dueDate = "desc";
        } else {
            // Default: sort by createdAt descending
            orderBy.createdAt = "desc";
        }

        const tasks = await prisma.task.findMany({
            where,
            orderBy: Object.keys(orderBy).length > 0 ? orderBy : undefined
        });

        return res.status(200).json(tasks);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

// Update a task (only if it belongs to the authenticated user)
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        const { title, description, priority, status, dueDate } = req.body;

        // Check if task exists and belongs to the user
        const task = await prisma.task.findUnique({
            where: { id }
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        if (task.userId !== userId) {
            return res.status(403).json({
                message: "Unauthorized: Cannot update another user's task"
            });
        }

        // Update only provided fields
        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (priority !== undefined) updateData.priority = priority;
        if (status !== undefined) updateData.status = status;
        if (dueDate !== undefined) updateData.dueDate = dueDate ? new Date(dueDate) : null;

        const updatedTask = await prisma.task.update({
            where: { id },
            data: updateData
        });

        return res.status(200).json(updatedTask);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

// Delete a task (only if it belongs to the authenticated user)
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        // Check if task exists and belongs to the user
        const task = await prisma.task.findUnique({
            where: { id }
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        if (task.userId !== userId) {
            return res.status(403).json({
                message: "Unauthorized: Cannot delete another user's task"
            });
        }

        await prisma.task.delete({
            where: { id }
        });

        return res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};

