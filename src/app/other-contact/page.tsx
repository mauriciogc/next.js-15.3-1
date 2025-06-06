// app/other-contact/page.tsx
'use client';

import { useActionState } from 'react';

import { submitContact } from './actions';
import type { ContactState } from './types';

const initialState: ContactState = {
  success: false,
  errors: {},
  fields: {
    name: '',
    email: '',
    message: '',
  },
};

export default function ContactPage() {
  const [state, formAction] = useActionState(submitContact, initialState);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Contáctanos</h1>

      {state.success && (
        <div className="p-3 bg-green-100 text-green-800 rounded mb-4">
          Mensaje enviado correctamente
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nombre</label>
          <input
            name="name"
            className="w-full border px-3 py-2 rounded"
            defaultValue={state.fields.name}
          />
          {state.errors?.name && (
            <p className="text-red-600 text-sm mt-1">{state.errors.name}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Correo</label>
          <input
            name="email"
            type="email"
            className="w-full border px-3 py-2 rounded"
            defaultValue={state.fields.email}
          />
          {state.errors?.email && (
            <p className="text-red-600 text-sm mt-1">{state.errors.email}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Mensaje</label>
          <textarea
            name="message"
            rows={4}
            className="w-full border px-3 py-2 rounded"
            defaultValue={state.fields.message}
          />
          {state.errors?.message && (
            <p className="text-red-600 text-sm mt-1">{state.errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
