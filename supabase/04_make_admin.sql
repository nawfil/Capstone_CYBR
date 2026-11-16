-- Make an existing user an administrator.
-- 1. Create the user first: Supabase > Authentication > Users > Add user (tick "Auto Confirm User").
-- 2. Replace the email below with theirs, then run this file in the SQL Editor.
-- It should say "UPDATE 1". "UPDATE 0" means no user with that email exists yet.
update public.user_roles set role = 'admin'
where user_id = (select id from auth.users where email = 'someone@example.com');
