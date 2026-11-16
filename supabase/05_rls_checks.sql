-- Security checks for the database. Safe to run at any time: it makes two throwaway
-- users, tries things as an administrator, a trainer and a signed-out visitor, then
-- undoes everything (nothing is kept). If every check passes you will see the notice
-- "ALL RLS CHECKS PASSED". If one fails, it stops with a message saying which.

do $$
declare
  admin_id uuid := '00000000-0000-0000-0000-0000000000a1';
  trainer_id uuid := '00000000-0000-0000-0000-0000000000b2';
  n int; mid uuid; tid uuid;
  mats_before int; tags_before int;
begin
  select count(*) into mats_before from public.materials;
  select count(*) into tags_before from public.tags;

  begin  -- everything in here is undone at the end
    insert into auth.users(id, instance_id, aud, role, email) values
      (admin_id,   '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'rls-admin@example.invalid'),
      (trainer_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'rls-trainer@example.invalid');
    update public.user_roles set role = 'admin' where user_id = admin_id;

    select count(*) into n from public.user_roles where user_id = trainer_id and role = 'trainer';
    if n <> 1 then raise exception 'FAIL: new users should get the trainer role automatically'; end if;

    -- ===== signed-out visitor =====
    set local role anon;
    begin select count(*) into n from public.materials; exception when insufficient_privilege then n := 0; end;
    if n <> 0 then raise exception 'FAIL: a signed-out visitor can read materials'; end if;
    reset role;

    -- ===== trainer =====
    perform set_config('request.jwt.claim.sub', trainer_id::text, true);
    set local role authenticated;
    select count(*) into n from public.materials;
    if n <> mats_before then raise exception 'FAIL: trainer cannot read materials'; end if;
    select count(*) into n from public.categories;
    if n = 0 then raise exception 'FAIL: trainer cannot read categories'; end if;
    select count(*) into n from public.user_roles;
    if n <> 1 then raise exception 'FAIL: trainer should see only their own role row (saw %)', n; end if;

    begin insert into public.materials(title) values ('trainer insert'); raise exception 'FAIL: trainer could add a material';
    exception when insufficient_privilege then null; end;
    begin insert into public.categories(id,name) values ('x','x'); raise exception 'FAIL: trainer could add a category';
    exception when insufficient_privilege then null; end;
    begin insert into public.tags(category_id,name) select id,'x' from public.categories limit 1; raise exception 'FAIL: trainer could add a tag';
    exception when insufficient_privilege then null; end;
    update public.materials set title = 'hacked'; get diagnostics n = row_count;
    if n <> 0 then raise exception 'FAIL: trainer could edit % materials', n; end if;
    update public.tags set name = 'hacked'; get diagnostics n = row_count;
    if n <> 0 then raise exception 'FAIL: trainer could rename tags'; end if;
    delete from public.materials; get diagnostics n = row_count;
    if n <> 0 then raise exception 'FAIL: trainer could delete materials'; end if;
    delete from public.categories; get diagnostics n = row_count;
    if n <> 0 then raise exception 'FAIL: trainer could delete categories'; end if;
    update public.user_roles set role = 'admin'; get diagnostics n = row_count;
    if n <> 0 then raise exception 'FAIL: trainer could change roles'; end if;
    reset role;

    -- ===== administrator =====
    perform set_config('request.jwt.claim.sub', admin_id::text, true);
    set local role authenticated;
    insert into public.materials(title) values ('admin insert') returning id into mid;
    select id into tid from public.tags limit 1;
    insert into public.material_tags(material_id, tag_id) values (mid, tid);
    update public.materials set title = 'admin edit' where id = mid; get diagnostics n = row_count;
    if n <> 1 then raise exception 'FAIL: admin could not edit a material'; end if;
    delete from public.materials where id = mid; get diagnostics n = row_count;
    if n <> 1 then raise exception 'FAIL: admin could not delete a material'; end if;
    select count(*) into n from public.material_tags where material_id = mid;
    if n <> 0 then raise exception 'FAIL: deleting a material left tag links behind'; end if;
    insert into public.categories(id,name,multi,sort_order) values ('rls-check','Check',true,999);
    insert into public.tags(category_id,name) values ('rls-check','one');
    delete from public.categories where id = 'rls-check'; get diagnostics n = row_count;
    select count(*) into n from public.tags where category_id = 'rls-check';
    if n <> 0 then raise exception 'FAIL: deleting a category left its tags behind'; end if;
    update public.user_roles set role = 'admin' where user_id = trainer_id; get diagnostics n = row_count;
    if n <> 0 then raise exception 'FAIL: roles should only be changeable from the SQL editor, not by the app'; end if;
    reset role;

    raise exception using errcode = 'PT001', message = 'checks finished';  -- forces the undo
  exception when sqlstate 'PT001' then null;
  end;

  select count(*) into n from public.materials;
  if n <> mats_before then raise exception 'FAIL: checks left data behind (materials)'; end if;
  select count(*) into n from public.tags;
  if n <> tags_before then raise exception 'FAIL: checks left data behind (tags)'; end if;
  select count(*) into n from auth.users where email like 'rls-%@example.invalid';
  if n <> 0 then raise exception 'FAIL: checks left test users behind'; end if;
  raise notice 'ALL RLS CHECKS PASSED';
end $$;
