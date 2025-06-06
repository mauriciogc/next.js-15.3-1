// app/other-contact/actions.ts
'use server';

import { ContactSchema } from '@/../lib/zod-schemas';
import type { ContactState } from './types';
//import { prisma } from '@/lib/prisma';

export async function submitContact(
  prevState: any,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    name: formData.get('name')?.toString() || '',
    email: formData.get('email')?.toString() || '',
    message: formData.get('message')?.toString() || '',
  };

  const result = ContactSchema.safeParse(raw);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      fields: raw,
    };
  }

  const { name, email, message } = result.data;
  console.log('Nuevo mensaje de contacto:', { name, email, message });

  // Podrías agregar aquí lógica para enviar correo o guardar en DB
  /*
  await prisma.contactMessage.create({
    data: { name, email, message },
  });
  */

  return {
    success: true,
    errors: {},
    fields: {
      name: '',
      email: '',
      message: '',
    },
  };
}
