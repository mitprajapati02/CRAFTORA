const express = require("express");
const {
  createTodoList,
  markTaskCompleted,
  deleteTask,
  getTodoListsByApp,
} = require("../controllers/todoListController");

const router = express.Router();

router.get("/todoList/:appId", getTodoListsByApp);

router.put("/todoList", createTodoList);

router.put("/todoList/task/complete", markTaskCompleted);

router.delete("/todoList/task", deleteTask);

module.exports = router;
