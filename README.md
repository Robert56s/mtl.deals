# mtl.deals

https://mtl.deals 

## Download packages
```
npm install
```

## Enviroment variables
- `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`, `SECRET_SUPABASE_SERVICE_KEY` are the supabase api stuff https://supabase.com/
- `SECRET_LTC_WALLET_ID`, `SECRET_LTC_TRANSFER_KEY` are the https://apirone.com/ credential. You must create a Litecoin wallet in the apirone dashboard.
- `SECRET_CALLBACK_KEY` is a random string that you must create, it is used to protect callbacks api routes.

## Database sql schema 
```sql
create table offers (
  id bigint not null primary key,
  created_at timestamp default now(),
  user_id uuid default uuid_generate_v4(),
  price integer not null,
  img_base64 text not null,
  title text not null,
  description text not null
);

create table wallets_activity (
  id bigint not null primary key,
  created timestamp default now(),
  user_id text,
  ltc_amount text,
  type text,
  tx text,
  destination text
);

create table profiles (
  id uuid default uuid_generate_v4() primary key,
  updated_at timestamp default now(),
  username text,
  avatar_base64 text,
  ltc_addy text,
  ltc_amount bigint
);
```
