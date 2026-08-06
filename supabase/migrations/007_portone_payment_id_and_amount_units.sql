alter table if exists public.orders
  add column if not exists portone_payment_id text;

-- Existing pending checkout orders use the order UUID as the PortOne paymentId.
update public.orders
set portone_payment_id = id::text
where status = 'pending'
  and portone_payment_id is null;

create unique index if not exists orders_portone_payment_id_uidx
  on public.orders (portone_payment_id)
  where portone_payment_id is not null;

comment on column public.orders.amount is
  'Legacy total amount alias. Stored in currency minor units (KRW won, USD cents).';
comment on column public.orders.amount_minor is
  'Authoritative order total in currency minor units (KRW won, USD cents).';
comment on column public.orders.portone_payment_id is
  'Exact merchant-generated PortOne paymentId bound before checkout.';
