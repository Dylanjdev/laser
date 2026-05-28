-- Use these examples in the Supabase SQL Editor to manually block dates
-- for parties or groups booked by phone.

-- Monday-Thursday party: $150 for 3 hours, up to 10 players.
insert into bookings (
  reserved_date,
  service_type,
  status,
  amount_total
) values (
  '2026-06-01',
  'party',
  'paid',
  15000
);

-- Friday-Sunday party: $200 for 3 hours, up to 10 players.
insert into bookings (
  reserved_date,
  service_type,
  status,
  amount_total
) values (
  '2026-06-05',
  'party',
  'paid',
  20000
);

-- Group booking for 10+ players.
insert into bookings (
  reserved_date,
  service_type,
  status
) values (
  '2026-06-09',
  'group',
  'paid'
);
