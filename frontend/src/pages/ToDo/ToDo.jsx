import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import {
  Input,
  Button,
  Divider,
  Modal,
  message,
  Tag,
  Tooltip,
  Select,
  Empty,
} from 'antd';
import '../../index.css';
import { getErrorMessage } from '../../util/GetError';
import { getUserDetails } from '../../util/GetUSer';
import ToDoServices from '../../services/ToDoServises';
import {
  AiFillEdit,
  AiFillDelete,
  AiFillCheckCircle,
} from 'react-icons/ai';

function ToDo() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTodo, setAllTodo] = useState([]);
  const [currentEditItem, setCurrentEditItem] = useState('');
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedStatus, setUpdatedStatus] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskType, setCurrentTaskType] = useState('all');
  const [filteredTodo, setFilteredTodo] = useState([]);

  const navigate = useNavigate();

  const getTodoList = async () => {
    const user = getUserDetails();
    try {
      const response = await ToDoServices.getTodoList(user?.userId);
      setAllTodo(response.data);
    } catch (err) {
      console.log(err);
      message.error(getErrorMessage(err));
    }
  };

  useEffect(() => {
    const user = getUserDetails();
    if (user && user?.userId) {
      getTodoList();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    // Filter tasks when task type changes
    let filtered = [];
    if (currentTaskType === 'complete') {
      filtered = allTodo.filter((item) => item.isCompleted);
    } else if (currentTaskType === 'incomplete') {
      filtered = allTodo.filter((item) => !item.isCompleted);
    } else {
      filtered = allTodo;
    }
    setFilteredTodo(filtered);
  }, [allTodo, currentTaskType]);

  const getFormattedDate = (value) => {
    let date = new Date(value);
    let dateString = date.toDateString();
    let hh = date.getHours();
    let min = date.getMinutes();
    let ss = date.getSeconds();
    return `${dateString} at ${hh}:${min}:${ss}`;
  };

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleSubmitTask = async () => {
    try {
      setLoading(true);
      const userId = getUserDetails()?.userId;
      const data = {
        title,
        description,
        isCompleted: false,
        createdBy: userId,
      };
      await ToDoServices.createTodo(data);
      message.success('To Do Task Added Successfully');
      setTitle('');
      setDescription('');
      setIsAdding(false);
      setLoading(false);
      await getTodoList();
    } catch (err) {
      console.log(err);
      setLoading(false);
      message.error(getErrorMessage(err));
    }
  };

  const handleEdit = (item) => {
    setCurrentEditItem(item);
    setUpdatedTitle(item?.title);
    setUpdatedDescription(item?.description);
    setUpdatedStatus(item?.isCompleted);
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      setLoading(true);
      const data = {
        title: updatedTitle,
        description: updatedDescription,
        isCompleted: updatedStatus,
      };
      await ToDoServices.updateTodo(currentEditItem._id, data);
      await getTodoList();
      message.success(`${currentEditItem.title} Updated Successfully`);
      setLoading(false);
      setIsEditing(false);
    } catch (err) {
      console.log(err);
      message.error(getErrorMessage(err));
    }
  };

  const handleDelete = async (item) => {
    try {
      await ToDoServices.deleteTodo(item._id);
      await getTodoList();
      message.success(`${item.title} is Deleted!`);
    } catch (err) {
      console.log(err);
      message.error(getErrorMessage(err));
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await ToDoServices.updateTodo(id, { isCompleted: status });
      await getTodoList();
      message.success('Task Status Updated');
    } catch (err) {
      console.log(err);
      message.error(getErrorMessage(err));
    }
  };

  const handleTypeChange = (value) => {
    setCurrentTaskType(value);
  };

  const handleSearch = (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (!query) {
      // reset filter to current task type filter
      let filtered = [];
      if (currentTaskType === 'complete') {
        filtered = allTodo.filter((item) => item.isCompleted);
      } else if (currentTaskType === 'incomplete') {
        filtered = allTodo.filter((item) => !item.isCompleted);
      } else {
        filtered = allTodo;
      }
      setFilteredTodo(filtered);
      return;
    }

    const searchFiltered = allTodo.filter((item) =>
      item.title.toLowerCase().includes(query)
    );
    setFilteredTodo(searchFiltered);
  };

  return (
    <div className="flex">
      <Navigation active="myTask" />
<main className="flex-1 pt-[60px] transition-all duration-300 min-h-screen bg-black text-white">
  <div className="p-8 flex flex-col h-full">
          {/* Header and Add */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-4 w-full max-w-screen-lg mb-6">
            <h2 className="text-2xl font-bold mb-4 md:mb-0">Your Tasks</h2>
            <Input
              onChange={handleSearch}
              placeholder="Search your task here"
              className="flex-1 w-full md:w-auto p-3 border border-gray-300 rounded focus:outline-none"
              size="large"
            />
            <Button
              type="primary"
              onClick={handleAddClick}
              className="!bg-blue-600 hover:!bg-blue-700 text-white px-5 py-2 rounded mt-4 md:mt-0"
            >
              Add Task
            </Button>
            <Select
              value={currentTaskType}
              onChange={handleTypeChange}
              size="large"
              className="ml-[10px] w-48"
              options={[
                { value: 'all', label: 'All' },
                { value: 'incomplete', label: 'Incomplete' },
                { value: 'complete', label: 'Complete' },
              ]}
            />
          </div>

         <Divider className="!border-gray-600" />

          {/* Task Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTodo.length > 0 ? (
              filteredTodo.map((item) => (
                <div
 className="bg-black shadow-lg p-5 flex flex-col justify-between border border-gray-700 transition duration-300 hover:shadow-2xl hover:border-blue-500 hover:bg-gray-900"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold break-words">
                        {item?.title}
                      </h3>
                      {item?.isCompleted ? (
                        <Tag color="cyan">Completed</Tag>
                      ) : (
                        <Tag color="red">Incomplete</Tag>
                      )}
                    </div>
                  <p className="text-white break-words">
                      {item?.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <Tag>{getFormattedDate(item?.createdAt)}</Tag>
                    <div className="flex gap-3 text-xl">
                      <Tooltip title="Edit Task">
                        <span>
                          <AiFillEdit
                            onClick={() => handleEdit(item)}
                            className="cursor-pointer text-blue-500 hover:text-blue-700"
                          />
                        </span>
                      </Tooltip>

                      <Tooltip title="Delete Task">
                        <span>
                          <AiFillDelete
                            onClick={() => handleDelete(item)}
                            className="cursor-pointer text-red-500 hover:text-red-700"
                          />
                        </span>
                      </Tooltip>

                      {item?.isCompleted ? (
                        <Tooltip title="Mark as Incomplete">
                          <span>
                            <AiFillCheckCircle
                              onClick={() =>
                                handleUpdateStatus(item._id, false)
                              }
                              className="cursor-pointer text-green-500 hover:text-green-700"
                            />
                          </span>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Mark as Complete">
                          <span>
                            <AiFillCheckCircle
                              onClick={() =>
                                handleUpdateStatus(item._id, true)
                              }
                              className="cursor-pointer text-gray-400 hover:text-green-500"
                            />
                          </span>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 text-lg">
               <Empty />
              </div>
            )}
          </div>

          {/* Add Modal */}
          <Modal
            confirmLoading={loading}
            title="Add New Task"
            open={isAdding}
            onOk={handleSubmitTask}
            onCancel={() => setIsAdding(false)}
          >
            <Input
              placeholder="Title"
              className="mb-4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input.TextArea
              placeholder="Description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Modal>

          {/* Edit Modal */}
          <Modal
            confirmLoading={loading}
            title={`Update ${currentEditItem.title}`}
            open={isEditing}
            onOk={handleSaveEdit}
            onCancel={() => setIsEditing(false)}
          >
            <Input
              placeholder="Update Title"
              className="mb-4"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <Input.TextArea
              placeholder="Update Description"
              rows={4}
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
            />
            <Select
              onChange={(value) => setUpdatedStatus(value)}
              value={updatedStatus}
              className="w-full mt-4"
              options={[
                { value: false, label: 'Not Completed' },
                { value: true, label: 'Completed' },
              ]}
            />
          </Modal>
        </div>
      </main>
    </div>
  );
}

export default ToDo;
