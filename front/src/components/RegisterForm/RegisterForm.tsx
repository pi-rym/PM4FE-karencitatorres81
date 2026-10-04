"use client";

import { useState } from "react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    let isValid = true;

    if (!name.trim()) {
      setNameError("El nombre es obligatorio.");
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError("El correo electrónico es obligatorio.");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Ingresa un correo electrónico válido.");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("La contraseña es obligatoria.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres.");
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Debes confirmar la contraseña.");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Las contraseñas no coinciden.");
      isValid = false;
    }

    if (isValid) {
      console.log("Submit exitoso");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-slate-700"
        >
          Nombre
        </label>

        <input
          id="name"
          name="name"
          type="text"
          placeholder="Ingresa tu nombre"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {nameError && (
          <p className="text-sm font-medium text-red-600">{nameError}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-slate-700"
        >
          Correo electrónico
        </label>

        <input
          id="email"
          name="email"
          type="email"
          placeholder="usuario@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {emailError && (
          <p className="text-sm font-medium text-red-600">{emailError}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-slate-700"
        >
          Contraseña
        </label>

        <input
          id="password"
          name="password"
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {passwordError && (
          <p className="text-sm font-medium text-red-600">{passwordError}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-semibold text-slate-700"
        >
          Confirmar contraseña
        </label>

        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirma tu contraseña"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {confirmPasswordError && (
          <p className="text-sm font-medium text-red-600">
            {confirmPasswordError}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Crear cuenta
      </button>
    </form>
  );
}
