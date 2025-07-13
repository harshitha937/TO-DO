const  express = require("express");
const  {createTodo,getTodoList,deleteTodo,updateTodo}= require("../controllers/todoController");
const authenticateToken = require("../middleware/Authentication");
const router =express.Router();


router.post('/create-todo', authenticateToken,createTodo);
router.get('/get_todlist/:userId', authenticateToken,getTodoList);
router.delete('/delete_todo/:id', authenticateToken,deleteTodo);
router.patch('/update_todlist/:id', authenticateToken,updateTodo);

module.exports = router;