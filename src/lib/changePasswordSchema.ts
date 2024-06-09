// src/lib/passwordChangeSchema.ts
import { z } from 'zod';

export const passwordChangeSchema = z.object({
  oldPassword: z.string().min(1, 'La contraseña actual es requerida'),
  newPassword: z.string().min(1, 'La nueva contraseña es requerida'),
  confirmPassword: z.string().min(1, 'La confirmación de la contraseña es requerida'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

export type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;
