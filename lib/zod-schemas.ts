// lib/zod-schemas.ts

import { z } from 'zod';

export const ContactSchema = z.object({
  name: z.string().min(2, 'Nombre demasiado corto'),
  email: z.string().email('Correo no válido'),
  message: z.string().min(10, 'Mensaje demasiado corto'),
});

export type ContactInput = z.infer<typeof ContactSchema>;
