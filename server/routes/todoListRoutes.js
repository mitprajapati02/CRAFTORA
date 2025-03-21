const express = require('express');
const {
  createTodoList,
  markTaskCompleted,
  deleteTask,
  getTodoListsByApp,
} = require('../controllers/todoListController');

const router = express.Router();

router.get('/todoList/:appId', getTodoListsByApp);

router.put('/todoList', createTodoList);

router.put('/toggle/:taskId', markTaskCompleted);

router.delete('/delete/:taskId', deleteTask);


module.exports = router;
