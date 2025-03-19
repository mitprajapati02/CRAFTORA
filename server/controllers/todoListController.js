const TodoList = require('../models/TodoList');
const SocialMediaApp = require('../models/SocialMediaApp');


async function createTodoList(req, res) {
    const { appId, title, tasks } = req.body;
    try {
        const todoList = new TodoList({ app: appId, title, tasks });
        await todoList.save();

        await SocialMediaApp.findByIdAndUpdate(appId, { $push: { todoLists: todoList._id } });
        res.json(todoList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


async function markTaskCompleted(req, res) {
    try {
        const { taskId } = req.body;
        const todoList = await TodoList.findOneAndUpdate(
            { "tasks._id": taskId },
            { $set: { "tasks.$.completed": true } },
            { new: true }
        );
        res.json(todoList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


async function deleteTask(req, res) {
    try {
        const { taskId } = req.body;
        const todoList = await Todo;
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


async function getTodoListsByApp(req, res) {
    try {
        const todoLists = await TodoList.find({ app: req.params.appId });
        res.json(todoLists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createTodoList, markTaskCompleted, deleteTask, getTodoListsByApp };
