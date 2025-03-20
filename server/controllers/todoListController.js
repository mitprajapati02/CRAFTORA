const TodoList = require("../models/TodoList");
const SocialMediaApp = require("../models/SocialMediaApp");

async function createTodoList(req, res) {
  try {
    const appId = req.headers.authorization.split(" ")[1];

    if (!appId) {
      return res.status(400).json({ error: "appId is required." });
    }

    const { task } = req.body;

    if (!task) {
      return res.status(400).json({ error: "Task is required." });
    }

    const socialMediaApp = await SocialMediaApp.findById(appId);
    if (!socialMediaApp) {
      return res.status(404).json({ error: "Social media app not found." });
    }

    let todoList = await TodoList.findOne({ app: appId });

    if (todoList) {
      todoList.tasks.push({ task, completed: false });
      await todoList.save();
    } else {
      todoList = new TodoList({
        app: appId,
        tasks: [{ task, completed: false }],
      });
      await todoList.save();

      socialMediaApp.todoLists.push(todoList._id);
      await socialMediaApp.save();
    }

    res
      .status(200)
      .json({ message: "Task added successfully", tasks: todoList.tasks });
  } catch (error) {
    console.error(error);
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

    if (!todoList) {
      return res.status(404).json({ error: "Task or TodoList not found" });
    }

    res.json(todoList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteTask(req, res) {
  try {
    const { taskId } = req.body;

    const todoList = await TodoList.findOneAndUpdate(
      { "tasks._id": taskId },
      { $pull: { tasks: { _id: taskId } } },
      { new: true }
    );

    if (!todoList) {
      return res.status(404).json({ error: "Task or TodoList not found" });
    }

    res.json(todoList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getTodoListsByApp(req, res) {
  try {
    const todoLists = await TodoList.find({ app: req.params.appId });

    if (todoLists.length === 0) {
      return res.json([]);
    }

    res.json(todoLists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createTodoList,
  markTaskCompleted,
  deleteTask,
  getTodoListsByApp,
};
