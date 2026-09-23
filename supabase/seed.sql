-- ==============================================================================
-- THE WINTER PARLOR — SEED DATA (v1.0.0)
-- ==============================================================================

-- 1. Insert Fireside Table Allocations
INSERT INTO public.fireside_table_allocations (table_number, zone_name, max_capacity, has_qr_ordering, is_active) VALUES
('Table 01', 'Zone A // Fireside Hearth', 2, true, true),
('Table 02', 'Zone A // Fireside Hearth', 4, true, true),
('Table 03', 'Zone A // Fireside Hearth', 2, true, true),
('Table 04', 'Zone B // Salon Chalet', 4, true, true),
('Table 05', 'Zone B // Salon Chalet', 4, true, true),
('Table 06', 'Zone B // Salon Chalet', 2, true, true),
('Salon Library', 'Zone C // Private Library', 8, false, true);

-- 2. Insert Biodynamic Cellar Inventory
INSERT INTO public.cellar_inventory (vintage_name, appellation, vintage_year, pairing_course, bottles_in_cellar, per_glass_value, bottle_price, allocation_status) VALUES
('Domaine Dujac Clos de la Roche Grand Cru', 'Morey-Saint-Denis, Burgundy', 2018, 'Course II: Berkshire Pork Belly', 14, 85.00, 480.00, 'Available'),
('Jean-Louis Chave Hermitage Rouge', 'Rhône Valley, France', 2017, 'Course III: Wood-Fired Venison Loin', 8, 95.00, 520.00, 'Low Stock'),
('Chandon de Briailles Corton-Charlemagne Grand Cru', 'Aloxe-Corton, Burgundy', 2020, 'Course I: Hand-Rolled Cavatelli', 18, 70.00, 390.00, 'Available'),
('Quinta do Noval Nacional Vintage Port', 'Douro, Portugal', 2011, 'Course V: Roasted Chestnut Velvet', 4, 140.00, 890.00, 'Cellar Reserved'),
('Domaine Leflaive Puligny-Montrachet', 'Côte de Beaune, France', 2019, 'Course IV: Salt-Crusted Winter Roots', 12, 65.00, 340.00, 'Available');

-- 3. Insert Active Sitting Reservations
INSERT INTO public.parlor_reservations (reservation_code, guest_name, guest_email, guest_phone, guest_count, sitting_slot, table_allocation, sommelier_pairing, dietary_notes, flight_courses_count, deposit_amount, total_estimated, sitting_date, status) VALUES
('PARLOR-8812', 'Baroness Charlotte von Bern', 'charlotte.bern@alps-private.ch', '+41 79 555 1209', 2, '20:15 Night Tasting', 'Table 01', true, 'Strict Nut-Free, Prefers Pinot Noir', 5, 350.00, 700.00, CURRENT_DATE, 'Confirmed'),
('PARLOR-8813', 'Julian Sterling & Guests', 'j.sterling@mayfairpartners.co.uk', '+44 20 7946 0912', 4, '17:30 Early Hearth', 'Table 04', true, '1 Vegetarian, 3 Omnivore', 6, 680.00, 1360.00, CURRENT_DATE, 'Course 3 - Hearth'),
('PARLOR-8814', 'Helena Thorne', 'h.thorne@aspenarchitects.com', '+1 970 555 4912', 2, '20:15 Night Tasting', 'Table 06', false, 'Gluten-Free Only', 4, 280.00, 560.00, CURRENT_DATE, 'Confirmed'),
('PARLOR-8815', 'Dr. Alistair Finch', 'a.finch@oxford-fellows.org', '+44 1865 555021', 6, '17:30 Early Hearth', 'Salon Library', true, 'None (Wild Game Flight)', 6, 1200.00, 2400.00, CURRENT_DATE, 'Digestif');
