// src/components/DummyComponent

export default async function DummyComponent() {
  // Simula una carga de 3s
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <div className="w-full bg-orange-100 text-orange-800 p-4 rounded shadow">
      <h2 className="text-xl font-bold">Component</h2>
      <p>Dummy component...</p>
    </div>
  );
}
