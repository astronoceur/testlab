-- ============================================================================
-- Test Lab — Schema Supabase
-- ============================================================================
-- Execute este script UMA UNICA VEZ no SQL Editor do Supabase
-- (https://supabase.com -> seu projeto -> SQL Editor -> New query).
--
-- O que ele cria:
--   - Tabela public.user_progress (1 linha por usuario, progresso em JSONB)
--   - Row-Level Security para cada usuario so ver/editar seu proprio progresso
--   - Trigger para criar automaticamente uma linha em user_progress quando
--     um novo usuario se cadastra via Supabase Auth
--
-- Autenticacao usa o sistema nativo do Supabase (auth.users). O nome de
-- exibicao do aluno e guardado em user_metadata.name (passado no signup).
-- ============================================================================

-- 1. Tabela de progresso ----------------------------------------------------
create table if not exists public.user_progress (
  user_id          uuid primary key references auth.users(id) on delete cascade,
  current_unit_id  integer     not null default 1,
  last_page        text        not null default 'home',
  units            jsonb       not null default '{}'::jsonb,
  updated_at       timestamptz not null default now()
);

comment on table public.user_progress is
  'Progresso do aluno na plataforma Test Lab. Uma linha por usuario.';
comment on column public.user_progress.units is
  'Objeto { [unitId]: UnitProgress } com estado de cada unidade.';

-- 2. Row-Level Security -----------------------------------------------------
alter table public.user_progress enable row level security;

drop policy if exists "users read own progress"   on public.user_progress;
drop policy if exists "users insert own progress" on public.user_progress;
drop policy if exists "users update own progress" on public.user_progress;

create policy "users read own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "users insert own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "users update own progress"
  on public.user_progress for update
  using (auth.uid() = user_id);

-- 3. Trigger: cria linha em user_progress quando um novo usuario se cadastra
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_progress (user_id)
  values (new.id)
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
