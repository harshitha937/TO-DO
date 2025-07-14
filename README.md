# TO-DO
MERN TO-DO 
# 📝 TaskApp – MERN Stack Task Manager

TaskApp is a full-stack **MERN** (MongoDB, Express.js, React.js, Node.js) task management app. It allows users to manage their personal or professional tasks with a clean, modern UI using **Tailwind CSS** and **Ant Design**.

---

---

## 🚀 Features

- ✅ User Authentication (JWT-based login/register)
- ✏️ Create, Read, Update, Delete (CRUD) tasks
- 🔍 Search & Filter tasks by status
- 📱 Responsive UI with Tailwind CSS
- 💡 Clean UI components powered by Ant Design
- 🧾 Timestamps and status badges

---

## 🧰 Tech Stack

| Category       | Technology                       |
|----------------|----------------------------------|
| Frontend       | React, Tailwind CSS, Ant Design  |
| Backend        | Node.js, Express.js              |
| Database       | MongoDB                          |
| Auth           | JWT (JSON Web Tokens)            |
| API Client     | Axios                            |

---

## 📦 Installation

### 1. Clone the repo

git clone https://github.com/your-username/taskapp.git
cd taskapp

### 2. Backend Setup
cd backend
npm install

##create.env:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

##start server :npm run backend

###3. Frontend Setup:

cd  frontend
npm install

##create .env:REACT_APP_API_URL=http://localhost:5000/api
##run :npm start frontend

---

🧭 Application Workflow
--JWT authentication secures API calls—frontend automatically stores the token.

--Task list, add/edit/delete flows are handled via React components.

--Tailwind CSS ensures responsive styling.

--Ant Design is used for modals, dropdowns, buttons, and feedback.

---

🔧 Examples of Use
--Create a new account or log in.

--Use the “Add Task” modal (see preview below).

--Search for tasks, filter by status, and toggle completeness.

--Edit or remove tasks via intuitive controls.

----

🧱 Project Structure:

TO-DO/
├── frontend/                # React frontend
│   └── src/
│       ├── components/    # UI components
│       ├── pages/         # Pages (Login, Register, Dashboard)
│       └── services/      # Axios API requests
├── backend/                # Express backend
│   ├── controllers/       # Business logic
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   └── index.js.js          # Entry point

---
📚 API Endpoints:

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| POST   | `/api/auth/register` | Create a new account  |
| POST   | `/api/auth/login`    | Sign in existing user |
| GET    | `/api/tasks`         | List all tasks        |
| POST   | `/api/tasks`         | Add a new task        |
| PATCH  | `/api/tasks/:id`     | Update a task         |
| DELETE | `/api/tasks/:id`     | Delete a task         |

---
🙋‍♀️ Author:
Harshitha
GitHub: @harshitha937
















