export async function login({ email, password }) {
  const response = await fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    let errMsg = 'Erro ao fazer login';
    try {
      const err = await response.json();
      errMsg = err.message || err.error || errMsg;
    } catch {}
    throw new Error(errMsg);
  }

  return await response.json();
}

export async function register({ name, email, password }) {
  const response = await fetch('http://localhost:8080/users', {
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

