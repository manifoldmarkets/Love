drop table public.private_users cascade;

create table if not exists
  public.private_users (data jsonb not null, id text primary key not null);

-- Row Level Security
alter table private_users enable row level security;

-- Policies
drop policy if exists "private read" on private_users;

create policy "private read" on private_users for
select
  using ((firebase_uid () = id));
