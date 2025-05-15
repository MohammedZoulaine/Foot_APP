import api from "./api";

export const getAllEquipes = () => api.get("/equipes");

export const createEquipe = (equipeData) => api.post("/equipes", equipeData);

export const addPlayerToEquipe = (equipeId, playerId) =>
  api.post(`/equipes/${equipeId}/add-player`, { playerId });

export const getEquipeById = (equipeId) => api.get(`/equipes/${equipeId}`);

export const updateEquipe = (equipeId, updateData) =>
  api.put(`/equipes/${equipeId}`, updateData);

export const deleteEquipe = (equipeId) => api.delete(`/equipes/${equipeId}`);
