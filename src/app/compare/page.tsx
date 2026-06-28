'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import Navbar from '@/components/Navbar'
import { supabase } from '@/lib/supabase'

// ── TYPES ──────────────────────────────────────────────────────────
type College = {
  id: number
  name: string
  slug: string
  city: string
  state: string
  course: string
  logo: string
  logo_bg: string
  logo_color: string
  fees_min: number
  fees_max: number
  fee_display: string
  placement_percent: number
  avg_package: string
  top_package: string
  rating: number
  total_reviews: number
  naac_grade: string | null
  nirf_rank: number | null
  hostel: boolean
  scholarship: boolean
  about: string
  tags: string[]
}

// ── CONSTANTS ──────────────────────────────────────────────────────
const MAX = 4

const PARAMS: { label: string; key: keyof College; format?: (v: unknown, c: College) => string; highlight?: 'high' | 'low' }[] = [
  { label: 'City', key: 'city' },
  { label: 'State', key: 'state' },
  { label: 'Course', key: 'course' },
  { label: 'Annual Fees', key: 'fees_min', format: (_, c) => c.fee_display || `₹${c.fees_min?.toLocaleString('en-IN')}`, highlight: 'low' },
  { label: 'Placement %', key: 'placement_percent', format: v => `${v}%`, highlight: 'high' },
  { label: 'Avg Package', key: 'avg_package' },
  { label: 'Highest Package', key: 'top_package' },
  { label: 'Rating', key: 'rating', format: v => `${v} ★`, highlight: 'high' },
  { label: 'NAAC Grade', key: 'naac_grade', format: v => v ? String(v) : 'N/A' },
  { label: 'NIRF Rank', key: 'nirf_rank', format: v => v ? `#${v}` : 'Not Ranked', highlight: 'low' },
  { label: 'Hostel', key: 'hostel', format: v => v ? '✅ Available' : '❌ Not Available' },
  { label: 'Scholarship', key: 'scholarship', format: v => v ? '✅ Available' : '❌ Not Available' },
]

// ── WINNER DETECTION ──────────────────────────────────────────────
function getWinner(colleges: College[], key: keyof College, mode?: 'high' | 'low'): number[] {
  if (!mode) return []
  const vals = colleges.map(c => {
    const v = c[key]
    return typeof v === 'number' ? v : null
  })
  if (vals.every(v => v === null)) return []
  const valid = vals.filter(v => v !== null) as number[]
  const best = mode === 'high' ? Math.max(...valid) : Math.min(...valid)
  return vals.map((v, i) => (v === best ? i : -1)).filter(i => i >= 0)
}

// ── STYLES ────────────────────────────────────────────────────────
const S = {
  page: { background: '#F5F7FA', minHeight: '100vh' } as React.CSSProperties,
  wrap: { maxWidth: 1320, margin: '0 auto', padding: '32px 20px 60px' } as React.CSSProperties,
  heading: { fontFamily: 'var(--font-nunito)', fontSize: 26, fontWeight: 900, color: '#1C1F2E', marginBottom: 4 } as React.CSSProperties,
  sub: { fontSize: 14, color: '#52556A', marginBottom: 28 } as React.CSSProperties,
  slotsRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 14, marginBottom: 32 } as React.CSSProperties,
  slot: (filled: boolean): React.CSSProperties => ({
    background: filled ? '#fff' : 'rgba(21,101,192,0.04)',
    border: filled ? '1.5px solid #E2E6F0' : '2px dashed #BBDEFB',
    borderRadius: 12, padding: 16, position: 'relative',
    minHeight: 90, display: 'flex', alignItems: 'center', gap: 10
  }),
  slotLogo: (bg: string, color: string): React.CSSProperties => ({
    width: 44, height: 44, borderRadius: 9, flexShrink: 0,
    background: bg || '#E3F2FD', color: color || '#0D47A1',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--font-nunito)', fontWeight: 900, fontSize: 13
  }),
  slotPlaceholder: { textAlign: 'center', width: '100%' } as React.CSSProperties,
  removeBtn: { position: 'absolute', top: 8, right: 8, background: '#FEE2E2', border: 'none', borderRadius: '50%', width: 22, height: 22, cursor: 'pointer', color: '#991B1B', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' } as React.CSSProperties,
  searchWrap: { position: 'relative', marginBottom: 32 } as React.CSSProperties,
  searchInput: { width: '100%', background: '#fff', border: '1.5px solid #E2E6F0', borderRadius: 10, padding: '12px 16px', fontSize: 15, fontFamily: 'var(--font-nunito-sans)', color: '#1C1F2E', outline: 'none' } as React.CSSProperties,
  dropdown: { position: 'absolute' as const, top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid #E2E6F0', borderRadius: 10, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', zIndex: 99, maxHeight: 320, overflowY: 'auto' as const, marginTop: 4 },
  dropItem: (hover: boolean): React.CSSProperties => ({ padding: '11px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, background: hover ? '#F5F7FA' : '#fff', borderBottom: '1px solid #F1F5F9' }),
  tableWrap: { overflowX: 'auto' as const, borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.04)' },
  table: { width: '100%', borderCollapse: 'collapse' as const, background: '#fff', minWidth: 600 },
  th: (i: number): React.CSSProperties => ({ background: i === 0 ? '#F8FAFC' : '#1565C0', color: i === 0 ? '#52556A' : '#fff', padding: '14px 16px', fontSize: 12.5, fontWeight: 700, textAlign: 'left' as const, whiteSpace: 'nowrap' as const }),
  td: (even: boolean, isParam: boolean): React.CSSProperties => ({ padding: '12px 16px', color: isParam ? '#52556A' : '#1C1F2E', fontWeight: isParam ? 600 : 400, background: even ? '#F8FAFC' : '#fff', borderBottom: '1px solid #F1F5F9', verticalAlign: 'middle' as const, textTransform: isParam ? 'uppercase' as const : 'none' as const, letterSpacing: isParam ? '0.4px' : 'normal', fontSize: isParam ? 11 : 13.5 }),
  winner: { color: '#00897B', fontWeight: 800 } as React.CSSProperties,
  winnerBadge: { display: 'inline-block', background: '#E0F2F1', color: '#00574B', fontSize: 9, fontWeight: 800, padding: '1px 6px', borderRadius: 100, marginLeft: 5, verticalAlign: 'middle' } as React.CSSProperties,
  addBtn: { background: '#1565C0', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontFamily: 'var(--font-nunito)', fontSize: 13, fontWeight: 700, cursor: 'pointer', width: '100%', marginTop: 8 } as React.CSSProperties,
  emptyState: { textAlign: 'center' as const, padding: '48px 20px', background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,.06)' },
  enquireBtn: { background: '#FF6B35', color: '#fff', border: 'none', borderRadius: 7, padding: '8px 16px', fontFamily: 'var(--font-nunito)', fontSize: 12, fontWeight: 700, cursor: 'pointer', marginTop: 8, width: '100%' } as React.CSSProperties,
}

// ── COMPONENT ─────────────────────────────────────────────────────
export default function ComparePage() {
  const [selected, setSelected] = useState<College[]>([])
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<College[]>([])
  const [loading, setLoading] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  // Debounced search
  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); setShowDropdown(false); return }
    setLoading(true)
    const { data } = await supabase
      .from('colleges')
      .select('id,name,slug,city,state,course,logo,logo_bg,logo_color,fees_min,fees_max,fee_display,placement_percent,avg_package,top_package,rating,total_reviews,naac_grade,nirf_rank,hostel,scholarship,about,tags,trending')
      .ilike('name', `%${q}%`)
      .limit(12)
    setResults((data as College[]) || [])
    setShowDropdown(true)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => doSearch(query), 280)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [query, doSearch])

  function addCollege(c: College) {
    if (selected.length >= MAX) return
    if (selected.find(s => s.id === c.id)) return
    setSelected(prev => [...prev, c])
    setQuery('')
    setResults([])
    setShowDropdown(false)
  }

  function removeCollege(id: number) {
    setSelected(prev => prev.filter(c => c.id !== id))
  }

  const canAdd = selected.length < MAX

  return (
    <>
      <Navbar />
      <div style={S.page}>
        <div style={S.wrap}>
          {/* Header */}
          <h1 style={S.heading}>⚖️ Compare Colleges</h1>
          <p style={S.sub}>
            Compare up to {MAX} colleges side-by-side on fees, placement, ratings & more.
            {selected.length > 0 && <span style={{ marginLeft: 8, color: '#1565C0', fontWeight: 700 }}>{selected.length}/{MAX} selected</span>}
          </p>

          {/* Selected Slots */}
          <div style={S.slotsRow}>
            {Array.from({ length: MAX }).map((_, i) => {
              const c = selected[i]
              return (
                <div key={i} style={S.slot(!!c)}>
                  {c ? (
                    <>
                      <div style={S.slotLogo(c.logo_bg, c.logo_color)}>{c.logo}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: 'var(--font-nunito)', fontSize: 13, fontWeight: 800, color: '#1C1F2E', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</div>
                        <div style={{ fontSize: 11, color: '#52556A', marginTop: 2 }}>📍 {c.city}, {c.state}</div>
                        <div style={{ fontSize: 11, color: '#1565C0', fontWeight: 600, marginTop: 2 }}>{c.course}</div>
                      </div>
                      <button style={S.removeBtn} onClick={() => removeCollege(c.id)} title="Remove">✕</button>
                    </>
                  ) : (
                    <div style={S.slotPlaceholder}>
                      <div style={{ fontSize: 22, marginBottom: 4 }}>＋</div>
                      <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600 }}>Slot {i + 1}</div>
                      <div style={{ fontSize: 11, color: '#CBD5E1' }}>Search to add</div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Search */}
          {canAdd && (
            <div style={S.searchWrap} ref={searchRef}>
              <input
                style={S.searchInput}
                placeholder={`🔍 Search college name to add... (${MAX - selected.length} slot${MAX - selected.length !== 1 ? 's' : ''} remaining)`}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => results.length > 0 && setShowDropdown(true)}
              />
              {loading && (
                <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', fontSize: 13 }}>
                  Searching...
                </div>
              )}
              {showDropdown  && results.length > 0 && (
                <div style={S.dropdown}>
                  {results.map((c, idx) => {
                    const alreadyAdded = !!selected.find(s => s.id === c.id)
                    return (
                      <div
                        key={c.id}
                        style={{ ...S.dropItem(hoveredIdx === idx), opacity: alreadyAdded ? 0.5 : 1, cursor: alreadyAdded ? 'not-allowed' : 'pointer' }}
                        onMouseEnter={() => setHoveredIdx(idx)}
                        onMouseLeave={() => setHoveredIdx(null)}
                        onClick={() => !alreadyAdded && addCollege(c)}
                      >
                        <div style={S.slotLogo(c.logo_bg, c.logo_color)}>{c.logo}</div>
                        <div>
                          <div style={{ fontFamily: 'var(--font-nunito)', fontSize: 13.5, fontWeight: 700, color: '#1C1F2E' }}>{c.name}</div>
                          <div style={{ fontSize: 11.5, color: '#52556A' }}>{c.city}, {c.state} · {c.course}</div>
                        </div>
                        {alreadyAdded && <span style={{ marginLeft: 'auto', fontSize: 11, color: '#94A3B8', fontWeight: 600 }}>Added</span>}
                      </div>
                    )
                  })}
                </div>
              )}
              {showDropdown && !loading && query.length > 1 && results.length === 0 && (
                <div style={{ ...S.dropdown, padding: '16px', textAlign: 'center', color: '#94A3B8', fontSize: 14 }}>
                  No colleges found for "{query}"
                </div>
              )}
            </div>
          )}

          {/* Compare Table */}
          {selected.length >= 2 ? (
            <div style={S.tableWrap}>
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={S.th(0)}>Parameter</th>
                    {selected.map((c, i) => (
                      <th key={c.id} style={S.th(i + 1)}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 3 }}>
                          <div style={{ fontFamily: 'var(--font-nunito)', fontSize: 13, lineHeight: 1.3 }}>{c.name}</div>
                          <div style={{ fontSize: 10.5, opacity: 0.75 }}>{c.city} · {c.course}</div>
                          <button
                            style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 5, color: '#fff', fontSize: 10, padding: '2px 8px', cursor: 'pointer', marginTop: 2, fontWeight: 600 }}
                            onClick={() => removeCollege(c.id)}
                          >Remove ✕</button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PARAMS.map((param, rowIdx) => {
                    const winners = getWinner(selected, param.key, param.highlight)
                    return (
                      <tr key={param.key}>
                        <td style={S.td(rowIdx % 2 === 0, true)}>{param.label}</td>
                        {selected.map((c, colIdx) => {
                          const raw = c[param.key]
                          const display = param.format ? param.format(raw, c) : (raw ?? 'N/A')
                          const isWinner = winners.includes(colIdx)
                          return (
                            <td key={c.id} style={{ ...S.td(rowIdx % 2 === 0, false), ...(isWinner ? S.winner : {}) }}>
                              {String(display)}
                              {isWinner && selected.length > 1 && <span style={S.winnerBadge}>BEST</span>}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                  {/* Enquire Row */}
                  <tr>
                    <td style={S.td(false, true)}>Apply</td>
                    {selected.map(c => (
                      <td key={c.id} style={S.td(false, false)}>
                        <a href={`/counselling?college=${encodeURIComponent(c.slug)}&course=${encodeURIComponent(c.course)}`}>
                          <button style={S.enquireBtn}>📞 Free Counselling</button>
                        </a>
                        <a href={`/college/${c.slug}`} style={{ display: 'block', marginTop: 6, fontSize: 12, color: '#1565C0', textDecoration: 'none', fontWeight: 600, textAlign: 'center' }}>
                          View Full Profile →
                        </a>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div style={S.emptyState}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>⚖️</div>
              <h3 style={{ fontFamily: 'var(--font-nunito)', fontSize: 18, fontWeight: 800, color: '#1C1F2E', marginBottom: 8 }}>
                {selected.length === 0 ? 'Search colleges above to compare' : 'Add one more college to compare'}
              </h3>
              <p style={{ fontSize: 14, color: '#52556A' }}>
                {selected.length === 0
                  ? 'Type a college name in the search box to get started.'
                  : `You have ${selected.length} college selected. Add at least 1 more to see the comparison.`}
              </p>
            </div>
          )}

          {/* Legend */}
          {selected.length >= 2 && (
            <div style={{ marginTop: 16, padding: '12px 16px', background: '#EFF6FF', borderRadius: 8, border: '1px solid #BFDBFE', fontSize: 13, color: '#1D4ED8' }}>
              💡 <strong>BEST</strong> badge highlights the best value for each parameter across your selected colleges.
            </div>
          )}
        </div>
      </div>
    </>
  )
}