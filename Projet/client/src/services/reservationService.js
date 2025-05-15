import api from "./api";

export const getAllReservations = () => api.get("/reservations");