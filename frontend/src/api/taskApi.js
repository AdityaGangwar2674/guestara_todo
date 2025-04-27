import axios from "axios";

// Base API URL
const API_URL = "/api/tasks";

// Get all tasks
export const getTasks = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Create new task
export const createTask = async (title) => {
  const res = await axios.post(API_URL, { title });
  return res.data;
};

// Update task
export const updateTask = async (id, updates) => {
  const res = await axios.patch(`${API_URL}/${id}`, updates);
  return res.data;
};

// Delete task
export const deleteTask = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
