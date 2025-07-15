import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_BASE_URL || "http://localhost:5000", {
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("✅ Socket connected:", socket.id);
});

socket.on("disconnect", () => {
  console.log("❌ Socket disconnected");
});

socket.onAny((event, ...args) => {
  console.log(`📡 Event received: ${event}`, args);
});
