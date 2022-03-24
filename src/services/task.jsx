import http from "../http-common";
class TasksService {
  getAll() {
    return http.get("/posts");
  }
  get(id) {
    return http.get(`/posts/${id}`);
  }
  create(data) {
    return http.post("/posts", data);
  }
  update(id, data) {
    return http.put(`/posts/${id}`, data);
  }
  delete(id) {
    return http.delete(`/posts/${id}`);
  }
}
export default new TasksService();
