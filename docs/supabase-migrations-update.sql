-- Add email verification status to profiles
alter table public.profiles
add column email_verified boolean default false;

-- Add last sign in timestamp
alter table public.profiles
add column last_sign_in_at timestamp with time zone;

-- Add user preferences
create table public.user_preferences (
  user_id uuid references public.profiles(id) on delete cascade primary key,
  theme text default 'system',
  email_notifications boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS on user_preferences
alter table public.user_preferences enable row level security;

-- User preferences policies
create policy "Users can view their own preferences"
  on public.user_preferences for select
  using (auth.uid() = user_id);

create policy "Users can update their own preferences"
  on public.user_preferences for update
  using (auth.uid() = user_id);

create policy "Users can insert their own preferences"
  on public.user_preferences for insert
  with check (auth.uid() = user_id);

-- Create function to handle user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  -- Create profile
  insert into public.profiles (id, email_verified, last_sign_in_at)
  values (new.id, new.email_confirmed_at is not null, new.last_sign_in_at);

  -- Create user preferences
  insert into public.user_preferences (user_id)
  values (new.id);

  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create function to handle user updates
create or replace function public.handle_user_update()
returns trigger as $$
begin
  -- Update profile
  update public.profiles
  set
    email_verified = new.email_confirmed_at is not null,
    last_sign_in_at = new.last_sign_in_at
  where id = new.id;

  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for user updates
create trigger on_auth_user_updated
  after update on auth.users
  for each row execute procedure public.handle_user_update();

-- Add indexes for common queries
create index profiles_email_verified_idx on public.profiles(email_verified);
create index profiles_last_sign_in_at_idx on public.profiles(last_sign_in_at);

-- Add function to check if user is verified
create or replace function public.is_verified(user_id uuid)
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = user_id and email_verified = true
  );
end;
$$ language plpgsql security definer; 