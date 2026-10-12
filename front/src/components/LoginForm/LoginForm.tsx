"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { loginUser } from "@/services/auth.service";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  // Estados del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Validar y enviar el formulario
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setServerError("");
    setSuccessMessage("");

    const cleanEmail = email.trim();

    // Validar campos obligatorios
    if (!cleanEmail || !password) {
      setServerError("Por favor, completa todos los campos.");
      return;
    }

    // Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      setServerError("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      // Enviar credenciales al backend
      const data = await loginUser({
        email: cleanEmail,
        password,
      });

      // Guardar token y datos del usuario
      login(data.token, data.user);

      setSuccessMessage("¡Inicio de sesión exitoso!");

      setEmail("");
      setPassword("");

      // Redirigir al Dashboard
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("Ocurrió un error inesperado.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Iniciar sesión</h1>

        <p className="mt-3 text-slate-600">
          Ingresa tus credenciales para acceder a NovaStore.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Correo electrónico */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Correo electrónico
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="correo@ejemplo.com"
            autoComplete="email"
            required
            disabled={isLoading}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Contraseña */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Contraseña
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Ingresa tu contraseña"
            autoComplete="current-password"
            required
            disabled={isLoading}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Mensaje de error */}
        {serverError && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {serverError}
          </div>
        )}

        {/* Mensaje de éxito */}
        {successMessage && (
          <div
            role="status"
            className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700"
          >
            {successMessage}
          </div>
        )}

        {/* Botón de inicio de sesión */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
}
