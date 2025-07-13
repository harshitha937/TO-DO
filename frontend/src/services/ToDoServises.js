import axios from 'axios';

import { authHeaders } from '../util/authHeaders';
import { getUserDetails } from '../util/GetUSer';

const TODO_URL = 'http://localhost:5000/api/todo';

const createTodo = (data) => axios.post(`${TODO_URL}/create-todo`, data, authHeaders());
const getTodoList = (userId) => axios.get(`${TODO_URL}/get_todlist/${userId}`, authHeaders());
const deleteTodo = (id) => axios.delete(`${TODO_URL}/delete_todo/${id}`, authHeaders());
const updateTodo = (id, data) => axios.patch(`${TODO_URL}/update_todlist/${id}`, data, authHeaders());

const ToDoServices = {
  createTodo,
  getTodoList,
  deleteTodo,
  updateTodo,
};

export default ToDoServices;
