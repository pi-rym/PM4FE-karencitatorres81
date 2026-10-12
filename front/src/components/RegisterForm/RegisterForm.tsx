"use client";

import { useState, type FormEvent } from "react";
import { registerUser } from "@/services/auth.service";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setAddressError("");
    setPhoneError("");
    setSuccessMessage("");
    setServerError("");

    let isValid = true;

    if (!name.trim()) {
      setNameError("El nombre es obligatorio.");
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError("El correo electrónico es obligatorio.");
      isValid = false;
    } else if (!emailRegex.test(email.trim())) {
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

    if (!address.trim()) {
      setAddressError("La dirección es obligatoria.");
      isValid = false;
    }

    if (!phone.trim()) {
      setPhoneError("El teléfono es obligatorio.");
      isValid = false;
    } else if (!/^\d{7,15}$/.test(phone.trim())) {
      setPhoneError("Ingresa un número de teléfono válido.");
      isValid = false;
    }

    if (!isValid || isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      await registerUser({
        name: name.trim(),
        email: email.trim(),
        password,
        address: address.trim(),
        phone: phone.trim(),
      });

      setSuccessMessage(
        "¡Cuenta creada correctamente! Ya puedes iniciar sesión.",
      );

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAddress("");
      setPhone("");
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "User already exists") {
          setServerError("Este correo electrónico ya está registrado.");
        } else if (error.message === "Missing fields") {
          setServerError(
            "Faltan campos obligatorios para completar el registro.",
          );
        } else {
          setServerError(error.message);
        }
      } else {
        setServerError("Ocurrió un error inesperado.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelClass = "block text-sm font-semibold text-slate-700";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nombre */}
      <div className="space-y-2">
        <label htmlFor="name" className={labelClass}>
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Ingresa tu nombre"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={inputClass}
        />
        {nameError && (
          <p className="text-sm font-medium text-red-600">{nameError}</p>
        )}
      </div>

      {/* Correo electrónico */}
      <div className="space-y-2">
        <label htmlFor="email" className={labelClass}>
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="usuario@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={inputClass}
        />
        {emailError && (
          <p className="text-sm font-medium text-red-600">{emailError}</p>
        )}
      </div>

      {/* Contraseña */}
      <div className="space-y-2">
        <label htmlFor="password" className={labelClass}>
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={inputClass}
        />
        {passwordError && (
          <p className="text-sm font-medium text-red-600">{passwordError}</p>
        )}
      </div>

      {/* Confirmar contraseña */}
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className={labelClass}>
          Confirmar contraseña
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirma tu contraseña"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className={inputClass}
        />
        {confirmPasswordError && (
          <p className="text-sm font-medium text-red-600">
            {confirmPasswordError}
          </p>
        )}
      </div>

      {/* Dirección */}
      <div className="space-y-2">
        <label htmlFor="address" className={labelClass}>
          Dirección
        </label>
        <input
          id="address"
          name="address"
          type="text"
          placeholder="Ingresa tu dirección"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          className={inputClass}
        />
        {addressError && (
          <p className="text-sm font-medium text-red-600">{addressError}</p>
        )}
      </div>

      {/* Teléfono */}
      <div className="space-y-2">
        <label htmlFor="phone" className={labelClass}>
          Teléfono
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="0991234567"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className={inputClass}
        />
        {phoneError && (
          <p className="text-sm font-medium text-red-600">{phoneError}</p>
        )}
      </div>

      {/* Mensaje de éxito */}
      {successMessage && (
        <p
          role="status"
          className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700"
        >
          {successMessage}
        </p>
      )}

      {/* Mensaje de error del servidor */}
      {serverError && (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
        >
          {serverError}
        </p>
      )}

      {/* Botón de registro */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Registrando..." : "Crear cuenta"}
      </button>
    </form>
  );
}
