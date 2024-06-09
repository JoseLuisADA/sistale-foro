import { z } from 'zod';

const registerSchema = z.object({
    username: z.string().min(1, "El nombre de usuario es requerido."),
    password: z.string().min(1, "La contraseña debe tener al menos 1 caracter."),
    confirmPassword: z.string(),
    email: z.string().email("El email no es válido."),
  }).refine(data => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"]
})

export default registerSchema;