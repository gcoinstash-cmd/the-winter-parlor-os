import React, { useState } from 'react';
import { 
  Flame, 
  Wine, 
  Calendar, 
  Users, 
  DollarSign, 
  Clock, 
  ShieldCheck, 
  X, 
  Search, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  MapPin
} from 'lucide-react';

interface SittingReservation {
  id: string;
  resCode: string;
  guestName: string;
  guestEmail: string;
  guestCount: number;
  sittingSlot: '17:30 Early Hearth' | '20:15 Night Tasting';
  tableAllocation: string;
  sommelierPairing: boolean;
  dietaryRestrictions: string;
  flightCoursesCount: number;
  totalDeposit: number;
  status: 'Confirmed' | 'Seated' | 'Course 3 - Hearth' | 'Digestif';
}

const MOCK_RESERVATIONS: SittingReservation[] = [
  {
    id: 'res-1',
    resCode: 'PARLOR-8812',
    guestName: 'Baroness Charlotte von Bern',
    guestEmail: 'charlotte.bern@alps-private.ch',
    guestCount: 2,
    sittingSlot: '20:15 Night Tasting',
    tableAllocation: 'Table 01 — Fireside Hearth',
    sommelierPairing: true,
    dietaryRestrictions: 'Strict Nut-Free, Prefers Pinot Noir',
    flightCoursesCount: 5,
    totalDeposit: 350.00,
    status: 'Confirmed'
  },
  {
    id: 'res-2',
    resCode: 'PARLOR-8813',
    guestName: 'Julian Sterling & Guests',
    guestEmail: 'j.sterling@mayfairpartners.co.uk',
    guestCount: 4,
    sittingSlot: '17:30 Early Hearth',
    tableAllocation: 'Table 04 — Lunar Sitting',
    sommelierPairing: true,
    dietaryRestrictions: '1 Vegetarian, 3 Omnivore',
    flightCoursesCount: 6,
    totalDeposit: 680.00,
    status: 'Course 3 - Hearth'
  },
  {
    id: 'res-3',
    resCode: 'PARLOR-8814',
    guestName: 'Helena Thorne',
    guestEmail: 'h.thorne@aspenarchitects.com',
    guestCount: 2,
    sittingSlot: '20:15 Night Tasting',
    tableAllocation: 'Table 06 — South Alcove',
    sommelierPairing: false,
    dietaryRestrictions: 'Gluten-Free Only',
    flightCoursesCount: 4,
    totalDeposit: 280.00,
    status: 'Confirmed'
  },
  {
    id: 'res-4',
    resCode: 'PARLOR-8815',
    guestName: 'Dr. Alistair Finch',
    guestEmail: 'a.finch@oxford-fellows.org',
    guestCount: 6,
    sittingSlot: '17:30 Early Hearth',
    tableAllocation: 'Private Library Salon',
    sommelierPairing: true,
    dietaryRestrictions: 'None (Wild Game Flight)',
    flightCoursesCount: 6,
    totalDeposit: 1200.00,
    status: 'Digestif'
  }
];

interface CellarReserve {
  id: string;
  vintageName: string;
  appellation: string;
  year: number;
  pairingCourse: string;
  bottlesInCellar: number;
  perGlassValue: number;
  allocationStatus: 'Available' | 'Low Stock' | 'Cellar Reserved';
}

const CELLAR_RESERVES: CellarReserve[] = [
  {
    id: 'w-1',
    vintageName: 'Domaine Dujac Clos de la Roche Grand Cru',
    appellation: 'Morey-Saint-Denis, Burgundy',
    year: 2018,
    pairingCourse: 'Course II: Berkshire Pork Belly',
    bottlesInCellar: 14,
    perGlassValue: 85.00,
    allocationStatus: 'Available'
  },
  {
    id: 'w-2',
    vintageName: 'Jean-Louis Chave Hermitage Rouge',
    appellation: 'Rhône Valley, France',
    year: 2017,
    pairingCourse: 'Course III: Wood-Fired Venison Loin',
    bottlesInCellar: 8,
    perGlassValue: 95.00,
    allocationStatus: 'Low Stock'
  },
  {
    id: 'w-3',
    vintageName: 'Chandon de Briailles Corton-Charlemagne Grand Cru',
    appellation: 'Aloxe-Corton, Burgundy',
    year: 2020,
    pairingCourse: 'Course I: Hand-Rolled Cavatelli',
    bottlesInCellar: 18,
    perGlassValue: 70.00,
    allocationStatus: 'Available'
  },
  {
    id: 'w-4',
    vintageName: 'Quinta do Noval Nacional Vintage Port',
    appellation: 'Douro, Portugal',
    year: 2011,
    pairingCourse: 'Course V: Roasted Chestnut Velvet',
    bottlesInCellar: 4,
    perGlassValue: 140.00,
    allocationStatus: 'Cellar Reserved'
  }
];

export default function ParlorAdminDashboard({ onExit }: { onExit: () => void }) {
  const [activeTab, setActiveTab] = useState<'sittings' | 'cellar' | 'tables'>('sittings');
  const [searchTerm, setSearchTerm] = useState('');

  const totalCovers = MOCK_RESERVATIONS.reduce((sum, r) => sum + r.guestCount, 0);
  const totalDeposits = MOCK_RESERVATIONS.reduce((sum, r) => sum + r.totalDeposit, 0);

  const filteredReservations = MOCK_RESERVATIONS.filter(r => 
    r.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.resCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.tableAllocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#09090b] text-[#E4E4E7] font-sans">
      {/* Top Telemetry Header */}
      <header className="border-b border-[#27272A] bg-[#101014]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/30">
              <Flame className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif italic text-lg tracking-wider text-white">THE WINTER PARLOR OS</span>
                <span className="text-xs font-semibold tracking-wider font-mono px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                  Maitre D' Desk
                </span>
              </div>
              <p className="text-xs font-mono text-zinc-400">Fireside Sittings, Cellar Allocation & Tableside Ops</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-6 text-xs font-mono text-zinc-400">
              <div>
                <span className="text-zinc-300">TONIGHT COVERS: </span>
                <span className="text-white font-semibold">{totalCovers} Guests</span>
              </div>
              <div>
                <span className="text-zinc-300">DEPOSIT LEDGER: </span>
                <span className="text-emerald-400 font-semibold">${totalDeposits.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={onExit}
              className="flex items-center space-x-2 text-base font-semibold min-h-[44px] font-mono tracking-wider uppercase bg-[#1A1A20] hover:bg-[#25252D] text-zinc-300 hover:text-white px-5 py-3 min-h-[44px] border border-[#2E2E35] transition-all cursor-pointer"
            >
              <span>Back to Parlor</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-6 flex space-x-8 text-xs font-mono">
          <button
            onClick={() => setActiveTab('sittings')}
            className={`py-3 border-b-2 font-medium tracking-wider uppercase transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === 'sittings'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Tonight Sittings Manifest ({MOCK_RESERVATIONS.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('cellar')}
            className={`py-3 border-b-2 font-medium tracking-wider uppercase transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === 'cellar'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Wine className="w-3.5 h-3.5" />
            <span>Biodynamic Cellar ({CELLAR_RESERVES.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('tables')}
            className={`py-3 border-b-2 font-medium tracking-wider uppercase transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === 'tables'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Hearth & Salon Floorplan</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'sittings' && (
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#121216] p-4 border border-[#27272A]">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 text-zinc-300 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter reservations, guest names, or tables..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#18181E] border border-[#27272A] pl-9 pr-4 py-2 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center space-x-3 text-xs font-mono text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>Wood-Fired Hearth at 385°C</span>
              </div>
            </div>

            {/* Sittings List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredReservations.map((res) => (
                <div 
                  key={res.id}
                  className="bg-[#121216] border border-[#27272A] hover:border-amber-500/40 p-6 transition-all space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-mono text-amber-400 font-semibold">{res.resCode}</span>
                        <span className="text-xs font-semibold tracking-wider font-mono px-2 py-0.5 bg-[#1E1E26] text-zinc-300">
                          {res.sittingSlot}
                        </span>
                      </div>
                      <h3 className="font-serif italic text-lg text-white">{res.guestName}</h3>
                      <p className="text-xs font-mono text-zinc-400 mt-0.5">{res.tableAllocation}</p>
                    </div>

                    <div className="text-right">
                      <span className="inline-block text-xs font-semibold font-mono px-2.5 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/30">
                        {res.status}
                      </span>
                      <p className="text-xs font-mono text-zinc-400 mt-1 font-medium">
                        {res.guestCount} Guests • {res.flightCoursesCount} Courses
                      </p>
                    </div>
                  </div>

                  {/* Dietary and Sommelier Pill */}
                  <div className="bg-[#18181E] p-3 space-y-2 border border-[#222228] text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-zinc-300">[DIETARY]</span>
                      <span className="text-amber-200/90 text-right">{res.dietaryRestrictions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-300">[SOMMELIER]</span>
                      <span className={res.sommelierPairing ? 'text-emerald-400 font-semibold' : 'text-zinc-400'}>
                        {res.sommelierPairing ? '✓ Biodynamic Pairings Selected (+$15/course)' : 'A La Carte Cellar'}
                      </span>
                    </div>
                  </div>

                  {/* Footer details */}
                  <div className="pt-2 border-t border-[#222228] flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="text-zinc-300">Deposit Paid: </span>
                      <span className="text-emerald-400 font-medium">${res.totalDeposit.toFixed(2)}</span>
                    </div>

                    <button 
                      onClick={() => alert(`Table service update logged for ${res.guestName}. Tableside steward notified.`)}
                      className="px-3 py-1 bg-[#1A1A22] hover:bg-amber-500/20 text-zinc-300 hover:text-amber-300 border border-[#2E2E35] transition-all cursor-pointer"
                    >
                      Update Course State
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cellar' && (
          <div className="bg-[#121216] p-6 border border-[#27272A] space-y-6">
            <div>
              <h3 className="font-serif italic text-lg text-white">Biodynamic Vintage Cellar Ledger</h3>
              <p className="text-xs font-mono text-zinc-400">
                Low-intervention pet-nats, grand cru burgundies, and cellar-aged ports paired directly to tasting courses.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-[#27272A] text-zinc-300">
                    <th className="pb-3 uppercase tracking-wider">Vintage & Domaine</th>
                    <th className="pb-3 uppercase tracking-wider">Terroir & Appellation</th>
                    <th className="pb-3 uppercase tracking-wider">Vintage Year</th>
                    <th className="pb-3 uppercase tracking-wider">Assigned Course</th>
                    <th className="pb-3 uppercase tracking-wider">Inventory</th>
                    <th className="pb-3 uppercase tracking-wider">Glass / Flight Value</th>
                    <th className="pb-3 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A1A20]">
                  {CELLAR_RESERVES.map((w) => (
                    <tr key={w.id} className="hover:bg-[#181820] transition-colors">
                      <td className="py-4 font-medium text-white">{w.vintageName}</td>
                      <td className="py-4 text-zinc-400">{w.appellation}</td>
                      <td className="py-4 text-amber-400 font-semibold">{w.year}</td>
                      <td className="py-4 text-zinc-300">{w.pairingCourse}</td>
                      <td className="py-4 font-semibold text-zinc-200">{w.bottlesInCellar} Bottles</td>
                      <td className="py-4 text-emerald-400">${w.perGlassValue.toFixed(2)}</td>
                      <td className="py-4">
                        <span className={`text-xs font-semibold tracking-wider px-2 py-0.5 ${
                          w.allocationStatus === 'Low Stock'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                        }`}>
                          {w.allocationStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'tables' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#121216] p-6 border border-[#27272A] space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-amber-400 font-semibold">ZONE A // FIRESIDE HEARTH</span>
                <span className="text-xs font-semibold tracking-wider font-mono px-2 py-0.5 bg-emerald-500/20 text-emerald-300">100% BOOKED</span>
              </div>
              <p className="font-serif italic text-2xl text-white">Tables 01 – 03</p>
              <p className="text-xs font-mono text-zinc-400">Direct radiant heat from central soapstone fireplace. Premium reservation surcharge applied.</p>
            </div>

            <div className="bg-[#121216] p-6 border border-[#27272A] space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-amber-400 font-semibold">ZONE B // SALON CHALET</span>
                <span className="text-xs font-semibold tracking-wider font-mono px-2 py-0.5 bg-amber-500/20 text-amber-300">1 SEAT OPEN</span>
              </div>
              <p className="font-serif italic text-2xl text-white">Tables 04 – 06</p>
              <p className="text-xs font-mono text-zinc-400">Semi-private timber partitions with digital tableside QR tasting card support.</p>
            </div>

            <div className="bg-[#121216] p-6 border border-[#27272A] space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-amber-400 font-semibold">ZONE C // PRIVATE LIBRARY</span>
                <span className="text-xs font-semibold tracking-wider font-mono px-2 py-0.5 bg-blue-500/20 text-blue-300">PRIVATE PARTY</span>
              </div>
              <p className="font-serif italic text-2xl text-white">Private Salon (8 Pax)</p>
              <p className="text-xs font-mono text-zinc-400">Dedicated sommelier, bespoke cellar decanting, and personal hearth stewarding.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
