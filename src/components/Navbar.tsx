'use client'
import Link from 'next/link'
import { useState } from 'react'
import { COURSES } from '@/lib/constants'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 900,
      background: '#16213E',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      fontFamily: 'var(--font-nunito-sans)'
    }}>
      <div style={{
        maxWidth: 1320, margin: '0 auto',
        padding: '0 20px',
        display: 'flex', alignItems: 'center',
        gap: 16, height: 62
      }}>
        {/* Logo */}
        <Link href="/" style={{
          fontFamily: 'var(--font-nunito)',
          fontSize: 22, fontWeight: 900,
          color: '#fff', textDecoration: 'none',
          letterSpacing: '-0.3px', flexShrink: 0
        }}>
          Admit<span style={{ color: '#FF6B35' }}>Karo</span>
        </Link>

        {/* Nav Links */}
        <div style={{ display: 'flex', gap: 2, flex: 1, flexWrap: 'wrap' }}>
          {COURSES.slice(0, 8).map(c => (
            <Link key={c.id} href={`/colleges/${c.id.toLowerCase()}`} style={{
              color: 'rgba(255,255,255,0.65)',
              textDecoration: 'none',
              fontSize: 13, fontWeight: 600,
              padding: '6px 10px', borderRadius: 6,
              transition: 'all 0.2s'
            }}
              onMouseEnter={(e) => {
  (e.currentTarget as HTMLElement).style.color = '#fff'
}}
onMouseLeave={(e) => {
  (e.currentTarget as HTMLElement).style.color =
    'rgba(255,255,255,0.65)'
}}
            >
              {c.label}
            </Link>
          ))}
          <Link href="/predict" style={{
            color: '#FFB08A', textDecoration: 'none',
            fontSize: 13, fontWeight: 600, padding: '6px 10px'
          }}>🎯 Predict</Link>
          <Link href="/for-colleges" style={{
            color: '#86efac', textDecoration: 'none',
            fontSize: 13, fontWeight: 600, padding: '6px 10px'
          }}>🏫 For Colleges</Link>
        </div>

        {/* CTA */}
        <Link href="/counselling" style={{
          background: '#FF6B35', color: '#fff',
          padding: '8px 18px', borderRadius: 7,
          fontFamily: 'var(--font-nunito)',
          fontSize: 13, fontWeight: 700,
          textDecoration: 'none', flexShrink: 0,
          whiteSpace: 'nowrap'
        }}>
          Free Counselling
        </Link>
      </div>
    </nav>
  )
}