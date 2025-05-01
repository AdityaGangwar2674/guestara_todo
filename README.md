# Todo Application 📝

**Todo Application** is a real-time collaborative task management application built with **Node.js**, **Express**, **MongoDB**, and **Socket.IO**.

## 🚀 Features

- ✅ Create, update, and delete tasks
- 🔁 Real-time updates using Socket.IO
- 🧠 Backend built with Express and MongoDB (Mongoose)
- 🔗 RESTful API routes for task operations

.env
MONGO_URI = "mongodb+srv://aditya:2674@mycluster.ojcwdlh.mongodb.net/guestara_todo?retryWrites=true&w=majority&appName=myCluster"
PORT = 5000

## 🛠️ Setup and Installation

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/guestara_todo.git
cd guestara_todo
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install the required dependencies:

```bash
npm install
```

Start the backend server:

```bash
npm start
```

The backend server will be hosted on port 5000 by default.

### 3. Frontend Setup

Now, navigate to the frontend directory:

```bash
cd frontend
```

Install the required dependencies for the frontend:

```bash
npm install
```

Start the frontend server:

```bash
npm start
```

The frontend will be hosted on port 3000 by default.

## 🏗️ Project Flow

1. **Start the Backend**:
   Run `npm start` in the backend folder to start the backend server. The backend will be accessible on port 5000:

   ```bash
   cd backend
   npm start
   ```

   The backend connects to the database and handles API requests for creating, updating, deleting, and retrieving tasks.

2. **Start the Frontend**:
   Once the backend is running, go to the frontend folder and run:

   ```bash
   cd frontend
   npm start
   ```

   This will start the frontend React application, accessible by default on port 3000. The frontend connects to the backend API for task management.

3. **Real-Time Task Management**:
   The frontend will display a list of tasks fetched from the backend.

   When you open a new tab, the frontend will automatically sync with the backend and display the same list of tasks.

4. **Multiple Tabs (Real-Time Sync)**:
   Open two browser tabs. Both tabs will display the same tasks from the backend.

   Any actions performed in the first tab (such as creating, updating, or deleting tasks) will be reflected instantly in the second tab through Socket.IO.

5. **Task Actions**:
   - **Create Task**: Add a new task by typing a task title and clicking "Add Task." The task will be added in both tabs.
   - **Update Task**: Mark tasks as completed or edit them. Changes made in the first tab will be updated in the second tab in real-time.
   - **Delete Task**: If a task is deleted in one tab, it will also be deleted in the second tab.
   - **Mark as Completed**: Tasks can be marked as completed, and the change will be reflected instantly across all tabs.

## 📝 Conclusion

This project demonstrates the use of Socket.IO to sync tasks in real-time across multiple tabs, creating a seamless user experience when managing tasks. The backend, built with Express and MongoDB, handles all task-related operations, and the frontend, built with React, displays real-time updates of those operations.

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-time Communication**: Socket.IO
