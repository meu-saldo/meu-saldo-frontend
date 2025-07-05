export async function login({ email, password }) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Erro ao fazer login');
  }

  storeAuthData(data);

  return data;
}

export async function register({ name, email, password }) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    let errMsg = 'Erro ao cadastrar';
    try {
      const err = await response.json();
      errMsg = err.message || err.error || errMsg;
    } catch {}
    throw new Error(errMsg);
  }

  return await response.json();
}

function storeAuthData({ token, role }) {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
}