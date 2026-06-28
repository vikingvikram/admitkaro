'use client'

import Link from 'next/link'
import { COURSES } from '@/lib/constants'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="logo">
          Admit<span>Karo</span>
        </Link>

        <div className="desktop-links">
          {COURSES.slice(0, 7).map((c) => (
            <Link key={c.id} href={`/colleges?course=${encodeURIComponent(c.id)}`}>
              {c.label}
            </Link>
          ))}
          <Link href="/compare">⚖️ Compare</Link>
          <Link href="/counselling">🎯 Predict</Link>
          <Link href="/counselling">🏫 For Colleges</Link>
        </div>

        <Link href="/counselling" className="cta">
          Free Counselling
        </Link>
      </div>
    </nav>
  )
}