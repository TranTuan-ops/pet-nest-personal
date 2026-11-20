import { io, type ManagerOptions, type SocketOptions } from "socket.io-client";
import { BACKEND_ORIGIN } from "@/config/backend";

export function connectBackendSocket(options?: Partial<ManagerOptions & SocketOptions>) {
  return io(BACKEND_ORIGIN, {
    ...options,
    auth: (callback) => {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      callback({ token });
    },
  });
}
