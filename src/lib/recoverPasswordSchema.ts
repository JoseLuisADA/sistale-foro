import { z } from 'zod'

const usernameSchema = z.string().min(1, "El nombre de usuario es requerido.")

export default usernameSchema