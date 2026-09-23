-- ==============================================================================
-- THE WINTER PARLOR — SUPABASE DATABASE SCHEMA (v1.0.0)
-- Fireside Tasting Sittings, Biodynamic Cellar Allocations & Salon Ledger OS
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Salon Reservations Table
CREATE TABLE IF NOT EXISTS public.parlor_reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reservation_code VARCHAR(32) NOT NULL UNIQUE, -- e.g. 'PARLOR-8812'
    guest_name VARCHAR(255) NOT NULL,
    guest_email VARCHAR(255) NOT NULL,
    guest_phone VARCHAR(64) NOT NULL,
    guest_count INTEGER NOT NULL DEFAULT 2 CHECK (guest_count >= 1 AND guest_count <= 8),
    sitting_slot VARCHAR(64) NOT NULL, -- '17:30 Early Hearth', '20:15 Night Tasting'
    table_allocation VARCHAR(64) NOT NULL DEFAULT 'Table 01 — Fireside Hearth',
    sommelier_pairing BOOLEAN NOT NULL DEFAULT false,
    dietary_notes TEXT,
    flight_courses_count INTEGER NOT NULL DEFAULT 5,
    deposit_amount NUMERIC(10, 2) NOT NULL DEFAULT 150.00,
    total_estimated NUMERIC(10, 2) NOT NULL DEFAULT 350.00,
    sitting_date DATE NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'Confirmed', -- 'Confirmed', 'Seated', 'Course 3 - Hearth', 'Digestif'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Fireside Table Allocations
CREATE TABLE IF NOT EXISTS public.fireside_table_allocations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_number VARCHAR(32) NOT NULL UNIQUE, -- 'Table 01', 'Table 04', 'Salon Library'
    zone_name VARCHAR(64) NOT NULL, -- 'Zone A // Fireside Hearth', 'Zone B // Salon Chalet', 'Zone C // Private Library'
    max_capacity INTEGER NOT NULL DEFAULT 4,
    has_qr_ordering BOOLEAN NOT NULL DEFAULT true,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Biodynamic Cellar Inventory Table
CREATE TABLE IF NOT EXISTS public.cellar_inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vintage_name VARCHAR(255) NOT NULL,
    appellation VARCHAR(255) NOT NULL,
    vintage_year INTEGER NOT NULL,
    pairing_course VARCHAR(128) NOT NULL,
    bottles_in_cellar INTEGER NOT NULL DEFAULT 12,
    per_glass_value NUMERIC(10, 2) NOT NULL DEFAULT 45.00,
    bottle_price NUMERIC(10, 2) NOT NULL DEFAULT 220.00,
    allocation_status VARCHAR(32) NOT NULL DEFAULT 'Available', -- 'Available', 'Low Stock', 'Cellar Reserved'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.parlor_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fireside_table_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cellar_inventory ENABLE ROW LEVEL SECURITY;

-- 6. Public Read & Booking Policies
CREATE POLICY "Allow public read access to cellar inventory" 
    ON public.cellar_inventory FOR SELECT USING (true);

CREATE POLICY "Allow public read access to table allocations" 
    ON public.fireside_table_allocations FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert to parlor reservations" 
    ON public.parlor_reservations FOR INSERT WITH CHECK (true);
