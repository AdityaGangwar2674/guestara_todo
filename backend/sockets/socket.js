module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // You can listen for client-side custom events here if needed
    // Example (optional):
    // socket.on('customEvent', (data) => {
    //   console.log('Received custom event:', data);
    // });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};
