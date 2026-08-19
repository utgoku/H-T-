insert into public.site_settings (key, value)
values
  ('bankName', 'Vietcombank'),
  ('bankBin', '970436'),
  ('bankAccountNumber', '1042338923'),
  ('bankAccountName', 'DUONG THE HUNG'),
  ('bankBranch', '')
on conflict (key) do update
set value = excluded.value;
