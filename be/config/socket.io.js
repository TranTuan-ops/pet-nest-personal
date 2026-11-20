const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const { ROLES } = require("./role");

let io;

function setupSocket(server, clientOrigin) {
  io = new Server(server, {
    cors: {
      origin: clientOrigin,
      methods: ["GET", "POST", "PATCH", "DELETE"],
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next();

    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      if (!user || typeof user.id !== "string" || !Number.isInteger(user.role)) {
        return next(new Error("Invalid session"));
      }
      socket.data.user = user;
      next();
    } catch {
      next(new Error("Invalid session"));
    }
  });

  io.on("connection", (socket) => {
    const user = socket.data.user;
    if (!user) return;

    socket.join(user.id);
    if (user.role === ROLES.ADMIN || (user.role & ROLES.STAFF) !== 0) {
      socket.join("staff-care");
    }
  });
}

function getIO() {
  if (!io) {
    throw new Error(
      "Socket.io chưa được khởi tạo. Gọi setupSocket(server) trước."
    );
  }
  return io;
}

module.exports = {
  setupSocket,
  getIO,
};
