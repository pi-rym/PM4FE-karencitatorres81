const API_URL = "http://localhost:3000";

// Datos necesarios para registrar un usuario
export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}

// Datos necesarios para iniciar sesión
export interface LoginUserData {
  email: string;
  password: string;
}

// Estructura de la respuesta del login
export interface LoginResponse {
  login: boolean;
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
}

// Registrar usuario
export async function registerUser(userData: RegisterUserData): Promise<void> {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.message ||
        errorData?.error ||
        "No se pudo registrar el usuario.",
    );
  }
}

// Iniciar sesión
export async function loginUser(
  credentials: LoginUserData,
): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.message || errorData?.error || "No se pudo iniciar sesión.",
    );
  }

  const data: LoginResponse = await response.json();

  if (!data.login || !data.token) {
    throw new Error("La respuesta de autenticación no es válida.");
  }

  return data;
}
