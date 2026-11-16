-- Row Level Security: signed-in users can read; only admins can write.

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles
                 where user_id = auth.uid() and role = 'admin');
$$;
revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

alter table public.user_roles    enable row level security;
alter table public.categories    enable row level security;
alter table public.tags          enable row level security;
alter table public.materials     enable row level security;
alter table public.material_tags enable row level security;

-- user_roles: everyone reads only their own row; no client writes
-- (roles are changed from the SQL editor / 04_make_admin.sql).
drop policy if exists "read own role" on public.user_roles;
create policy "read own role" on public.user_roles
  for select to authenticated using (user_id = auth.uid());

do $$
declare t text;
begin
  foreach t in array array['categories','tags','materials','material_tags'] loop
    execute format('drop policy if exists "read %1$s" on public.%1$s', t);
    execute format('create policy "read %1$s" on public.%1$s for select to authenticated using (true)', t);
    execute format('drop policy if exists "admin insert %1$s" on public.%1$s', t);
    execute format('create policy "admin insert %1$s" on public.%1$s for insert to authenticated with check (public.is_admin())', t);
    execute format('drop policy if exists "admin update %1$s" on public.%1$s', t);
    execute format('create policy "admin update %1$s" on public.%1$s for update to authenticated using (public.is_admin()) with check (public.is_admin())', t);
    execute format('drop policy if exists "admin delete %1$s" on public.%1$s', t);
    execute format('create policy "admin delete %1$s" on public.%1$s for delete to authenticated using (public.is_admin())', t);
  end loop;
end $$;
