-- CYBR Training Library: tables. Safe to run on an empty project.
-- Run order: 01_schema.sql, 02_rls.sql, 03_seed.sql, 04_make_admin.sql

create table if not exists public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role    text not null default 'trainer' check (role in ('admin','trainer'))
);

create table if not exists public.categories (
  id         text primary key,
  name        text not null,
  multi       boolean not null default true,
  description text not null default '',   -- shown under "What does this mean?"
  sort_order  int not null default 0
);

create table if not exists public.tags (
  id          uuid primary key default gen_random_uuid(),
  category_id text not null references public.categories(id) on delete cascade on update cascade,
  name        text not null,
  hint        text not null default '',   -- one-line meaning of the tag
  sort_order  int not null default 0,
  unique (category_id, name)
);

create table if not exists public.materials (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null default '',
  link        text not null default '',    -- empty until the Google Drive link is added
  is_sample   boolean not null default false, -- made-up material kept for demonstration, shown with a "Sample" label
  created_by  uuid references auth.users(id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.material_tags (
  material_id uuid not null references public.materials(id) on delete cascade,
  tag_id      uuid not null references public.tags(id) on delete cascade,
  primary key (material_id, tag_id)
);
create index if not exists material_tags_tag_idx on public.material_tags(tag_id);
create index if not exists tags_category_idx on public.tags(category_id);

-- New sign-ups get the trainer role automatically.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.user_roles(user_id, role) values (new.id, 'trainer')
  on conflict (user_id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Keep updated_at current.
create or replace function public.touch_updated_at() returns trigger
language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

drop trigger if exists materials_touch on public.materials;
create trigger materials_touch before update on public.materials
  for each row execute function public.touch_updated_at();
