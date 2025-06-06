'use server';

export async function handleContact(formData: FormData) {
  const name = formData.get('name')?.toString();
  const email = formData.get('email')?.toString();
  const message = formData.get('message')?.toString();

  if (!name || !email || !message) {
    throw new Error('Todos los campos son obligatorios');
  }

  // Simulación de un guardado o llamado a base de datos
  console.log('Nuevo mensaje de contacto:', { name, email, message });

  // Podrías agregar aquí lógica para enviar correo o guardar en DB
}
