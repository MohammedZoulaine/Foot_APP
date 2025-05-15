import api from "./api";

export const getAllUsers = () => api.get("/users");

export const deleteUser = (id) => api.delete(`/users/${id}`);

export const banUser = (id) => api.put(`/users/${id}`, { role: "banned" });
