import { api } from "./axiosService";

export const creatorAPI = {
  getCreators: async (params = {}) => {
    const response = await api.get('/creators', { params });
    return response.data;
  },

  getCreator: async (id) => {
    const response = await api.get(`/creators/${id}`);
    return response.data;
  },

  createCreator: async (creatorData) => {
    const response = await api.post('/creators', creatorData);
    return response.data;
  },

  updateCreatorAPI: async (id, updates) => {
    const response = await api.put(`/creators/${id}`, updates);
    return response.data;
  },

  deleteCreator: async (id) => {
    const response = await api.delete(`/creators/${id}`);
    return response.data;
  },
  getCategoryLists:async()=>{
    const response= await api.get(`/creators/cat-list`);
    return response.data
  },
  getActivityLogs:async()=>{
    const response= await api.get('/activity-logs');
    return response.data;
  }
};