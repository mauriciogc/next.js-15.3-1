'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, MoveRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      document.cookie = `auth-token=fake-token; path=/; max-age=${
        60 * 60 * 24
      }`;
      router.push('/dashboard');
    } else {
      setErrorMessage('Por favor completa ambos campos.');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-stone-300">
      <div className="bg-white rounded-xl shadow-md flex overflow-hidden w-[900px] h-[460px]">
        <div className="w-1/2 bg-stone-200 p-6 flex flex-col justify-between"></div>

        <div className="w-1/2 px-12 py-10">
          <div className="flex flex-col justify-center min-h-full ">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Iniciar sesión
            </h1>
            <p className="text-gray-500 mb-6 text-sm">
              Inicia sesión con tu correo
            </p>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="flex justify-center border border-gray-200 rounded-md p-2 gap-2">
                <Mail className="text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessage('');
                  }}
                  className="w-full border-0 text-sm text-gray-800 focus:outline-none"
                />
              </div>

              <div className="flex justify-center border border-gray-200 rounded-md p-2 gap-2">
                <Lock className="text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage('');
                  }}
                  className="w-full border-0 text-sm text-gray-800 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center mt-2 gap-2 bg-blue-600 text-white rounded-md py-2 text-sm font-medium hover:bg-blue-700 transition cursor-pointer"
              >
                Entrar <MoveRight className="w-5 h-5" />
              </button>

              {errorMessage && (
                <p className="bg-red-200 text-red-500 text-sm text-center p-2">
                  {errorMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
