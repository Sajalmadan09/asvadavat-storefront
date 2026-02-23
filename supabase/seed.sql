insert into categories (key, label)
values
  ('tea', 'Tea'),
  ('spices', 'Spices')
on conflict (key) do update set label = excluded.label;

insert into pack_sizes (label)
values
  ('10g'),
  ('30g'),
  ('50g'),
  ('100g'),
  ('200g'),
  ('250g'),
  ('500g')
on conflict (label) do nothing;

insert into products (external_id, slug, name_en, name_hi, description, category_id)
values
  ('tea-ctc-black-tea', 'black-tea-ctc', 'Black Tea (CTC)', null, 'Strong daily-use CTC black tea blend.', (select id from categories where key = 'tea')),
  ('tea-ctc-black-tea-premium', 'black-tea-premium-ctc', 'Black Tea Premium (CTC)', null, 'Premium CTC blend with bolder aroma and liquor.', (select id from categories where key = 'tea')),
  ('tea-orthodox-green-leaves', 'organic-green-tea-orthodox-leaves', 'Organic Green Tea - Orthodox Leaves', null, 'Best consumed without milk, with honey or sugar.', (select id from categories where key = 'tea')),
  ('tea-orthodox-black-leaves', 'black-tea-orthodox-leaves', 'Black Tea - Orthodox Leaves', null, 'Best consumed without milk, with honey or sugar.', (select id from categories where key = 'tea')),
  ('spice-dry-mango-powder', 'dry-mango-powder-amchur', 'Dry Mango Powder', 'अमचूर', 'Tangy amchur powder for chaat and curries.', (select id from categories where key = 'spices')),
  ('spice-black-pepper-powder', 'black-pepper-powder', 'Black Pepper Powder', 'काली मिर्च पीसा', 'Finely ground black pepper for seasoning.', (select id from categories where key = 'spices')),
  ('spice-black-pepper-whole', 'black-pepper-whole', 'Black Pepper Whole', 'साबुत काली मिर्च', 'Whole black peppercorns for fresh grinding.', (select id from categories where key = 'spices')),
  ('spice-chana-masala', 'chana-masala', 'Chana Masala', 'चना मसाला', 'Balanced blend for chickpea preparations.', (select id from categories where key = 'spices')),
  ('spice-coriander-powder', 'coriander-powder', 'Coriander Powder', 'धनिया', 'Fresh coriander powder for everyday cooking.', (select id from categories where key = 'spices')),
  ('spice-garam-masala', 'mixed-spices-powder-garam-masala', 'Mixed Spices Powder (Garam Masala)', 'गरम मसाला', 'Aromatic mixed spice blend for curries and gravies.', (select id from categories where key = 'spices')),
  ('spice-turmeric-powder', 'turmeric-powder', 'Turmeric Powder', 'हल्दी', 'Fine turmeric powder with deep golden color.', (select id from categories where key = 'spices')),
  ('spice-cumin-powder', 'cumin-powder', 'Cumin Powder', 'पीसा जीरा', 'Ground cumin with earthy aroma.', (select id from categories where key = 'spices')),
  ('spice-cumin-whole', 'cumin-whole', 'Cumin Whole', 'जीरा साबुत', 'Whole cumin seeds for tempering and blends.', (select id from categories where key = 'spices')),
  ('spice-red-chilli-powder', 'red-chilli-powder', 'Red Chilli Powder', 'लाल मिर्च', 'Classic red chilli powder for color and heat.', (select id from categories where key = 'spices')),
  ('spice-deghi-mirch-powder', 'deghi-mirch-powder', 'Deghi Mirch Powder', 'देगी लाल मिर्च', 'Deghi mirch blend for rich color and mild heat.', (select id from categories where key = 'spices')),
  ('spice-kutti-red-chilli', 'kutti-red-chilli-powder', 'Red Chilli Powder (Kutti)', 'कुट्टी लाल मिर्च', 'Crushed red chilli for texture and medium-high heat.', (select id from categories where key = 'spices')),
  ('spice-ginger-powder', 'ginger-powder', 'Ginger Powder', 'सौंठ', 'Dry ginger powder for seasoning and tea blends.', (select id from categories where key = 'spices')),
  ('spice-carom-seeds', 'carom-seeds-ajwain', 'Carom Seeds', 'अजवाइन', 'Ajwain seeds with a sharp thyme-like aroma.', (select id from categories where key = 'spices')),
  ('spice-asafoetida', 'asafoetida-hing', 'Asafoetida', 'हींग', 'Strong aromatic hing for tempering.', (select id from categories where key = 'spices')),
  ('spice-chai-masala', 'chai-masala', 'Chai Masala', 'चाय मसाला', 'Aromatic masala blend for tea.', (select id from categories where key = 'spices')),
  ('spice-clove', 'clove-laung', 'Clove', 'लौंग', 'Whole cloves with intense warm aroma.', (select id from categories where key = 'spices')),
  ('spice-cardamom', 'cardamom-elaichi', 'Cardamom', 'इलायची', 'Green cardamom pods with sweet aroma.', (select id from categories where key = 'spices')),
  ('spice-cinnamon', 'cinnamon-dalchini', 'Cinnamon', 'दालचीनी', 'Cinnamon pieces for warm sweet-spice notes.', (select id from categories where key = 'spices')),
  ('spice-kasuri-methi', 'fenugreek-seeds-kasuri-methi', 'Fenugreek Seeds (Kasuri Methi)', 'कसूरी मेथी', 'Kasuri methi style product listing from source sheet.', (select id from categories where key = 'spices')),
  ('spice-black-cardamom', 'black-cardamom-moti-elaichi', 'Black Cardamom', 'मोटी इलायची', 'Smoky black cardamom for robust flavors.', (select id from categories where key = 'spices')),
  ('spice-fennel', 'fennel-saunf', 'Fennel', 'सौंफ', 'Sweet fennel seeds for cooking and mouth freshener.', (select id from categories where key = 'spices')),
  ('spice-fenugreek-seeds', 'fenugreek-seeds-methi-dana', 'Fenugreek Seeds', 'मेथी दाना', 'Whole methi dana for tempering and pickles.', (select id from categories where key = 'spices'))
on conflict (external_id) do update
set
  slug = excluded.slug,
  name_en = excluded.name_en,
  name_hi = excluded.name_hi,
  description = excluded.description,
  category_id = excluded.category_id;

with pricing_data(external_id, pack_label, net_price_inr) as (
  values
    ('tea-ctc-black-tea', '250g', 206),
    ('tea-ctc-black-tea', '500g', 402),
    ('tea-ctc-black-tea-premium', '250g', 250),
    ('tea-ctc-black-tea-premium', '500g', 490),
    ('tea-orthodox-green-leaves', '100g', 336),
    ('tea-orthodox-green-leaves', '200g', 664),
    ('tea-orthodox-black-leaves', '100g', 336),
    ('tea-orthodox-black-leaves', '200g', 664),
    ('spice-dry-mango-powder', '100g', 62),
    ('spice-black-pepper-powder', '100g', 130),
    ('spice-black-pepper-whole', '100g', 100),
    ('spice-chana-masala', '100g', 82),
    ('spice-coriander-powder', '100g', 42),
    ('spice-garam-masala', '100g', 150),
    ('spice-turmeric-powder', '100g', 42),
    ('spice-cumin-powder', '100g', 95),
    ('spice-cumin-whole', '100g', 75),
    ('spice-red-chilli-powder', '100g', 55),
    ('spice-deghi-mirch-powder', '100g', 80),
    ('spice-kutti-red-chilli', '100g', 60),
    ('spice-ginger-powder', '100g', 64),
    ('spice-carom-seeds', '100g', 58),
    ('spice-asafoetida', '10g', 360),
    ('spice-chai-masala', '50g', 78),
    ('spice-clove', '30g', 65),
    ('spice-cardamom', '50g', 200),
    ('spice-cinnamon', '50g', 45),
    ('spice-kasuri-methi', '50g', 30),
    ('spice-black-cardamom', '50g', 198),
    ('spice-fennel', '100g', 56),
    ('spice-fenugreek-seeds', '100g', 32)
)
insert into product_prices (product_id, pack_size_id, net_price_inr, currency, effective_from)
select
  p.id,
  ps.id,
  d.net_price_inr,
  'INR',
  date '2025-06-05'
from pricing_data d
join products p on p.external_id = d.external_id
join pack_sizes ps on ps.label = d.pack_label
on conflict (product_id, pack_size_id, effective_from) do update
set
  net_price_inr = excluded.net_price_inr,
  currency = excluded.currency;
