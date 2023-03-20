const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Todo = require("../models/Todo");

// get all todo list api
router.get("/", asyncHandler(async (req, res) => {
    const todo = await Todo.find({ user_id: req.user.id });
    if (!todo) {
        return res.status(404).json(todo, "message: todo not found")
    } else {
        return res.status(200).json(todo);
    }
}));
//create todo api
router.post("/", asyncHandler(async (req, res) => {
    const { task, description } = req.body;
    const todo = await Todo.create({
        task,
        description,
        user_id: req.user.id,
    });
    return res.status(201).json({ todo, message: "todo created successfully" })
}));
//get single todo api/todo/:id
router.get("/:id", asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
        return res.status(404).json({ message: "todo not found" })
    } else {
        return res.status(200).json(todo);
    }
}));
//update api/todo/:id
router.put("/:id", asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
        return res.status(404).json({ message: "todo not found" })
    }
    if (todo.user_id.toString() !== req.user.id) {
       return res.status(403).json({ message: 'User cannot have permission to update other user todo' });
    }
    const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    return res.status(200).json({ updatedTodo, message: 'todo updated successfully' })
}));
//delete todo api/todo/:id
router.delete("/:id", asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
        return res.status(404).json({ message: "todo not found" })
    }
    if (todo.user_id.toString() !== req.user.id) {
        return res.status(403).json({ message: 'User cannot have permission to delete other user todo' });
    }
    await Todo.deleteOne({ _id: req.params.id });
    return res.status(200).json({ message: 'todo deleted successfully' })
}));

module.exports = router;