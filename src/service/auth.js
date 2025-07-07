import api from "./axiosConfig";

export async function login({ email, password }) {
  try {
    const response = await api.post("/auth/login", { email, password });
    storeAuthData(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao fazer login")
  }
}

export async function register({ name, email, password }) {
  try {
    const response = await api.post("/users", { name, email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao cadastrar");
  }
}

function storeAuthData({ token, role }) {
  localStorage.setItem("authToken", token);
  localStorage.setItem("role", role);
}

export function logout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("role");
}