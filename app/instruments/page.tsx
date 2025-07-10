import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  // 1) Obtener el usuario autenticado
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  // 2) Redirigir si no hay usuario
  if (error || !user) {
    redirect('/auth/login')    // usa redirect() de Next.js :contentReference[oaicite:4]{index=4}
  }

  // 3) Ahora `user` está garantizado, puedes usar `user.id`
  const { data: instruments } = await supabase
    .from('instruments')
    .select('name')
    .eq('user_id', user.id)

  return (
    <div>
      <pre>{JSON.stringify(instruments, null, 2)}</pre>
       <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}
