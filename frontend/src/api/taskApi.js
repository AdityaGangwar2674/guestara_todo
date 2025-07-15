import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_BASE_URL;

// Base API URL
// const API_URL = "http://localhost:5000/api/tasks";

// Get all tasks
export const getTasks = async () => {
  const res = await axios.get(API_BASE_URL);
  return res.data;
};

// Create new task
export const createTask = async (title) => {
  const res = await axios.post(API_BASE_URL, { title });
  return res.data;
};

// Update task
export const updateTask = async (id, updates) => {
  const res = await axios.patch(`${API_BASE_URL}/${id}`, updates);
  return res.data;
};

// Delete task
export const deleteTask = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/${id}`);
  return res.data;
};
