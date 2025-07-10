import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  // 1. Lee el JSON del body
  const { name } = await request.json();

  // 2. Inicializa Supabase (usa tu cliente SSR)
  const supabase = await createClient();

  // 3. Obtén el usuario actual
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // 4. Inserta el instrumento con user_id y fuerza retorno de la fila
  const { data, error } = await supabase
    .from('instruments')
    .insert({ name, user_id: user.id })
    .select(); // <— sin esto `data` sería undefined

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }

  // 5. Devuelve el objeto creado
  return NextResponse.json(
    { instrument: data![0] },
    { status: 201 }
  );
}
