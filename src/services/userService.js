import http from "./httpService";

const apiEndpoint = "/users";

export function register(user) {
  return http.get(apiEndpoint + { email: user.email, password: user.password });
}

export function getUsers() {
  return http.get(apiEndpoint + "/me");
}
