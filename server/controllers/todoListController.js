const TodoList = require("../models/TodoList");
const SocialMediaApp = require("../models/SocialMediaApp");

async function createTodoList(req, res) {
  const { appId, title, tasks } = req.body;
  try {
    // Create a new TodoList with appId, title, and tasks
    const todoList = new TodoList({ app: appId, title, tasks });

    // Save the TodoList to the database
    await todoList.save();

    // Add the newly created TodoList's ID to the SocialMediaApp's 'todoLists' array
    await SocialMediaApp.findByIdAndUpdate(appId, {
      $push: { todoLists: todoList._id },
    });

    // Respond with the created TodoList
    res.json(todoList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function markTaskCompleted(req, res) {
  try {
    const { taskId } = req.body;

    // Update the task's 'completed' status in the TodoList where the task ID matches
    const todoList = await TodoList.findOneAndUpdate(
      { "tasks._id": taskId },
      { $set: { "tasks.$.completed": true } },
      { new: true } // Return the updated document
    );

    // If the TodoList doesn't exist or no task was found, return an error
    if (!todoList) {
      return res.status(404).json({ error: "Task or TodoList not found" });
    }

    // Respond with the updated TodoList
    res.json(todoList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteTask(req, res) {
  try {
    const { taskId } = req.body;

    // Find the TodoList and remove the task from the 'tasks' array
    const todoList = await TodoList.findOneAndUpdate(
      { "tasks._id": taskId },
      { $pull: { tasks: { _id: taskId } } },
      { new: true } // Return the updated document
    );

    // If the TodoList doesn't exist or the task wasn't found, return an error
    if (!todoList) {
      return res.status(404).json({ error: "Task or TodoList not found" });
    }

    // Respond with the updated TodoList
    res.json(todoList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getTodoListsByApp(req, res) {
  try {
    // Fetch all TodoLists associated with the given appId
    const todoLists = await TodoList.find({ app: req.params.appId });

    // If no TodoLists are found, return an empty array
    if (todoLists.length === 0) {
      return res.json([]);
    }

    // Respond with the list of TodoLists
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
