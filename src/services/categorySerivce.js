import http from "./http";

const apiEndpoint = "/categories";

export const createCategory = (category) => {
  return http.post(apiEndpoint, category);
};

export const getCategories = () => {
  return http.get(apiEndpoint);
};

export const updateCategory = (id, category) => {
  return http.put(apiEndpoint + "/" + id, category);
};

export const deleteCategory = (id) => {
  return http.delete(apiEndpoint + "/" + id);
};

export default {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
