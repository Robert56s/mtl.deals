# This project is no longer supported by me, domain has expired

# mtl.deals

https://mtl.deals 

# Commands
### Download packages
```
npm install
```
### Run locally in developement
```
npm run dev
```
### Build for production
```
npm run build
```

# Enviroment variables
- `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`, `SECRET_SUPABASE_SERVICE_KEY` are the [Supabase](https://supabase.com/) api credentials 
- `SECRET_LTC_WALLET_ID`, `SECRET_LTC_TRANSFER_KEY` are the [Apirone](https://apirone.com/) credentials.
- `SECRET_CALLBACK_KEY` is a random string that you must create, it is used to protect callbacks api routes.
- `SECRET_IMGUR_CLIENT_ID` is your [Imgur](https://api.imgur.com/oauth2/addclient) Client ID.

# Apirone
You must got to the [Dashboard](https://apirone.com/dashboard/) and create a Litecoin wallet. Save the credentials.

# Supabase
You must create an acount and a project at [Supabase](https://supabase.com/). You need to enable email authentification and do the url configuration. Also, make sure to enable row level security for the tables. 

# Imgur
You need to register to the [Imgur api](https://api.imgur.com/oauth2/addclient). You need to select Authorization type: Anonymous usage without user authorization. You can then save the credentials.

# Database Tables (SQL)
```sql
create table offers (
  id bigint not null primary key,
  created_at timestamp default now(),
  user_id uuid default uuid_generate_v4(),
  price integer not null,
  img_link text not null,
  title text not null,
  description text not null
);
```

```sql
create table wallets_activity (
  id bigint not null primary key,
  created timestamp default now(),
  user_id text,
  ltc_amount text,
  type text,
  tx text,
  destination text
);
```

```sql
-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  avatar_link text,
  ltc_addy text,
  ltc_amount bigint,

  constraint username_length check (char_length(username) >= 3)
);
-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles
  enable row level security;

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.raw_user_meta_data->>'username');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```
