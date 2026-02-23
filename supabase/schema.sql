create extension if not exists "pgcrypto";

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  label text not null
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  external_id text unique not null,
  slug text unique not null,
  name_en text not null,
  name_hi text,
  description text not null,
  category_id uuid not null references categories(id) on delete restrict,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists pack_sizes (
  id uuid primary key default gen_random_uuid(),
  label text unique not null,
  grams integer generated always as (regexp_replace(label, '[^0-9]', '', 'g')::integer) stored
);

create table if not exists product_prices (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  pack_size_id uuid not null references pack_sizes(id) on delete restrict,
  net_price_inr integer not null check (net_price_inr > 0),
  currency text not null default 'INR',
  effective_from date not null default current_date,
  created_at timestamptz not null default now(),
  unique (product_id, pack_size_id, effective_from)
);

create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  image_url text not null,
  alt_text text not null,
  source text not null check (source in ('ai', 'manual')),
  prompt_version text,
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

create unique index if not exists ux_product_primary_image
  on product_images (product_id)
  where is_primary = true;

create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  city text not null,
  notes text,
  items_json jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_products_category_active
  on products (category_id, is_active);

create index if not exists idx_product_prices_product_effective
  on product_prices (product_id, effective_from desc);

create index if not exists idx_enquiries_created_at
  on enquiries (created_at desc);

alter table categories enable row level security;
alter table products enable row level security;
alter table pack_sizes enable row level security;
alter table product_prices enable row level security;
alter table product_images enable row level security;
alter table enquiries enable row level security;

drop policy if exists "public_read_categories" on categories;
create policy "public_read_categories" on categories
  for select using (true);

drop policy if exists "public_read_products" on products;
create policy "public_read_products" on products
  for select using (is_active = true);

drop policy if exists "public_read_pack_sizes" on pack_sizes;
create policy "public_read_pack_sizes" on pack_sizes
  for select using (true);

drop policy if exists "public_read_product_prices" on product_prices;
create policy "public_read_product_prices" on product_prices
  for select using (true);

drop policy if exists "public_read_product_images" on product_images;
create policy "public_read_product_images" on product_images
  for select using (true);
