-- Retire legacy editorial records that used unverified professional identities.
UPDATE blog_posts
SET is_published = false
WHERE slug IN (
  '10-thuc-pham-giup-ban-ngu-ngon-hon',
  'huong-dan-tinh-tdee-chinh-xac',
  'thuc-don-giam-can-7-ngay',
  '5-thoi-quen-buoi-toi',
  '5-thoi-quen-buoi-toi-cai-thien-giac-ngu',
  'protein-bao-nhieu-la-du',
  'yoga-truoc-khi-ngu',
  'yoga-truoc-khi-ngu-5-bai-tap'
);

UPDATE team_members SET is_active = false;
UPDATE testimonials SET is_active = false;
