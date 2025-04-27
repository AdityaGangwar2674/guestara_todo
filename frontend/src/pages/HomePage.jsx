import React, { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api/taskApi";
import { socket } from "../sockets/socket";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks initially
  useEffect(() => {
    const fetchData = async () => {
      const tasks = await getTasks();
      setTasks(tasks);
    };
    fetchData();
  }, []);

  // Socket listeners
  useEffect(() => {
    socket.on("taskCreated", (task) => {
      setTasks((prev) => [task, ...prev]);
    });

    socket.on("taskUpdated", (updatedTask) => {
      setTasks((prev) =>
        prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
      );
    });

    socket.on("taskDeleted", (taskId) => {
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    });

    return () => {
      socket.off("taskCreated");
      socket.off("taskUpdated");
      socket.off("taskDeleted");
    };
  }, []);

  // Handle actions
  const handleAddTask = async (title) => {
    await createTask(title);
  };

  const handleToggleComplete = async (task) => {
    await updateTask(task._id, { completed: !task.completed });
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Real-Time ToDo App</h1>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

export default HomePage;
