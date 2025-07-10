'use client';

import { useState } from 'react';

export default function AddInstrument() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1) Llama al endpoint POST
    const res = await fetch('/instruments/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    const json = await res.json();
    setLoading(false);

    if (res.ok) {
      // 2) Opcional: notificar, limpiar el input y recargar la lista
      alert(`Instrumento "${json.instrument.name}" creado 🎉`);
      setName('');
      // Aquí podrías usar SWR, React Query o un useEffect para recargar la lista
    } else {
      alert(`Error: ${json.error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Nuevo instrumento"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border px-2"
      />
      <button type="submit" disabled={loading} className="btn">
        {loading ? 'Creando…' : 'Agregar'}
      </button>
    </form>
  );
}
