-- Migration for existing installs (schema v1 -> v2, serverless-ready).
-- Run in the Supabase SQL editor AFTER schema.sql was previously run.

-- reply_to stores the quote object {id, message, username}, not just an id
alter table sg_messages alter column reply_to type jsonb
  using case when reply_to is null then null else to_jsonb(reply_to) end;

-- shared id sequence (users + messages), seeded above existing rows
create sequence if not exists sg_seq;
select setval('sg_seq', greatest(
  1000,
  coalesce((select max(id) from sg_users), 0) + 1,
  coalesce((select max(id) from sg_messages), 0) + 1
));
create or replace function sg_next_id() returns bigint
language sql security definer set search_path = public
as $$ select nextval('sg_seq') $$;

create table if not exists sg_presence (
  key text primary key,
  kind text not null,
  user_id bigint,
  at timestamptz default now()
);
create index if not exists sg_presence_kind_idx on sg_presence (kind, user_id, at);

create table if not exists sg_calls (
  id text primary key,
  user_id bigint references sg_users(id) on delete cascade,
  initiator text,
  status text,
  created_ms bigint,
  connected_ms bigint,
  meta jsonb
);

create table if not exists sg_kv (
  key text primary key,
  value text
);

create table if not exists sg_otps (
  mobile text primary key,
  code text,
  exp_ms bigint
);
create table if not exists sg_wa (
  state text primary key,
  mobile text,
  code text,
  approve_ms bigint,
  done boolean default false
);

alter table sg_presence enable row level security;
alter table sg_calls enable row level security;
alter table sg_kv enable row level security;
alter table sg_otps enable row level security;
alter table sg_wa enable row level security;

-- media bucket for uploads (public)
insert into storage.buckets (id, name, public)
values ('sg-media', 'sg-media', true)
on conflict (id) do nothing;
