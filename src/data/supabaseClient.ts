import { createClient } from '@supabase/supabase-js';

/* ──────────────────────────────────────────────────────────────────
 * supabaseClient
 * ───────────────
 * Cliente unico do Supabase usado pelo app inteiro. Le as
 * credenciais de .env.local (variaveis VITE_SUPABASE_URL e
 * VITE_SUPABASE_ANON_KEY). A chave "anon public" e segura para
 * frontend porque toda autorizacao real e feita por Row-Level
 * Security no banco.
 * ────────────────────────────────────────────────────────────────── */

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!url || !anonKey) {
  /* Falha cedo e com mensagem clara, em vez de NPE em runtime depois. */
  throw new Error(
    'Variaveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY nao definidas. ' +
      'Copie .env.example para .env.local e preencha com as credenciais do ' +
      'seu projeto Supabase (Settings -> API).',
  );
}

export const supabase = createClient(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});
