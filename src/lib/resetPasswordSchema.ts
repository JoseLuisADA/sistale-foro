import { z } from 'zod'

const passwordSchema = z.string().min(1, "La contraseña necesita al menos un caracter")

export default passwordSchema