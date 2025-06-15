-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade,
  username text unique,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (id)
);

-- Create categories table
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text unique not null,
  slug text unique not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create articles table
create table public.articles (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  content text not null,
  author_id uuid references public.profiles(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  published_at timestamp with time zone default timezone('utc'::text, now()),
  status text default 'draft',
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.articles enable row level security;

-- Create policies
-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Categories policies
create policy "Categories are viewable by everyone"
  on public.categories for select
  using (true);

create policy "Only authenticated users can create categories"
  on public.categories for insert
  with check (auth.role() = 'authenticated');

create policy "Only authenticated users can update categories"
  on public.categories for update
  using (auth.role() = 'authenticated');

-- Articles policies
create policy "Published articles are viewable by everyone"
  on public.articles for select
  using (status = 'published');

create policy "Users can view their own articles"
  on public.articles for select
  using (auth.uid() = author_id);

create policy "Users can create their own articles"
  on public.articles for insert
  with check (auth.uid() = author_id);

create policy "Users can update their own articles"
  on public.articles for update
  using (auth.uid() = author_id);

-- Create function to handle updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger for articles updated_at
create trigger handle_articles_updated_at
  before update on public.articles
  for each row
  execute procedure public.handle_updated_at();

-- Create indexes for better performance
create index articles_author_id_idx on public.articles(author_id);
create index articles_category_id_idx on public.articles(category_id);
create index articles_status_idx on public.articles(status);
create index articles_published_at_idx on public.articles(published_at); 