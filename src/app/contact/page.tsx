import { handleContact } from './actions';

export default function ContactPage() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Contacto</h1>
      <form action={handleContact} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nombre</label>
          <input
            name="name"
            type="text"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Correo</label>
          <input
            name="email"
            type="email"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Mensaje</label>
          <textarea
            name="message"
            rows={4}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
