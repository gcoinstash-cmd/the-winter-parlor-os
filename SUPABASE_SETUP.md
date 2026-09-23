# ⚡ Supabase 3-Minute Setup: THE WINTER PARLOR OS

Turnkey backend wiring for fireside chef tasting sittings, tableside ordering nodes, and biodynamic cellar management.

---

### Step 1: Create a Free Supabase Project
1. Log in to [Supabase](https://supabase.com).
2. Click **New Project** and name it `the-winter-parlor-os`.
3. Select your preferred database region and set a strong database password.

---

### Step 2: Run the SQL Migrations
1. In the Supabase left sidebar, click the **SQL Editor** icon (`>_`).
2. Click **New Query**.
3. Copy the entire contents of `supabase/schema.sql` and paste it into the editor.
4. Click **Run** (or `Cmd + Enter`).
5. Open a new query tab, copy the contents of `supabase/seed.sql`, paste it, and click **Run**.
6. Verify your tables in the **Table Editor**:
   - `parlor_reservations` (Sittings, guest counts, dietary alerts, sommelier pairing flags, deposits)
   - `fireside_table_allocations` (Fireside hearth, salon chalet booths, private library salon)
   - `cellar_inventory` (Domaine Dujac, Hermitage Rouge, biodynamic wine bottles and per-glass valuations)

---

### Step 3: Connect Environment Variables
1. In Supabase, go to **Project Settings** > **API**.
2. Copy your `Project URL` and `anon public` key.
3. In your local project root or production deployment environment:
   ```env
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
4. Build and deploy:
   ```bash
   npm run build
   ```

---

### Admin Cheat Code (Maitre D' Console Door)
- Admin Route: `/admin` (or click `[ PARLOR PASS ]` in hero CTA row)
- Demo Keycode: `parlor2026`
