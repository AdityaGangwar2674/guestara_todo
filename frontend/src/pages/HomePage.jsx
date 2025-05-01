import React, { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api/taskApi";
import { socket } from "../sockets/socket";
import {
  CheckCircle,
  Circle,
  Trash2,
  Edit,
  X,
  Plus,
  CheckCheck,
} from "lucide-react";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all"); // "all", "active", "completed"

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
  const handleAddTask = async () => {
    if (title.trim()) {
      await createTask(title);
      setTitle("");
    }
  };

  const handleToggleComplete = async (task) => {
    await updateTask(task._id, { completed: !task.completed });
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
  };

  const handleEditStart = (task) => {
    setEditingId(task._id);
    setEditText(task.title);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleEditSave = async (id) => {
    if (editText.trim()) {
      await updateTask(id, { title: editText });
      setEditingId(null);
      setEditText("");
    }
  };

  const handleKeyDown = (e, action) => {
    if (e.key === "Enter") {
      action();
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const activeCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 text-white">
          <h1 className="text-2xl font-bold text-center">Real-Time ToDo App</h1>
          <p className="text-sm text-center opacity-90 mt-1">
            Stay organized, synchronized
          </p>
        </div>

        {/* Add Task Form */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, handleAddTask)}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleAddTask}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg flex items-center justify-center transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-center p-3 bg-gray-50 border-b border-gray-100">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 mx-1 rounded ${
              filter === "all"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            All ({tasks.length})
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-3 py-1 mx-1 rounded ${
              filter === "active"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            Active ({activeCount})
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-1 mx-1 rounded ${
              filter === "completed"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            Completed ({completedCount})
          </button>
        </div>

        {/* Task List */}
        <ul className="divide-y divide-gray-100">
          {filteredTasks.length === 0 ? (
            <li className="py-6 text-center text-gray-500 italic">
              No tasks to display
            </li>
          ) : (
            filteredTasks.map((task) => (
              <li
                key={task._id}
                className="px-4 py-3 hover:bg-gray-50 group transition-colors"
              >
                {editingId === task._id ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) =>
                        handleKeyDown(e, () => handleEditSave(task._id))
                      }
                      className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                      autoFocus
                    />
                    <button
                      onClick={() => handleEditSave(task._id)}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      <CheckCheck size={20} />
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <button
                      onClick={() => handleToggleComplete(task)}
                      className={`flex-shrink-0 ${
                        task.completed
                          ? "text-green-500"
                          : "text-gray-400 hover:text-blue-500"
                      }`}
                    >
                      {task.completed ? (
                        <CheckCircle size={20} />
                      ) : (
                        <Circle size={20} />
                      )}
                    </button>
                    <span
                      className={`ml-3 flex-1 ${
                        task.completed
                          ? "line-through text-gray-400"
                          : "text-gray-700"
                      }`}
                    >
                      {task.title}
                    </span>
                    <button
                      onClick={() => handleEditStart(task)}
                      className="ml-2 text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="ml-2 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </li>
            ))
          )}
        </ul>

        {/* Footer */}
        <div className="px-4 py-3 bg-gray-50 text-sm text-gray-500 text-center">
          <p>{activeCount} items left</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
