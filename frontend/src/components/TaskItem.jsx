import React from "react";

const TaskItem = ({ task, onToggleComplete, onDelete }) => {
  return (
    <li style={{ marginBottom: "0.5rem" }}>
      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          cursor: "pointer",
        }}
        onClick={() => onToggleComplete(task)}
      >
        {task.title}
      </span>
      &nbsp;
      <button onClick={() => onDelete(task._id)} style={{ marginLeft: "1rem" }}>
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
