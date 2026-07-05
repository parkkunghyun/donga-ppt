create table if not exists public.site_content (
  id text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

drop policy if exists "public read site content" on public.site_content;
create policy "public read site content"
  on public.site_content
  for select
  to anon, authenticated
  using (true);

-- 이미지 버킷(project-images)은 앱이 첫 업로드 시 자동 생성합니다.
