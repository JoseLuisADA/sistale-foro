import { z } from 'zod';

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const hasNoSpecialCharacters = (username: string) => {
  const specialCharRegex = /^[a-zA-Z0-9]*$/
  return specialCharRegex.test(username)
}

const registerSchema = z.object({
  username: z.string()
    .min(1, "El nombre de usuario es requerido.")
    .max(20, "El nombre de usuario no puede tener más de 20 caracteres.")
    .refine(username => !username.includes(' '), {
      message: "El nombre de usuario no puede contener espacios."
    })
    .refine(username => hasNoSpecialCharacters(username), {
      message: "El nombre de usuario no puede contener caracteres especiales."
    }),
  password: z.string()
    .min(1, "La contraseña debe tener al menos 1 caracter."),
  confirmPassword: z.string(),
  email: z.string()
    .email("El email no es válido.")
    .refine(email => isValidEmail(email), {
      message: "El email no es válido."
    }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"]
})

export default registerSchema;